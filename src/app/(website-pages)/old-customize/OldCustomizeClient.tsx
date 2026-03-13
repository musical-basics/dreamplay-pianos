"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import script from "next/script";
import { SpecialOfferHeader } from "@/components/special-offer/header";
import Navbar from "@/components/old-navbar";
import { getCountdownDate } from "@/actions/admin-actions";
import { useABAnalytics } from "@/hooks/use-ab-analytics";

// Types
interface KeyboardZone {
    zone: string;
    rangeText: string;
    model: string;
    desc: string;
    reach: string;
    activeColor: string;
}

interface CustomizeClientProps {
    urls: {
        bundle?: string;
        solo?: string;
        deposit?: string;
    }
}

export default function CustomizeClient({ urls }: CustomizeClientProps) {
    // --- STATE ---
    const [appState, setAppState] = useState({
        handSpan: null as string | null,
        size: null as string | null, // 'DS5.5' | 'DS6.0' | 'DS6.5'
        color: null as string | null, // 'Black' | 'White'
        selectedTier: 'full', // 'full' | 'deposit' | 'waitlist'
    });

    const [currentSection, setCurrentSection] = useState(0);
    const [isSizingModalOpen, setIsSizingModalOpen] = useState(false);
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [policyUrl, setPolicyUrl] = useState("");

    // Sizing Tool State
    const [sliderValue, setSliderValue] = useState(50);
    const [customerCount, setCustomerCount] = useState(1247);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    const [countDownDate, setCountDownDate] = useState<number | null>(null);

    // Refs for scrolling
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // --- DATA ---
    const tiers = [
        {
            id: 'full', // Changed from 'bundle' to match handler
            name: 'The DreamPlay Bundle',
            price: '$549',
            originalPrice: '$599',
            subtitle: 'MOST POPULAR', // High visibility badge
            description: 'The complete experience. Everything you need to play immediately.',
            bundleDetails: 'Includes: DreamPlay One ($499) + Matching Stand & Bench ($200 Value)',
            recommended: true,
            icon: 'gift'
        },
        {
            id: 'solo', // This maps to your $499 Keyboard Variant
            name: 'Keyboard Only',
            price: '$499',
            subtitle: 'Standard',
            description: 'Just the instrument. Use your own stand and bench.',
            bundleDetails: 'Includes: DreamPlay One Keyboard, Power Adapter, Sustain Pedal',
            recommended: false,
            icon: 'zap'
        },
        {
            id: 'deposit',
            name: 'Reserve Yours',
            price: '$299',
            subtitle: '50% Reservation',
            description: 'Pay the rest when ready to ship.',
            bundleDetails: 'Includes: DreamPlay One ($499) + Matching Stand & Bench ($200 Value)',
            recommended: false,
            icon: 'calendar'
        },
        // { id: 'waitlist', name: 'Join Waitlist', price: 'Free', subtitle: 'No Payment', description: 'Just your email, no commitment', bundleDetails: '', recommended: false, icon: 'mail' }
    ];

    const keyboards = {
        'DS5.5': {
            name: 'DreamPlay One DS5.5',
            tagline: 'Perfect for smaller hands',
            description: 'Ideal for women and children',
            zone: 'Zone A',
            imgSrc: '/images/keyboards/ds55-white-narrow-keys-alt.png'
        },
        'DS6.0': {
            name: 'DreamPlay One DS6.0',
            tagline: 'Perfect for average hands',
            description: 'Ideal for most men and women',
            zone: 'Zone B',
            imgSrc: '/images/keyboards/DS6.0-Black-transparent v2.png'
        },
        'DS6.5': {
            name: 'DreamPlay One DS6.5',
            tagline: 'Standard keys for large hands',
            description: 'For the small percentage with larger hands',
            zone: 'Zone C',
            imgSrc: '/images/keyboards/ds65-black-standard-digital-piano.png'
        }
    };

    // --- EFFECTS ---
    useEffect(() => {
        // Scroll Spy
        const handleScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight / 2;
            sectionRefs.current.forEach((section, index) => {
                if (!section) return;
                const rect = section.getBoundingClientRect();
                const top = rect.top + window.scrollY;
                const bottom = top + rect.height;
                if (scrollPos >= top && scrollPos < bottom) {
                    setCurrentSection(index);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Customer Count Interval
        const interval = setInterval(() => {
            setCustomerCount(prev => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log('[CustomizePage Debug] Component Mounted');
        return () => console.log('[CustomizePage Debug] Component Unmounted');
    }, []);

    useEffect(() => {
        // Fetch Countdown Date from DB
        getCountdownDate().then((dateStr) => {
            // Fallback default if null (though migration sets it)
            const target = dateStr ? new Date(dateStr).getTime() : new Date("2026-01-19T21:00:00-08:00").getTime();
            setCountDownDate(target);
        });
    }, []);

    useEffect(() => {
        if (!countDownDate) return;

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
                return;
            }

            setCountdown({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                secs: Math.floor((distance % (1000 * 60)) / 1000)
            });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [countDownDate]);

    useEffect(() => {
        console.log('[CustomizePage Debug] Setting up pageshow listener');
        // Handle browser back/forward cache (bfcache)
        // When user clicks back from Shopify, the page may be restored from cache without styles
        const handlePageShow = (event: PageTransitionEvent) => {
            console.log('[CustomizePage Debug] pageshow event fired', {
                persisted: event.persisted,
                timeStamp: event.timeStamp,
                type: event.type
            });

            if (event.persisted) {
                console.log('[CustomizePage Debug] Page restored from bfcache (persisted: true). Reloading...');
                // Page was restored from bfcache, reload to ensure proper styling
                window.location.reload();
            } else {
                console.log('[CustomizePage Debug] Page loaded normally (persisted: false).');
            }
        };
        window.addEventListener('pageshow', handlePageShow);
        return () => {
            console.log('[CustomizePage Debug] Removing pageshow listener');
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);


    // --- HELPERS ---
    const scrollToSection = (index: number) => {
        const section = sectionRefs.current[index];
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getRealValue = (percent: number) => {
        const visualZoneA_End = 33.33;
        const visualZoneB_End = 66.66;
        if (percent <= visualZoneA_End) return 6.0 + (percent / visualZoneA_End) * (7.6 - 6.0);
        else if (percent <= visualZoneB_End) {
            const relativeP = (percent - visualZoneA_End) / (visualZoneB_End - visualZoneA_End);
            return 7.6 + relativeP * (8.5 - 7.6);
        } else {
            const relativeP = (percent - visualZoneB_End) / (100 - visualZoneB_End);
            return 8.5 + relativeP * (10.0 - 8.5);
        }
    };

    const getSizingResult = (realVal: number) => {
        if (realVal < 7.6) {
            return { zone: 'A', rangeText: 'Hand span range: under 7.6 inches', model: 'DS5.5', desc: "Standard keys are physically too wide for you.", reach: 'Finally play 10ths comfortably', activeColor: 'rgba(239, 68, 68, 1)' };
        } else if (realVal <= 8.5) {
            return { zone: 'B', rangeText: 'Hand span range: 7.6 to 8.5 inches', model: 'DS6.0', desc: "The 'Goldilocks' size. Slightly narrower than standard.", reach: 'Play 10ths with new ease', activeColor: 'rgba(249, 115, 22, 1)' };
        } else {
            return { zone: 'C', rangeText: 'Hand span range: above 8.5 inches', model: 'DS6.5', desc: 'You fit the historical standard.', reach: 'Master standard repertoire', activeColor: 'rgba(34, 211, 238, 1)' };
        }
    };

    // --- ACTIONS ---
    const handleSelectHandSize = (size: 'small' | 'medium' | 'large') => {
        const sizeMap = { small: 'DS5.5', medium: 'DS6.0', large: 'DS6.5' };
        setAppState(prev => ({ ...prev, handSpan: size, size: sizeMap[size] }));
        setTimeout(() => scrollToSection(2), 300);
    };

    const handleSelectSize = (size: string) => {
        setAppState(prev => ({ ...prev, size }));
        setTimeout(() => scrollToSection(3), 300);
    };

    const handleSelectColor = (color: string) => {
        setAppState(prev => ({ ...prev, color }));
        setTimeout(() => scrollToSection(4), 300);
    };

    const handleSelectTier = (tierId: string) => {
        setAppState(prev => ({ ...prev, selectedTier: tierId }));

        if (tierId === 'full' || tierId === 'deposit' || tierId === 'solo') {
            const sizeParam = encodeURIComponent(appState.size || 'Not Selected');
            const colorParam = encodeURIComponent(appState.color || 'Not Selected');
            const propertiesParams = `&properties[Size]=${sizeParam}&properties[Finish]=${colorParam}`;

            // Helper to determine payload
            const getCheckoutUrl = (configValue: string | undefined, defaultId: string) => {
                const val = configValue?.trim();
                // If value exists and is numeric (Variant ID), construct URL
                if (val && /^\d+$/.test(val)) {
                    return `https://dreamplay-pianos.myshopify.com/cart/add?id=${val}&quantity=1&return_to=/checkout`;
                }

                // If value exists and is NOT numeric, assume it's a full URL
                if (val) return val;

                // If empty, use default ID (only if defaultId is provided)
                if (defaultId) return `https://dreamplay-pianos.myshopify.com/cart/add?id=${defaultId}&quantity=1&return_to=/checkout`;

                // Return empty string if no value and no default
                return "";
            }

            let baseUrl = "";

            if (tierId === 'full') {
                baseUrl = getCheckoutUrl(urls.bundle, "52209394549050");
            } else if (tierId === 'deposit') {
                baseUrl = getCheckoutUrl(urls.deposit, "52213397291322");
            } else if (tierId === 'solo') {
                baseUrl = getCheckoutUrl(urls.solo, "");
            }

            if (baseUrl) {
                // Check if the URL already has query params to decide on '?' vs '&'
                // The propertiesParams starts with '&', so we assume baseUrl has params or we need to adjust.
                // Shopify add-to-cart URLs usually have params.
                // If it's a custom URL that might not have params, we should handle it.
                // But typically for Shopify cart add, it works as is.
                // To be safe, if it's a raw link, we might just append properties?
                // The requirement is to adjust *destination URLs*. 
                // If the user inputs a full Stripe link, we probably don't need to append properties in the same way 
                // unless it supports them. 
                // However, preserving existing Shopify logic requires appending.
                // I will append properties if it looks like a Shopify URL or if we just want to pass data.
                // For simplicity and backward compatibility, I'll append propertiesParams if it's a Shopify URL 
                // or just redirect if it's something else, OR just append strict logic.

                // Let's stick to the existing pattern: append properties.
                // If the user provides a URL that doesn't support these params, they will just be ignored usually.

                const separator = baseUrl.includes('?') ? '&' : '?';
                // The constructed propertiesParams already starts with "&", so we might need to strip it if using '?'
                const finalParams = separator === '?' ? propertiesParams.substring(1) : propertiesParams;

                window.location.href = baseUrl + (baseUrl.includes('?') ? propertiesParams : `?${finalParams}`);
            } else {
                // Fallback for solo if no URL
                // In original code, solo just selected the tier. 
                // If the user wants it to do something, they should provide a URL.
            }
        } else {
            // Waitlist or other
            setTimeout(() => scrollToSection(5), 300);
        }
    };

    // --- ANALYTICS ---
    const { trackClick } = useABAnalytics("customize_waitlist_form", { trackTime: false });

    const handleSubmitWaitlist = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const fullName = (form.elements.namedItem('full-name') as HTMLInputElement).value;

        // Track conversion
        trackClick("form_submission", "join_waitlist");

        const ACTION_URL = 'https://dreamplaypianos.us12.list-manage.com/subscribe/post?u=90fbaa21ba86eecae78c767a8&id=cc37fd2637&f_id=00c46be9f0';

        // Construct hidden form submission
        const iframeName = 'mc_iframe_' + Date.now();
        const iframe = document.createElement('iframe');
        iframe.name = iframeName;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const hiddenForm = document.createElement('form');
        hiddenForm.action = ACTION_URL;
        hiddenForm.method = 'POST';
        hiddenForm.target = iframeName;

        const payload = {
            'EMAIL': email,
            'FNAME': fullName,
            'DP1SIZE': appState.size || 'Not Selected',
            'DP1FINISH': appState.color || 'Not Selected',
            'DP1TIER': appState.selectedTier
        };

        for (const [key, value] of Object.entries(payload)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            hiddenForm.appendChild(input);
        }

        document.body.appendChild(hiddenForm);
        hiddenForm.submit();

        setTimeout(() => {
            alert('You have been added to the waitlist! Please check your email.');
            // Cleanup
            document.body.removeChild(hiddenForm);
            document.body.removeChild(iframe);
            form.reset();
        }, 1500);
    }

    // Sizing Tool Modal Logic
    const realVal = getRealValue(sliderValue);
    const sizingResult = getSizingResult(realVal);
    const cmVal = (realVal * 2.54).toFixed(1);

    // Mouse Position for Hero Glow
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // Initialize centered (percentage)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate percentage to keep it responsive
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0f] font-sans text-white selection:bg-[#4a9eff]/30">
            {/* --- FIXED HEADERS WRAPPER --- */}
            <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
                {/* Main Navbar */}
                <SpecialOfferHeader forceOpaque={true} />

                {/* Steps Sub-Navbar */}
                <header id="sticky-nav" className="w-full transition-all duration-300 transform translate-y-0 mt-14 md:mt-16">
                    <div className="mx-auto max-w-7xl px-4 md:px-6">
                        <div className="flex h-12 md:h-14 items-center justify-between backdrop-blur-md bg-[#0a0a0f]/90 border-b border-white/5 rounded-b-2xl px-6 shadow-lg">
                            {/* Hidden Logo since it's in Main Navbar */}
                            <div className="hidden">
                                <Link href="/" className="flex items-center gap-2 group">
                                    <img src="/images/logos/Logo-White.svg" alt="DreamPlay" className="h-6 md:h-8 w-auto transition-transform group-hover:scale-105" />
                                </Link>
                            </div>

                            <div className="hidden md:flex items-center gap-8 text-xs md:text-sm font-medium text-white/40 mx-auto">
                                <button onClick={() => scrollToSection(0)} className={`flex items-center gap-2 transition-colors cursor-pointer hover:text-white/70 ${currentSection === 0 ? 'text-white' : ''}`}>
                                    <span className={`flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border ${currentSection === 0 ? 'border-[#4a9eff] bg-[#4a9eff] text-white' : 'border-white/20'}`}>1</span>
                                    <span>Start</span>
                                </button>
                                <div className={`h-px w-6 md:w-8 bg-white/10`}></div>
                                <button onClick={() => scrollToSection(1)} className={`flex items-center gap-2 transition-colors cursor-pointer hover:text-white/70 ${currentSection === 1 ? 'text-white' : ''}`}>
                                    <span className={`flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border ${currentSection === 1 ? 'border-[#4a9eff] bg-[#4a9eff] text-white' : 'border-white/20'}`}>2</span>
                                    <span>Measure</span>
                                </button>
                                <div className={`h-px w-6 md:w-8 bg-white/10`}></div>
                                <button onClick={() => scrollToSection(2)} className={`flex items-center gap-2 transition-colors cursor-pointer hover:text-white/70 ${currentSection === 2 ? 'text-white' : ''}`}>
                                    <span className={`flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border ${currentSection === 2 ? 'border-[#4a9eff] bg-[#4a9eff] text-white' : 'border-white/20'}`}>3</span>
                                    <span>Size</span>
                                </button>
                                <div className={`h-px w-6 md:w-8 bg-white/10`}></div>
                                <button onClick={() => scrollToSection(3)} className={`flex items-center gap-2 transition-colors cursor-pointer hover:text-white/70 ${currentSection === 3 ? 'text-white' : ''}`}>
                                    <span className={`flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border ${currentSection === 3 ? 'border-[#4a9eff] bg-[#4a9eff] text-white' : 'border-white/20'}`}>4</span>
                                    <span>Color</span>
                                </button>
                                <div className={`h-px w-6 md:w-8 bg-white/10`}></div>
                                <button onClick={() => scrollToSection(4)} className={`flex items-center gap-2 transition-colors cursor-pointer hover:text-white/70 ${currentSection === 4 ? 'text-white' : ''}`}>
                                    <span className={`flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border ${currentSection === 4 ? 'border-[#4a9eff] bg-[#4a9eff] text-white' : 'border-white/20'}`}>5</span>
                                    <span>Reserve</span>
                                </button>
                            </div>

                            <div className="md:hidden text-sm font-medium text-[#4a9eff] mx-auto">
                                Step {currentSection + 1}/5
                            </div>
                        </div>
                    </div>
                </header>
            </div>


            {/* SECTION 0: HERO */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[0] = el }} id="section-0" className="journey-section relative flex h-screen items-center justify-center overflow-hidden bg-[#0a0a0f]">
                <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(1200px circle at ${mousePos.x}% ${mousePos.y}%, rgba(74, 158, 255, 0.4), transparent 50%)`
                    }}
                ></div>
                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/60 backdrop-blur-sm md:mb-6 md:px-4 md:py-2 md:text-sm border border-white/10">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#4a9eff]"></span>
                        Final Units Remaining in Our First Production Batch.
                    </div>

                    <div className="mb-8 space-y-4">


                        <div className="flex flex-col items-center justify-center gap-1">
                            <div className="flex items-baseline gap-3">
                                <span className="text-xl md:text-2xl text-white/40 line-through decoration-white/40">$899</span>
                                <span className="text-4xl md:text-5xl font-bold text-white">$549</span>
                                <span className="text-lg md:text-xl font-bold text-white uppercase tracking-wide">Premium Bundle</span>
                            </div>
                            <p className="text-sm md:text-base text-[#ff9f9f] font-medium">(Keyboard + Stand + Bench)</p>
                        </div>


                    </div>

                    <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-white md:mb-4 md:text-5xl lg:text-6xl">
                        Find Your Perfect
                        <span className="mt-1 block bg-gradient-to-r from-[#4a9eff] to-[#60b8ff] bg-clip-text text-transparent md:mt-2">
                            DreamPlay One
                        </span>
                    </h1>
                    <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-white/60 md:mb-8 md:text-lg">
                        In just 4 simple steps, we'll help you discover the ideal keyboard size and finish for your musical journey.
                    </p>
                    <button onClick={() => scrollToSection(1)} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#4a9eff] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#4a9eff]/30 md:gap-3 md:px-8 md:py-4 md:text-lg">
                        <span className="relative z-10">Start Your Journey</span>
                        <svg className="relative z-10 h-4 w-4 animate-bounce md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce md:bottom-8">
                    <svg className="h-6 w-6 text-white/30 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </section>

            {/* SECTION 1: HAND SIZE */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[1] = el }} id="section-1" className="journey-section relative flex min-h-screen flex-col justify-center bg-gradient-to-b from-[#0a0a0f] to-[#0f1419] py-20">
                <div className="absolute left-6 top-24 hidden flex-col items-center gap-2 xl:flex 2xl:left-12">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4a9eff] text-xl font-bold text-white shadow-[0_0_20px_rgba(74,158,255,0.3)]">1</div>
                    <div className="h-32 w-0.5 bg-gradient-to-b from-[#4a9eff] to-transparent"></div>
                </div>
                <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
                    <div className="mb-4 text-center md:mb-6">
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#4a9eff]/10 px-3 py-1.5 text-xs font-medium text-[#4a9eff] md:mb-3 md:px-4 md:py-2 md:text-sm">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4a9eff] text-[10px] text-white md:h-6 md:w-6 md:text-xs">1</span>
                            Step One
                        </div>
                        <h2 className="mb-2 text-balance text-2xl font-bold text-white md:mb-3 md:text-4xl lg:text-5xl">Select Your Hand Size</h2>
                        <p className="mx-auto max-w-xl text-sm text-white/60 md:text-base">
                            Choose the option that best describes your hand size.{" "}
                            <a href="/about-us/ds-standard" target="_blank" className="inline-flex items-center gap-1 text-[#4a9eff] hover:text-[#4a9eff]/80 transition-colors">
                                <span className="underline">Learn about sizes</span>
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </a>
                        </p>
                    </div>

                    <div className="mb-8 flex justify-center">
                        <button onClick={() => setIsSizingModalOpen(true)} className="group relative flex w-full max-w-md items-center justify-between rounded-xl border border-[#4a9eff]/30 bg-[#4a9eff]/10 p-4 transition-all hover:border-[#4a9eff] hover:bg-[#4a9eff]/20 hover:shadow-[0_0_20px_rgba(74,158,255,0.2)]">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a9eff] text-white">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                </span>
                                <div className="text-left">
                                    <div className="text-xs font-bold uppercase tracking-wider text-[#4a9eff]">Recommended</div>
                                    <div className="text-sm font-medium text-white md:text-base">Measure Your Hand Using Our Sizing Tool</div>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-[#4a9eff] transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>

                    <div className="grid gap-3 md:gap-6 lg:grid-cols-3">
                        {[
                            { id: 'small', label: 'Smaller Hands', desc: 'Ideal for women and children', range: '< 7.6 inches', zone: 'DS5.5', fullZone: 'Zone A', zoneDesc: 'Narrowest Keys • 88 keys', emoji: '🤚' },
                            { id: 'medium', label: 'Average Hands', desc: 'Perfect for most men and women', range: '7.6–8.5 inches', zone: 'DS6.0', fullZone: 'Zone B', zoneDesc: 'Narrow Keys • 88 keys', emoji: '✋' },
                            { id: 'large', label: 'Larger Hands', desc: 'For the small percentage with larger hands', range: '8.5+ inches', zone: 'DS6.5', fullZone: 'Zone C', zoneDesc: 'Standard Keys • 88 keys', emoji: '🖐️' }
                        ].map((btn) => (
                            <button key={btn.id} onClick={() => handleSelectHandSize(btn.id as any)} className={`group relative flex flex-col overflow-hidden rounded-xl border p-5 pb-24 text-left backdrop-blur-md transition-all duration-300 md:rounded-2xl md:p-6 md:pb-28 ${appState.handSpan === btn.id ? 'border-transparent bg-[#4a9eff]/5' : 'border-white/10 bg-white/5 hover:border-[#4a9eff]/50 hover:bg-[#4a9eff]/5'}`}>
                                {appState.handSpan === btn.id && (
                                    <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-[#4a9eff] pointer-events-none z-50"></div>
                                )}
                                {appState.handSpan === btn.id && (
                                    <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#4a9eff] z-50 shadow-lg">
                                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                )}

                                <div className="flex flex-1 flex-col">
                                    <div className="mb-2 flex justify-center md:mb-3">
                                        <span className={`-scale-x-100 inline-block text-3xl transition-all duration-300 md:text-4xl ${appState.handSpan === btn.id ? 'grayscale-0 opacity-100 drop-shadow-[0_0_12px_rgba(74,158,255,0.6)]' : 'opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0'}`} role="img" aria-label={btn.label}>{btn.emoji}</span>
                                    </div>
                                    <h3 className="mb-1 text-center text-lg font-bold text-white/80 transition-colors md:text-xl">{btn.label}</h3>
                                    <div className="flex h-16 items-start justify-center px-2 pt-1 md:h-20">
                                        <p className="text-center text-sm leading-snug text-[#4a9eff]/80 md:text-base">{btn.desc}</p>
                                    </div>
                                    <div className="mb-4 flex h-8 items-center justify-center md:mb-6 md:h-10">
                                        <p className="text-center text-sm font-light text-white/50 md:text-base">{btn.range}</p>
                                    </div>
                                </div>
                                <div className="w-full rounded-lg bg-[#4a9eff]/20 border border-[#4a9eff]/30 p-3 transition-colors md:p-4">
                                    <div className="mb-1.5 flex items-center justify-between">
                                        <span className="text-sm font-semibold text-white/70 md:text-base">{btn.zone}</span>
                                        <span className="rounded-full bg-[#4a9eff] px-2.5 py-0.5 text-xs font-bold text-white md:text-sm">{btn.fullZone}</span>
                                    </div>
                                    <p className="text-xs text-white/50 md:text-sm">{btn.zoneDesc}</p>
                                </div>
                                <div className="absolute bottom-6 left-5 right-5 md:bottom-8 md:left-6 md:right-6">
                                    <div className={`flex w-full items-center justify-center rounded-full py-2.5 text-sm font-bold text-white shadow-lg transition-transform duration-300 ${appState.handSpan === btn.id ? 'bg-[#4a9eff] shadow-lg shadow-[#4a9eff]/25' : 'bg-[#4a9eff]/50 border border-[#4a9eff]/50 group-hover:scale-105 group-hover:bg-[#4a9eff]'}`}>
                                        {appState.handSpan === btn.id ? 'Selected' : 'Select'}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <p className="mt-4 py-4 text-center text-sm text-white/50 md:mt-5">
                        We recommend the {appState.size || '...'} for your hand size.
                    </p>
                </div>
            </section>

            {/* SECTION 2: RECOMMENDATION */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[2] = el }} id="section-2" className="journey-section relative flex min-h-screen flex-col justify-center bg-[#0f1419] py-20">
                <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
                    <button onClick={() => scrollToSection(1)} className="mb-4 flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        Previous Step
                    </button>
                    <div className="mb-4 text-center md:mb-6">
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#4a9eff]/10 px-3 py-1.5 text-xs font-medium text-[#4a9eff] md:mb-3 md:px-4 md:py-2 md:text-sm">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4a9eff] text-[10px] text-white md:h-6 md:w-6 md:text-xs">2</span>
                            Step Two
                        </div>
                        <h2 className="mb-2 text-balance text-2xl font-bold text-white md:mb-3 md:text-4xl lg:text-5xl">Your Recommended Size</h2>
                        <p className="mx-auto max-w-xl text-sm text-white/60 md:text-base">
                            Based on your hand span, we recommend the <span className="font-semibold text-[#4a9eff]">{appState.size || 'DS6.0'}</span>.{" "}
                            <a href="/about-us/ds-standard" target="_blank" className="inline-flex items-center gap-1 text-[#4a9eff] hover:text-[#4a9eff]/80 transition-colors whitespace-nowrap">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </a>
                        </p>
                    </div>
                    <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
                        {Object.entries(keyboards).map(([key, kb]) => {
                            const isSelected = key === appState.size;
                            const isRecommended = key === appState.size; // Simple logic: whatever is selected is recommended for now, or match logic
                            return (
                                <button key={key} onClick={() => handleSelectSize(key)} className={`size-btn group relative overflow-hidden rounded-xl text-left transition-all duration-300 md:rounded-2xl ${isSelected ? 'border-2 border-[#4a9eff] ring-1 ring-[#4a9eff] bg-[#4a9eff]/10 shadow-2xl shadow-[#4a9eff]/20' : 'border border-white/10 bg-white/5 hover:border-white/20'}`}>
                                    {isRecommended && <div className="absolute right-2 top-2 z-10 rounded-full bg-gradient-to-r from-[#4a9eff] to-[#7dd3fc] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-lg md:right-3 md:top-3 md:px-3 md:py-1 md:text-[10px]">Recommended</div>}
                                    <div className="absolute left-2 top-2 z-10 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/70 md:left-3 md:top-3 md:px-3 md:py-1 md:text-xs">{kb.zone}</div>
                                    <div className={`relative h-56 w-full overflow-hidden border-b border-white/5 md:h-72 ${isSelected ? 'bg-gradient-to-b from-[#4a9eff]/20 to-transparent' : 'bg-white/5'}`}>
                                        <img src={kb.imgSrc} alt={kb.name} className="absolute left-1/2 top-1/2 h-[80%] w-auto max-w-[90%] -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                    <div className="p-5 md:p-8">
                                        <h3 className="mb-0.5 text-lg font-bold text-white md:text-xl">{kb.name}</h3>
                                        <p className="mb-1 text-xs text-white/60 md:text-sm">{kb.tagline}</p>
                                        <p className="mb-4 text-[10px] text-[#4a9eff]/80 md:mb-5 md:text-xs">{kb.description}</p>
                                        <div className="mb-4 grid grid-cols-2 gap-2 md:mb-5">
                                            <div className="rounded-lg bg-white/5 p-2">
                                                <div className="text-base font-bold text-[#4a9eff] md:text-xl">88</div>
                                                <div className="text-[10px] text-white/50 md:text-xs">Keys</div>
                                            </div>
                                            <div className="rounded-lg bg-white/5 p-2">
                                                <div className="text-xs font-semibold text-white md:text-sm">{key === 'DS5.5' ? 'Narrowest' : key === 'DS6.0' ? 'Narrow' : 'Standard'}</div>
                                                <div className="text-[10px] text-white/50 md:text-xs">Key Size</div>
                                            </div>
                                        </div>
                                        <div className={`flex items-center justify-center rounded-lg py-3 text-xs font-semibold transition-all md:py-3.5 md:text-sm ${isSelected ? 'bg-[#4a9eff] text-white shadow-lg' : 'bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white'}`}>
                                            {isSelected ? 'Selected' : 'Select'}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                    <div className="mt-6 text-center md:mt-8">
                        <button onClick={() => { setPolicyUrl("/information-and-policies/shipping"); setIsPolicyModalOpen(true); }} className="text-xs text-white/40 underline transition-colors hover:text-white/60 md:text-sm">
                            Unsure? We have a hassle-free change policy. You can change the size and color of the keyboard when we are ready to ship to you.
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 3: FINISH */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[3] = el }} id="section-3" className="journey-section relative flex min-h-screen flex-col justify-center bg-gradient-to-b from-[#0f1419] to-[#0a0a0f] py-20">
                <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
                    <button onClick={() => scrollToSection(2)} className="mb-4 flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        Previous Step
                    </button>
                    <div className="mb-4 text-center md:mb-6">
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#4a9eff]/10 px-3 py-1.5 text-xs font-medium text-[#4a9eff] md:mb-3 md:px-4 md:py-2 md:text-sm">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4a9eff] text-[10px] text-white md:h-6 md:w-6 md:text-xs">3</span>
                            Step Three
                        </div>
                        <h2 className="mb-2 text-balance text-2xl font-bold text-white md:mb-3 md:text-4xl lg:text-5xl">Choose Your Finish</h2>
                        <p className="mx-auto max-w-xl text-sm text-white/60 md:text-base">Both finishes feature the same premium build quality.</p>
                    </div>

                    <div className="grid gap-3 md:gap-6 lg:grid-cols-2">
                        {['Black', 'White'].map(color => (
                            <button key={color} onClick={() => handleSelectColor(color)} className="color-btn group relative overflow-hidden rounded-xl border border-white/10 text-left transition-all duration-300 hover:border-white/20 md:rounded-2xl">
                                {appState.color === color && <div className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-[#4a9eff] pointer-events-none z-50"></div>}
                                {appState.color === color && (
                                    <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#4a9eff] text-white shadow-lg md:h-8 md:w-8 z-50">
                                        <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                )}
                                <div className="relative h-56 w-full overflow-hidden border-b border-white/5 transition-all duration-500 md:h-72" style={{ background: color === 'Black' ? 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)' : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)' }}>
                                    <img src={color === 'Black' ? "/images/keyboards/ds65-black-standard-digital-piano.png" : "/images/keyboards/ds55-white-narrow-keys-piano.png"} alt={color} className="absolute left-1/2 top-1/2 h-[85%] w-auto max-w-[90%] -translate-x-1/2 -translate-y-1/2 object-contain transition-all duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-5 md:p-8">
                                    <div className="mb-2 flex items-center gap-2 md:mb-3 md:gap-3">
                                        <div className="h-4 w-4 rounded-full border-2 border-white/20 md:h-5 md:w-5" style={{ backgroundColor: color === 'Black' ? '#1a1a1a' : '#f5f5f5' }}></div>
                                        <h3 className="text-lg font-bold text-white md:text-2xl">{color === 'Black' ? 'Midnight Black' : 'Pearl White'}</h3>
                                    </div>
                                    <p className="mb-4 text-sm text-white/60 md:mb-6 md:text-base">{color === 'Black' ? 'Classic elegance with a sophisticated matte finish.' : 'Modern aesthetic with a pristine glossy finish.'}</p>
                                    <div className={`flex items-center justify-center rounded-lg py-3 text-xs font-semibold transition-all md:py-3.5 md:text-sm ${appState.color === color ? 'bg-[#4a9eff] text-white' : 'bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white'}`}>
                                        {appState.color === color ? 'Selected' : 'Choose This Finish'}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: PRICING */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[4] = el }} id="section-4" className="journey-section relative flex min-h-screen flex-col justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-20">
                <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
                    <button onClick={() => scrollToSection(3)} className="mb-4 flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        Previous Step
                    </button>
                    <div className="mb-8 text-center md:mb-12">
                        <h2 className="mb-3 text-balance text-3xl font-bold text-white md:mb-4 md:text-5xl lg:text-6xl">Be the First to<br />Experience DreamPlay.</h2>
                        <p className="mx-auto mb-6 max-w-lg text-sm text-white/80 md:mb-8 md:text-base lg:text-lg">We've finished the design. Now, we need your help to begin production.</p>
                        {/* <div className="mb-6 flex items-center justify-center gap-4 md:mb-8 md:gap-8">
                            {Object.entries(countdown).map(([label, value], i) => (
                                <div key={label} className="flex items-center gap-4 md:gap-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white md:text-5xl">{String(value).padStart(2, '0')}</div>
                                        <div className="text-[10px] text-white/60 md:text-xs uppercase">{label}</div>
                                    </div>
                                    {i < 3 && <span className="text-2xl text-white/40 md:text-3xl">:</span>}
                                </div>
                            ))}
                        </div> */}
                        <p className="text-sm text-white/70 md:text-base">Join <span className="font-semibold text-white">~{customerCount.toLocaleString()}</span> customers just like you</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                        {tiers.map(tier => {
                            const isSelected = appState.selectedTier === tier.id;
                            const isSaleTier = tier.id === 'full';

                            return (
                                <button
                                    key={tier.id}
                                    onClick={() => handleSelectTier(tier.id)}
                                    className={`group relative flex flex-col items-center overflow-visible rounded-2xl p-6 text-center transition-all duration-300 md:p-8 ${isSelected
                                        ? `border-2 ${isSaleTier ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-white'} bg-white/20 shadow-2xl backdrop-blur-md scale-105 z-10`
                                        : `border ${isSaleTier ? 'border-red-500/50 bg-red-500/5' : 'border-white/20 bg-white/10'} backdrop-blur-md hover:border-white/40 hover:bg-white/15`
                                        }`}
                                >
                                    {/* Sale Badge for Pay in Full */}


                                    {/* Regular Recommended Badge (only if not sale tier, or handle overlap) */}
                                    {tier.recommended && !isSaleTier && (
                                        <div className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4a9eff] shadow-lg md:text-xs">
                                            Best Value
                                        </div>
                                    )}

                                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all ${isSelected ? 'bg-white/30' : 'bg-white/10'}`}>
                                        <span className="text-2xl">{tier.icon === 'gift' ? '🎁' : tier.icon === 'zap' ? '⚡' : tier.icon === 'calendar' ? '📅' : '✉️'}</span>
                                    </div>

                                    {/* Price Display */}
                                    <div className="flex items-baseline gap-2 mb-1">
                                        {(tier as any).originalPrice && (
                                            <span className="text-xl text-white/50 line-through decoration-white/50">{(tier as any).originalPrice}</span>
                                        )}
                                        <div className="text-3xl font-bold text-white md:text-4xl tracking-tight">{tier.price}</div>
                                    </div>

                                    <div className="mt-1 text-base font-semibold text-white md:text-lg">{tier.name}</div>
                                    <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#a855f7]">{tier.subtitle}</div>
                                    <div className="mt-2 text-xs text-white/70 md:text-sm leading-relaxed">{tier.description}</div>

                                    {tier.bundleDetails && (
                                        <div className="mt-3 text-xs text-white/80 font-medium md:text-sm border-t border-white/10 pt-3 w-full">
                                            {tier.bundleDetails}
                                        </div>
                                    )}

                                    <div className={`mt-6 rounded-full px-6 py-2.5 text-sm transition-all ${isSelected
                                        ? 'bg-red-500 text-white font-bold shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:bg-red-600'
                                        : 'bg-white/20 text-white hover:bg-white/30'
                                        }`}>
                                        {isSelected ? (isSaleTier ? 'Claim Offer' : 'Selected') : 'Select Option'}
                                    </div>

                                    <div className="mt-4 text-[10px] text-white/50 leading-tight max-w-[200px] mx-auto">
                                        Estimated Shipping August 2026. For more details, <a href="/information-and-policies/shipping" target="_blank" className="underline hover:text-white/80 transition-colors" onClick={(e) => e.stopPropagation()}>click here</a>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 5: FINAL FORM (Waitlist Only logic basically, since Shopify redirects happened) */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[5] = el }} id="section-5" className="journey-section relative flex min-h-screen flex-col justify-center bg-[#0a0a0f] py-20">
                <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
                    <button onClick={() => scrollToSection(4)} className="mb-4 flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        Previous Step
                    </button>
                    <div className="mb-6 text-center md:mb-10">
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#4a9eff]/10 px-3 py-1.5 text-xs font-medium text-[#4a9eff] md:mb-3 md:px-4 md:py-2 md:text-sm">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4a9eff] text-[10px] text-white md:h-6 md:w-6 md:text-xs">5</span>
                            Join the Waitlist
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl">Almost There!</h2>
                        <p className="text-sm text-white/50 md:text-base">Enter your details to complete your reservation.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                        <form onSubmit={handleSubmitWaitlist} className="flex flex-col">
                            <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
                                <h3 className="mb-5 text-lg font-semibold text-white md:text-xl">Contact Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-white/60">Full Name</label>
                                        <input name="full-name" type="text" placeholder="Enter your full name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder-white/30 outline-none transition-all focus:border-[#4a9eff] focus:ring-2 focus:ring-[#4a9eff]/20" required />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-white/60">Email Address</label>
                                        <input name="email" type="email" placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder-white/30 outline-none transition-all focus:border-[#4a9eff] focus:ring-2 focus:ring-[#4a9eff]/20" required />
                                    </div>
                                </div>
                                <button type="submit" className="mt-6 w-full rounded-xl bg-[#4a9eff] py-3.5 text-base font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:py-4 md:text-lg">
                                    Join Waitlist
                                </button>
                                <p className="mt-4 text-center text-xs text-white/40">By continuing, you agree to our Terms & Privacy Policy.</p>
                            </div>
                        </form>

                        <div className="flex flex-col h-fit rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
                            <h3 className="mb-5 text-lg font-semibold text-white md:text-xl">Your Selection</h3>
                            <div className="flex-1 space-y-3 border-b border-white/10 pb-5">
                                <div className="flex items-center justify-between text-base">
                                    <span className="text-white/60">Model</span>
                                    <span className="font-medium text-white">{appState.size || '—'}</span>
                                </div>
                                <div className="flex items-center justify-between text-base">
                                    <span className="text-white/60">Finish</span>
                                    <span className="font-medium text-white">{appState.color || '—'}</span>
                                </div>
                                <div className="flex items-center justify-between text-base">
                                    <span className="text-white/60">Option</span>
                                    <span className="font-medium text-[#4a9eff]">Join Waitlist</span>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between">
                                <span className="text-base text-white/60">Due Today</span>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-[#4a9eff]">Free</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SIZING MODAL --- */}
            {isSizingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                    <div className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-3xl bg-[#0a0a0f] p-4">
                        <button onClick={() => setIsSizingModalOpen(false)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                            ✕
                        </button>
                        <div className="rounded-[3rem] bg-[#0a0a0f] p-8 md:p-20 border border-white/10">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold mb-4">A Keyboard That Fits You.</h2>
                                <p className="text-gray-400 text-lg">DreamPlay's DS Standardardized Keyboards come in different sizes to match your biology.</p>
                            </div>

                            <div className="grid lg:grid-cols-[7fr_5fr] gap-12">
                                {/* CARD 1: INPUT */}
                                <div className="bg-white/5 rounded-3xl p-10 border border-white/10 backdrop-blur-md">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">📏</div>
                                        <h3 className="text-2xl font-semibold">Find Your Zone</h3>
                                    </div>
                                    <div className="mb-10">
                                        <div className="flex justify-between items-end mb-3">
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Your hand span</span>
                                            <div className="text-3xl font-bold" style={{ color: sizingResult.activeColor }}>
                                                {realVal.toFixed(1)} in <span className="text-gray-400 text-base font-normal">/ {cmVal} cm</span>
                                            </div>
                                        </div>

                                        <input
                                            type="range"
                                            min="0" max="100" step="0.5"
                                            value={sliderValue}
                                            onChange={(e) => setSliderValue(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                                            <span>Small (6 in)</span>
                                            <span>Average (8 in)</span>
                                            <span>Large (10 in)</span>
                                        </div>
                                    </div>

                                    <div className="bg-black/30 rounded-3xl p-6 flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-xl bg-black/20 overflow-hidden flex-shrink-0">
                                            <Image src="/images/stock/Picture3.avif" alt="Hand" width={80} height={80} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">How to measure</h4>
                                            <p className="text-gray-400 text-sm">Spread your hand wide. Measure from the <strong>tip of the thumb</strong> to the <strong>tip of the pinky</strong>.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 2: RESULT */}
                                <div className="bg-white/5 rounded-3xl p-10 border border-white/10 backdrop-blur-md flex flex-col justify-center">
                                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Your match</div>
                                    <div className="text-4xl font-bold mb-1" style={{ color: sizingResult.activeColor }}>Zone {sizingResult.zone}</div>
                                    <div className="text-gray-400 text-sm mb-6">{sizingResult.rangeText}</div>

                                    <div className="text-4xl font-bold mb-1">{sizingResult.model}</div>
                                    <div className="text-blue-400 font-medium mb-6">Recommended model</div>

                                    <p className="text-gray-400 leading-relaxed mb-6">{sizingResult.desc}</p>

                                    <div className="flex items-center gap-4 bg-black/30 rounded-2xl p-4 mb-6">
                                        <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">✓</div>
                                        <div>
                                            <div className="text-xs text-gray-400 font-medium">Reach capability</div>
                                            <div className="text-sm font-semibold text-white">{sizingResult.reach}</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const zoneMap: any = { A: 'small', B: 'medium', C: 'large' };
                                            handleSelectHandSize(zoneMap[sizingResult.zone]);
                                            setIsSizingModalOpen(false);
                                        }}
                                        className="w-full py-4 bg-[#4a9eff] rounded-2xl font-semibold text-white hover:bg-[#3a8eef] transition-colors shadow-lg shadow-blue-500/30"
                                    >
                                        Select and Return to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- POLICY MODAL --- */}
            {isPolicyModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
                    <div className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1419] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-white/10 bg-[#0a0a0f] px-4 py-3 md:px-6">
                            <h3 className="font-bold text-white">Our Policy</h3>
                            <button onClick={() => setIsPolicyModalOpen(false)} className="rounded-full bg-white/10 p-2 text-white/60 transition-colors hover:bg-white/20 hover:text-white">✕</button>
                        </div>
                        <div className="flex-1 bg-white">
                            <iframe src={policyUrl} className="h-full w-full border-0" title="Policy Page"></iframe>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
