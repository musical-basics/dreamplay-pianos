# Vercel Performance & Caching Optimizations

This document outlines the architectural changes made to ensure the application fully leverages Vercel's Edge CDN and Incremental Static Regeneration (ISR). 

## The Core Philosophy
To get instant page loads (under 100ms), we must avoid blocking the Vercel Edge network. If a user requests a page, Vercel should serve a cached version immediately from a local node (e.g., London, Tokyo) rather than waiting for a serverless function to boot up and query the database in Virginia.

---

## 1. Middleware Optimization (The DB Bottleneck)
**The Problem:** Querying a relational database (Supabase Postgres) directly inside `middleware.ts` forces a slow, cross-country roundtrip on *every single page request* before the HTML even begins to load. 

**The Fix:**
- Removed all direct `supabase.from('ab_tests')...` queries from `src/middleware.ts`.
- Replaced it with an "Edge-Native" configuration (a hardcoded dictionary inside the file). Because this dictionary is compiled directly into Vercel's Edge servers, routing decisions now execute in **0 milliseconds**.
- Updated the middleware `matcher` config to explicitly ignore heavy media folders (`/images`, `/videos`) so they pass through the CDN without triggering middleware logic at all.

---

## 2. ISR (Incremental Static Regeneration) vs. Force-Dynamic
**The Problem:** Using `export const dynamic = 'force-dynamic'` completely disables Vercel's cache. It forces the server to rebuild the HTML and query the database from scratch every time a user visits the page.

**The Fix:** We switched to **ISR** by replacing `force-dynamic` with `revalidate`. This caches the page globally for instant loads, but tells Vercel to silently re-fetch the data in the background every 60 seconds.

### Files Changed to `export const revalidate = 60;`
Make sure these files use ISR so they load instantly but still reflect Admin Panel updates within a minute:
- `src/app/(website-pages)/customize/page.tsx` (Fetches hidden products & URLs)
- `src/app/(website-pages)/information-and-policies/faq/page.tsx` (Fetches FAQ items)
- `src/app/(website-pages)/landing-page-one/page.tsx` (Fetches FAQs & products)
- `src/app/(website-pages)/old-customize/page.tsx`

### The Exception (Leave as `force-dynamic`)
- `src/app/analytics/page.tsx`
  - *Why:* This is a private, internal dashboard. We *want* it to bypass the cache and hit the database on every refresh so you always see live, real-time traffic data.

---

## Summary Checklist for Future Pages
1. **Never query Postgres in Middleware.** If you need dynamic routing based on data, use Vercel KV (Redis) or hardcode it.
2. **Avoid `force-dynamic` on marketing pages.**
3. **Use `export const revalidate = 60;`** on any page that pulls data from the admin panel (Supabase) so you get the best of both worlds: instant CDN speeds + updated content.
