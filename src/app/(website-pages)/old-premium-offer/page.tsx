import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import { CrowdfundingSection } from "@/components/old-premium-offer/crowdfunding-section"
import { StatsSection } from "@/components/old-premium-offer/stats-section"
import { HeroSection } from "@/components/old-premium-offer/hero-section"
import { SocialProofBar } from "@/components/old-premium-offer/social-proof-bar"
import { VideoSection } from "@/components/old-premium-offer/video-section"
import { FeaturesSection } from "@/components/old-premium-offer/features-section"
import { SizeFinderSection } from "@/components/old-premium-offer/size-finder-section"
import { SizeVisualSection } from "@/components/old-premium-offer/size-visual-section"
import { SpecsSection } from "@/components/old-premium-offer/specs-section"
import { CreatorSection } from "@/components/old-premium-offer/creator-section"
import { TrustSection } from "@/components/old-premium-offer/trust-section"
import { PricingSection } from "@/components/old-premium-offer/pricing-section"
import { StanfordQuoteSection } from "@/components/old-premium-offer/stanford-quote-section"
import { GuaranteeSection } from "@/components/old-premium-offer/guarantee-section"
import { HeroImageSection } from "@/components/old-premium-offer/hero-image-section"
import Footer from "@/components/Footer"
import { getHiddenProducts } from "@/actions/admin-actions"

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
})
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

export const metadata = {
    title: "DreamPlay One (Legacy) - Piano Keyboard for Every Hand",
    description:
        "DreamPlay One is designed with narrower keys so you can play freely, naturally, and without strain.",
}

export default async function OldPremiumOfferPage() {
    const hiddenProducts = await getHiddenProducts()
    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
            <SpecialOfferHeader />
            <main>
                <section id="hero">
                    <CrowdfundingSection />
                    <StatsSection />
                    <HeroSection />
                    <SocialProofBar />
                    <VideoSection />
                </section>
                <FeaturesSection />
                <StanfordQuoteSection />
                <HeroImageSection />
                <SizeFinderSection />
                <SizeVisualSection />
                <SpecsSection />
                <CreatorSection />
                <TrustSection />
                <PricingSection hiddenProducts={hiddenProducts} />
                <GuaranteeSection />
            </main>
            <Footer />
        </div>
    )
}
