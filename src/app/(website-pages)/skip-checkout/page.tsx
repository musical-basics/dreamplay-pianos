import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getJourneyById } from "@/actions/admin-actions"

/**
 * /skip_checkout — Server-side redirect page
 * 
 * Reads the dp_journey_id cookie, looks up the journey config,
 * and immediately redirects to the first product's Shopify variant checkout URL.
 * 
 * Usage: Set a journey's Checkout Path to "/skip_checkout" to bypass
 *        all intermediate checkout pages and go directly to Shopify.
 */
export default async function SkipCheckoutPage() {
    const cookieStore = await cookies()
    const journeyId = cookieStore.get("dp_journey_id")?.value

    if (journeyId) {
        const journey = await getJourneyById(journeyId)

        if (journey?.products?.length) {
            const firstProduct = journey.products[0]

            if (firstProduct.variantId) {
                let shopifyUrl = `https://dreamplay-pianos.myshopify.com/cart/${firstProduct.variantId}:1`
                if (firstProduct.discountCode) {
                    shopifyUrl += `?discount=${firstProduct.discountCode}`
                }
                redirect(shopifyUrl)
            }
        }
    }

    // Fallback: no journey or no products → go to /checkout
    redirect("/checkout")
}
