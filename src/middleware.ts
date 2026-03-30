import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { parseJourneyConfigArray, serializeJourneyConfigCookie } from "@/lib/journey-types";
import type { JourneyConfig } from "@/lib/journey-types";

// ============================================================================
// MODULE-LEVEL CACHE (60-second TTL)
// Avoids hitting Supabase REST on every request within the same edge instance.
// ============================================================================
let _cachedJourneys: JourneyConfig[] = [];
let _cacheTimestamp = 0;
const CACHE_TTL_MS = 60_000; // 60 seconds

async function getActiveJourneys(): Promise<JourneyConfig[]> {
    if (Date.now() - _cacheTimestamp < CACHE_TTL_MS) {
        return _cachedJourneys;
    }
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/admin_variables?key=eq.journey_configs&select=value`,
            {
                headers: {
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
                },
            }
        );
        const data = await res.json();
        if (data && data[0]) {
            _cachedJourneys = parseJourneyConfigArray(data[0].value);
        } else {
            _cachedJourneys = [];
        }
    } catch (e) {
        console.error("Failed to fetch journeys", e);
        // Keep stale cache on error rather than clearing it
    }
    _cacheTimestamp = Date.now();
    return _cachedJourneys;
}

export async function middleware(request: NextRequest) {
    // ========================================================================
    // REFRESH SUPABASE AUTH SESSION (must run on every request)
    // ========================================================================
    const sessionResponse = await updateSession(request);

    const url = request.nextUrl;
    const pathname = url.pathname;

    // Skip Journey Engine for API routes, admin, and auth paths
    if (pathname.startsWith('/api') || pathname.startsWith('/admin') || pathname.startsWith('/api/auth')) {
        return sessionResponse;
    }

    // Skip static files
    if (pathname.match(/\.(.*)$/)) {
        return sessionResponse;
    }

    const searchParams = url.searchParams;

    // ========================================================================
    // PRIORITY #1: URL PARAMETERS (From Email Links - Instant, No DB Hit)
    // ========================================================================
    const forcedTest = searchParams.get("test");
    const forcedVariant = searchParams.get("variant");

    if (forcedTest && forcedVariant) {
        const pathRewrite = getVariantPath(pathname, forcedVariant);
        const cookieName = `ab_${forcedTest}`;

        if (pathRewrite && pathRewrite !== pathname) {
            const rewriteUrl = request.nextUrl.clone();
            rewriteUrl.pathname = pathRewrite;
            rewriteUrl.searchParams.delete("test");
            rewriteUrl.searchParams.delete("variant");

            const response = NextResponse.rewrite(rewriteUrl);
            response.cookies.set(cookieName, forcedVariant, { maxAge: 60 * 60 * 24 * 30 });
            response.headers.set("x-ab-test-id", forcedTest);
            response.headers.set("x-ab-variant-id", forcedVariant);

            return response;
        }

        const response = NextResponse.next();
        response.cookies.set(cookieName, forcedVariant, { maxAge: 60 * 60 * 24 * 30 });
        response.headers.set("x-ab-test-id", forcedTest);
        response.headers.set("x-ab-variant-id", forcedVariant);
        return response;
    }

    // ========================================================================
    // PRIORITY #1.5: SID/CID COOKIE CAPTURE (params stay in URL)
    // Reads subscriber/campaign IDs from email links, saves to root-domain
    // cookies for cross-subdomain tracking. URL params are NOT stripped.
    // NOTE: We do NOT return early here — execution falls through to the
    // Journey Engine so email link visitors also get journey assignment.
    // ========================================================================
    const sid = searchParams.get("sid");
    const cid = searchParams.get("cid");

    // ========================================================================
    // PRIORITY #2: JOURNEY ENGINE (Full-Funnel Routing)
    // ========================================================================

    // 1. Fetch Active Journeys (cached at module level)
    const activeJourneys = await getActiveJourneys();

    // 2. Identify or Assign Journey
    let assignedJourneyId = request.cookies.get("dp_journey_id")?.value;

    // Feature: Force a journey via URL for your Ads (e.g., ?journey=journey_a)
    const forcedJourney = url.searchParams.get("journey");
    if (forcedJourney) assignedJourneyId = forcedJourney;

    let assignedJourney = activeJourneys.find((j: JourneyConfig) => j.id === assignedJourneyId);

    // ==========================================
    // 🛡️ SEO PROTECTION: THE BOT BYPASS
    // ==========================================
    const userAgent = request.headers.get("user-agent") || "";
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent);

    if (isBot && activeJourneys.length > 0) {
        // ALWAYS serve your standard $1099 Journey to Search Engines
        // to prevent cheap prices from being indexed in Google Search Results.
        assignedJourney = activeJourneys.find((j: JourneyConfig) => j.priceTier === "standard") || activeJourneys[0];
    }
    // ==========================================

    // 3. Otherwise, assign humans randomly based on weights
    else if (!assignedJourney && activeJourneys.length > 0) {
        const totalWeight = activeJourneys.reduce((sum: number, j: JourneyConfig) => sum + j.weight, 0);
        let random = Math.random() * totalWeight;
        for (const j of activeJourneys) {
            random -= j.weight;
            if (random <= 0) {
                assignedJourney = j;
                break;
            }
        }
    }

    let response = NextResponse.next();

    if (assignedJourney) {
        // Rewrite root to their assigned Homepage
        if (pathname === "/") {
            const rewriteUrl = request.nextUrl.clone();
            rewriteUrl.pathname = assignedJourney.homepage;
            response = NextResponse.rewrite(rewriteUrl);
        }

        // Universal Checkout Router: Rewrite /buy to their assigned Checkout
        if (pathname === "/buy") {
            const rewriteUrl = request.nextUrl.clone();
            rewriteUrl.pathname = assignedJourney.checkout;
            response = NextResponse.rewrite(rewriteUrl);
        }

        // Set stateful cookies so frontend components know what to render.
        // Bots don't accept cookies, so this only applies to humans.
        if (!isBot) {
            const journeyCookieOpts = { maxAge: 31536000 } as const;

            // Always update cookies when a ?journey= param forces an override
            // so the client immediately picks up the new journey's products.
            response.cookies.set("dp_journey_id", assignedJourney.id, journeyCookieOpts);
            response.cookies.set(
                "dp_journey_config",
                serializeJourneyConfigCookie(assignedJourney),
                journeyCookieOpts
            );
        }
    } else {
        // Ultimate Fallback if DB is empty — use current behavior
        if (pathname === "/") {
            const fallback = request.nextUrl.clone();
            fallback.pathname = "/intro-offer";
            response = NextResponse.rewrite(fallback);
        }
    }

    // ========================================================================
    // APPLY SID/CID COOKIES (if present)
    // This runs after journey resolution so we don't return early and skip
    // journey assignment for email link visitors.
    // ========================================================================
    if (sid) {
        const cookieOpts = {
            maxAge: 60 * 60 * 24 * 90, // 90 days
            path: "/",
            domain: ".dreamplaypianos.com",
            sameSite: "lax" as const,
        };

        // For localhost dev, don't set domain (browsers reject dotted localhost)
        const isLocal = request.headers.get("host")?.includes("localhost");
        if (isLocal) delete (cookieOpts as { domain?: string }).domain;

        response.cookies.set("dp_sid", sid, cookieOpts);
        if (cid) response.cookies.set("dp_cid", cid, cookieOpts);

        // Safety net: store the full original URL (only on first touch)
        if (!request.cookies.get("dp_first_touch_url")) {
            response.cookies.set(
                "dp_first_touch_url",
                url.pathname + url.search,
                cookieOpts
            );
        }
    }

    // Attach auth cookies from updateSession
    sessionResponse.cookies.getAll().forEach(c => response.cookies.set(c.name, c.value));
    return response;
}

/**
 * Helper: Get the variant path from a hardcoded mapping.
 * Used for instant overrides via email links.
 */
function getVariantPath(currentPath: string, variant: string): string | null {
    if (variant === "control" || variant === "a") {
        return null;
    }
    const basePath = currentPath.replace(/\/$/, "");
    const suffix = variant.replace("variant_", "");
    return `${basePath}-${suffix}`;
}

export const config = {
    matcher: [
        // Exclude Next Static files AND media folders to save processing time
        "/((?!_next/static|_next/image|images|videos|favicon.ico).*)",
    ],
};
