---
title: "PostgreSQL with Node.js: From Setup to Production-Ready Queries"
date: "2026-06-20"
category: "Backend"
excerpt: "Everything you need to connect Node.js to PostgreSQL the right way — connection pooling, parameterized queries, transactions, and common performance pitfalls."
tags: ["PostgreSQL", "Node.js", "Backend", "SQL", "Database"]
readTime: 9
---

# PostgreSQL with Node.js: From Setup to Production-Ready Queries

PostgreSQL is the right default choice for most web applications. It's ACID-compliant, has excellent JSON support, handles millions of rows efficiently, and the ecosystem around it (especially for Node.js) is mature. This guide covers the practical path from local setup to production-ready patterns.

## Choosing Your Driver

Two main options: `pg` (the classic) and `postgres.js` (modern, faster).

```bash
npm install postgres  # postgres.js — recommended for new projects
# or
npm install pg        # node-postgres — battle-tested, wider ecosystem
```

`postgres.js` uses tagged template literals and handles parameterization automatically, which eliminates an entire class of SQL injection bugs:

```typescript
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

// Safe — parameters are never concatenated into the query string
const users = await sql`
  SELECT * FROM users WHERE email = ${email}
`;
```

## Connection Pooling

Never create a new connection per request. Create a pool once and reuse it:

```typescript
// lib/db.ts
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, {
  max: 10,          // max pool connections
  idle_timeout: 30, // close idle connections after 30s
  connect_timeout: 10,
});

export default sql;
```

In serverless environments (Vercel, AWS Lambda), traditional connection pooling doesn't work well because each function instance creates its own pool. Use **PgBouncer** or **Neon's serverless driver** instead:

```typescript
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);
```

## Schema and Migrations

Don't run raw `CREATE TABLE` statements manually. Use migrations so schema changes are versioned and reproducible.

With `postgres-migrations`:

```typescript
import { migrate } from "postgres-migrations";

// migrations/001_initial.sql
// CREATE TABLE users (
//   id BIGSERIAL PRIMARY KEY,
//   email TEXT UNIQUE NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );

await migrate({ client: pool }, "./migrations");
```

Or use Drizzle ORM if you want type-safe schema definition in TypeScript:

```typescript
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

## Transactions

Use transactions whenever you're making multiple writes that must succeed or fail together:

```typescript
const result = await sql.begin(async (sql) => {
  const [order] = await sql`
    INSERT INTO orders (user_id, total) VALUES (${userId}, ${total})
    RETURNING id
  `;

  await sql`
    UPDATE inventory SET quantity = quantity - ${qty}
    WHERE product_id = ${productId}
  `;

  return order;
});
```

If either query throws, the entire transaction is rolled back automatically.

## Common Performance Pitfalls

### N+1 Queries

The most common mistake — querying inside a loop:

```typescript
// BAD — fires one query per user
const users = await sql`SELECT * FROM users`;
for (const user of users) {
  user.posts = await sql`SELECT * FROM posts WHERE user_id = ${user.id}`;
}
```

Fix with a JOIN or a single batch query:

```typescript
// GOOD — two queries total, joined in application code
const users = await sql`SELECT * FROM users`;
const posts = await sql`
  SELECT * FROM posts WHERE user_id = ANY(${users.map(u => u.id)})
`;

const postsByUser = posts.reduce((acc, post) => {
  (acc[post.userId] ??= []).push(post);
  return acc;
}, {} as Record<number, typeof posts>);
```

### Missing Indexes

Check `EXPLAIN ANALYZE` on slow queries:

```sql
EXPLAIN ANALYZE
SELECT * FROM posts WHERE author_id = 42 ORDER BY created_at DESC LIMIT 20;
```

If you see `Seq Scan` on a large table, add an index:

```sql
CREATE INDEX idx_posts_author_created 
ON posts(author_id, created_at DESC);
```

### Selecting Too Many Columns

`SELECT *` fetches all columns — wasteful when you only need a few. Always specify columns in production queries.

## Environment Setup

```env
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Production — use connection pooler URL
DATABASE_URL=postgresql://user:password@pooler.neon.tech/mydb?sslmode=require
```

## Quick Reference

| Operation | postgres.js |
|-----------|-------------|
| Select | `` sql`SELECT * FROM users` `` |
| Insert returning | `` sql`INSERT INTO t (col) VALUES (${v}) RETURNING *` `` |
| Update | `` sql`UPDATE t SET col = ${v} WHERE id = ${id}` `` |
| Delete | `` sql`DELETE FROM t WHERE id = ${id}` `` |
| Transaction | `sql.begin(async sql => { ... })` |

PostgreSQL with `postgres.js` is one of the most productive backend stacks available today. The tagged template approach makes safe, readable queries the path of least resistance — which is exactly how it should be.
