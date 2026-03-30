import { z } from 'zod';

// ─── Zod Schemas ───────────────────────────────────────────────────────────

export const JourneyProductSchema = z.object({
    id: z.string(),
    price: z.string(),
    label: z.string().optional(),
    originalPrice: z.string().optional(),
    badge: z.string().optional(),
    discountCode: z.string().optional(),
    variantId: z.string().optional(),
});

export const JourneyPopupSchema = z.object({
    type: z.string(),
    delaySeconds: z.number(),
});

export const JourneyConfigSchema = z.object({
    id: z.string(),
    name: z.string(),
    weight: z.number(),
    homepage: z.string(),
    checkout: z.string(),
    priceTier: z.string().optional(),
    popups: z.array(JourneyPopupSchema),
    products: z.array(JourneyProductSchema),
});

export const JourneyConfigArraySchema = z.array(JourneyConfigSchema);

// ─── TypeScript Types (derived from schemas) ───────────────────────────────

export type JourneyProduct = z.infer<typeof JourneyProductSchema>;
export type JourneyPopup = z.infer<typeof JourneyPopupSchema>;
export type JourneyConfig = z.infer<typeof JourneyConfigSchema>;

// ─── Compact cookie payload ─────────────────────────────────────────────────

/** The minimal data stored in the dp_journey_config cookie */
export type JourneyConfigCookiePayload = {
    id: string;
    checkout: string;
    products: JourneyProduct[];
};

/**
 * Parse the dp_journey_config cookie value into a JourneyConfigCookiePayload.
 * Returns null if the cookie is missing or cannot be parsed.
 */
export function parseJourneyConfigCookie(cookieValue: string | undefined): JourneyConfigCookiePayload | null {
    if (!cookieValue) return null;
    try {
        const decoded = decodeURIComponent(cookieValue);
        const parsed = JSON.parse(decoded);
        if (
            typeof parsed.id === 'string' &&
            typeof parsed.checkout === 'string' &&
            Array.isArray(parsed.products)
        ) {
            return parsed as JourneyConfigCookiePayload;
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Serialize a JourneyConfig into a compact, URL-safe cookie value.
 */
export function serializeJourneyConfigCookie(journey: JourneyConfig): string {
    const payload: JourneyConfigCookiePayload = {
        id: journey.id,
        checkout: journey.checkout,
        products: journey.products,
    };
    return encodeURIComponent(JSON.stringify(payload));
}

/**
 * Parse and validate a raw JSON string as an array of JourneyConfig.
 * Invalid entries are skipped with a warning logged.
 */
export function parseJourneyConfigArray(raw: string): JourneyConfig[] {
    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        console.warn('[journey-types] Failed to JSON.parse journey configs');
        return [];
    }

    if (!Array.isArray(parsed)) {
        console.warn('[journey-types] Journey configs is not an array');
        return [];
    }

    const valid: JourneyConfig[] = [];
    for (const item of parsed) {
        const result = JourneyConfigSchema.safeParse(item);
        if (result.success) {
            valid.push(result.data);
        } else {
            console.warn('[journey-types] Invalid journey config entry, skipping:', result.error.flatten());
        }
    }
    return valid;
}
