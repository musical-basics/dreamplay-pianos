"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function ShippingPage() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="page-wrapper font-manrope text-[#1d1d1f]">
            <Navbar />
            <style jsx global>{`
        .font-manrope { font-family: 'Manrope', sans-serif; }
        .hero-title {
            font-size: 2.5rem;
            font-weight: 600;
            line-height: 1.1;
            letter-spacing: -0.02em;
        }
        @media (min-width: 768px) { .hero-title { font-size: 4.5rem; } }
        .section-label {
            font-size: 0.875rem;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        .section-heading {
            font-size: 2.25rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) { .section-heading { font-size: 3rem; } }
        .text-brand { color: #0066cc; }
        .text-dark { color: #1d1d1f; }
        .text-subtle { color: #86868b; }
        
        /* CARDS */
        .card-base {
            border-radius: 1.5rem;
            padding: 2rem;
            transition: all 0.4s ease-out;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .card-base:hover {
            transform: scale(1.02) translateY(-4px);
        }
        .theme-card-dark { background-color: #2d2d2f; color: white; }
        .theme-card-dark:hover { border-color: rgba(255,255,255,0.15); }
        .theme-card-light {
            background-color: white;
            color: #1d1d1f;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #f3f4f6;
        }
        .theme-card-light:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
        
        /* BUTTONS */
        .btn-primary {
            background-color: #0066cc;
            color: white;
            padding: 1.25rem 2.5rem;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 1.125rem;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.3s ease;
            box-shadow: 0 10px 15px -3px rgba(0, 102, 204, 0.3);
        }
        .btn-primary:hover {
            background-color: #0055aa;
            transform: scale(1.05);
            box-shadow: 0 20px 25px -5px rgba(0, 102, 204, 0.4);
        }
        
        /* SCROLLBARS */
        .custom-scroll {
            overscroll-behavior: contain;
            padding-right: 0.75rem;
        }
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 4px; border: 1px solid rgba(0,0,0,0.1); }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.6); cursor: pointer; }
        
        /* ANIMATIONS */
        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }
        
        .bg-section-light { background-color: #fafafa; }
        .bg-section-dark { background-color: #1d1d1f; }
      `}</style>
            <main>
                {/* HERO SECTION */}
                <section className="relative bg-section-light pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
                    </div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h1 className="hero-title text-dark mb-2 reveal">Global Delivery.</h1>
                        <h1 className="hero-title text-brand mb-12 reveal delay-100">Complimentary Shipping.</h1>
                        <div className="max-w-4xl mx-auto mb-16 reveal delay-200">
                            <img src="/images/gemini-generated-image-7eppgr7eppgr7epp.png" alt="World Map" className="w-full h-auto object-contain opacity-90" />
                        </div>
                        <p className="text-xl text-subtle max-w-xl mx-auto mb-12 reveal delay-300">
                            Free delivery to the US, Canada, and Europe. Extended shipping available worldwide.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 reveal delay-300">
                            <div className="text-center">
                                <div className="text-5xl font-semibold text-dark">Free</div>
                                <div className="text-sm text-subtle mt-2">US & Europe</div>
                            </div>
                            <div className="hidden md:block w-px bg-gray-300 h-16"></div>
                            <div className="text-center">
                                <div className="text-5xl font-semibold text-dark">+$50</div>
                                <div className="text-sm text-subtle mt-2">Extended Regions</div>
                            </div>
                            <div className="hidden md:block w-px bg-gray-300 h-16"></div>
                            <div className="text-center">
                                <div className="text-5xl font-semibold text-dark">$150</div>
                                <div className="text-sm text-subtle mt-2">Rest of World</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SHIPPING ZONES */}
                <section className="bg-section-dark py-32 text-white">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-20 reveal">
                            <p className="section-label text-brand">Shipping Zones</p>
                            <h2 className="section-heading">We ship to over 50 countries</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* FREE CARD */}
                            <div className="card-base theme-card-dark reveal delay-100">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                        <span className="text-xs uppercase tracking-wider opacity-60">Complimentary</span>
                                    </div>
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </div>
                                <div className="text-5xl font-semibold mb-2">Free</div>
                                <p className="opacity-40 text-sm mb-8">Estimated ~2 months delivery</p>
                                <div className="space-y-3 max-h-60 overflow-y-auto custom-scroll">
                                    {['Austria', 'Belgium', 'Canada', 'Denmark', 'Finland', 'France', 'Germany', 'Ireland', 'Netherlands', 'UK', 'US (Continental)'].map(c => (
                                        <div key={c} className="flex items-center gap-3 text-sm opacity-70"><span className="text-blue-600">✓</span> {c}</div>
                                    ))}
                                </div>
                            </div>

                            {/* EXTENDED CARD */}
                            <div className="card-base theme-card-dark reveal delay-200">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                                        <span className="text-xs uppercase tracking-wider opacity-60">Extended</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </div>
                                <div className="text-5xl font-semibold mb-2">+$50</div>
                                <p className="opacity-40 text-sm mb-8">Estimated ~1 month delivery</p>
                                <div className="space-y-3 max-h-60 overflow-y-auto custom-scroll">
                                    {['Australia', 'China', 'Japan', 'South Korea', 'New Zealand', 'Singapore', 'Switzerland', 'Taiwan', 'Hawaii (US)'].map(c => (
                                        <div key={c} className="flex items-center gap-3 text-sm opacity-70"><span className="text-gray-500">✓</span> {c}</div>
                                    ))}
                                </div>
                            </div>

                            {/* STANDARD CARD */}
                            <div className="card-base theme-card-dark reveal delay-300">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                                        <span className="text-xs uppercase tracking-wider opacity-60">Standard</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </div>
                                <div className="text-5xl font-semibold mb-2">$150</div>
                                <p className="opacity-40 text-sm mb-8">Estimated ~2 months delivery</p>
                                <div className="space-y-3 max-h-60 overflow-y-auto custom-scroll">
                                    {['Brazil', 'India', 'Mexico', 'UAE', 'Saudi Arabia', 'Turkey', 'Argentina', 'Egypt'].map(c => (
                                        <div key={c} className="flex items-center gap-3 text-sm opacity-70"><span className="text-gray-600">✓</span> {c}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PACKAGING SECTION */}
                <section className="bg-section-light py-32 overflow-hidden">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="reveal">
                                <p className="section-label text-brand">Premium Protection</p>
                                <h2 className="section-heading text-dark">Packaged with Care</h2>
                                <p className="text-subtle text-lg leading-relaxed mb-10">
                                    Every DreamPlay One is carefully packaged in custom-designed protective casing to ensure it arrives in perfect condition, no matter where you are in the world.
                                </p>
                                <div className="space-y-8">
                                    {[
                                        { title: 'Custom Foam Inserts', desc: 'Precision-cut protection for every component', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                                        { title: 'Double-Wall Boxing', desc: 'Extra durability for long-distance shipping', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                                        { title: 'Insured Delivery', desc: 'Full coverage throughout the journey', icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center flex-shrink-0 text-brand">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-dark text-lg">{item.title}</h3>
                                                <p className="text-subtle text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="reveal delay-200 relative">
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                    <img src="/images/packaging-care.jpg" alt="Packaging" className="w-full h-auto object-contain" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AVAILABILITY SECTION */}
                <section className="bg-section-dark py-32">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="text-center mb-16 reveal">
                            <p className="section-label text-subtle">Coming Soon</p>
                            <h2 className="section-heading text-white">Product Availability</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* DS5.5 */}
                            <div className="card-base theme-card-dark reveal delay-100">
                                <div className="aspect-[4/3] bg-section-dark rounded-2xl mb-6 flex items-center justify-center p-4">
                                    <img src="/images/Group-2.png" alt="DS5.5" className="max-h-full object-contain" />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-semibold">DS5.5</h3>
                                    <div className="text-right"><div className="text-xs text-subtle uppercase">Ships</div><div className="font-medium">June 2026</div></div>
                                </div>
                                <p className="text-subtle text-sm border-t border-white/10 pt-4 mt-4">Zone A: Smaller Hands</p>
                            </div>

                            {/* DS6.0 */}
                            <div className="card-base theme-card-dark reveal delay-200">
                                <div className="aspect-[4/3] bg-section-dark rounded-2xl mb-6 flex items-center justify-center p-4">
                                    <img src="/images/Group-3.png" alt="DS6.0" className="max-h-full object-contain" />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-semibold">DS6.0</h3>
                                    <div className="text-right"><div className="text-xs text-subtle uppercase">Ships</div><div className="font-medium">June 2026</div></div>
                                </div>
                                <p className="text-subtle text-sm border-t border-white/10 pt-4 mt-4">Zone B: Medium Hands</p>
                            </div>

                            {/* DS6.5 */}
                            <div className="card-base theme-card-dark reveal delay-300 bg-gradient-to-br from-[#2d2d2f] to-[#1a1a1c]">
                                <span className="inline-block px-3 py-1 rounded-full bg-brand/20 text-brand text-xs font-bold uppercase mb-4" style={{ backgroundColor: 'rgba(0,102,204,0.2)', color: '#0066cc' }}>First to Ship</span>
                                <div className="aspect-[4/3] bg-section-dark rounded-2xl mb-6 flex items-center justify-center p-4">
                                    <img src="/images/DS6.5-Black.png" alt="DS6.5" className="max-h-full object-contain" />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-semibold">DS6.5</h3>
                                    <div className="text-right"><div className="text-xs text-subtle uppercase">Ships</div><div className="text-brand font-medium">March 2026</div></div>
                                </div>
                                <p className="text-subtle text-sm border-t border-white/10 pt-4 mt-4">Zone C: Standard Size</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* POLICIES SECTION */}
                <section className="bg-section-light py-32">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-16 reveal">
                            <h2 className="section-heading text-dark">Payment & Policies</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: 'Payment Terms', desc: '$299 (50%) deposit upfront. The remaining $299 is due once we ship your DreamPlay One.', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                                { title: 'Duties & Taxes', desc: 'Buyer is responsible for all import duties, taxes, and customs fees. Not included in price.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                                { title: '90-Day Returns', desc: 'No questions asked, full refund within 90 days of receiving your instrument.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' }
                            ].map((item, i) => (
                                <div key={i} className={`card-base theme-card-light reveal delay-${(i + 1) * 100}`}>
                                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-brand mb-6">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-dark mb-3">{item.title}</h3>
                                    <p className="text-subtle">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="bg-section-dark py-32 text-center text-white">
                    <div className="container mx-auto px-6 reveal">
                        <h2 className="section-heading mb-6">Ready to order your DreamPlay One?</h2>
                        <p className="text-subtle text-xl mb-10 max-w-2xl mx-auto">
                            Secure your pre-order today and be among the first to experience the future of piano.
                        </p>
                        <Link href="/checkout-pages/customize" className="btn-primary">
                            Pre-Order Now
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
