# 🗺️ DreamPlay Journey Engine — Architecture Analysis

## What Is It?

The **Journey Engine** is a full-funnel personalization and A/B testing system built into the DreamPlay website. It lets you define multiple "journeys" (customer segments/variants), randomly assign visitors to one, then **control their entire experience** — homepage, checkout path, popup sequence, and product pricing — without deploying new code.

Configuration lives in a single Supabase row (`admin_variables.key = 'journey_configs'`) and is hot-reloadable at the edge.

---

## The Data Model

Defined in `src/actions/admin-actions.ts` (lines 640–665):

```ts
JourneyConfig {
  id: string          // e.g. "journey_a" — also used as ?journey= URL param for ads
  name: string        // e.g. "High Ticket Premium"
  weight: number      // Traffic weight (e.g. 50 = 50%)
  homepage: string    // e.g. "/premium-offer"
  checkout: string    // e.g. "/customize" or "/skip-checkout"
  popups: JourneyPopup[]    // Ordered list with per-popup delay in seconds
  products: JourneyProduct[] // Which products show + at what price/variant
}

JourneyProduct {
  id: string           // "reservation" | "solo" | "full" | "signature" | "reserve50"
  label?: string       // Display name override
  price: string        // e.g. "$599"
  originalPrice?: string // Strikethrough price
  badge?: string       // e.g. "Most Popular"
  discountCode?: string // Auto-applied at Shopify checkout
  variantId?: string   // Shopify variant ID override
}

JourneyPopup {
  type: string         // "shipping" | "pdf" | "discount" | "discount_44" | "accessory_25" | etc.
  delaySeconds: number // Seconds after page load to show
}
```

---

## How It Works — Step by Step

### Step 1: Visitor Arrives → Middleware Runs (Edge)
**File:** `src/middleware.ts`

1. **Fetch journeys** — REST call to Supabase with `next: { revalidate: 60 }` (60-second CDN cache, ~0ms latency after warmup).
2. **Check for forced journey** via `?journey=journey_a` URL param (for ad campaigns). If present, overrides cookie.
3. **Bot detection** — User-agent regex check. Bots always get the "standard" price-tier journey to prevent Google from indexing discounted prices.
4. **Assign journey** — For new human visitors: weighted random selection (e.g. 50/50 split by weight).
5. **Rewrite routes:**
   - `GET /` → rewrite to `assignedJourney.homepage` (e.g. `/premium-offer`)
   - `GET /buy` → rewrite to `assignedJourney.checkout` (e.g. `/customize`)
6. **Set cookie** — `dp_journey_id=journey_a` (1-year expiry) so the same visitor always gets the same journey.

```
Visitor hits /
  ├── Has dp_journey_id cookie? → use it
  ├── Has ?journey= param? → use it (ad traffic forcing)
  ├── Is a bot? → assign "standard" journey
  └── New visitor? → weighted random assignment
         → Set dp_journey_id cookie (1 year)
         → Rewrite / → journey.homepage
         → Rewrite /buy → journey.checkout
```

---

### Step 2: Homepage Is Rendered
The journey's `homepage` field controls which Next.js page renders when a visitor hits `/`. The URL displayed in the browser stays `/` (it's a rewrite, not a redirect). Examples: `/special-offer`, `/premium-offer`, `/intro-offer`.

---

### Step 3: Popups Fire Based on Journey Config
**File:** `src/components/NewsletterPopup.tsx`

On page load, `NewsletterPopup` reads `dp_journey_id` from the cookie, calls `getJourneyById()`, and reads `journey.popups[]`. Each popup is scheduled with `setTimeout` at its configured `delaySeconds`.

```
initPopups():
  1. Skip if on /customize, if email visitor, or if already subscribed
  2. Read dp_journey_id cookie
  3. getJourneyById() → journey.popups[]
  4. Fallback: [{ type: "pdf", delaySeconds: 12 }] if no journey popups
  5. Schedule each popup with setTimeout(delaySeconds * 1000)
  6. Exit-intent listener: show first unseen popup if mouse leaves viewport
```

**Supported popup types:** `shipping`, `pdf`, `discount`, `discount_44`, `accessory_25`, `store_credit_25`, `priority_shipping`, `survey_5off`, `tips`

Each type renders different copy & CTA in the same modal component.

---

### Step 4: Product Pricing Is Controlled by Journey
**File:** `src/app/(website-pages)/customize/CustomizeClient.tsx`

The `/customize` page reads `dp_journey_id` → calls `getJourneyById()` → loads `journey.products[]`. These are merged with the static `PRODUCT_CATALOG` (which holds copy, includes, delivery info), overriding:
- Price
- Badge text
- Display label
- Shopify `variantId` (for direct-to-cart checkout)

```
tiers = journeyProducts.map(jp => ({
  ...PRODUCT_CATALOG[jp.id],  // static data (title, description, includes)
  price: jp.price,            // journey override
  badge: jp.badge,            // journey override
  variantId: jp.variantId,    // journey override → direct Shopify URL
}))
```

If no journey is assigned, it falls back to the global `hiddenProducts` admin variable.

---

### Step 5: Checkout Routing

Three checkout strategies exist depending on the journey config:

| Strategy | `checkout` field value | How it works |
|---|---|---|
| **Internal page** | `/customize` | Standard multi-step configurator |
| **Skip to Shopify** | `/skip-checkout` | Server-side redirect; reads first product's `variantId` → direct Shopify cart URL |
| **Other page** | `/reserve`, `/checkout`, etc. | Any internal page |

**`/skip-checkout` (server component):** Reads cookie server-side → `getJourneyById()` → builds `https://dreamplay-pianos.myshopify.com/cart/{variantId}:1?discount={code}` → `redirect()`.

**`useJourneyCheckout` hook:** Client-side version of the same logic, used on CTA buttons across landing pages. Reads cookie → resolves checkout path → updates button href dynamically.

---

### Step 6: Analytics Tagging
**File:** `src/components/AnalyticsTracker.tsx`

Every `page_view` event automatically includes `journey_id` from the cookie in the event metadata. This means you can segment all analytics (time on site, conversion rates, bounce rates) by journey in the admin dashboard.

---

## Files Involved

| File | Role |
|---|---|
| `src/middleware.ts` | Edge routing — assigns journeys, rewrites `/` and `/buy` |
| `src/actions/admin-actions.ts` | Server actions — `getJourneyById()`, `getJourneyConfigs()`, `updateJourneyConfigs()` + type definitions |
| `src/hooks/use-journey-checkout.ts` | Client hook — resolves checkout path from `dp_journey_id` cookie |
| `src/components/NewsletterPopup.tsx` | Reads journey popups, schedules them by delay |
| `src/app/(website-pages)/customize/CustomizeClient.tsx` | Reads journey products, overrides pricing and Shopify variant IDs |
| `src/app/(website-pages)/skip-checkout/page.tsx` | Server redirect — bypasses all intermediate pages to Shopify |
| `src/components/AnalyticsTracker.tsx` | Tags all page views with `journey_id` for segmentation |

---

## Admin Configuration

Journeys are stored as JSON in `admin_variables` table:
```
key: "journey_configs"
value: JSON.stringify(JourneyConfig[])
```

Updated via `updateJourneyConfigs()` in the admin panel. No deployment needed — the edge revalidates every 60 seconds.

---

## Special Cases

- **`?journey=` URL param** — Forces a specific journey for ad traffic. Overwrites the cookie on first visit. Useful for sending Facebook/Google ad traffic to a specific funnel.
- **Bot bypass** — Bots always get `priceTier === "standard"` journey to prevent discount prices being indexed.
- **`/skip-checkout`** — A journey can set `checkout: "/skip-checkout"` to bypass the configurator entirely. This is a server component that immediately redirects to Shopify with the first product's variant + discount.
- **Cookie expiry** — 1 year (`maxAge: 31536000`). Visitors are sticky to their assigned journey.
- **Weight-based assignment** — Weights don't need to sum to 100; they're relative. `[50, 50]` = 50/50. `[1, 3]` = 25/75.
