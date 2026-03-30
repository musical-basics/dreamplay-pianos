"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/animated-section";
import { LazyVideo } from "@/components/learn-page-components/lazy-video";
import { UrgencySubtext } from "@/components/UrgencySubtext";
import { ArrowRight, Play, Quote, ChevronDown } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/* ─── Donut Chart (adapted from /how-it-works) ─── */
const DonutChart = ({ percent, label }: { percent: number; label: string }) => {
    const [currentPercent, setCurrentPercent] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const target = percent;
                const duration = 1500;
                const startTime = performance.now();
                const animate = (time: number) => {
                    const elapsed = time - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 4);
                    setCurrentPercent(target * ease);
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [percent]);

    const size = 200;
    const strokeWidth = 24;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const filledLength = (currentPercent / 100) * circumference;
    const emptyLength = circumference - filledLength;
    const uniqueId = `donut-${percent}-${label.replace(/\s/g, "")}`;

    return (
        <div ref={ref} className="flex flex-col items-center">
            <div className="relative w-[200px] h-[200px] flex items-center justify-center">
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                    <defs>
                        <linearGradient id={`${uniqueId}-filled`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#e74c3c" />
                            <stop offset="100%" stopColor="#8b1a1a" />
                        </linearGradient>
                        <linearGradient id={`${uniqueId}-empty`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2ecc71" />
                            <stop offset="100%" stopColor="#0d4d22" />
                        </linearGradient>
                    </defs>
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={strokeWidth + 4} />
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={`url(#${uniqueId}-empty)`} strokeWidth={strokeWidth} strokeDasharray={`${circumference}`} strokeLinecap="butt" />
                    <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={`url(#${uniqueId}-filled)`} strokeWidth={strokeWidth} strokeDasharray={`${filledLength} ${emptyLength}`} strokeLinecap="butt" />
                </svg>
                <div className="absolute z-10 flex flex-col items-center">
                    <span className="text-5xl font-bold text-[#c0392b]" style={{ textShadow: "0 0 20px rgba(192,57,43,0.3)" }}>
                        {Math.round(currentPercent)}%
                    </span>
                </div>
            </div>
            <p className="mt-4 font-sans text-sm font-medium text-white/60">{label}</p>
        </div>
    );
};

/* ─── Quote Card ─── */
const QuoteCard = ({ quote, name, title, delay = 0 }: { quote: string; name: string; title: string; delay?: number }) => (
    <AnimatedSection delay={delay} className="border border-white/10 bg-[#0a0a0f] p-10 md:p-16 text-center relative overflow-hidden">
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <Quote className="mx-auto mb-6 h-8 w-8 text-white/15" />
        <blockquote className="mb-8 font-serif text-xl md:text-3xl leading-relaxed text-white/90">
            &quot;{quote}&quot;
        </blockquote>
        <div className="font-sans">
            <p className="text-sm font-bold uppercase tracking-wider text-white">{name}</p>
            <p className="mt-1 text-xs text-white/50">{title}</p>
        </div>
    </AnimatedSection>
);

export default function IntroOffer2Page() {
    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased min-h-screen selection:bg-white/20`}>
            <SpecialOfferHeader forceOpaque={true} darkMode={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />

            <main>
                {/* ═══════════════════════════════════════════════════════════
                    SECTION 1 — HERO / LAUNCH VIDEO
                ═══════════════════════════════════════════════════════════ */}
                <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] text-center">
                    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-40" poster="/images/keyboards/Main-Product-In-Studio-1-1_1.avif">
                        <source src="https://pub-ae162277c7104eb2b558af08104deafc.r2.dev/Final%204k%20Video%20DreamPlay%20Intro.mp4" type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/90" />
                    <AnimatedSection className="relative z-10 mx-auto max-w-4xl px-6">
                        <h1 className="mb-10 font-serif text-5xl md:text-7xl font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                            Click to watch our official launch video
                        </h1>
                        <button className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                            <Play className="ml-1 h-8 w-8 fill-white text-white" />
                        </button>
                    </AnimatedSection>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/40 flex flex-col items-center gap-1 z-10">
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 2 — THE HIDDEN BARRIER (Data)
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#050505] text-white py-24 md:py-32 px-4 flex justify-center border-t border-white/10">
                    <div className="w-full max-w-[80rem] p-6 md:p-16">
                        <AnimatedSection className="text-center mb-20">
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">The Data</p>
                            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-6 text-white">The Hidden Barrier</h2>
                            <p className="font-sans text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
                                The majority of pianists play on keyboards that are simply too wide for their hands.
                            </p>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-20">
                            <AnimatedSection className="flex flex-col items-center">
                                <div className="text-center mb-10">
                                    <div className="font-serif text-6xl font-bold mb-3 text-[#c0392b]">87%</div>
                                    <div className="font-sans text-xl font-medium text-white/60 mb-3">of women</div>
                                    <p className="font-sans text-sm text-white/40 max-w-[280px] mx-auto leading-relaxed">
                                        Have hand spans smaller than the 8.5 inch minimum that standard keyboards expect.
                                    </p>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 p-10 w-full max-w-sm flex flex-col items-center hover:border-white/20 transition-all duration-500">
                                    <DonutChart percent={87} label="" />
                                    <div className="flex gap-8 text-xs font-medium text-white/50 mt-8">
                                        <div className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#c0392b]" />Too small</div>
                                        <div className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1e7a3a]" />Comfortable</div>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={200} className="flex flex-col items-center">
                                <div className="text-center mb-10">
                                    <div className="font-serif text-6xl font-bold mb-3 text-[#c0392b]">24%</div>
                                    <div className="font-sans text-xl font-medium text-white/60 mb-3">of men</div>
                                    <p className="font-sans text-sm text-white/40 max-w-[280px] mx-auto leading-relaxed">
                                        Also fall below the comfortable reach threshold for a standard keyboard.
                                    </p>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 p-10 w-full max-w-sm flex flex-col items-center hover:border-white/20 transition-all duration-500">
                                    <DonutChart percent={24} label="" />
                                    <div className="flex gap-8 text-xs font-medium text-white/50 mt-8">
                                        <div className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#c0392b]" />Too small</div>
                                        <div className="flex items-center gap-2.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1e7a3a]" />Comfortable</div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Biomechanical Image */}
                        <AnimatedSection delay={300}>
                            <div className="border border-white/10 bg-[#0a0a0f] overflow-hidden">
                                <div className="border-b border-white/10 bg-white/[0.03] px-6 md:px-10 py-5 flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <span className="w-3 h-3 rounded-full bg-[#c0392b]/60" />
                                        <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                                        <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                                    </div>
                                    <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-medium ml-2">Biomechanical Research</span>
                                </div>
                                <div className="p-6 md:p-10">
                                    <Image
                                        src="/images/hands/Biomechanical Impact on Small Hands copy.png"
                                        alt="Biomechanical Impact of Key Width on Small Hands"
                                        width={1200}
                                        height={900}
                                        className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                                    />
                                    <div className="mt-8 text-center">
                                        <Link href="/how-it-works" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90">
                                            Learn more about the science
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 3 — EXPERT QUOTES
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#0a0a0f] text-white py-24 md:py-32 border-t border-white/10">
                    <div className="container mx-auto max-w-4xl px-6">
                        <AnimatedSection className="text-center mb-16">
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">From the Experts</p>
                            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-white">What the Experts Say</h2>
                        </AnimatedSection>

                        <div className="space-y-8">
                            <QuoteCard
                                quote="We would never expect a world-class athlete to compete with equipment that does not fit their body. Yet we ask pianists to adapt to a one-size-fits-all design."
                                name="Elizabeth Schumann"
                                title="Stanford University"
                                delay={100}
                            />
                            <QuoteCard
                                quote="A lifetime of struggling with a seemingly insurmountable problem vanishes in the moment they realize, 'It's not me that is the problem; it is the instrument!'"
                                name="Dr. Carol Leone"
                                title="Chair of Piano Studies, Southern Methodist University"
                                delay={200}
                            />
                            <QuoteCard
                                quote="I cannot begin to describe the career-changing, and even life-changing, benefits our students have reaped from having these instruments to practice on daily."
                                name="Barbara Lister-Sink, Ed.D."
                                title="Salem College School of Music, Director, Graduate Music Program"
                                delay={300}
                            />
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 4 — PRODUCT SHOWCASE
                ═══════════════════════════════════════════════════════════ */}
                <section className="relative overflow-hidden bg-[#050505] text-white border-t border-white/10">
                    {/* Hero Image */}
                    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                        <img src="/images/keyboards/piano-front-2.jpg" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="DreamPlay One" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]" />
                        <AnimatedSection className="relative z-10 text-center px-6">
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6">The Instrument</p>
                            <h2 className="font-serif text-5xl md:text-8xl font-semibold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                                Introducing<br />
                                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    DreamPlay One
                                </span>
                            </h2>
                        </AnimatedSection>
                    </div>

                    {/* Product Renders */}
                    <div className="py-24 md:py-32 px-6">
                        <div className="container mx-auto max-w-5xl">
                            <AnimatedSection className="text-center">
                                <img src="/images/keyboards/DS6.0-Black-transparent v2.png" className="w-full max-w-4xl mx-auto object-contain mb-12" alt="DreamPlay One Renders" />
                                <Link href="/product-information" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90">
                                    Click here for all product information
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 5 — LED & LEARNING APP
                ═══════════════════════════════════════════════════════════ */}
                <section className="relative overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0f1a] to-[#050505] py-24 text-white md:py-32 border-t border-white/10">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />

                    <div className="container relative z-10 mx-auto max-w-6xl px-6">
                        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                            <AnimatedSection>
                                <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.3em] text-cyan-400/80">
                                    Hardware Meets Software
                                </p>
                                <h2 className="mb-8 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                                    Dedicated learning app<br />
                                    <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                                        to improve even faster.
                                    </span>
                                </h2>
                                <div className="space-y-6 font-sans text-base leading-relaxed text-white/70">
                                    <p>
                                        DreamPlay Learn is <strong className="text-white">fully integrated with DreamPlay One</strong>. Thanks to our custom LED system built into every key, the next note you need to play physically
                                        <span className="text-cyan-300"> lights up on your keyboard</span>.
                                    </p>
                                    <p>
                                        Not just a virtual indicator on a screen, but a <strong className="text-white">real, physical light</strong> that glows beneath the key you need to press.
                                    </p>
                                </div>
                                <div className="mt-10">
                                    <Link href="/learn" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90">
                                        Click here for all our learning features
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={200}>
                                <div className="relative overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
                                    <LazyVideo
                                        src="https://pub-9dd0751c546645238416e02409ccf084.r2.dev/videos/Clip-3.mp4"
                                        className="w-full aspect-video"
                                    />
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 6 — SHIPPING TIMELINE
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#050505] text-white py-24 md:py-32 text-center border-t border-white/10">
                    <div className="container mx-auto max-w-3xl px-6">
                        <AnimatedSection>
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6">Delivery Timeline</p>
                            <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight mb-4 text-white">Expected shipping:</h2>
                            <div className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-widest text-amber-500 mb-12">August 2026</div>
                            <Link href="/information-and-policies/shipping" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white/30 px-8 py-4 font-sans text-xs uppercase tracking-widest text-white transition-colors hover:bg-white/10">
                                Read our shipping policy
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 7 — MANUFACTURING / BEHIND THE SCENES
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#0a0a0f] text-white py-24 md:py-32 border-t border-white/10">
                    <div className="container mx-auto max-w-6xl px-6">
                        <AnimatedSection className="text-center mb-16">
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Behind the Scenes</p>
                            <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight text-white">
                                Look behind the scenes at what we are building.
                            </h2>
                        </AnimatedSection>

                        <AnimatedSection delay={200}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12">
                                {[
                                    { src: "/images/factory-pictures/mold.jpeg", alt: "Custom Steel Mold", span: "col-span-2 row-span-2" },
                                    { src: "/images/factory-pictures/injection.jpeg", alt: "Injection Molding" },
                                    { src: "/images/factory-pictures/chassis.jpeg", alt: "Chassis Assembly" },
                                    { src: "/images/factory-pictures/action.jpeg", alt: "Action Mechanism" },
                                    { src: "/images/factory-pictures/smt.jpeg", alt: "Electronics" },
                                    { src: "/images/factory-pictures/keys.jpeg", alt: "Premium Keys" },
                                    { src: "/images/factory-pictures/assembly.jpeg", alt: "Dedicated Assembly" },
                                ].map((img) => (
                                    <div key={img.alt} className={`overflow-hidden border border-white/10 group ${img.span || ""}`}>
                                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={300} className="text-center">
                            <Link href="/production-timeline" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90">
                                Click here for more details
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 8 — SOCIAL PROOF
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#050505] text-white py-24 md:py-32 text-center border-t border-white/10">
                    <div className="container mx-auto max-w-4xl px-6">
                        <AnimatedSection>
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8">Community</p>
                            <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-16">
                                <div className="border border-white/10 bg-white/[0.03] p-10 hover:border-white/20 transition-all">
                                    <div className="font-serif text-6xl md:text-7xl font-bold text-amber-400 mb-3">120k</div>
                                    <p className="font-sans text-sm font-bold uppercase tracking-widest text-white/50">Reserved so far</p>
                                </div>
                                <div className="border border-white/10 bg-white/[0.03] p-10 hover:border-white/20 transition-all">
                                    <div className="font-serif text-6xl md:text-7xl font-bold text-white mb-3">300+</div>
                                    <p className="font-sans text-sm font-bold uppercase tracking-widest text-white/50">Confirmed reservations (paid in full)</p>
                                </div>
                            </div>
                            <p className="font-serif text-2xl md:text-4xl italic text-white/80 max-w-3xl mx-auto leading-relaxed">
                                Join the revolution of pianists escaping hand strain forever.
                            </p>
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 9 — MSRP ANCHOR
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#0a0a0f] text-white py-32 md:py-40 text-center border-t border-white/10">
                    <div className="container mx-auto max-w-4xl px-6">
                        <AnimatedSection>
                            <p className="font-sans text-lg md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Here&apos;s how much DreamPlay One will cost once our product is officially released:
                            </p>
                            <h2 className="font-serif text-[7rem] md:text-[12rem] font-bold text-white leading-none tracking-tight">
                                $1099
                            </h2>
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 10 — PATTERN INTERRUPT
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-white text-black py-32 md:py-40 text-center flex flex-col items-center justify-center min-h-[60vh]">
                    <AnimatedSection className="flex flex-col items-center">
                        <h2 className="font-black text-6xl md:text-9xl uppercase tracking-tighter italic">BUT WAIT...</h2>
                        <div className="mt-12 animate-bounce">
                            <ChevronDown className="w-10 h-10 text-black/40" />
                        </div>
                    </AnimatedSection>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 11 — THE OFFER ($699)
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#050505] text-white py-32 md:py-40 text-center border-t border-white/10">
                    <div className="container mx-auto max-w-4xl px-6">
                        <AnimatedSection>
                            <p className="font-serif text-2xl md:text-3xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
                                You can lock in our exclusive limited introductory price of just <strong className="text-white">$699</strong> for the keyboard TODAY for...
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8">
                                <span className="font-serif text-5xl md:text-7xl text-red-500 line-through opacity-60">$1099</span>
                                <span className="font-serif text-7xl md:text-9xl font-bold text-emerald-400 drop-shadow-[0_0_40px_rgba(52,211,118,0.4)]">$699</span>
                            </div>
                            <div className="inline-flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/10 px-6 py-2.5 rounded-full">
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-emerald-400 font-bold">Reservation Price Today</span>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 12 — THE DEPOSIT ($99)
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#0a0a0f] text-white py-32 md:py-40 text-center border-t border-white/10">
                    <div className="container mx-auto max-w-4xl px-6">
                        <AnimatedSection>
                            <p className="font-serif text-3xl md:text-5xl text-white/60 mb-6">...for the tiny deposit of</p>
                            <h2 className="font-serif text-[8rem] md:text-[12rem] font-bold leading-none text-white mb-8">$99</h2>
                            <p className="font-sans text-sm md:text-base text-white/50 uppercase tracking-widest">(Pay the rest when your keyboard is ready to ship)</p>
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 13 — RISK REVERSAL
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-white text-black py-24 md:py-32 border-t border-neutral-200">
                    <div className="container mx-auto max-w-4xl px-6">
                        <AnimatedSection className="text-center">
                            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
                                {["Full Refund", "Cancel Anytime", "90 Day Trial", "No Risk", "Free Shipping"].map(badge => (
                                    <span key={badge} className="border border-neutral-200 bg-neutral-50 px-5 py-2.5 text-[10px] md:text-xs uppercase tracking-widest font-bold shadow-sm">{badge}</span>
                                ))}
                            </div>
                            <h2 className="font-serif text-3xl md:text-5xl max-w-5xl mx-auto leading-relaxed mb-10">
                                <strong className="text-amber-500 block mb-4 text-4xl md:text-6xl">Our promise:</strong>
                                When we are ready to ship to you, we will reach out to confirm with you, your exact shipping address. At this point, you may cancel and get a <strong>100% full refund (no fees)</strong> if you changed your mind.
                            </h2>
                            <Link href="/information-and-policies/shipping" target="_blank" className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">
                                Our full shipping &amp; taxes policy here
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 14 — FOUNDER & TESTIMONIAL QUOTES
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#050505] text-white py-24 md:py-32 border-t border-white/10">
                    <div className="container mx-auto max-w-4xl px-6">
                        <AnimatedSection className="text-center mb-16">
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Voices</p>
                            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-white">From Our Community</h2>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 gap-8">
                            <AnimatedSection className="border border-white/10 bg-[#0a0a0f] p-8 md:p-12 text-center">
                                <img src="/images/marketing/carnegie-hall-performance.png" className="w-24 h-24 rounded-full object-cover mx-auto mb-8 border-2 border-white/20" alt="Lionel Yu" />
                                <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-white/90 mb-8">
                                    &quot;I watched enough of my students struggle, both adults and children, that I want to make this keyboard for them. To show them what is possible when the piano finally fits one&apos;s hands.&quot;
                                </blockquote>
                                <cite className="font-sans text-sm uppercase tracking-widest text-white/50 not-italic font-bold">Lionel Yu, Founder</cite>
                            </AnimatedSection>

                            <AnimatedSection delay={200} className="border border-white/10 bg-[#0a0a0f] p-8 md:p-12 text-center">
                                <div className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-8 text-4xl border-2 border-white/20">🎹</div>
                                <blockquote className="font-serif text-lg md:text-xl leading-relaxed text-white/90 mb-8">
                                    &quot;Everything is easier for me... I feel very comfortable playing scales, fast passages, or big chords.&quot;
                                </blockquote>
                                <cite className="font-sans text-sm uppercase tracking-widest text-white/50 not-italic font-bold">Claudia Wang, Pianist</cite>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 15 — PRIMARY CTA
                ═══════════════════════════════════════════════════════════ */}
                <section className="relative overflow-hidden w-full bg-gradient-to-b from-[#050505] via-[#0a0f1a] to-[#050505] text-white py-32 md:py-40 text-center border-t border-white/10">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
                    <div className="container relative z-10 mx-auto max-w-3xl px-6">
                        <AnimatedSection>
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6">Take the Next Step</p>
                            <h2 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight mb-12 text-white">Ready to take the next step?</h2>
                            <Link href="/customize" className="group inline-flex items-center justify-center gap-3 border border-white bg-white px-10 py-6 font-sans text-sm md:text-base font-black uppercase tracking-widest text-black transition-all hover:bg-neutral-200 shadow-[0_0_40px_rgba(255,255,255,0.15)] w-full max-w-2xl">
                                Order Your DreamPlay One
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <p className="mt-6 text-white/50 uppercase tracking-widest text-xs font-bold">Receive it by August 2026.</p>
                            <UrgencySubtext className="mt-4" />
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 16 — FAQ / CONTACT
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#050505] text-white py-24 md:py-32 text-center border-t border-white/10">
                    <div className="container mx-auto max-w-3xl px-6">
                        <AnimatedSection>
                            <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white">Still have questions?</h2>
                            <p className="text-white/60 font-sans max-w-2xl mx-auto text-base md:text-lg mb-12 leading-relaxed">
                                If you truly believe that this keyboard will change your piano playing experience, please tell us your story. We want to deliver your dream keyboard.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/information-and-policies/faq" target="_blank" className="border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                                    Visit FAQ
                                </Link>
                                <Link href="/contact" target="_blank" className="group inline-flex items-center justify-center gap-2 border border-white bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black transition-colors hover:bg-white/90">
                                    Contact Us Here
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 17 — BUYERS GUIDE & FOOTER
                ═══════════════════════════════════════════════════════════ */}
                <section className="w-full bg-[#0a0a0f] text-white py-24 md:py-32 text-center border-t border-white/10">
                    <div className="container mx-auto max-w-3xl px-6 mb-16">
                        <AnimatedSection>
                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6">Resources</p>
                            <h2 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight mb-12 text-white">Visit our buyers guide</h2>
                            <div className="flex gap-4 flex-wrap justify-center">
                                <Link href="/buyers-guide" target="_blank" className="border border-white/20 bg-white/10 px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors">
                                    Adult Pianists
                                </Link>
                                <Link href="/buyers-guide" target="_blank" className="border border-white/20 bg-white/10 px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors">
                                    Child Pianists
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
