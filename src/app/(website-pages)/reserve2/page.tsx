"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import { ArrowRight, Loader2 } from "lucide-react";
import { subscribeToNewsletter } from "@/actions/email-actions";
import { UrgencySubtext } from "@/components/UrgencySubtext";
import { AnimatedSection } from "@/components/animated-section";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/* ─── Premium Timeline ─── */
const Timeline = () => (
    <AnimatedSection delay={200} className="w-full max-w-4xl mx-auto mb-16">
        <div className="border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-8 text-center">Production Schedule</p>

            {/* Desktop horizontal */}
            <div className="hidden md:flex items-start justify-between relative">
                {/* Connecting line */}
                <div className="absolute top-[18px] left-[60px] right-[60px] h-[2px] bg-white/10" />
                <div className="absolute top-[18px] left-[60px]" style={{ width: 'calc(50% - 60px)', height: '2px', background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(251,191,36,0.4) 100%)' }} />

                {/* Node 1 — Past */}
                <div className="relative z-10 flex flex-col items-center text-center w-1/3">
                    <div className="w-9 h-9 rounded-full bg-white/10 border-2 border-white/20 mb-4 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white/30" />
                    </div>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-white/40">1st Batch</span>
                    <span className="font-sans text-[10px] text-white/30 mt-1">July Shipping</span>
                    <span className="mt-2 inline-flex items-center px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-red-400 border border-red-400/20 bg-red-400/10">
                        Full (150)
                    </span>
                </div>

                {/* Node 2 — Active */}
                <div className="relative z-10 flex flex-col items-center text-center w-1/3">
                    <div className="absolute -top-8 text-amber-400 animate-bounce text-lg">👇</div>
                    <div className="w-12 h-12 rounded-full bg-amber-400/20 border-2 border-amber-400 mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                        <div className="w-4 h-4 rounded-full bg-amber-400" />
                    </div>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-amber-400">Order Today</span>
                    <span className="font-sans text-[10px] text-amber-400/70 mt-1">August Shipping</span>
                </div>

                {/* Node 3 — Future */}
                <div className="relative z-10 flex flex-col items-center text-center w-1/3">
                    <div className="w-9 h-9 rounded-full bg-white/10 border-2 border-white/20 mb-4 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white/30" />
                    </div>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-white/40">2nd Batch</span>
                    <span className="font-sans text-[10px] text-white/30 mt-1">December Shipping</span>
                </div>
            </div>

            {/* Mobile vertical */}
            <div className="flex md:hidden flex-col items-center gap-8 relative">
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/10" />

                <div className="relative z-10 flex flex-col items-center text-center opacity-50">
                    <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-white/20 mb-3 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                    </div>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-white/50">1st Batch (July)</span>
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-1">FULL (150)</span>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center scale-110">
                    <div className="absolute -top-7 text-amber-400 animate-bounce text-lg">👇</div>
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 border-2 border-amber-400 mb-3 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.4)]">
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                    </div>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-amber-400">Order Today</span>
                    <span className="font-sans text-[10px] text-amber-400/70 mt-1">(August Shipping)</span>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center opacity-50">
                    <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-white/20 mb-3 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                    </div>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-white/50">2nd Batch (Dec)</span>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

export default function Reserve2Page() {
    const [emailOpen, setEmailOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleThinkAboutIt = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setEmailStatus("loading");
        await subscribeToNewsletter({ email, tags: ["Hesitated at Checkout"] });
        setEmailStatus("success");
    };

    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased min-h-screen selection:bg-white/20 bg-[#050505] text-white`}>
            {/* Minimal header — just logo, no nav links */}
            <header className="fixed top-0 w-full p-6 z-50 flex justify-center bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent pointer-events-none">
                <Link href="/intro-offer2" className="pointer-events-auto">
                    <img src="/images/logos/DreamPlay Logo White.png" alt="DreamPlay" className="h-6 hover:opacity-80 transition-opacity" />
                </Link>
            </header>

            <main className="pt-[72px]">
                {/* ═══════════════════════════════════════════════════════════
                    SECTION 1 — THE PITCH & TIMELINE
                ═══════════════════════════════════════════════════════════ */}
                <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 py-20">
                    <AnimatedSection className="flex flex-col items-center">
                        <p className="inline-flex items-center gap-2 border border-amber-400/30 bg-amber-400/10 px-4 py-2 mb-8 text-amber-400 font-sans text-[10px] uppercase tracking-[0.3em] font-bold">
                            Eliminate strain forever.
                        </p>
                        <h1 className="font-serif text-[7rem] md:text-[11rem] font-bold leading-none mb-4 tracking-tight">$99.</h1>
                        <p className="text-xl md:text-3xl text-white/60 mb-12 font-serif">Pay the rest ($600) when we ship.</p>

                        <p className="max-w-xl text-white/70 leading-relaxed mb-16 text-sm md:text-base font-sans">
                            Lock in your DreamPlay keyboard reservation now. Earlier backers receive their keyboards first.
                        </p>
                    </AnimatedSection>

                    <Timeline />

                    <AnimatedSection delay={400} className="flex flex-col items-center">
                        <button
                            onClick={() => document.getElementById('final-commit')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group inline-flex items-center justify-center gap-3 border border-white bg-white px-10 py-6 font-sans text-sm md:text-base font-black uppercase tracking-widest text-black transition-all hover:bg-neutral-200 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                        >
                            Next Step <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </AnimatedSection>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 2 — FINAL COMMIT
                ═══════════════════════════════════════════════════════════ */}
                <section id="final-commit" className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-[#0a0a0f] border-t border-white/10">
                    <AnimatedSection className="w-full max-w-4xl mx-auto flex flex-col items-center">
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6">Final Step</p>
                        <h2 className="font-serif text-3xl md:text-5xl max-w-4xl leading-tight mb-6 font-semibold tracking-tight">
                            This reservation is for all sizes and colors of the DreamPlay One keyboard.
                        </h2>
                        <p className="text-white/60 text-sm md:text-lg max-w-2xl mb-16 leading-relaxed font-sans">
                            You will receive a Step by Step &quot;Customize your DreamPlay Keyboard Configuration&quot; Link immediately following your successful reservation.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mb-8">
                            {/* Primary CTA */}
                            <a
                                href="https://dreamplay-pianos.myshopify.com/cart/clear?return_to=%2Fcart%2F52213397291322%3A1%3Fnote%3Dcheckout_source%3Areserve_page"
                                className="flex-1 flex items-center justify-center gap-3 bg-amber-400 text-black py-6 px-6 font-sans text-sm md:text-base font-black uppercase tracking-widest hover:bg-amber-300 transition-colors shadow-[0_0_30px_rgba(251,191,36,0.25)]"
                            >
                                YES I WANT TO PURCHASE NOW
                                <ArrowRight className="h-5 w-5" />
                            </a>

                            {/* Secondary CTA */}
                            {!emailOpen ? (
                                <button
                                    onClick={() => setEmailOpen(true)}
                                    className="flex-1 border border-white/20 bg-white/[0.03] text-white py-6 px-6 font-sans text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                                >
                                    LET ME THINK ABOUT IT
                                </button>
                            ) : emailStatus === "success" ? (
                                <div className="flex-1 flex items-center justify-center border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 py-6 px-6 font-sans text-xs font-bold uppercase tracking-widest">
                                    ✓ Saved! Check your inbox.
                                </div>
                            ) : (
                                <form onSubmit={handleThinkAboutIt} className="flex-1 flex border border-white/20 bg-[#050505] p-1">
                                    <input
                                        type="email"
                                        placeholder="Enter email to save spot"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-transparent text-white px-4 py-4 outline-none w-full text-sm font-sans placeholder:text-white/30"
                                    />
                                    <button
                                        type="submit"
                                        disabled={emailStatus === "loading"}
                                        className="bg-white text-black px-6 font-sans text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shrink-0 flex items-center justify-center min-w-[100px]"
                                    >
                                        {emailStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Spot"}
                                    </button>
                                </form>
                            )}
                        </div>

                        <UrgencySubtext className="mb-12" />

                        {/* Social Proof Quote */}
                        <div className="border-t border-white/10 pt-10 mt-4 w-full max-w-2xl">
                            <blockquote className="font-serif text-base md:text-lg italic text-white/50 leading-relaxed">
                                &quot;Everything is easier for me... I feel very comfortable playing scales, fast passages, or big chords.&quot;
                            </blockquote>
                            <p className="font-sans font-bold uppercase tracking-widest text-[10px] text-white/40 mt-4">— Claudia Wang, Pianist</p>
                        </div>
                    </AnimatedSection>
                </section>
            </main>
        </div>
    );
}
