"use client";
import React from "react";
import Link from "next/link";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import Footer from "@/components/Footer";
import { ChevronDown, ChevronRight, Play } from "lucide-react";
import { UrgencySubtext } from "@/components/UrgencySubtext";

const VSlide = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <section className={`h-[100dvh] w-full shrink-0 snap-start snap-always relative flex flex-col justify-center items-center ${className}`}>
        {children}
    </section>
);

const HScroll = ({ children }: { children: React.ReactNode }) => (
    <div className="flex w-full h-[100dvh] overflow-x-auto snap-x snap-mandatory no-scrollbar relative">
        {children}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[10px] uppercase tracking-widest animate-pulse pointer-events-none z-50 flex items-center gap-2">
            Swipe to explore <ChevronRight className="w-3 h-3" />
        </div>
    </div>
);

const HSlide = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`min-w-full h-[100dvh] flex-shrink-0 snap-center snap-always flex flex-col justify-center items-center relative px-6 py-20 ${className}`}>
        {children}
    </div>
);

export default function IntroOfferPage() {
    return (
        <div className="bg-[#050505] text-white font-sans antialiased h-[100dvh] w-full overflow-hidden relative">
            <SpecialOfferHeader forceOpaque={true} darkMode={true} className="border-b border-white/10 bg-[#050505]/80 backdrop-blur-md" />
            <main className="h-[100dvh] w-full overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth">

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 1 — Launch Video Hero
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="overflow-hidden">
                    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50" poster="/images/Main-Product-In-Studio-1-1_1.avif">
                        <source src="https://pub-ae162277c7104eb2b558af08104deafc.r2.dev/Final%204k%20Video%20DreamPlay%20Intro.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 flex flex-col items-center text-center px-4">
                        <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-3xl drop-shadow-lg mb-12">Click to watch our official launch video</h1>
                        <button className="flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                            <Play className="ml-2 h-10 w-10 fill-white text-white" />
                        </button>
                    </div>
                    <div className="absolute bottom-8 z-20 animate-bounce text-white/50 text-[10px] uppercase tracking-widest flex flex-col items-center">
                        Scroll Down <ChevronDown className="w-4 h-4 mt-1" />
                    </div>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 2 — Horizontal Data & Pain Point
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="p-0">
                    <HScroll>
                        <HSlide>
                            <h2 className="font-serif text-3xl md:text-5xl mb-12 text-center">The Hidden Barrier</h2>
                            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                                <div className="text-center">
                                    <span className="text-6xl md:text-8xl font-serif text-red-500 font-bold block mb-2">87%</span>
                                    <span className="text-sm text-white/50 uppercase tracking-widest">of women</span>
                                </div>
                                <div className="text-center">
                                    <span className="text-6xl md:text-8xl font-serif text-red-500 font-bold block mb-2">24%</span>
                                    <span className="text-sm text-white/50 uppercase tracking-widest">of men</span>
                                </div>
                            </div>
                            <p className="mt-12 text-lg md:text-2xl text-white/70 text-center max-w-2xl font-serif italic">have hands too small for a standard keyboard.</p>
                        </HSlide>
                        <HSlide className="bg-white text-black">
                            <img src="/images/Biomechanical Impact on Small Hands copy.png" className="w-full max-w-3xl max-h-[50vh] object-contain mb-8 mix-blend-multiply" alt="Pain Point" />
                            <h2 className="font-serif text-3xl mb-8 font-bold text-center">Stop stretching flat.</h2>
                            <Link href="/how-it-works" target="_blank" className="border border-black px-10 py-4 uppercase text-xs tracking-widest font-bold hover:bg-black hover:text-white transition-colors">Learn more about the science</Link>
                        </HSlide>
                    </HScroll>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 3 — Expert Quotes (Horizontal)
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="p-0">
                    <HScroll>
                        <HSlide className="bg-neutral-900">
                            <blockquote className="font-serif text-2xl md:text-5xl leading-tight text-center max-w-4xl mb-8 text-white/90">
                                &quot;We would never expect a world-class athlete to compete with equipment that does not fit their body. <strong>Yet we ask pianists to adapt to a one-size-fits-all design.</strong>&quot;
                            </blockquote>
                            <p className="font-sans text-lg font-bold">Elizabeth Schumann</p>
                            <a href="https://stanford.edu" target="_blank" className="text-blue-400 uppercase text-[10px] tracking-widest mt-1">Stanford University</a>
                        </HSlide>
                        <HSlide className="bg-neutral-900">
                            <blockquote className="font-serif text-2xl md:text-5xl leading-tight text-center max-w-4xl mb-8 text-white/90">
                                &quot;A lifetime of struggling with a seemingly insurmountable problem vanishes in the moment they realize, <strong>&apos;It&apos;s not me that is the problem; it is the instrument!&apos;</strong>&quot;
                            </blockquote>
                            <p className="font-sans text-lg font-bold">Dr. Carol Leone</p>
                            <p className="text-white/50 text-[10px] uppercase tracking-widest mt-1">Chair of Piano Studies, SMU</p>
                        </HSlide>
                    </HScroll>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 4 — The Product (Horizontal)
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="p-0">
                    <HScroll>
                        <HSlide className="p-0 overflow-hidden">
                            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
                            <img src="/images/piano-front-2.jpg" className="absolute inset-0 w-full h-full object-cover z-0" alt="DreamPlay One" />
                            <h2 className="relative z-20 font-serif text-5xl md:text-7xl font-bold drop-shadow-xl text-center">Introducing<br />DreamPlay One</h2>
                        </HSlide>
                        <HSlide className="bg-neutral-950">
                            <img src="/images/DS6.0-Black-transparent v2.png" className="w-full max-w-4xl object-contain mb-12" alt="Renders" />
                            <Link href="/product-information" target="_blank" className="bg-white text-black px-10 py-5 uppercase text-xs tracking-widest font-bold hover:bg-neutral-200 transition-colors">Click here for all product information</Link>
                        </HSlide>
                    </HScroll>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 5 — LEDs & App (Horizontal)
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="p-0">
                    <HScroll>
                        <HSlide className="p-0 overflow-hidden">
                            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 z-0">
                                <source src="https://pub-9dd0751c546645238416e02409ccf084.r2.dev/videos/Clip-3.mp4" type="video/mp4" />
                            </video>
                            <h2 className="relative z-20 font-serif text-4xl md:text-6xl text-center max-w-4xl leading-tight px-6 font-bold">Dedicated learning app to improving even faster.</h2>
                        </HSlide>
                        <HSlide className="p-0 overflow-hidden bg-neutral-900">
                            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 z-0">
                                <source src="https://pub-9dd0751c546645238416e02409ccf084.r2.dev/videos/Falling%20Notes%20Mode.mp4" type="video/mp4" />
                            </video>
                            <Link href="/learn" target="_blank" className="relative z-20 bg-white text-black px-10 py-5 uppercase text-xs tracking-widest font-bold hover:scale-105 transition-transform shadow-2xl">Click here for all our learning features</Link>
                        </HSlide>
                    </HScroll>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 6 — Expected Shipping
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="bg-[#050505] px-6 text-center border-t border-white/10">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-white/50 mb-6">Delivery Timeline</p>
                    <h2 className="font-serif text-5xl md:text-7xl mb-12 text-white/90">Expected shipping:<br /><span className="text-amber-500 font-sans font-bold uppercase tracking-widest block mt-4">August 2026</span></h2>
                    <Link href="/information-and-policies/shipping" target="_blank" className="border border-white/30 px-10 py-4 text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-colors font-bold">
                        Read our shipping policy
                    </Link>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 7 — Manufacturing Timeline Collage
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="px-4 text-center bg-neutral-950">
                    <h2 className="font-serif text-3xl md:text-5xl mb-8 max-w-3xl">Look behind the scenes at what we are building.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-5xl mb-12 h-[40vh]">
                        <img src="/images/factory-pictures/mold.jpeg" className="w-full h-full object-cover rounded-sm col-span-2 row-span-2" alt="Mold" />
                        <img src="/images/factory-pictures/injection.jpeg" className="w-full h-full object-cover rounded-sm" alt="Injection" />
                        <img src="/images/factory-pictures/chassis.jpeg" className="w-full h-full object-cover rounded-sm" alt="Chassis" />
                        <img src="/images/factory-pictures/action.jpeg" className="w-full h-full object-cover rounded-sm" alt="Action" />
                        <img src="/images/factory-pictures/smt.jpeg" className="w-full h-full object-cover rounded-sm" alt="SMT" />
                    </div>
                    <Link href="/production-timeline" target="_blank" className="bg-white text-black px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                        Click here for more details
                    </Link>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 8 — Social Proof
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="bg-[#050505] px-6 text-center">
                    <h2 className="font-serif text-6xl md:text-8xl mb-2 text-amber-400">120k</h2>
                    <p className="uppercase tracking-widest text-white/50 mb-12 text-sm font-bold">Reserved so far</p>
                    <h3 className="font-serif text-5xl md:text-7xl mb-2 text-white">300+</h3>
                    <p className="uppercase tracking-widest text-white/50 mb-16 text-sm font-bold">Confirmed reservations (paid in full)</p>
                    <p className="font-serif text-2xl md:text-4xl italic text-white/90 max-w-3xl">Join the revolution of pianists escaping hand strain forever.</p>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 9 — MSRP Anchor
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="px-6 text-center bg-neutral-900 border-t border-white/10">
                    <p className="font-sans text-lg md:text-2xl text-white/70 mb-8 max-w-2xl leading-relaxed">
                        Here&apos;s how much DreamPlay One will cost once our product is officially released:
                    </p>
                    <h2 className="font-serif text-[6rem] md:text-[10rem] font-bold text-white leading-none">$1099</h2>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 10 — Pattern Interrupt
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="bg-white text-black text-center">
                    <h2 className="font-black text-6xl md:text-9xl uppercase tracking-tighter italic">BUT WAIT...</h2>
                    <div className="absolute bottom-12 animate-bounce">
                        <ChevronDown className="w-12 h-12 text-black/50" />
                    </div>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 11 — The Offer ($699)
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="px-6 text-center bg-[#050505]">
                    <p className="font-serif text-2xl md:text-4xl text-white/90 mb-10 max-w-4xl leading-relaxed">
                        You can lock in our exclusive limited introductory price of just <strong className="text-white">$699</strong> for the keyboard TODAY for...
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-6">
                        <span className="font-serif text-5xl md:text-7xl text-red-500 line-through opacity-60">$1099</span>
                        <span className="font-serif text-7xl md:text-9xl font-bold text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,118,0.5)]">$699</span>
                    </div>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-emerald-400 border border-emerald-400/30 px-4 py-1.5 rounded-full font-bold">Reservation Price Today</p>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 12 — The Deposit ($99)
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="bg-neutral-900 text-center px-6">
                    <p className="font-serif text-4xl md:text-6xl text-white/70 mb-4">...for the tiny deposit of</p>
                    <h2 className="font-serif text-[8rem] md:text-[12rem] font-bold leading-none text-white mb-6">$99</h2>
                    <p className="font-sans text-sm md:text-base text-white/50 uppercase tracking-widest">(Pay the rest when your keyboard is ready to ship)</p>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 13 — Risk Reversal
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="text-center px-6 bg-white text-black">
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 max-w-3xl">
                        {["Full Refund", "Cancel Anytime", "90 Day Trial", "No Risk", "Free Shipping"].map(badge => (
                            <span key={badge} className="border border-black/20 bg-black/5 px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest font-bold rounded-full">{badge}</span>
                        ))}
                    </div>
                    <h2 className="font-serif text-2xl md:text-4xl max-w-5xl leading-relaxed mb-10">
                        <strong className="text-amber-500 block mb-2 text-3xl md:text-5xl">Our promise:</strong> When we are ready to ship to you, we will reach out to confirm with you, your exact shipping address. At this point, you may cancel and get a <strong>100% full refund (no fees)</strong> if you changed your mind.
                    </h2>
                    <Link href="/information-and-policies/shipping" target="_blank" className="font-sans text-xs font-bold uppercase tracking-widest text-blue-600 hover:underline">
                        Our full shipping &amp; taxes policy here
                    </Link>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 14 — Quotes (Horizontal)
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="p-0">
                    <HScroll>
                        <HSlide className="bg-[#050505] text-center px-8">
                            <img src="/images/carnegie-hall-performance.png" className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mx-auto mb-8 border-2 border-white/20" alt="Lionel Yu" />
                            <blockquote className="font-serif text-2xl md:text-4xl leading-relaxed max-w-4xl mb-8">
                                &quot;I watched enough of my students struggle, both adults and children, that I want to make this keyboard for them. To show them what is possible when the piano finally fits one&apos;s hands.&quot;
                            </blockquote>
                            <cite className="font-sans text-sm uppercase tracking-widest text-white/50 not-italic font-bold">Lionel Yu, Founder</cite>
                        </HSlide>
                        <HSlide className="bg-[#0a0a0f] text-center px-8">
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-8 text-4xl border-2 border-white/20">🎹</div>
                            <blockquote className="font-serif text-2xl md:text-4xl leading-relaxed max-w-4xl mb-8">
                                &quot;Everything is easier for me... I feel very comfortable playing scales, fast passages, or big chords.&quot;
                            </blockquote>
                            <cite className="font-sans text-sm uppercase tracking-widest text-white/50 not-italic font-bold">Claudia Wang, Pianist</cite>
                        </HSlide>
                    </HScroll>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 15 — Primary CTA
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="bg-gradient-to-t from-blue-950/30 to-[#050505] text-center px-6">
                    <h2 className="font-serif text-4xl md:text-6xl mb-12">Ready to take the next step?</h2>
                    <Link href="/reserve" className="bg-white text-black px-8 py-6 md:px-12 md:py-8 font-sans text-sm md:text-lg font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)] max-w-3xl w-full block">
                        Click here to start your DreamPlay One reservation
                    </Link>
                    <p className="mt-8 text-white/50 uppercase tracking-widest text-xs font-bold">Receive it by August 2026.</p>
                    <UrgencySubtext className="mt-4" />
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 16 — FAQ / Contact
            ══════════════════════════════════════════════════════════════════ */}
                <VSlide className="bg-[#050505] text-center px-6 border-t border-white/10">
                    <h2 className="font-serif text-3xl md:text-5xl mb-6">Still have questions?</h2>
                    <p className="text-white/60 font-sans max-w-2xl text-base md:text-lg mb-10 leading-relaxed">
                        If you truly believe that this keyboard will change your piano playing experience, please tell us your story. We want to deliver your dream keyboard.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <Link href="/information-and-policies/faq" target="_blank" className="flex-1 border border-white/30 px-8 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Visit FAQ</Link>
                        <Link href="/contact" target="_blank" className="flex-1 bg-white text-black px-8 py-5 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">Contact Us Here</Link>
                    </div>
                </VSlide>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 17 — Buyers Guide & Footer
            ══════════════════════════════════════════════════════════════════ */}
                <section className="min-h-[100dvh] w-full shrink-0 snap-start snap-always relative flex flex-col justify-between bg-neutral-950 pt-[10vh]">
                    <div className="flex flex-col items-center justify-center flex-grow px-6 text-center w-full">
                        <h2 className="font-serif text-3xl md:text-5xl mb-8">Visit our buyers guide</h2>
                        <div className="flex gap-4 flex-wrap justify-center">
                            <Link href="/buyers-guide" target="_blank" className="bg-white/10 border border-white/20 px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors">
                                Adult Pianists
                            </Link>
                            <Link href="/buyers-guide" target="_blank" className="bg-white/10 border border-white/20 px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors">
                                Child Pianists
                            </Link>
                        </div>
                    </div>
                    <div className="w-full shrink-0">
                        <Footer />
                    </div>
                </section>

            </main>
        </div>
    );
}
