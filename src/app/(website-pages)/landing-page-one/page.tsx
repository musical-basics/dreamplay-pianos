import { Playfair_Display, Inter } from "next/font/google"
import Footer from "@/components/Footer"
import { Check, Info, Star, ShieldCheck, Truck, ChevronDown, ChevronRight, X } from "lucide-react"

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

export default function LandingPageOne() {
    return (
        <div className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-stone-50 text-stone-900`}>
            {/* ANNOUNCEMENT BAR */}
            <div className="bg-black text-white text-center py-2 text-sm font-medium tracking-wide">
                <span>NEW RELEASE!</span> GET YOUR DREAMPLAY ONE WITH $300 OFF
            </div>

            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="font-playfair text-2xl font-bold tracking-tight">DreamPlay</div>
                    <a href="#pricing" className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors">
                        Get yours now
                    </a>
                </div>
            </header>

            <main>
                {/* HERO SECTION */}
                <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src="https://a.storyblok.com/f/256972/4500x3000/1e07cbca12/piano_2.png/m/1000x0"
                            alt="DreamPlay One Keyboard"
                            className="w-full max-w-lg rounded-2xl shadow-xl object-cover aspect-[4/3]"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="flex items-center gap-1 text-yellow-500">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                            <span className="text-stone-600 text-sm ml-2 font-medium">4.9/5 from 300+ Pianists</span>
                        </div>
                        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            The Piano Keyboard Designed for <span className="text-amber-700 italic">Every Hand</span>.
                        </h1>
                        <p className="text-lg text-stone-600">
                            Finally, a keyboard with narrower keys. Play freely, naturally, and without strain. Reach a 10th comfortably, play fast passages with ease, and rediscover your joy for music.
                        </p>

                        <div className="pt-4">
                            <a href="#pricing" className="block w-full sm:w-auto text-center bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-stone-800 transition-colors shadow-lg shadow-black/20">
                                Upgrade Your Piano Today
                            </a>
                            <p className="text-center text-sm text-stone-500 mt-3 flex items-center justify-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> 10-Year Warranty included
                            </p>
                        </div>
                    </div>
                </section>

                {/* TRUST LOGOS */}
                <section className="bg-white py-12 border-y border-stone-200">
                    <div className="max-w-6xl mx-auto px-4">
                        <p className="text-center text-sm font-semibold text-stone-400 tracking-widest uppercase mb-8">As Featured In</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
                            <h3 className="text-2xl font-black font-serif">The New York Times</h3>
                            <h3 className="text-2xl font-black font-sans tracking-tighter">WIRED</h3>
                            <h3 className="text-xl font-bold font-serif italic">Wall Street Journal</h3>
                        </div>
                    </div>
                </section>

                {/* PROBLEM / SOLUTION */}
                <section className="py-20 px-4 max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-stone-900">
                            Why standard keyboards hold you back.
                        </h2>
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                            For over a century, the 6.5-inch octave standard has favored large hands. If you have average or smaller hands, you're fighting the instrument, not just learning the music.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                            <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center gap-2">
                                <span className="bg-red-200 text-red-700 p-1.5 rounded-full"><X className="w-5 h-5" /></span>
                                Standard Keys
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-red-800/80">
                                    <X className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                                    <span>Tension and pain when reaching 8ths or 9ths.</span>
                                </li>
                                <li className="flex items-start gap-3 text-red-800/80">
                                    <X className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                                    <span>Missed notes and reduced accuracy during jumps.</span>
                                </li>
                                <li className="flex items-start gap-3 text-red-800/80">
                                    <X className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                                    <span>Increased risk of piano-related injuries (RSI).</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
                            <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                                <span className="bg-emerald-200 text-emerald-700 p-1.5 rounded-full"><Check className="w-5 h-5" /></span>
                                DreamPlay One
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-emerald-800/80">
                                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                                    <span>Easily reach a 9th or 10th with a relaxed hand.</span>
                                </li>
                                <li className="flex items-start gap-3 text-emerald-800/80">
                                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                                    <span>Improved accuracy and vastly better technical control.</span>
                                </li>
                                <li className="flex items-start gap-3 text-emerald-800/80">
                                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                                    <span>Play for hours without tension, fatigue, or pain.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="bg-stone-900 text-white py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                                Hand-crafted for your anatomy.
                            </h2>
                            <p className="text-lg text-stone-400 max-w-2xl mx-auto">
                                The DreamPlay One features the DS5.5® and DS6.0® standard sizes, scientifically proven to accommodate a wider range of hand sizes.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10 text-center">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>
                                <h3 className="text-xl font-bold mb-3">Measure Your Hand</h3>
                                <p className="text-stone-400">Use our online size guide to determine your ideal keyboard width (5.5 inch or 6.0 inch octave).</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
                                <h3 className="text-xl font-bold mb-3">Choose Your Model</h3>
                                <p className="text-stone-400">Select between the portable 73-key model or the full-sized 88-key studio model.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
                                <h3 className="text-xl font-bold mb-3">Play with Freedom</h3>
                                <p className="text-stone-400">Experience the music exactly as the composers intended, without the physical limitations.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* COMPARISON TABLE */}
                <section className="py-20 px-4 max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold">The DreamPlay Difference</h2>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                        <div className="grid grid-cols-3 p-6 bg-stone-50 border-b border-stone-100 font-bold text-sm md:text-base">
                            <div>Features</div>
                            <div className="text-center text-stone-400">Standard Keyboard</div>
                            <div className="text-center text-amber-700">DreamPlay One</div>
                        </div>

                        {[
                            ["Ergonomic Key Width", false, true],
                            ["Reduced Injury Risk", false, true],
                            ["Premium Wooden Keys", true, true],
                            ["MIDI / USB-C output", true, true],
                            ["10-Year Warranty", false, true],
                        ].map((row, i) => (
                            <div key={i} className={`grid grid-cols-3 p-6 text-sm md:text-base items-center ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}`}>
                                <div className="font-medium text-stone-700">{row[0]}</div>
                                <div className="flex justify-center">
                                    {row[1] ? <Check className="text-stone-300 w-5 h-5" /> : <X className="text-stone-300 w-5 h-5" />}
                                </div>
                                <div className="flex justify-center">
                                    {row[2] ? <Check className="text-amber-600 w-6 h-6" /> : <X className="text-stone-300 w-5 h-5" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="bg-amber-50 py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-16 text-amber-950">
                            Join hundreds of pianists who upgraded their play.
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { name: "Sarah J.", role: "Concert Pianist", quote: "I can finally play Rachmaninoff without feeling like my hand is tearing. The 5.5 inch octave changed my life." },
                                { name: "David M.", role: "Piano Teacher", quote: "My students progress so much faster when they aren't fighting the instrument. Every studio needs one." },
                                { name: "Elena R.", role: "Amateur Pianist", quote: "The build quality is incredible, but the narrower keys are the real magic. My tendinitis disappeared in weeks." }
                            ].map((review, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
                                    <div className="flex text-yellow-500 mb-4">
                                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <h4 className="font-bold text-lg mb-1">{review.name}</h4>
                                    <p className="text-sm text-stone-500 mb-4">{review.role}</p>
                                    <p className="text-stone-700 italic">"{review.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}
                <section className="py-20 px-4 max-w-3xl mx-auto">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: "What is the difference between DS5.5 and DS6.0?", a: "DS5.5 provides a 5.5-inch octave span, ideal for smaller hands. DS6.0 provides a 6.0-inch octave, suitable for average hands wanting a slightly more comfortable reach." },
                            { q: "Will I have trouble adapting between keyboards?", a: "Most pianists adapt within minutes. Playing on a narrower keyboard can actually improve your geographical awareness on standard keyboards." },
                            { q: "Does it come with built-in speakers?", a: "To maintain the highest quality action and wood construction within a portable form factor, the DreamPlay One is a MIDI controller and requires an external sound source (computer, iPad, or sound module)." }
                        ].map((faq, i) => (
                            <details key={i} className="group bg-white rounded-2xl border border-stone-200 [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-stone-900 font-medium">
                                    <span className="text-lg">{faq.q}</span>
                                    <span className="bg-stone-100 rounded-full p-2 group-open:-rotate-180 transition-transform duration-300">
                                        <ChevronDown className="w-5 h-5 text-stone-500" />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-stone-600 leading-relaxed">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* PRICING / CTA */}
                <section id="pricing" className="bg-stone-900 text-white py-24 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                            Ready to free your hands?
                        </h2>
                        <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
                            Join the revolution and experience the piano as it was meant to be played.
                        </p>

                        <div className="bg-stone-800 rounded-3xl p-8 md:p-12 mb-8 max-w-lg mx-auto border border-stone-700">
                            <h3 className="text-2xl font-bold text-amber-500 mb-2">DreamPlay One (88-keys)</h3>
                            <div className="flex justify-center items-end gap-3 mb-8">
                                <span className="text-5xl font-black">$2,499</span>
                                <span className="text-stone-500 line-through text-xl font-medium mb-1">$2,799</span>
                            </div>

                            <ul className="text-left space-y-4 mb-10 w-full max-w-sm mx-auto">
                                <li className="flex items-center gap-3"><Check className="text-amber-500 w-5 h-5" /> Premium wooden key action</li>
                                <li className="flex items-center gap-3"><Check className="text-amber-500 w-5 h-5" /> Choice of DS5.5 or DS6.0</li>
                                <li className="flex items-center gap-3"><Check className="text-amber-500 w-5 h-5" /> Free worldwide shipping</li>
                                <li className="flex items-center gap-3"><Check className="text-amber-500 w-5 h-5" /> 30-day money-back guarantee</li>
                            </ul>

                            <a href="/checkout" className="block w-full bg-white text-black py-4 rounded-full text-lg font-bold hover:bg-amber-500 hover:text-white transition-colors duration-300">
                                Secure Yours Today
                            </a>
                        </div>
                        <p className="text-stone-500 text-sm flex items-center justify-center gap-2">
                            <Truck className="w-4 h-4" /> Secure checkout. Ships within 48 hours.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
