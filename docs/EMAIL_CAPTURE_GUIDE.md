# Email Capture Guide — DreamPlay Website

> **RULE: Every email capture form MUST use `subscribeToNewsletter()` from `@/actions/email-actions`.**
> 
> **NEVER use `/api/contact` for email capture. That endpoint is ONLY for the contact form (it logs to `contact_submissions` on the website's Supabase, NOT the emailer's subscriber list).**

---

## How Email Capture Works

```
User enters email on website
        ↓
subscribeToNewsletter() server action
  (src/actions/email-actions.ts)
        ↓
POST https://email.dreamplaypianos.com/api/webhooks/subscribe
        ↓
Upserts into `subscribers` table (emailer Supabase: quyqwdjygzalqqmrgkfk)
        ↓
Shows up on emailer /audience page ✅
Triggers any matching email automations ✅
```

### Key Details

- **Server Action Location:** `src/actions/email-actions.ts` → `subscribeToNewsletter()`
- **Webhook Endpoint:** `https://email.dreamplaypianos.com/api/webhooks/subscribe`
- **Emailer Supabase:** `quyqwdjygzalqqmrgkfk.supabase.co` (table: `subscribers`)
- **Website Supabase:** `tqhfpcdqxylrknwbrqqi.supabase.co` (DIFFERENT — do NOT use for subscriber capture)

### Required Payload

```ts
import { subscribeToNewsletter } from "@/actions/email-actions";

const result = await subscribeToNewsletter({
  email: "user@example.com",       // REQUIRED
  first_name: "John",              // optional
  tags: ["your-tag-name"],         // REQUIRED — always tag for segmentation
  temp_session_id: "...",          // optional — for identity stitching
});

if (!result.success) {
  // handle error: result.error
}
```

### Tag Naming Convention

Use lowercase, hyphenated tags that identify the source:
- `hand-guide-popup` — 45s hand measurement popup on /intro-offer
- `$25-credit-popup` — 3-minute accessories popup on /intro-offer
- `reserve_reminder` — "Let me think about it" on /reserve
- `free_shipping` — free shipping popup (NewsletterPopup)
- `discount_300` — $300 discount popup (NewsletterPopup)
- `hand_size` — PDF hand guide popup (NewsletterPopup)
- `Hesitated at Checkout` — reserve2 page checkout hesitation
- `Website Import` — default tag if none specified

---

## All Email Capture Points (Audit: March 13, 2026)

### ✅ Correctly Using `subscribeToNewsletter`

| Location | Tag(s) | Trigger |
|----------|--------|---------|
| `NewsletterPopup.tsx` | `free_shipping`, `discount_300`, `hand_size` | Timed popups on main pages |
| `Footer.tsx` | `Website Import` | Newsletter signup in footer |
| `RegisterModal.tsx` | varies | Registration modal |
| `InlineHandGuide.tsx` | `hand-guide-inline` | Inline hand guide component |
| `FoundersBatchCapture.tsx` | varies | Founder's batch email capture |
| `guarantee-section.tsx` (extended-offer) | `Hesitated at Checkout` | Guarantee section CTA |
| `guarantee-section.tsx` (premium-offer) | `Hesitated at Checkout` | Guarantee section CTA |
| `CustomizeClient.tsx` | varies | Customize page |
| `activate/page.tsx` | varies | Activation page |
| `shipping/page.tsx` | varies | Shipping info page |
| `register/page.tsx` | varies | Registration page |
| `reserve2/page.tsx` | `Hesitated at Checkout` | Reserve v2 hesitation |
| `reserve/page.tsx` (v0) | `reserve_reminder` | "Let me think about it" |
| `intro-offer/page.tsx` (hand popup) | `hand-guide-popup` | 45s timer popup |
| `intro-offer/page.tsx` ($25 credit popup) | `$25-credit-popup` | 3-minute timer popup |
| `checkout/ProductSelectionForm.tsx` | varies | Checkout flow |

### ⚠️ Uses `/api/contact` (Correct — These Are Contact Forms, NOT Email Capture)

| Location | Purpose |
|----------|---------|
| `intro-offer/page.tsx` (Slide 16) | "Still have questions?" contact form |
| `contact/page.tsx` | Dedicated contact page |

### ⚠️ Chatbot Email Gate (Saves to Chat Session Only)

| Location | Current Behavior |
|----------|-----------------|
| `chatbot/Chatbot.tsx` | Saves email to `/api/chat-session` only. Does NOT add to subscriber list. Consider also calling `subscribeToNewsletter` with a `chatbot-email-gate` tag if you want these in audience. |

---

## Common Mistakes to Avoid

### ❌ WRONG: Using `/api/contact` for email capture
```ts
// BAD — goes to contact_submissions table, NOT the subscriber list
const res = await fetch("/api/contact", {
  method: "POST",
  body: JSON.stringify({ name: "Popup", email, subject: "...", message: "..." }),
});
```

### ✅ RIGHT: Using `subscribeToNewsletter`
```ts
// GOOD — goes to emailer subscriber list, shows up in /audience
import { subscribeToNewsletter } from "@/actions/email-actions";

const result = await subscribeToNewsletter({
  email: email.trim(),
  tags: ["your-descriptive-tag"],
});
```

### ❌ WRONG: Calling the webhook URL directly from client-side
```ts
// BAD — exposes the endpoint, no IP/geo enrichment
await fetch("https://email.dreamplaypianos.com/api/webhooks/subscribe", { ... });
```

### ✅ RIGHT: Always use the server action
The server action automatically enriches with IP, city, and country from Vercel headers.

---

## Bug History

### March 13, 2026 — Popup emails not saving to subscriber list

**Bug:** The hand guide popup (45s) and $25 credit popup (3min) on `/intro-offer` were using `/api/contact` instead of `subscribeToNewsletter()`. This sent emails to the `contact_submissions` table on the website's Supabase (which was apparently empty/broken), and they never appeared in the emailer's `/audience` page.

**Failed approach:** Using `/api/contact` — this is meant for the contact form, not email capture. It writes to a different database entirely.

**Fix:** Switched both popup handlers to use `subscribeToNewsletter()` with tags `hand-guide-popup` and `$25-credit-popup`.

**Root cause:** When implementing new email capture forms, the developer used the wrong endpoint (`/api/contact`) instead of following the existing pattern (`subscribeToNewsletter`).

**Lesson:** Always check this document and use `subscribeToNewsletter()` for any new email capture point.
