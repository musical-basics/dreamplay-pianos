import { CountdownTimer } from "@/components/holiday-sale/countdown-timer"
import { ProductHero } from "@/components/holiday-sale/product-hero"
import { BundleIncludes } from "@/components/holiday-sale/bundle-includes"
import { ValueProposition } from "@/components/holiday-sale/value-proposition"
import { BundleShowcase } from "@/components/holiday-sale/bundle-showcase"
import { UrgencySection } from "@/components/holiday-sale/urgency-section"
import { FinalCta } from "@/components/holiday-sale/final-cta"
import { GlobalStyleOverride } from "@/components/GlobalStyleOverride"

export const metadata = {
    title: "MLK Holiday Sale | DreamPlay",
    description: "Limited time MLK Holiday Sale. Get the complete DreamPlay bundle.",
}

export default function MLKHolidaySalePage() {
    return (
        <main className="min-h-screen bg-neutral-950">
            <GlobalStyleOverride />

            {/* Sticky Hero Image - Bottom Layer */}
            <div className="w-full bg-black sticky top-0 z-0">
                <img
                    src="/images/banners/mlk-hero.jpg"
                    alt="MLK Holiday Sale"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Stacked Content Sections */}
            <div className="relative">
                {/* 1. Product & Countdown */}
                <div className="sticky top-0 z-10 bg-neutral-950 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <CountdownTimer />
                    <ProductHero />
                </div>

                {/* 2. Value Proposition */}
                <div className="relative lg:sticky top-0 z-20 bg-neutral-950 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <ValueProposition />
                </div>

                {/* 3. Bundle Showcase */}
                <div className="sticky top-0 z-30 bg-neutral-950 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <BundleShowcase />
                </div>

                {/* 4. Bundle Includes */}
                <div className="sticky top-0 z-40 bg-neutral-950 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <BundleIncludes />
                </div>

                {/* 5. Urgency & Final CTA */}
                <div className="sticky top-0 z-50 bg-neutral-950 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <UrgencySection />
                    <FinalCta />
                </div>
            </div>
        </main>
    )
}
