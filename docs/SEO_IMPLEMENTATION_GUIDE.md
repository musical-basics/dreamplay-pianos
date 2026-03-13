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

## 2. Implemented Features

### FAQ Rich Snippets (JSON-LD) ✅
* **Component:** `src/components/FaqJsonLd.tsx` — formats questions into Google's `schema.org` FAQ format.
* **Injected on:** `src/app/(website-pages)/information-and-policies/faq/page.tsx`
* **Content Optimized:** `src/actions/faq-data.ts` rewritten with target keywords.

### Global Metadata Foundation ✅
* **Root Layout:** `src/app/layout.tsx` targets `"The Best Piano for Small Hands"` in the title template.
* **`metadataBase`:** Set to `new URL('https://dreamplaypianos.com')` for accurate Open Graph URL resolution.

### Middleware Rewrite (SEO-Safe Routing) ✅
* **File:** `src/middleware.ts`
* Uses `NextResponse.rewrite()` (not redirect) for homepage → `/intro-offer`, preserving root domain authority.

### Canonical Tags ✅
* **Files with canonical → `https://dreamplaypianos.com`:**
    * `src/app/(website-pages)/premium-offer/page.tsx`
    * `src/app/(website-pages)/extended-offer/page.tsx`
    * `src/app/(website-pages)/landing-page-one/page.tsx`
    * `src/app/(website-pages)/landing-page-1/layout.tsx` (via layout, since page is client-side)

### Sitemap & Robots ✅
* **`src/app/robots.ts`** — blocks `/admin/`, `/api/`, `/analytics/`, auth pages, and all A/B test variant URLs.
* **`src/app/sitemap.ts`** — 21 core public pages with priorities and change frequencies.

### Product JSON-LD Schema ✅
* **Component:** `src/components/ProductJsonLd.tsx` — Product schema with $699 price, 5-star rating, 208 reviews.
* **Injected on:**
    * `src/app/(website-pages)/product-information/page.tsx` (directly)
    * `src/app/(website-pages)/checkout/layout.tsx` (via layout, since page is client-side)

### Open Graph Image ✅
* **File:** `src/app/opengraph-image.jpg` — 1200×630 hero image auto-detected by Next.js.
* Ensures branded social sharing cards on Twitter, Facebook, iMessage, etc.

### Single h1 Per Page ✅
* **Fixed:** `src/app/(website-pages)/information-and-policies/shipping/page.tsx`
* Merged two `<h1>` tags into one using `<span>` + `<br/>` to preserve visual styling.

### Canonical Tag Safety ✅
* **A/B variants** (`/premium-offer`, `/extended-offer`, `/landing-page-one`, `/landing-page-1`) correctly point canonical → `https://dreamplaypianos.com`.
* **Content pages** (`/how-it-works`, `/buyers-guide`, `/product-information`, etc.) use self-referencing canonicals via `metadataBase` — they are NOT pointed to root.

### Image Optimization (Shipping Page) ✅
* Converted 5 raw `<img>` tags to Next.js `<Image>` on the shipping page for automatic WebP/AVIF conversion and responsive sizing.
* Added keyword-rich alt text to all images.

---

## 3. Remaining TODO

### Deep Image `alt` Text Sweep ❌
* **Action:** Replace generic alt tags with descriptive, keyword-rich alternatives.
* **Examples to fix:**
    * `src/components/checkout/OldTestimonialsSection.tsx`: Change `alt="Pianist playing"` to `alt="Pianist with small hands playing a narrow keyboard"`.
    * `src/app/(website-pages)/buyers-guide/page.tsx`: Change `alt="DreamPlay Piano with bench"` to `alt="DreamPlay One kids piano with narrow keys and bench"`.
