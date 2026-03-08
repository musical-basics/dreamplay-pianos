"use client"

import Image from "next/image"

export function HandComparisonSection() {
    return (
        <section className="relative bg-white">
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <p className="font-sans text-sm uppercase tracking-[0.3em] text-neutral-500">
                        See the Difference
                    </p>
                    <h2 className="mt-3 font-serif text-3xl leading-tight text-neutral-900 md:text-4xl lg:text-5xl text-balance">
                        Your hands were never the problem.
                    </h2>
                    <p className="mt-4 font-sans text-sm font-medium leading-relaxed text-neutral-500 md:text-base">
                        87% of women and 24% of men have hands too small for a standard keyboard.
                        The standard 6.5&quot; octave span was designed for one hand size, and it probably isn&apos;t yours.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Standard keyboard - strain → How It Works */}
                    <a href="/how-it-works" className="relative group overflow-hidden block transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-sm">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                                src="/images/Biomechanical Impact on Small Hands.png"
                                alt="Hand straining on a standard 6.5 inch octave keyboard"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-red-300 font-semibold">
                                    Standard 6.5&quot; Octave
                                </span>
                            </div>
                            <p className="font-serif text-lg text-white md:text-xl">
                                Hyperabduction &amp; strain
                            </p>
                            <p className="mt-1 font-sans text-xs text-white/60 leading-relaxed">
                                Fingers flatten, tendons overextend, wrists twist. This is the #1 cause of piano-related injuries.
                            </p>
                        </div>
                    </a>

                    {/* DreamPlay keyboard - relaxed → Product Information */}
                    <a href="/product-information" className="relative group overflow-hidden block transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl rounded-sm">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                                src="/images/DreamPlay Piano Hands.jpg"
                                alt="Hand relaxed and naturally arched on DreamPlay keyboard"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-emerald-300 font-semibold">
                                    DreamPlay DS5.5 / DS6.0
                                </span>
                            </div>
                            <p className="font-serif text-lg text-white md:text-xl">
                                Natural arch, zero strain
                            </p>
                            <p className="mt-1 font-sans text-xs text-white/60 leading-relaxed">
                                Fingers stay curved, wrists neutral. Play for hours without fatigue or pain.
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
