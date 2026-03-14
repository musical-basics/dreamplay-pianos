import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

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
    // PRIORITY #2: JOURNEY ENGINE (Full-Funnel Routing)
    // ========================================================================

    // 1. Fetch Active Journeys via REST (Cached at the Edge for 0ms latency)
    let activeJourneys: any[] = [];
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/admin_variables?key=eq.journey_configs&select=value`,
            {
                headers: {
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
                },
                next: { revalidate: 60 }
            }
        );
        const data = await res.json();
        if (data && data[0]) activeJourneys = JSON.parse(data[0].value);
    } catch (e) {
        console.error("Failed to fetch journeys", e);
    }

    // 2. Identify or Assign Journey
    let assignedJourneyId = request.cookies.get("dp_journey_id")?.value;

    // Feature: Force a journey via URL for your Ads (e.g., ?journey=journey_a)
    const forcedJourney = url.searchParams.get("journey");
    if (forcedJourney) assignedJourneyId = forcedJourney;

    let assignedJourney = activeJourneys.find((j: any) => j.id === assignedJourneyId);

    // ==========================================
    // 🛡️ SEO PROTECTION: THE BOT BYPASS
    // ==========================================
    const userAgent = request.headers.get("user-agent") || "";
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent);

    if (isBot && activeJourneys.length > 0) {
        // ALWAYS serve your standard $1099 Journey to Search Engines
        // to prevent cheap prices from being indexed in Google Search Results.
        assignedJourney = activeJourneys.find((j: any) => j.priceTier === "standard") || activeJourneys[0];
    }
    // ==========================================

    // 3. Otherwise, assign humans randomly based on weights
    else if (!assignedJourney && activeJourneys.length > 0) {
        const totalWeight = activeJourneys.reduce((sum: number, j: any) => sum + j.weight, 0);
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

        // Set stateful cookies so frontend components know what to render
        // Bots don't accept cookies, so this only applies to humans
        if (!isBot) {
            response.cookies.set("dp_journey_id", assignedJourney.id, { maxAge: 31536000 });
        }
    } else {
        // Ultimate Fallback if DB is empty — use current behavior
        if (pathname === "/") {
            const fallback = request.nextUrl.clone();
            fallback.pathname = "/intro-offer";
            response = NextResponse.rewrite(fallback);
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
