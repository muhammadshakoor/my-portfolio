---
title: "JWT Authentication in Full-Stack Apps: Patterns That Actually Work"
date: "2026-06-18"
category: "Full Stack"
excerpt: "A complete guide to implementing JWT authentication with refresh tokens, secure storage, and the architecture decisions that separate production-ready auth from tutorials."
tags: ["JWT", "Authentication", "Node.js", "React", "Security", "Full Stack"]
readTime: 11
---

# JWT Authentication in Full-Stack Apps: Patterns That Actually Work

Most JWT tutorials show you the happy path: sign a token, verify a token, done. Production auth is more complex — token expiry, refresh flows, secure storage, and logout that actually works. This post covers all of it.

## Why Not Just Use an Auth Library?

Libraries like Auth.js, Clerk, or Supabase Auth handle most of this for you, and you should seriously consider them. But understanding JWT internals matters because:

- You'll debug auth issues in any library
- Enterprise clients often have custom requirements (SSO, specific claims)
- You may be building something the libraries don't support

## Token Architecture: Two Tokens, Not One

The naive approach uses one long-lived token. The production approach uses two:

| Token | Lifetime | Storage | Purpose |
|-------|----------|---------|---------|
| Access Token | 15 minutes | Memory (JS variable) | Authenticate API requests |
| Refresh Token | 7–30 days | HttpOnly cookie | Get new access tokens |

**Access tokens are short-lived** so a leaked token expires quickly. They live in memory (not localStorage or sessionStorage) to prevent XSS attacks from stealing them.

**Refresh tokens are long-lived** but stored in HttpOnly cookies — inaccessible to JavaScript, preventing XSS theft. They're sent automatically by the browser only to your refresh endpoint.

## Server Implementation (Node.js/Express)

```typescript
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

function createTokens(userId: string) {
  const accessToken = jwt.sign({ sub: userId }, ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ sub: userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
}

// POST /auth/login
app.post("/auth/login", async (req, res) => {
  const user = await verifyCredentials(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const { accessToken, refreshToken } = createTokens(user.id);

  // Store refresh token hash in DB (for revocation)
  await db.refreshTokens.create({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // Refresh token in HttpOnly cookie
  res.setHeader("Set-Cookie", serialize("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/auth/refresh",
    maxAge: 7 * 24 * 60 * 60,
  }));

  // Access token in response body (stored in memory on client)
  res.json({ accessToken, user: { id: user.id, email: user.email } });
});
```

## Refresh Endpoint

```typescript
// POST /auth/refresh
app.post("/auth/refresh", async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(refreshToken, REFRESH_SECRET) as jwt.JwtPayload;
  } catch {
    return res.status(401).json({ error: "Invalid refresh token" });
  }

  // Check token is in DB and not revoked
  const stored = await db.refreshTokens.findFirst({
    where: {
      userId: payload.sub,
      tokenHash: hashToken(refreshToken),
      expiresAt: { gt: new Date() },
    },
  });

  if (!stored) return res.status(401).json({ error: "Token revoked" });

  // Issue new access token (and optionally rotate refresh token)
  const { accessToken } = createTokens(payload.sub!);
  res.json({ accessToken });
});
```

## Client Implementation (React)

The access token lives in a module-level variable — not state, not storage:

```typescript
// lib/auth.ts
let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

// Called on app startup and after refresh
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch("/auth/refresh", {
      method: "POST",
      credentials: "include", // sends HttpOnly cookie
    });
    if (!res.ok) return null;
    const { accessToken: token } = await res.json();
    setAccessToken(token);
    return token;
  } catch {
    return null;
  }
}
```

## Authenticated API Calls with Auto-Refresh

```typescript
// lib/apiClient.ts
async function apiRequest(url: string, options: RequestInit = {}) {
  let token = getAccessToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    // Try to refresh once
    token = await refreshAccessToken();
    if (!token) throw new Error("Session expired");

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  return res;
}
```

## Logout That Actually Works

Logout must:
1. Clear the access token from memory
2. Delete the refresh token from the database (revocation)
3. Clear the HttpOnly cookie

```typescript
// Server: POST /auth/logout
app.post("/auth/logout", async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (refreshToken) {
    await db.refreshTokens.deleteMany({
      where: { tokenHash: hashToken(refreshToken) },
    });
  }

  res.setHeader("Set-Cookie", serialize("refresh_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/auth/refresh",
    maxAge: 0, // expire immediately
  }));

  res.json({ success: true });
});

// Client
async function logout() {
  await fetch("/auth/logout", { method: "POST", credentials: "include" });
  setAccessToken(null); // clear from memory
  window.location.href = "/login";
}
```

## Security Checklist

- [ ] Access tokens expire in 15 minutes or less
- [ ] Refresh tokens stored in HttpOnly, Secure, SameSite=Strict cookies
- [ ] Refresh tokens stored (hashed) in database for revocation
- [ ] Logout deletes the DB record, not just the cookie
- [ ] Different secrets for access and refresh tokens
- [ ] Rotate refresh tokens on use (optional but recommended for sensitive apps)
- [ ] Rate limit the login and refresh endpoints

The architecture described here is what most production auth systems use under the hood. Libraries abstract it, but the concepts are the same.
