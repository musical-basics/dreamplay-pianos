import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { updateSession } from "@/lib/supabase/middleware";

// Initialize simpler client for middleware A/B testing (Edge compatible)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Helper: Get the variant path from a hardcoded mapping.
 * This avoids database hits for email visitors.
 * 
 * @param currentPath - The current URL pathname (e.g., "/how-it-works")
 * @param variant - The variant identifier (e.g., "b" or "control")
 * @returns The rewritten path, or null if no rewrite needed
 */
function getVariantPath(currentPath: string, variant: string): string | null {
    // Control variant = no rewrite, stay on original path
    if (variant === "control" || variant === "a") {
        return null;
    }

    // Remove trailing slash for consistency
    const basePath = currentPath.replace(/\/$/, "");

    // Simple logic: append variant suffix (e.g., /how-it-works -> /how-it-works-b)
    // Strip "variant_" prefix if present (e.g., "variant_b" -> "b")
    const suffix = variant.replace("variant_", "");

    return `${basePath}-${suffix}`;
}

export async function middleware(request: NextRequest) {
    // ========================================================================
    // REFRESH SUPABASE AUTH SESSION (must run on every request)
    // ========================================================================
    const sessionResponse = await updateSession(request);

    const url = request.nextUrl;
    const pathname = url.pathname;

    // Skip A/B testing for auth-related paths
    if (pathname.startsWith('/api/auth')) {
        return sessionResponse;
    }

    const searchParams = url.searchParams;

    // ========================================================================
    // PRIORITY #1: URL PARAMETERS (From Email Links - Instant, No DB Hit)
    // ========================================================================
    // If the email link has ?test=hero_test&variant=b, we obey immediately.
    const forcedTest = searchParams.get("test");     // e.g., "hero_test"
    const forcedVariant = searchParams.get("variant"); // e.g., "b" or "variant_b"

    if (forcedTest && forcedVariant) {
        const pathRewrite = getVariantPath(pathname, forcedVariant);
        const cookieName = `ab_${forcedTest}`;

        // Check if variant path is different from current
        if (pathRewrite && pathRewrite !== pathname) {
            const rewriteUrl = request.nextUrl.clone();
            rewriteUrl.pathname = pathRewrite;
            // Remove the test params from the rewritten URL to keep it clean
            rewriteUrl.searchParams.delete("test");
            rewriteUrl.searchParams.delete("variant");

            const response = NextResponse.rewrite(rewriteUrl);

            // Set cookie so they stay in this variant if they refresh (30 days)
            response.cookies.set(cookieName, forcedVariant, { maxAge: 60 * 60 * 24 * 30 });

            // Pass headers for analytics tracking
            response.headers.set("x-ab-test-id", forcedTest);
            response.headers.set("x-ab-variant-id", forcedVariant);

            return response;
        }

        // Control variant or same path - just set cookie and headers, no rewrite
        const response = NextResponse.next();
        response.cookies.set(cookieName, forcedVariant, { maxAge: 60 * 60 * 24 * 30 });
        response.headers.set("x-ab-test-id", forcedTest);
        response.headers.set("x-ab-variant-id", forcedVariant);
        return response;
    }

    // ========================================================================
    // PRIORITY #2: HOMEPAGE → /intro-offer (replaces old A/B test)
    // ========================================================================
    if (pathname === "/") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = `/intro-offer`;
        return NextResponse.redirect(redirectUrl);
    }

    // ========================================================================
    // PRIORITY #4: DATABASE (Fallback for other A/B tests)
    // ========================================================================
    // Only hit the database for paths that aren't handled by hardcoded tests above.

    const { data: activeTest } = await supabase
        .from("ab_tests")
        .select("*, ab_variants(*)")
        .eq("target_path", pathname)
        .eq("status", "active")
        .single();

    if (!activeTest || !activeTest.ab_variants) {
        return NextResponse.next(); // No test running, proceed as normal
    }

    // Check if user is already bucketed via Cookie (legacy check)
    const cookieName = `ab_${activeTest.slug}`;
    let assignedVariantId = request.cookies.get(cookieName)?.value;
    let variant = activeTest.ab_variants.find((v: any) => v.id === assignedVariantId);

    // If Winner Declared, force everyone to winner
    if (activeTest.winning_variant_id) {
        variant = activeTest.ab_variants.find((v: any) => v.id === activeTest.winning_variant_id);
    }
    // If no bucket, assign one based on traffic %
    else if (!variant) {
        const random = Math.random() * 100;
        let accumulated = 0;
        for (const v of activeTest.ab_variants) {
            accumulated += v.traffic_percent;
            if (random <= accumulated) {
                variant = v;
                break;
            }
        }
    }

    // Rewrite Request
    if (variant && variant.path_rewrite !== pathname) {
        const rewriteUrl = request.nextUrl.clone();
        rewriteUrl.pathname = variant.path_rewrite;

        const response = NextResponse.rewrite(rewriteUrl);
        response.cookies.set(cookieName, variant.id);
        response.headers.set("x-ab-test-id", activeTest.id);
        response.headers.set("x-ab-variant-id", variant.id);
        return response;
    }

    // Even if it's the Control (no rewrite), we set headers for tracking
    const response = NextResponse.next();
    if (variant) {
        response.cookies.set(cookieName, variant.id);
        response.headers.set("x-ab-test-id", activeTest.id);
        response.headers.set("x-ab-variant-id", variant.id);
    }
    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api|admin).*)", // Exclude API and Admin
    ],
};
