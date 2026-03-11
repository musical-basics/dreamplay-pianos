import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import Footer from "@/components/Footer"
import { getHiddenProducts } from "@/actions/admin-actions"

// Use the polished premium-offer components (NOT old-premium-offer)
import { CrowdfundingSection } from "@/components/premium-offer/crowdfunding-section"
import { SocialProofBar } from "@/components/premium-offer/social-proof-bar"
import { StatsSection } from "@/components/premium-offer/stats-section"
import { HandComparisonSection } from "@/components/premium-offer/hand-comparison-section"
import { StanfordQuoteSection } from "@/components/premium-offer/stanford-quote-section"
import { VideoHero3 } from "@/components/premium-offer/video-hero-3"
import { SizeFinderSection } from "@/components/premium-offer/size-finder-section"
import { SizeVisualSection } from "@/components/premium-offer/size-visual-section"
import { VideoHero4 } from "@/components/premium-offer/video-hero-4"
import { FeaturesSection } from "@/components/premium-offer/features-section"
import { SpecsSection } from "@/components/premium-offer/specs-section"
import { VideoSection } from "@/components/premium-offer/video-section"
import { CreatorSection } from "@/components/premium-offer/creator-section"
import { TrustSection } from "@/components/premium-offer/trust-section"
import { PricingSection } from "@/components/premium-offer/pricing-section"
import { GuaranteeSection } from "@/components/premium-offer/guarantee-section"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
    title: "DreamPlay One - Piano Keyboard for Every Hand",
    description: "DreamPlay One is designed with narrower keys so you can play freely, naturally, and without strain.",
}

export default async function PremiumOfferPage() {
    const hiddenProducts = await getHiddenProducts()

    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
            <SpecialOfferHeader />
            <main>
                {/* 1. Cinematic Hook */}
                <CrowdfundingSection />

                {/* Apply the Z-Index Sticky Layout from the Extended Offer */}
                <div className="relative z-10">
                    <div className="sticky top-0 z-[11]">
                        <SocialProofBar />
                    </div>

                    {/* 2. The Problem & Visual Proof */}
                    <div className="relative z-[12] bg-white">
                        <StatsSection />
                        {/* BORROWED: This is vital for immediate visual understanding */}
                        <HandComparisonSection />
                    </div>

                    {/* 3. The Solution (Product Video) */}
                    <div className="sticky top-0 z-[13] min-h-[60vh] md:min-h-0 md:aspect-video bg-black overflow-hidden">
                        <section id="video"><VideoSection /></section>
                    </div>

                    {/* 4. Cinematic Breather (Borrowed) */}
                    <div className="sticky top-0 z-[14] min-h-screen md:min-h-0 md:aspect-video overflow-hidden">
                        <VideoHero3 />
                    </div>

                    {/* 5. Sizing Deep Dive */}
                    <div className="relative z-[15] bg-[#f5f5f0]">
                        <SizeFinderSection />
                        <SizeVisualSection />
                    </div>

                    {/* 6. Cinematic Breather (Borrowed) */}
                    <div className="sticky top-0 z-[16] min-h-screen md:min-h-0 md:aspect-video overflow-hidden">
                        <VideoHero4 />
                    </div>

                    {/* 7. Product Deep Dive */}
                    <div className="relative z-[17]" style={{ background: 'linear-gradient(to bottom, #000000 0%, #000000 60%, #020202 68%, #040404 75%, #070707 80%, #0a0a0a 85%, #0d0d0d 90%, #111111 94%, #141414 100%)' }}>
                        <FeaturesSection />
                        <SpecsSection />
                    </div>

                    {/* 8. Authority, Trust & Maker */}
                    <div className="relative z-[18] bg-foreground">
                        <StanfordQuoteSection />
                        <CreatorSection />
                        <TrustSection />
                    </div>

                    {/* 9. Conversion */}
                    <div className="relative z-[19] bg-foreground">
                        <PricingSection hiddenProducts={hiddenProducts} />
                    </div>

                    <div className="relative z-[20] bg-white">
                        <GuaranteeSection />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
