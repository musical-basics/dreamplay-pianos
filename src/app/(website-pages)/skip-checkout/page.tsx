import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getJourneyById } from "@/actions/admin-actions"

/**
 * /skip-checkout — Server-side redirect page
 * 
 * Reads the dp_journey_id cookie, looks up the journey config,
 * and immediately redirects to the first product's Shopify variant checkout URL.
 * 
 * Usage: Set a journey's Checkout Path to "/skip-checkout" to bypass
 *        all intermediate checkout pages and go directly to Shopify.
 */
export default async function SkipCheckoutPage() {
    const cookieStore = await cookies()
    const journeyId = cookieStore.get("dp_journey_id")?.value

    console.log("[skip-checkout] dp_journey_id cookie:", journeyId || "NOT FOUND")

    if (journeyId) {
        const journey = await getJourneyById(journeyId)
        console.log("[skip-checkout] journey found:", journey ? "YES" : "NO")
        console.log("[skip-checkout] journey.products:", JSON.stringify(journey?.products))

        if (journey?.products?.length) {
            const firstProduct = journey.products[0]
            console.log("[skip-checkout] firstProduct.variantId:", firstProduct.variantId || "MISSING")

            if (firstProduct.variantId) {
                let shopifyUrl = `https://dreamplay-pianos.myshopify.com/cart/${firstProduct.variantId}:1`
                if (firstProduct.discountCode) {
                    shopifyUrl += `?discount=${firstProduct.discountCode}`
                }
                console.log("[skip-checkout] Redirecting to:", shopifyUrl)
                redirect(shopifyUrl)
            } else {
                console.log("[skip-checkout] FALLBACK: firstProduct has no variantId")
            }
        } else {
            console.log("[skip-checkout] FALLBACK: journey has no products")
        }
    } else {
        console.log("[skip-checkout] FALLBACK: no dp_journey_id cookie found")
    }

    // Fallback: no journey or no products → go to /checkout
    console.log("[skip-checkout] Falling through to /checkout")
    redirect("/checkout")
}
