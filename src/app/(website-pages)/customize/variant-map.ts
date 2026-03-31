/**
 * Shopify Variant ID Map
 * 
 * Maps tier × size × color to Shopify variant IDs.
 * Pricing is now controlled per-journey in the admin panel — this file
 * just maps physical product variants to their Shopify IDs.
 * 
 * Structure: VARIANT_MAP[tier][size][color]
 * To find a variant ID: Shopify Admin → Products → Variants → copy ID from URL.
 */
export const VARIANT_MAP: Record<string, Record<string, Record<string, string>>> = {
    full: { // DreamPlay Bundle
        'DS5.5': { 'Black': '53081205506362', 'White': '53081205539130' },
        'DS6.0': { 'Black': '53081205571898', 'White': '53081205604666' },
        'DS6.5': { 'Black': '53081289883962', 'White': '53081289916730' },
    },
    solo: { // Keyboard Only
        'DS5.5': { 'Black': '53162663969082', 'White': '53162663969082' },
        'DS6.0': { 'Black': '53162663969082', 'White': '53162663969082' },
        'DS6.5': { 'Black': '53162663969082', 'White': '53162663969082' },
    },
    signature: { // Signature Edition
        'DS5.5': { 'Black': '53081298501946', 'White': '53081298534714' },
        'DS6.0': { 'Black': '53081298567482', 'White': '53081298600250' },
        'DS6.5': { 'Black': '53081298633018', 'White': '53081298665786' },
    },
    pro: { // DreamPlay Pro
        'DS5.5': { 'Black': '53111722082618', 'White': '53111722115386' },
        'DS6.0': { 'Black': '53111722148154', 'White': '53111722180922' },
        'DS6.5': { 'Black': '53111722213690', 'White': '53111722246458' },
    },
    reservation: { // Lock My Spot ($99)
        'DS5.5': { 'Black': '', 'White': '' },
        'DS6.0': { 'Black': '', 'White': '' },
        'DS6.5': { 'Black': '', 'White': '' },
    },
    reserve50: { // Reserve (50%)
        'DS5.5': { 'Black': '', 'White': '' },
        'DS6.0': { 'Black': '', 'White': '' },
        'DS6.5': { 'Black': '', 'White': '' },
    },
};
