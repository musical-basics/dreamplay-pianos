# Bug Fix: Infinite Analytics Loop (searchParams useEffect dependency)

**Date:** 2026-03-14  
**Severity:** High (caused 11K+ edge requests in 6 hours, could've hit Vercel billing limits)

## Symptom
- Dev server terminal showed `POST /api/track-ab` and `POST /` requests every ~0.5 seconds continuously
- Vercel dashboard showed a massive spike in edge requests (11K in 6 hours)
- Every visitor on the site was generating ~120 analytics requests per minute instead of 1-2

## Root Cause
Both `ABTracker.tsx` and `AnalyticsTracker.tsx` had `searchParams` (the object from `useSearchParams()`) as a `useEffect` dependency:

```tsx
}, [pathname, searchParams]);
```

In React/Next.js, `useSearchParams()` returns a **new object on every render**, even if the actual query string hasn't changed. This causes the useEffect to fire on every single render.

Worse, `ABTracker.tsx` had this cleanup:
```tsx
return () => {
    handleUnload(); // ← Fires MORE events on cleanup
};
```

So the cascade was:
1. Effect runs → fires `view` event
2. `searchParams` identity changes → cleanup runs → fires `time_on_page` + `bounce`
3. Effect re-runs → fires another `view` event
4. Repeat every ~500ms

## Failed Fixes
None — identified and fixed on first attempt.

## Solution
Changed both files to use `searchParams?.toString()` as the dependency instead of the object:

```tsx
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [pathname, searchParams?.toString()]);
```

`.toString()` returns a stable string (e.g. `"foo=bar&baz=1"`) that only changes when the actual query parameters change, not on every render.

## Files Changed
- `src/components/features/analytics/ABTracker.tsx` (line 92)
- `src/components/AnalyticsTracker.tsx` (line 106)

## Lesson Learned
**Never use `searchParams` (the object) directly as a useEffect dependency in Next.js.** Always use `searchParams?.toString()` or extract the specific params you care about as primitives. This is a common React/Next.js pitfall with `useSearchParams()`.
