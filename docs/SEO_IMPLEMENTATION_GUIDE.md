# DreamPlay Pianos — SEO Implementation Tracker

## 1. Target Keyword Cluster
Our on-page and technical SEO strategies are heavily optimized around the following high-intent keywords:
* small hands
* narrow keys
* hands injury
* small hands piano
* kids piano
* kids hands piano
* narrow keyboard

---

## 2. Successfully Implemented Features

### FAQ Rich Snippets (JSON-LD)
* **Component Created:** Built `src/components/FaqJsonLd.tsx` to format questions into Google's required `schema.org` FAQ format.
* **Injected:** Successfully added to the `<head>` of `src/app/(website-pages)/information-and-policies/faq/page.tsx`.
* **Content Optimized:** The `src/actions/faq-data.ts` file has been fully rewritten to organically include our exact target keywords (e.g., "kids hands piano", "hands injury", "narrow keyboard").

### Global Metadata Foundation
* **Root Layout:** `src/app/layout.tsx` is successfully targeting the core keyword phrase `"The Best Piano for Small Hands"` in the default title template.

---

## 3. High-Priority Pending Fixes (A/B Test SEO Protection)

Because we are running A/B tests across multiple landing pages, we are currently generating duplicate content which cannibalizes our search rankings. 

### A. The Middleware Rewrite
* **File:** `src/middleware.ts`
* **Action:** Change the root path (`/`) handler from `NextResponse.redirect` to `NextResponse.rewrite`. This prevents Google from dropping the root domain from its index.

### B. Canonical Tags
* **Files:** All landing page variants (e.g., `src/app/(website-pages)/landing-page-1/page.tsx`, `/premium-offer`, `/extended-offer`).
* **Action:** Add a `canonical` URL to the `metadata` export pointing back to the root domain (`https://dreamplaypianos.com`). This tells Google that the root domain is the "master" version to rank.

### C. `metadataBase` Configuration
* **File:** `src/app/layout.tsx`
* **Action:** Add `metadataBase: new URL('https://dreamplaypianos.com')` to the global metadata object so Next.js can accurately generate absolute URLs for Open Graph images.

---

## 4. Next Technical Implementations

### Sitemap and Robots (`src/app/sitemap.ts` & `src/app/robots.ts`)
* **Action:** Create these files. 
* **Purpose:** Tell Google exactly which pages to crawl (`/how-it-works`, `/buyers-guide`) and explicitly block it from crawling internal paths (`/admin`, `/api`, and our specific A/B test variant URLs).

### Product JSON-LD Schema
* **Files to target:** `src/app/(website-pages)/checkout/page.tsx` and `src/app/(website-pages)/product-information/page.tsx`.
* **Action:** Inject a Product schema to pull the $1,099 pricing and the 5-star "208 Reviews" data directly into Google Search Results (Rich Snippets).

### Deep Image `alt` Text Sweep
* **Action:** Replace generic alt tags with descriptive, keyword-rich alternatives. 
* **Examples to fix:**
    * `src/components/checkout/OldTestimonialsSection.tsx`: Change `alt="Pianist playing"` to `alt="Pianist with small hands playing a narrow keyboard"`.
    * `src/app/(website-pages)/buyers-guide/page.tsx`: Change `alt="DreamPlay Piano with bench"` to `alt="DreamPlay One kids piano with narrow keys and bench"`.
