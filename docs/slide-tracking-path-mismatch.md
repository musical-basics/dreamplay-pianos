# Slide Tracking Path Mismatch Bug

**Date Fixed:** 2026-03-13  
**Affected repos:** `dreamplay-website`, `dreamplay-analytics`

## The Bug

Slide-level analytics data (which slides a visitor viewed on `/intro-offer`, how long they spent on each) was not showing up in the analytics dashboard visitor detail view.

## Root Cause

A **path mismatch** between two systems:

1. **Pageview recording:** Visitors arriving at the root domain `/` get rewritten to the `/intro-offer` page via Next.js middleware/rewrites. However, the analytics tracker records the pageview with the **browser URL path**, which is `/` (not `/intro-offer`).

2. **Slide event sender** (in `dreamplay-website/src/app/(v0-pages)/intro-offer/page.tsx`): The `sendSlideEvent` function had the path **hardcoded** as `'/intro-offer'`. So slide events were recorded with `path: '/intro-offer'` even when the user was on `/`.

3. **Analytics API** (in `dreamplay-analytics/src/app/api/visitor-history/route.ts`): The `isIntroOffer` check only matched `pv.path === '/intro-offer'` — it did not consider `/` paths at all.

**Result:** For visitors arriving at `/`:
- Pageview had `path: '/'`
- Slide events had `path: '/intro-offer'`
- The API only looked for slide events on `/intro-offer` pageviews
- → No slide data ever showed up for root-domain visitors (which is most ad traffic)

## Failed Fixes

None — identified and fixed on first attempt.

## The Fix

### 1. `dreamplay-website` — dynamic path in slide events

**File:** `src/app/(v0-pages)/intro-offer/page.tsx`

```diff
- body: JSON.stringify({ eventName: 'slide_view', path: '/intro-offer', metadata }),
+ body: JSON.stringify({ eventName: 'slide_view', path: typeof window !== 'undefined' ? window.location.pathname : '/intro-offer', metadata }),
```

Now slide events use the actual browser pathname, so they match the pageview path.

### 2. `dreamplay-analytics` — broaden path matching

**File:** `src/app/api/visitor-history/route.ts`

```diff
- const isIntroOffer = pv.path === '/intro-offer' || pv.path.startsWith('/intro-offer?');
+ const isIntroOffer = pv.path === '/intro-offer' || pv.path.startsWith('/intro-offer?') || pv.path === '/' || pv.path.startsWith('/?');
```

Now the API also attaches slide events to `/` pageviews, which covers visitors arriving via the root domain.

## Why It Worked

The fix ensures both sides (event sender + API consumer) agree on what path to use. The API-side fix also retroactively fixes existing data — old slide events that were recorded with `path: '/intro-offer'` can now be matched to `/` pageviews because the matching uses **timestamp windows**, not path matching, to join slide events to pageviews. The `isIntroOffer` flag just determines *which pageviews* to attempt the join on.
