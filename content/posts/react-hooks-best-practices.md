---
title: "React Hooks Best Practices: Patterns That Keep Your Components Clean"
date: "2026-06-19"
category: "Frontend"
excerpt: "The hooks patterns that actually matter in 2026 — custom hooks, dependency array pitfalls, avoiding stale closures, and when not to use useEffect at all."
tags: ["React", "Hooks", "JavaScript", "Frontend", "Best Practices"]
readTime: 8
---

# React Hooks Best Practices: Patterns That Keep Your Components Clean

React hooks have been around long enough that there's now a clear divide between patterns that scale and patterns that cause subtle bugs six months later. This post covers what actually matters — not the basics you already know.

## The Most Abused Hook: useEffect

`useEffect` is the most misused hook in the ecosystem. Before reaching for it, ask: **is this really a side effect, or is this derived state?**

Derived state should be a variable or `useMemo`, not an effect:

```tsx
// BAD — derived state in an effect
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// GOOD — just compute it
const fullName = `${firstName} ${lastName}`;
```

The effect version causes an extra render. The variable version is free.

## When useEffect IS Appropriate

Effects are correct for:
- Subscribing to external stores (WebSocket, EventEmitter)
- Syncing with non-React systems (analytics, third-party DOM libraries)
- Fetching data in response to user interaction (though `use()` with Suspense is better in React 19+)

```tsx
useEffect(() => {
  const socket = new WebSocket(url);
  socket.onmessage = (e) => setMessages(prev => [...prev, e.data]);
  return () => socket.close(); // cleanup is required
}, [url]);
```

Always return a cleanup function from effects that set up subscriptions.

## Stale Closures: The Hidden Bug

This bites everyone eventually:

```tsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // BAD: count is captured from the initial render
      setCount(count + 1); // always sets to 1
    }, 1000);
    return () => clearInterval(id);
  }, []); // empty deps = count is stale
}
```

The fix: use the functional update form when new state depends on old state:

```tsx
setCount(prev => prev + 1); // always correct, no stale closure
```

Or add `count` to the dependency array if you genuinely need the current value (the interval will reset on each count change, which may or may not be what you want).

## Custom Hooks: Your Best Abstraction Tool

Extract any logic that involves hooks into a custom hook. This is not premature abstraction — it's the right level of abstraction for stateful logic:

```tsx
// hooks/useLocalStorage.ts
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  });

  const set = useCallback((v: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  }, [key]);

  return [value, set] as const;
}
```

Now any component that needs localStorage state gets it in one line, with proper initialization and hydration handling.

## useCallback and useMemo: Don't Overuse Them

These are not free — they have overhead too. Only reach for them when:

1. **useCallback**: The function is passed to a child wrapped in `React.memo`
2. **useMemo**: The computation is genuinely expensive (> 1ms)

```tsx
// Usually unnecessary — cheap to recreate
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []); // saves virtually nothing

// Justified — expensive sort on every render
const sortedItems = useMemo(
  () => items.toSorted((a, b) => b.score - a.score),
  [items]
);
```

When in doubt, profile first. Wrapping everything in `useCallback` is cargo-culting, not optimization.

## useReducer for Complex State

When `useState` leads to many related state updates, reach for `useReducer`:

```tsx
type State = { status: "idle" | "loading" | "success" | "error"; data: null | User[]; error: null | string };
type Action =
  | { type: "fetch" }
  | { type: "success"; data: User[] }
  | { type: "error"; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "fetch":   return { ...state, status: "loading", error: null };
    case "success": return { status: "success", data: action.data, error: null };
    case "error":   return { status: "error", data: null, error: action.message };
    default: return state;
  }
}
```

All state transitions are explicit and testable. No more scattered `setLoading(false); setError(msg); setData(null)` calls that can get out of sync.

## The Rules Matter

The rules of hooks exist because React depends on call order:

- Only call hooks at the top level — never inside conditionals or loops
- Only call hooks from React functions or custom hooks

ESLint's `eslint-plugin-react-hooks` enforces these. Keep it enabled and treat its warnings as errors.

## Quick Checklist Before Shipping a Component

- [ ] Effects have cleanup functions where needed
- [ ] No derived state in effects
- [ ] State updates that depend on previous state use functional form
- [ ] Custom hooks extracted for any multi-hook logic
- [ ] `useCallback`/`useMemo` only where profiling shows benefit
- [ ] `react-hooks/exhaustive-deps` lint rule has no warnings

Clean hook usage is the difference between components you can maintain in six months and components you rewrite from scratch.
