import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// 💡 FUTURE A/B TESTS: Instead of querying the database on every request,
// define your active tests here. This gets compiled directly into the Vercel Edge 
// function, meaning it executes in 0ms with zero database calls.
const ACTIVE_EXPERIMENTS: Record<string, { slug: string, variants: { id: string, path: string, weight: number }[] }> = {
    // Example structure for when you turn A/B testing back on:
    // "/how-it-works": {
    //     slug: "how_it_works_hero_v1",
    //     variants: [
    //         { id: "control", path: "/how-it-works", weight: 50 },
    //         { id: "variant_b", path: "/how-it-works-b", weight: 50 },
    //     ]
    // }
};

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
    // PRIORITY #2: HOMEPAGE → /intro-offer (SEO rewrite, preserves domain authority)
    // ========================================================================
    if (pathname === "/") {
        const rewriteUrl = request.nextUrl.clone();
        rewriteUrl.pathname = `/intro-offer`;
        return NextResponse.rewrite(rewriteUrl);
    }

    // ========================================================================
    // PRIORITY #3: EDGE-NATIVE A/B TESTING (Zero Latency)
    // ========================================================================
    const experiment = ACTIVE_EXPERIMENTS[pathname];
    if (experiment) {
        const cookieName = `ab_${experiment.slug}`;
        let assignedVariantId = request.cookies.get(cookieName)?.value;

        let variant = experiment.variants.find(v => v.id === assignedVariantId);

        // If no bucket cookie exists, assign one based on traffic weights
        if (!variant) {
            const random = Math.random() * 100;
            let accumulated = 0;
            for (const v of experiment.variants) {
                accumulated += v.weight;
                if (random <= accumulated) {
                    variant = v;
                    break;
                }
            }
        }

        // Rewrite Request if assigned to a variant path
        if (variant && variant.path !== pathname) {
            const rewriteUrl = request.nextUrl.clone();
            rewriteUrl.pathname = variant.path;

            const response = NextResponse.rewrite(rewriteUrl);
            response.cookies.set(cookieName, variant.id, { maxAge: 60 * 60 * 24 * 30 });
            response.headers.set("x-ab-test-id", experiment.slug);
            response.headers.set("x-ab-variant-id", variant.id);
            return response;
        }

        // Control fallback
        const response = NextResponse.next();
        if (variant) {
            response.cookies.set(cookieName, variant.id, { maxAge: 60 * 60 * 24 * 30 });
            response.headers.set("x-ab-test-id", experiment.slug);
            response.headers.set("x-ab-variant-id", variant.id);
        }
        return response;
    }

    // Return the response with the refreshed auth cookie
    return sessionResponse;
}

export const config = {
    matcher: [
        // Exclude API, Admin, Next Static files, AND media folders to save processing time
        "/((?!_next/static|_next/image|images|videos|favicon.ico|api|admin).*)",
    ],
};
