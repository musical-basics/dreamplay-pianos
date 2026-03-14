/**
 * Shopify Variant ID Matrix
 * 
 * Each priceTier × tier × size × color combination maps to a unique Shopify variant ID.
 * To find a variant ID: Shopify Admin → Products → [Product] → Variants → click Edit → copy ID from URL.
 * 
 * Structure: VARIANT_MAP[priceTier][tier][size][color]
 * - priceTier: "standard" ($1099/$1199) or "sale" ($599/$649)
 * - tier: "full" (Bundle), "solo" (Keyboard Only), "signature" (Founder's Circle)
 * - size: "DS5.5", "DS6.0", "DS6.5"
 * - color: "Black", "White"
 */
export const VARIANT_MAP: Record<string, Record<string, Record<string, Record<string, string>>>> = {
    standard: { // $1,099 / $1,199 pricing (default)
        full: { // DreamPlay Bundle
            'DS5.5': { 'Black': '53081205506362', 'White': '53081205539130' },
            'DS6.0': { 'Black': '53081205571898', 'White': '53081205604666' },
            'DS6.5': { 'Black': '53081289883962', 'White': '53081289916730' },
        },
        solo: { // Keyboard Only
            'DS5.5': { 'Black': '52968307097914', 'White': '52968307130682' },
            'DS6.0': { 'Black': '52968307163450', 'White': '52968307196218' },
            'DS6.5': { 'Black': '53081296470330', 'White': '53081296503098' },
        },
        signature: { // Signature Edition
            'DS5.5': { 'Black': '53081298501946', 'White': '53081298534714' },
            'DS6.0': { 'Black': '53081298567482', 'White': '53081298600250' },
            'DS6.5': { 'Black': '53081298633018', 'White': '53081298665786' },
        },
    },
    sale: { // $599 / $649 pricing (sale journey)
        // TODO: Replace these placeholder IDs with real Shopify variant IDs
        // once you create the $599/$649 products in Shopify.
        full: { // DreamPlay Bundle (Sale)
            'DS5.5': { 'Black': 'SALE_FULL_DS55_BLK', 'White': 'SALE_FULL_DS55_WHT' },
            'DS6.0': { 'Black': 'SALE_FULL_DS60_BLK', 'White': 'SALE_FULL_DS60_WHT' },
            'DS6.5': { 'Black': 'SALE_FULL_DS65_BLK', 'White': 'SALE_FULL_DS65_WHT' },
        },
        solo: { // Keyboard Only (Sale)
            'DS5.5': { 'Black': 'SALE_SOLO_DS55_BLK', 'White': 'SALE_SOLO_DS55_WHT' },
            'DS6.0': { 'Black': 'SALE_SOLO_DS60_BLK', 'White': 'SALE_SOLO_DS60_WHT' },
            'DS6.5': { 'Black': 'SALE_SOLO_DS65_BLK', 'White': 'SALE_SOLO_DS65_WHT' },
        },
        signature: { // Signature Edition (Sale)
            'DS5.5': { 'Black': 'SALE_SIG_DS55_BLK', 'White': 'SALE_SIG_DS55_WHT' },
            'DS6.0': { 'Black': 'SALE_SIG_DS60_BLK', 'White': 'SALE_SIG_DS60_WHT' },
            'DS6.5': { 'Black': 'SALE_SIG_DS65_BLK', 'White': 'SALE_SIG_DS65_WHT' },
        },
    },
    reservation: { // These are price-tier-agnostic (always $99 / $274)
        reservation: { // Lock My Spot
            'DS5.5': { 'Black': '', 'White': '' },
            'DS6.0': { 'Black': '', 'White': '' },
            'DS6.5': { 'Black': '', 'White': '' },
        },
        reserve50: { // Reserve (50%) Deposit
            'DS5.5': { 'Black': '', 'White': '' },
            'DS6.0': { 'Black': '', 'White': '' },
            'DS6.5': { 'Black': '', 'White': '' },
        },
    },
};
