"use client"

import { useState, useEffect } from "react"
import { getJourneyById } from "@/actions/admin-actions"
import { parseJourneyConfigCookie } from "@/lib/journey-types"

/**
 * Reads the assigned journey from the dp_journey_config cookie (set by middleware)
 * and returns the resolved checkout path:
 *   1. journey.checkout if it's non-empty  (e.g. "/reserve", "/checkout")
 *   2. Direct Shopify cart URL built from the first product's variantId
 *   3. Falls back to `/checkout` if nothing is configured
 *
 * If dp_journey_config is missing (e.g., old cached sessions), falls back to
 * fetching the journey config via the getJourneyById() server action.
 */
export function useJourneyCheckout(fallback = "/checkout") {
    const [checkoutPath, setCheckoutPath] = useState(fallback)

    useEffect(() => {
        // Try the compact dp_journey_config cookie first (set by middleware)
        const configMatch = document.cookie.match(/(^| )dp_journey_config=([^;]+)/)
        const journeyConfig = parseJourneyConfigCookie(configMatch?.[2])

        if (journeyConfig) {
            resolveCheckout(journeyConfig.checkout, journeyConfig.products)
            return
        }

        // Fall back to server action for old cached sessions without the new cookie
        const idMatch = document.cookie.match(/(^| )dp_journey_id=([^;]+)/)
        if (!idMatch) return

        getJourneyById(idMatch[2]).then(journey => {
            if (!journey) return
            resolveCheckout(journey.checkout, journey.products)
        })
    }, [fallback])

    function resolveCheckout(checkout: string, products: { variantId?: string; discountCode?: string }[] | undefined) {
        // 1. Explicit checkout path configured
        if (checkout && checkout.trim()) {
            setCheckoutPath(checkout)
            return
        }

        // 2. No checkout path → go directly to Shopify with the first product's variant
        if (products?.length && products[0].variantId) {
            const variantId = products[0].variantId
            const discountCode = products[0].discountCode
            let url = `https://dreamplay-pianos.myshopify.com/cart/${variantId}:1`
            if (discountCode) url += `?discount=${discountCode}`
            setCheckoutPath(url)
        }
    }

    return checkoutPath
}
