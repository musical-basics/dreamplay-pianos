# Bug: Tailwind CSS `border-*` Classes Not Rendering on Buttons

**Date:** 2026-03-11
**Page:** `/landing-page-1`
**Component:** CTA buttons (buy box, timeline, sticky footer)

## The Bug

Hover effect on CTA buttons was supposed to invert to white/transparent background with a visible dark border outline. However, no border was visible on hover despite Tailwind classes being applied.

## What We Tried (Failed)

### Attempt 1: `border-2 border-[#111111]`
Used Tailwind arbitrary value for border color. No border rendered on hover.

### Attempt 2: `border-2 border-black`
Switched to standard Tailwind color class. Still no border rendered on hover.

Both approaches used valid Tailwind syntax, but the border was either being stripped by a CSS reset, overridden by a component library style, or the arbitrary value was not being included in the generated CSS bundle.

## The Fix

Used **inline `style` attribute** instead of Tailwind classes for the border:

```tsx
<button
    className="... hover:bg-transparent hover:text-black transition-all duration-200 ..."
    style={{ border: "2px solid #111111" }}
>
```

Inline styles have the highest CSS specificity (outside `!important`), so they cannot be overridden by Tailwind resets or component library styles.

## Why It Worked

- Tailwind's preflight/reset may strip default border styles or conflict with `border-*` utility classes in certain component contexts
- Inline `style` bypasses all CSS specificity issues
- The border is always present (same color as bg in default state, so invisible), and becomes visible when the background turns transparent on hover

## Lesson Learned

When Tailwind `border-*` classes don't render as expected (especially on buttons inside complex layouts), fall back to inline `style={{ border: "..." }}` as a reliable fix.
