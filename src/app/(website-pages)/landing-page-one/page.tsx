import { Playfair_Display, Inter } from "next/font/google"
import { SpecialOfferHeader } from "@/components/special-offer/header"
import { HeroSection } from "@/components/premium-offer/hero-section"
import { SocialProofBar } from "@/components/premium-offer/social-proof-bar"
import { HandComparisonSection } from "@/components/extended-offer/hand-comparison-section"
import { FeaturesSection } from "@/components/premium-offer/features-section"
import { SizeFinderSection } from "@/components/premium-offer/size-finder-section"
import { PricingSection } from "@/components/premium-offer/pricing-section"
import OldTestimonialsSection from "@/components/checkout/OldTestimonialsSection"
import FAQList from "@/components/faq-list"
import Footer from "@/components/Footer"
import { getHiddenProducts } from "@/actions/admin-actions"
import { getFaqItems } from "@/actions/faq-actions"

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
})
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

export const metadata = {
    title: "DreamPlay One - Piano Keyboard for Every Hand",
    description: "DreamPlay One is designed with narrower keys so you can play freely, naturally, and without strain.",
}

export const dynamic = 'force-dynamic';

export default async function LandingPageOne() {
    const hiddenProducts = await getHiddenProducts()
    const faqItems = await getFaqItems()

    // Sort FAQs
    const categories = Array.from(new Set(faqItems.map(item => item.category || 'General')));
    const categoryOrder = ["The Science & Research", "The Pianist's Experience", "DreamPlay & Ordering"];
    const orderedCategories = categoryOrder.filter(c => categories.includes(c));
    categories.forEach(c => { if (!orderedCategories.includes(c)) orderedCategories.push(c); });

    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-white text-neutral-900`}>
            <SpecialOfferHeader />

            <main>
                {/* 1. Hero & Social Proof (Matches NightSeal Hero) */}
                <HeroSection />
                <SocialProofBar />

                {/* 2. Problem/Solution Comparison (Matches NightSeal "Vs Other Treatments") */}
                <HandComparisonSection />

                {/* 3. Features & Benefits (Matches NightSeal core features) */}
                <FeaturesSection />

                {/* 4. How it Works / Size Finder (Matches NightSeal 3-step usage) */}
                <SizeFinderSection />

                {/* 5. Testimonials (Matches NightSeal Trustpilot/Results) */}
                <div className="bg-neutral-100 py-12">
                    <OldTestimonialsSection />
                </div>

                {/* 6. Pricing & CTA (Matches NightSeal Buy section) */}
                <PricingSection hiddenProducts={hiddenProducts} />

                {/* 7. FAQs */}
                <section className="py-24 max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-bold">Support & Research</p>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-12">Frequently Asked Questions</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {orderedCategories.map(cat => (
                            <div
                                key={cat}
                                className="text-[10px] md:text-xs font-sans uppercase tracking-widest text-neutral-600 border border-neutral-200 bg-neutral-50 px-5 py-2.5 rounded-none"
                            >
                                {cat}
                            </div>
                        ))}
                    </div>

                    <FAQList items={faqItems} />
                </section>
            </main>

            <Footer />
        </div>
    )
}
