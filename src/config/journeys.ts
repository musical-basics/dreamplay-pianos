/**
 * ============================================================
 * DREAMPLAY JOURNEY ENGINE — Hardcoded Configuration
 * ============================================================
 *
 * This file is the single source of truth for all journey configs.
 * To change a journey, edit this file and deploy.
 *
 * Each journey controls:
 *   - homepage: which page renders when a visitor hits /
 *   - checkout:  where /buy routes to
 *   - popups:    which popups fire and when (in seconds)
 *   - products:  which products show on /customize + at what price
 *
 * Ad traffic: force a journey via URL → dreamplaypianos.com/?journey=journey_a
 * Bot bypass: bots always see priceTier="standard" to protect SEO pricing.
 * ============================================================
 */

import type { JourneyConfig } from '@/actions/admin-actions'

export const JOURNEY_CONFIGS: JourneyConfig[] = [
    {
        id: 'journey_a',
        name: 'Standard — Premium Offer',
        weight: 50,
        homepage: '/premium-offer',
        checkout: '/customize',
        popups: [
            { type: 'pdf', delaySeconds: 12 },
            { type: 'shipping', delaySeconds: 300 },
        ],
        products: [
            { id: 'full', price: '$1,199', badge: 'Most Popular' },
            { id: 'solo', price: '$1,099' },
            { id: 'reservation', price: '$99' },
        ],
    },
    {
        id: 'journey_b',
        name: 'Discount — Intro Offer',
        weight: 50,
        homepage: '/intro-offer',
        checkout: '/customize',
        popups: [
            { type: 'discount', delaySeconds: 15 },
            { type: 'pdf', delaySeconds: 300 },
        ],
        products: [
            { id: 'full', price: '$1,199', badge: 'Most Popular' },
            { id: 'solo', price: '$1,099' },
            { id: 'reservation', price: '$99' },
        ],
    },
]
