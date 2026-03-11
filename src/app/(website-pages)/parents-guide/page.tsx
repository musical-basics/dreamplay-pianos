import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import Footer from "@/components/Footer"
import { getHiddenProducts } from "@/actions/admin-actions"

// Import the kids-focused components
import { ChildHeroSection, ChildUpgradePath } from "@/components/extended-offer/child-hero-section"
import { TradeInSection } from "@/components/extended-offer/trade-in-section"
import { TradeInFaqSection } from "@/components/extended-offer/trade-in-faq-section"
import { FeaturesSection } from "@/components/extended-offer/features-section"
import { PricingSection } from "@/components/extended-offer/pricing-section"
import { GuaranteeSection } from "@/components/extended-offer/guarantee-section"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
    title: "For Parents & Children - DreamPlay One",
    description: "The piano that grows with them. Start on the DS5.5 and upgrade to the DS6.0 for free when their hands grow.",
}

export default async function ParentsGuidePage() {
    const hiddenProducts = await getHiddenProducts()

    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
            <SpecialOfferHeader />
            <main>
                <div className="relative z-10">
                    {/* 1. Hero Video specific to kids/parents */}
                    <div className="sticky top-0 z-[11] min-h-screen md:min-h-0 md:aspect-video">
                        <ChildHeroSection />
                    </div>

                    <div className="relative z-[12] shadow-[0_-20px_50px_rgba(0,0,0,0.25)]">
                        {/* 2. The Free Trade-in / Upgrade Pitch */}
                        <div className="bg-[#fafaf8]">
                            <ChildUpgradePath />
                        </div>

                        <div className="bg-neutral-100">
                            <TradeInSection />
                        </div>

                        <div className="bg-neutral-50">
                            <TradeInFaqSection />
                        </div>

                        {/* 3. Re-establish Product Value */}
                        <div style={{ background: 'linear-gradient(to bottom, #000000 0%, #000000 60%, #020202 68%, #040404 75%, #070707 80%, #0a0a0a 85%, #0d0d0d 90%, #111111 94%, #141414 100%)' }}>
                            <FeaturesSection />
                        </div>

                        {/* 4. Conversion */}
                        <div className="bg-foreground">
                            <PricingSection hiddenProducts={hiddenProducts} />
                        </div>

                        <div className="bg-white">
                            <GuaranteeSection />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
