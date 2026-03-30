/**
 * ============================================================
 * DREAMPLAY JOURNEY ENGINE — Hardcoded Configuration
 * ============================================================
 *
 * This file is the single source of truth for all journey configs.
 * To change a journey, edit this file and deploy.
 *
 * Each journey controls:
 *   - homepage:   which page renders when a visitor hits /
 *   - checkout:   where /buy routes to
 *   - priceTier:  "standard" = always shown to bots (SEO protection)
 *   - popups:     which popups fire and when (in seconds)
 *   - products:   which products show on /customize + at what price
 *
 * === AD TRAFFIC ===
 * Force a journey via URL: dreamplaypianos.com/?journey=journey_a
 *
 * === BOT / SEO BYPASS ===
 * Bots (Googlebot etc.) always get the journey where priceTier = "standard"
 * so Google never indexes discounted prices. Only ONE journey should have
 * priceTier: "standard". It is NOT included in random traffic assignment.
 *
 * === SHOPIFY VARIANT IDs (for reference) ===
 * Bundle (full):
 *   DS5.5 Black: 53081205506362  DS5.5 White: 53081205539130
 *   DS6.0 Black: 53081205571898  DS6.0 White: 53081205604666
 *   DS6.5 Black: 53081289883962  DS6.5 White: 53081289916730
 * Keyboard Only (solo):
 *   DS5.5 Black: 52968307097914  DS5.5 White: 52968307130682
 *   DS6.0 Black: 52968307163450  DS6.0 White: 52968307196218
 *   DS6.5 Black: 53081296470330  DS6.5 White: 53081296503098
 * Signature:
 *   DS5.5 Black: 53081298501946  DS5.5 White: 53081298534714
 *   DS6.0 Black: 53081298567482  DS6.0 White: 53081298600250
 *   DS6.5 Black: 53081298633018  DS6.5 White: 53081298665786
 * ============================================================
 */

import type { JourneyConfig } from '@/actions/admin-actions'

// ─── HUMAN TRAFFIC JOURNEYS ───────────────────────────────────────────────────
// These are included in random weighted assignment.

export const JOURNEY_CONFIGS: JourneyConfig[] = [
    {
        id: 'journey_a',
        name: 'Premium Offer — Full Price',
        weight: 50,
        homepage: '/premium-offer',
        checkout: '/customize',
        popups: [
            { type: 'pdf', delaySeconds: 12 },
            { type: 'shipping', delaySeconds: 300 },
        ],
        products: [
            {
                id: 'full',
                price: '$649',
                badge: 'Most Popular',
            },
            {
                id: 'solo',
                price: '$599',
            },
        ],
    },
    {
        id: 'journey_b',
        name: 'Special Offer — Discounted',
        weight: 50,
        homepage: '/special-offer',
        checkout: '/customize',
        popups: [
            { type: 'discount', delaySeconds: 15 },
            { type: 'pdf', delaySeconds: 300 },
        ],
        products: [
            {
                id: 'full',
                price: '$649',
                badge: 'Most Popular',
            },
            {
                id: 'solo',
                price: '$599',
            },
        ],
    },
]

// ─── BOT / SEO BYPASS JOURNEY ─────────────────────────────────────────────────
// This journey is ONLY served to crawlers (Googlebot, etc).
// It shows full retail pricing so Google never indexes discounted prices.
// priceTier = "standard" is the signal the middleware uses to identify it.
// This journey is NOT included in JOURNEY_CONFIGS and is never randomly assigned.

export const STANDARD_JOURNEY: JourneyConfig = {
    id: 'journey_standard',
    name: 'Standard — Bot / SEO Price View',
    weight: 0,           // Never randomly assigned
    priceTier: 'standard',
    homepage: '/premium-offer',
    checkout: '/customize',
    popups: [],           // No popups for bots
    products: [
        {
            id: 'full',
            price: '$1,199',
            badge: 'Most Popular',
        },
        {
            id: 'solo',
            price: '$1,099',
        },
        {
            id: 'reservation',
            price: '$99',
        },
    ],
}
