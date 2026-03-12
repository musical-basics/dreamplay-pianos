"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { Playfair_Display, Inter } from "next/font/google";
import { subscribeToNewsletter } from "@/actions/email-actions";
import { UrgencySubtext } from "@/components/UrgencySubtext";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Timeline = () => (
    <div className="w-full max-w-3xl flex flex-col md:flex-row items-center justify-between relative gap-6 md:gap-0 mb-16 px-4">
        <div className="hidden md:block absolute top-[10px] left-0 right-0 h-1 bg-white/10 -z-10 rounded-full" />

        <div className="relative z-10 flex flex-col items-center opacity-40 text-center">
            <div className="w-4 h-4 rounded-full bg-white mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-widest">1st Batch (July)</span>
            <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-1">FULL (150)</span>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center scale-110">
            <div className="absolute -top-10 text-amber-400 animate-bounce text-2xl">👇</div>
            <div className="w-6 h-6 rounded-full bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)] mb-2" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Order Today</span>
            <span className="text-[10px] uppercase tracking-widest text-amber-400/70 mt-1">(August Shipping)</span>
        </div>

        <div className="relative z-10 flex flex-col items-center opacity-40 text-center">
            <div className="w-4 h-4 rounded-full bg-white mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-widest">2nd Batch (Dec)</span>
        </div>
    </div>
);

export default function ReservePage() {
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
        <div className={`${playfair.variable} ${inter.variable} bg-[#050505] text-white font-sans antialiased h-[100dvh] w-full overflow-hidden relative`}>
            <header className="absolute top-0 w-full p-6 z-50 flex justify-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Link href="/intro-offer" className="pointer-events-auto">
                    <img src="/images/DreamPlay Logo White.png" alt="DreamPlay" className="h-6" />
                </Link>
            </header>

            <main className="h-[100dvh] w-full overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth pt-[72px]">

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 1 — The Pitch & Timeline
            ══════════════════════════════════════════════════════════════════ */}
                <section className="h-[100dvh] w-full shrink-0 snap-start snap-always relative flex flex-col justify-center items-center text-center px-6">
                    <p className="text-amber-400 uppercase tracking-widest text-sm font-bold mb-4">Eliminate strain forever.</p>
                    <h1 className="font-serif text-[8rem] md:text-[12rem] font-bold leading-none mb-2">$99.</h1>
                    <p className="text-xl md:text-3xl text-white/70 mb-12 font-serif">Pay the rest ($600) when we ship.</p>

                    <p className="max-w-xl text-white/80 leading-relaxed mb-12 text-sm md:text-base">
                        Lock in your DreamPlay keyboard reservation now. Earlier backers receive their keyboards first.
                    </p>

                    <Timeline />

                    <button
                        onClick={() => document.getElementById('slide-2')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-white text-black px-12 py-5 uppercase tracking-widest font-black text-sm md:text-lg hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl"
                    >
                        Next Step <ArrowRight size={20} />
                    </button>
                </section>

                {/* ══════════════════════════════════════════════════════════════════
            SLIDE 2 — Final Commit & Analytics
            ══════════════════════════════════════════════════════════════════ */}
                <section id="slide-2" className="h-[100dvh] w-full shrink-0 snap-start snap-always relative flex flex-col justify-center items-center text-center px-6 bg-neutral-900 border-t border-white/10">
                    <h2 className="font-serif text-3xl md:text-5xl max-w-4xl leading-tight mb-6 text-balance font-bold">
                        This reservation is for all sizes and colors of the DreamPlay One keyboard.
                    </h2>
                    <p className="text-white/60 text-sm md:text-lg max-w-2xl mb-12 leading-relaxed">
                        You will receive a Step by Step &quot;Customize your DreamPlay Keyboard Configuration&quot; Link immediately following your successful reservation.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mb-8">
                        <a
                            href="https://dreamplay-pianos.myshopify.com/cart/clear?return_to=%2Fcart%2F52213397291322%3A1%3Fnote%3Dcheckout_source%3Areserve_page"
                            className="flex-1 bg-amber-400 text-black py-6 px-4 text-sm md:text-base font-black uppercase tracking-widest hover:bg-amber-300 transition-colors shadow-[0_0_30px_rgba(251,191,36,0.3)] flex items-center justify-center text-center"
                        >
                            YES I WANT TO PURCHASE NOW
                        </a>

                        {!emailOpen ? (
                            <button
                                onClick={() => setEmailOpen(true)}
                                className="flex-1 border border-white/30 bg-transparent text-white py-6 px-4 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                            >
                                LET ME THINK ABOUT IT
                            </button>
                        ) : emailStatus === "success" ? (
                            <div className="flex-1 flex items-center justify-center border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 py-6 px-4 text-xs font-bold uppercase tracking-widest">
                                Saved! Check your inbox.
                            </div>
                        ) : (
                            <form onSubmit={handleThinkAboutIt} className="flex-1 flex border border-white/30 p-1 bg-black">
                                <input
                                    type="email"
                                    placeholder="Enter email to save spot"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-transparent text-white px-4 py-4 outline-none w-full text-sm"
                                />
                                <button type="submit" disabled={emailStatus === "loading"} className="bg-white text-black px-6 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shrink-0 flex items-center justify-center min-w-[100px]">
                                    {emailStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Spot"}
                                </button>
                            </form>
                        )}
                    </div>

                    <UrgencySubtext className="mb-12" />

                    <p className="text-xs text-white/40 italic font-serif mt-8 absolute bottom-8 px-6">
                        &quot;Everything is easier for me... I feel very comfortable playing scales, fast passages, or big chords.&quot;
                        <span className="font-sans font-bold uppercase tracking-widest not-italic mt-2 block text-[10px] text-white/60">— Claudia Wang</span>
                    </p>
                </section>

            </main>
        </div>
    );
}
