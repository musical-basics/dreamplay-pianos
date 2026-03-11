"use client"

import { Playfair_Display, Inter } from "next/font/google"
import Footer from "@/components/Footer"
import { useState, useEffect } from "react"
import {
    Check,
    Star,
    ShieldCheck,
    Truck,
    Undo2,
    ChevronDown,
    X,
    Brain,
    Ruler,
    Heart,
} from "lucide-react"

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
})

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

/* ---------- DATA ---------- */

const BENEFITS = [
    "Relaxed reach — play a 10th comfortably",
    "Zero strain on fast passages & big jumps",
    "Built specifically for your hand size",
]

const BUNDLES = [
    {
        qty: "73‑key",
        label: "Portable Model",
        price: "$1,899",
        compare: "$2,199",
        badge: null,
    },
    {
        qty: "88‑key",
        label: "Most Popular",
        price: "$2,499",
        compare: "$2,799",
        badge: "Most Popular",
    },
    {
        qty: "88‑key Studio",
        label: "Best Value",
        price: "$2,999",
        compare: "$3,499",
        badge: "Best Value",
    },
]

const TRUST_ICONS = [
    { icon: ShieldCheck, label: "10‑Year Warranty" },
    { icon: Undo2, label: "30‑Day Returns" },
    { icon: Truck, label: "Free Shipping" },
]

const REVIEWS = [
    {
        name: "Sarah J.",
        text: '"I can finally play Rachmaninoff without feeling like my hand is tearing apart. The 5.5‑inch octave is life‑changing."',
    },
    {
        name: "David M.",
        text: '"My students progress so much faster when they aren\'t fighting the instrument. Every studio needs a DreamPlay."',
    },
    {
        name: "Elena R.",
        text: '"The build quality is incredible, but the narrower keys are the real magic. My tendinitis disappeared in weeks."',
    },
]

const FAQS = [
    {
        icon: Brain,
        q: "Why DreamPlay One Is Different",
        a: "Most keyboards force every hand size onto the same 6.5‑inch octave, causing tension, missed notes, and injury. DreamPlay One offers scientifically‑sized DS5.5® and DS6.0® standards so you play with a naturally relaxed hand — no compromise.",
    },
    {
        icon: Ruler,
        q: "What's the difference between DS5.5 and DS6.0?",
        a: "DS5.5 features a 5.5‑inch octave span ideal for smaller hands. DS6.0 offers a 6.0‑inch octave for average‑sized hands wanting improved comfort. Use our online hand‑size guide to choose.",
    },
    {
        icon: Heart,
        q: "Will I have trouble adapting?",
        a: "Most pianists adapt within minutes. Playing on narrower keys can actually improve your geographic awareness when you return to a standard keyboard.",
    },
]

const COMPARISON = [
    ["Ergonomic Key Width", false, true],
    ["Reduced Injury Risk", false, true],
    ["Premium Wooden Keys", true, true],
    ["MIDI / USB‑C Output", true, true],
    ["10‑Year Warranty", false, true],
    ["Multiple Key Sizes", false, true],
] as const

/* ---------- COMPONENT ---------- */

export default function LandingPage1() {
    const [selectedBundle, setSelectedBundle] = useState(1)
    const [showSticky, setShowSticky] = useState(false)
    const [activeReview, setActiveReview] = useState(0)

    /* Sticky bar on scroll */
    useEffect(() => {
        const onScroll = () => setShowSticky(window.scrollY > 600)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    /* Auto‑rotate reviews */
    useEffect(() => {
        const t = setInterval(
            () => setActiveReview((p) => (p + 1) % REVIEWS.length),
            5000
        )
        return () => clearInterval(t)
    }, [])

    return (
        <div
            className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-stone-50 text-stone-900`}
        >
            {/* ── ANNOUNCEMENT BAR ── */}
            <div className="bg-black text-white text-center py-2.5 text-sm font-semibold tracking-wider">
                <span className="text-amber-400">NEW RELEASE</span> — Get your
                DreamPlay One with{" "}
                <span className="underline decoration-amber-400">$300 off</span>
            </div>

            {/* ── HEADER ── */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div
                        className="font-serif text-2xl font-bold tracking-tight"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        DreamPlay
                    </div>
                    <a
                        href="#pricing"
                        className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-stone-800 transition-colors"
                    >
                        Get Yours Now
                    </a>
                </div>
            </header>

            <main>
                {/* ═══════════════════════════════════════════════════
                    HERO  (NightSeal‑style PDP split layout)
                ═══════════════════════════════════════════════════ */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 grid md:grid-cols-2 gap-10 md:gap-14 items-start">
                    {/* Left: Product image */}
                    <div className="flex justify-center">
                        <img
                            src="https://a.storyblok.com/f/256972/4500x3000/1e07cbca12/piano_2.png/m/1000x0"
                            alt="DreamPlay One Keyboard"
                            className="w-full max-w-lg rounded-2xl shadow-xl object-cover aspect-[4/3]"
                        />
                    </div>

                    {/* Right: Product details */}
                    <div className="space-y-5">
                        {/* Stars */}
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                            <span className="text-stone-500 text-sm ml-2">
                                4.9/5 from 300+ Pianists
                            </span>
                        </div>

                        {/* Title */}
                        <h1
                            className="text-3xl md:text-4xl font-bold leading-tight"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            DreamPlay One
                        </h1>

                        {/* Price */}
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-black">
                                {BUNDLES[selectedBundle].price}
                            </span>
                            <span className="text-stone-400 line-through text-lg mb-0.5">
                                {BUNDLES[selectedBundle].compare}
                            </span>
                            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full mb-1">
                                SAVE $300
                            </span>
                        </div>

                        {/* Benefit checks */}
                        <div className="space-y-2.5">
                            {BENEFITS.map((b, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-stone-100 rounded-lg px-4 py-2.5 text-sm"
                                >
                                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                                    <span>{b}</span>
                                </div>
                            ))}
                        </div>

                        {/* Bundle selector */}
                        <div className="pt-2 space-y-3">
                            <h3 className="text-xs font-bold tracking-widest text-stone-400 uppercase">
                                Choose Your Model
                            </h3>
                            {BUNDLES.map((b, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedBundle(i)}
                                    className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-3 transition-all text-left relative ${selectedBundle === i
                                            ? "border-black bg-white shadow-sm"
                                            : "border-stone-200 bg-stone-50 hover:border-stone-300"
                                        }`}
                                >
                                    {b.badge && (
                                        <span className="absolute -top-2.5 left-4 bg-black text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                            {b.badge}
                                        </span>
                                    )}
                                    <div>
                                        <span className="font-bold text-sm">
                                            {b.qty}
                                        </span>
                                        <span className="text-stone-500 text-sm ml-2">
                                            {b.label}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold">
                                            {b.price}
                                        </span>
                                        <span className="text-stone-400 line-through text-sm ml-2">
                                            {b.compare}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* CTA */}
                        <a
                            href="/checkout"
                            className="block w-full text-center bg-black text-white py-4 rounded-full text-lg font-bold hover:bg-stone-800 transition-colors shadow-lg shadow-black/15 mt-2"
                        >
                            Add to Cart — {BUNDLES[selectedBundle].price}
                        </a>

                        {/* Trust icons row */}
                        <div className="flex items-center justify-center gap-8 pt-2">
                            {TRUST_ICONS.map(({ icon: Icon, label }, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 text-stone-500"
                                >
                                    <Icon className="w-5 h-5 text-amber-600" />
                                    <span className="text-xs font-semibold">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    TESTIMONIAL CAROUSEL  (NightSeal review slider)
                ═══════════════════════════════════════════════════ */}
                <section className="bg-stone-100 py-10">
                    <div className="max-w-2xl mx-auto px-4 text-center">
                        <div className="bg-white rounded-2xl p-8 shadow-sm min-h-[160px] flex flex-col items-center justify-center relative">
                            <div className="flex text-yellow-400 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        className="w-4 h-4 fill-current"
                                    />
                                ))}
                            </div>
                            <p className="text-stone-700 italic text-lg leading-relaxed mb-4 transition-opacity duration-300">
                                {REVIEWS[activeReview].text}
                            </p>
                            <p className="text-stone-900 font-bold text-sm">
                                {REVIEWS[activeReview].name}
                            </p>
                        </div>
                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-5">
                            {REVIEWS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveReview(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${activeReview === i
                                            ? "bg-stone-800 scale-125"
                                            : "bg-stone-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    PROBLEM / SOLUTION
                ═══════════════════════════════════════════════════ */}
                <section className="py-20 px-4 max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Why standard keyboards hold you back.
                        </h2>
                        <p className="text-lg text-stone-500 max-w-2xl mx-auto">
                            For over a century, the 6.5‑inch octave has favored
                            large hands. If you have average or smaller hands,
                            you're fighting the instrument — not just learning the
                            music.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Standard */}
                        <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                            <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
                                <span className="bg-red-200 text-red-700 p-1.5 rounded-full">
                                    <X className="w-5 h-5" />
                                </span>
                                Standard Keys
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Tension and pain reaching 8ths or 9ths",
                                    "Missed notes & reduced accuracy during jumps",
                                    "Increased risk of piano‑related injuries (RSI)",
                                ].map((t, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-red-800/80"
                                    >
                                        <X className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* DreamPlay */}
                        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
                            <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                                <span className="bg-emerald-200 text-emerald-700 p-1.5 rounded-full">
                                    <Check className="w-5 h-5" />
                                </span>
                                DreamPlay One
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Easily reach a 9th or 10th with a relaxed hand",
                                    "Improved accuracy & vastly better technical control",
                                    "Play for hours without tension, fatigue, or pain",
                                ].map((t, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-emerald-800/80"
                                    >
                                        <Check className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    HOW IT WORKS
                ═══════════════════════════════════════════════════ */}
                <section className="bg-stone-900 text-white py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2
                                className="text-3xl md:text-4xl font-bold mb-4"
                                style={{
                                    fontFamily: "var(--font-playfair)",
                                }}
                            >
                                Hand‑crafted for your anatomy.
                            </h2>
                            <p className="text-lg text-stone-400 max-w-2xl mx-auto">
                                The DreamPlay One features DS5.5® and DS6.0®
                                standard sizes, scientifically proven to
                                accommodate a wider range of hand sizes.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 text-center">
                            {[
                                {
                                    step: "1",
                                    title: "Measure Your Hand",
                                    desc: "Use our online size guide to find your ideal keyboard width — 5.5″ or 6.0″ octave.",
                                },
                                {
                                    step: "2",
                                    title: "Choose Your Model",
                                    desc: "Select the portable 73‑key or the full 88‑key studio model.",
                                },
                                {
                                    step: "3",
                                    title: "Play with Freedom",
                                    desc: "Experience music exactly as the composers intended — without physical limits.",
                                },
                            ].map((s, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-2xl font-bold mb-6 ring-2 ring-stone-700">
                                        {s.step}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">
                                        {s.title}
                                    </h3>
                                    <p className="text-stone-400">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    COMPARISON TABLE
                ═══════════════════════════════════════════════════ */}
                <section className="py-20 px-4 max-w-4xl mx-auto">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        The DreamPlay Difference
                    </h2>

                    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                        <div className="grid grid-cols-3 p-5 bg-stone-50 border-b border-stone-100 font-bold text-sm">
                            <div>Features</div>
                            <div className="text-center text-stone-400">
                                Standard
                            </div>
                            <div className="text-center text-amber-700">
                                DreamPlay One
                            </div>
                        </div>

                        {COMPARISON.map(([feature, std, dp], i) => (
                            <div
                                key={i}
                                className={`grid grid-cols-3 px-5 py-4 text-sm items-center ${i % 2 === 0 ? "bg-white" : "bg-stone-50/50"
                                    }`}
                            >
                                <div className="font-medium text-stone-700">
                                    {feature}
                                </div>
                                <div className="flex justify-center">
                                    {std ? (
                                        <Check className="text-stone-300 w-5 h-5" />
                                    ) : (
                                        <X className="text-stone-300 w-5 h-5" />
                                    )}
                                </div>
                                <div className="flex justify-center">
                                    {dp ? (
                                        <Check className="text-amber-600 w-6 h-6" />
                                    ) : (
                                        <X className="text-stone-300 w-5 h-5" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    MORE TESTIMONIALS
                ═══════════════════════════════════════════════════ */}
                <section className="bg-amber-50 py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2
                            className="text-3xl md:text-4xl font-bold text-center mb-16 text-amber-950"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Join hundreds of pianists who upgraded.
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    name: "Sarah J.",
                                    role: "Concert Pianist",
                                    quote: "I can finally play Rachmaninoff without feeling like my hand is tearing. The 5.5‑inch octave changed my life.",
                                },
                                {
                                    name: "David M.",
                                    role: "Piano Teacher",
                                    quote: "My students progress so much faster when they aren't fighting the instrument. Every studio needs one.",
                                },
                                {
                                    name: "Elena R.",
                                    role: "Amateur Pianist",
                                    quote: "The build quality is incredible, but the narrower keys are the real magic. My tendinitis disappeared in weeks.",
                                },
                            ].map((r, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-8 rounded-2xl shadow-sm"
                                >
                                    <div className="flex text-yellow-400 mb-4">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                className="w-4 h-4 fill-current"
                                            />
                                        ))}
                                    </div>
                                    <h4 className="font-bold text-lg mb-1">
                                        {r.name}
                                    </h4>
                                    <p className="text-sm text-stone-500 mb-4">
                                        {r.role}
                                    </p>
                                    <p className="text-stone-700 italic">
                                        &ldquo;{r.quote}&rdquo;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    ACCORDION FAQ  (NightSeal‑style)
                ═══════════════════════════════════════════════════ */}
                <section className="py-20 px-4 max-w-3xl mx-auto">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <div className="divide-y divide-stone-200 border-t border-stone-200">
                        {FAQS.map((faq, i) => (
                            <details
                                key={i}
                                className="group [&_summary::-webkit-details-marker]:hidden"
                            >
                                <summary className="flex cursor-pointer items-center gap-4 py-5 text-stone-900 font-medium select-none">
                                    <faq.icon className="w-5 h-5 text-amber-600 shrink-0" />
                                    <span className="flex-1 text-lg">
                                        {faq.q}
                                    </span>
                                    <ChevronDown className="w-5 h-5 text-stone-400 transition-transform duration-300 group-open:rotate-180" />
                                </summary>
                                <div className="pb-5 pl-9 pr-4 text-stone-600 leading-relaxed">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    PRICING CTA
                ═══════════════════════════════════════════════════ */}
                <section
                    id="pricing"
                    className="bg-stone-900 text-white py-24 px-4"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <h2
                            className="text-4xl md:text-5xl font-bold mb-6"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Ready to free your hands?
                        </h2>
                        <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
                            Join the revolution and experience the piano as it
                            was meant to be played.
                        </p>

                        <div className="bg-stone-800 rounded-3xl p-8 md:p-12 mb-8 max-w-lg mx-auto border border-stone-700">
                            <h3 className="text-2xl font-bold text-amber-500 mb-2">
                                DreamPlay One (88‑key)
                            </h3>
                            <div className="flex justify-center items-end gap-3 mb-8">
                                <span className="text-5xl font-black">
                                    $2,499
                                </span>
                                <span className="text-stone-500 line-through text-xl font-medium mb-1">
                                    $2,799
                                </span>
                            </div>

                            <ul className="text-left space-y-4 mb-10 w-full max-w-sm mx-auto">
                                {[
                                    "Premium wooden key action",
                                    "Choice of DS5.5 or DS6.0",
                                    "Free worldwide shipping",
                                    "30‑day money‑back guarantee",
                                ].map((f, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3"
                                    >
                                        <Check className="text-amber-500 w-5 h-5 shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="/checkout"
                                className="block w-full bg-white text-black py-4 rounded-full text-lg font-bold hover:bg-amber-500 hover:text-white transition-colors duration-300"
                            >
                                Secure Yours Today
                            </a>
                        </div>
                        <p className="text-stone-500 text-sm flex items-center justify-center gap-2">
                            <Truck className="w-4 h-4" /> Secure checkout. Ships
                            within 48 hours.
                        </p>
                    </div>
                </section>
            </main>

            {/* ── STICKY ATC BAR  (NightSeal‑style) ── */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,.08)] transition-transform duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="hidden sm:block">
                        <h4 className="font-bold text-sm">DreamPlay One</h4>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-amber-700">
                                $2,499
                            </span>
                            <span className="text-stone-400 line-through text-xs">
                                $2,799
                            </span>
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                SAVE $300
                            </span>
                        </div>
                    </div>
                    <a
                        href="/checkout"
                        className="flex-1 sm:flex-none text-center bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-stone-800 transition-colors"
                    >
                        Add to Cart
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    )
}
