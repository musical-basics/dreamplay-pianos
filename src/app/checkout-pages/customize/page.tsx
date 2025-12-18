"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar"; // Assuming we want a Navbar, though the design might be standalone? 
// The original HTML does NOT include the standard Navbar. It has a custom sticky header #sticky-nav.
// I will implement the custom sticky header as per the design.

export default function CustomizePage() {
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
    const [countdown, setCountdown] = useState({ days: 0, hours: 11, mins: 4, secs: 42 });

    // Refs for scrolling
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // --- DATA ---
    const tiers = [
        { id: 'full', name: 'Pay in Full', price: '$599', subtitle: 'Best Value', description: 'Get the complete bundle with extras', bundleDetails: 'Includes matching stand, bench, pedal ($120 value)', recommended: true, icon: 'gift' },
        { id: 'deposit', name: 'Reserve Your Spot', price: '$299', subtitle: '50% Now', description: 'Be first in line, pay 50% later', bundleDetails: 'Includes matching stand and pedal ($65 value)', recommended: false, icon: 'zap' },
        { id: 'waitlist', name: 'Join Waitlist', price: 'Free', subtitle: 'No Payment', description: 'Just your email, no commitment', bundleDetails: '', recommended: false, icon: 'mail' }
    ];

    const keyboards = {
        'DS5.5': {
            name: 'DreamPlay One DS5.5',
            tagline: 'Perfect for smaller hands',
            description: 'Ideal for women and children',
            zone: 'Zone A',
            imgSrc: '/images/DS5.5-white_1.png'
        },
        'DS6.0': {
            name: 'DreamPlay One DS6.0',
            tagline: 'Perfect for average hands',
            description: 'Ideal for most men and women',
            zone: 'Zone B',
            imgSrc: '/images/DS5.5-white_1.png' // Utilizing same image as placeholder or specific if exists
        },
        'DS6.5': {
            name: 'DreamPlay One DS6.5',
            tagline: 'Standard keys for large hands',
            description: 'For the small percentage with larger hands',
            zone: 'Zone C',
            imgSrc: '/images/DS6.5-Black.png'
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
        // Countdown Interval
        const interval = setInterval(() => {
            setCountdown(prev => {
                let { days, hours, mins, secs } = prev;
                secs--;
                if (secs < 0) { secs = 59; mins--; }
                if (mins < 0) { mins = 59; hours--; }
                if (hours < 0) { hours = 23; days--; }
                return { days, hours, mins, secs };
            });
        }, 1000);
        return () => clearInterval(interval);
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

        if (tierId === 'full' || tierId === 'deposit') {
            const sizeParam = encodeURIComponent(appState.size || 'Not Selected');
            const colorParam = encodeURIComponent(appState.color || 'Not Selected');
            const propertiesParams = `&properties[Size]=${sizeParam}&properties[Finish]=${colorParam}`;

            const baseUrl = tierId === 'full'
                ? "https://dreamplay-pianos.myshopify.com/cart/add?id=52209394549050&quantity=1&return_to=/checkout"
                : "https://dreamplay-pianos.myshopify.com/cart/add?id=52213397291322&quantity=1&return_to=/checkout";

            window.location.href = baseUrl + propertiesParams;
        } else {
            // Waitlist
            setTimeout(() => scrollToSection(5), 300);
        }
    };

    const handleSubmitWaitlist = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const fullName = (form.elements.namedItem('full-name') as HTMLInputElement).value;

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

    return (
        <div className="bg-[#0a0a0f] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#4a9eff] selection:text-white">
            {/* --- CUSTOM HEADER --- */}
            <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${currentSection > 0 ? 'bg-[#0a0a0f]/95 py-3 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent py-6'}`}>
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
                    <Link href="/">
                        <img src="/images/Logo.svg" alt="DreamPlay" className={`h-7 brightness-0 invert transition-opacity duration-300`} />
                    </Link>
                    <nav className="hidden items-center gap-1 md:flex">
                        {['Start', 'Measure', 'Size', 'Color', 'Reserve'].map((label, index) => {
                            const isActive = currentSection === index;
                            const isCompleted = currentSection > index;
                            const isClickable = index <= currentSection || isCompleted;
                            return (
                                <button
                                    key={index}
                                    onClick={() => isClickable && scrollToSection(index)}
                                    disabled={!isClickable}
                                    className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${isActive ? 'bg-[#4a9eff] text-white shadow-lg shadow-[#4a9eff]/30' :
                                        isCompleted ? 'text-[#4a9eff] hover:bg-[#4a9eff]/10' :
                                            'text-white/40'
                                        } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                >
                                    {index > 0 && (
                                        <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${isActive ? 'bg-white/20 text-white' :
                                            isCompleted ? 'bg-[#4a9eff]/20 text-[#4a9eff]' :
                                                'bg-white/10 text-white/40'
                                            }`}>
                                            {isCompleted ? '✓' : index}
                                        </span>
                                    )}
                                    <span className="hidden lg:inline">{label}</span>
                                </button>
                            )
                        })}
                    </nav>
                    <div className="flex items-center gap-4">
                        {(appState.size || appState.color) && (
                            <div className="hidden items-center gap-2 text-sm text-white/60 sm:flex">
                                {appState.size && <span className="text-[#4a9eff]">{appState.size}</span>}
                                {appState.size && appState.color && <span>•</span>}
                                {appState.color && <span className="text-[#4a9eff]">{appState.color}</span>}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* --- SECTIONS --- */}

            {/* SECTION 0: HERO */}
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[0] = el }} id="section-0" className="journey-section relative flex h-screen items-center justify-center overflow-hidden bg-[#0a0a0f]">
                <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_#4a9eff_0%,_transparent_50%)]"></div>
                <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/60 backdrop-blur-sm md:mb-4 md:px-4 md:py-2 md:text-sm">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#4a9eff]"></span>
                        Limited Pre-Order Available
                    </div>
                    <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight text-white md:mb-4 md:text-6xl lg:text-7xl">
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
                        <p className="mx-auto max-w-xl text-sm text-white/60 md:text-base">Choose the option that best describes your hand size.</p>
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
                            Based on your hand span, we recommend the <span className="font-semibold text-[#4a9eff]">{appState.size || 'DS6.0'}</span>.
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
                                    <img src={color === 'Black' ? "/images/DS6.5-Black.png" : "/images/image-stand.png"} alt={color} className="absolute left-1/2 top-1/2 h-[85%] w-auto max-w-[90%] -translate-x-1/2 -translate-y-1/2 object-contain transition-all duration-500 group-hover:scale-105" />
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
            <section ref={el => { if (sectionRefs.current) sectionRefs.current[4] = el }} id="section-4" className="journey-section relative flex min-h-screen flex-col justify-center bg-gradient-to-br from-[#4a9eff] to-[#2d7ad6] py-20">
                <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
                    <button onClick={() => scrollToSection(3)} className="mb-4 flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        Previous Step
                    </button>
                    <div className="mb-8 text-center md:mb-12">
                        <h2 className="mb-3 text-balance text-3xl font-bold text-white md:mb-4 md:text-5xl lg:text-6xl">Be the First to<br />Experience DreamPlay.</h2>
                        <p className="mx-auto mb-6 max-w-lg text-sm text-white/80 md:mb-8 md:text-base lg:text-lg">We've finished the design. Now, we need your help to begin production.</p>
                        <div className="mb-6 flex items-center justify-center gap-4 md:mb-8 md:gap-8">
                            {Object.entries(countdown).map(([label, value], i) => (
                                <div key={label} className="flex items-center gap-4 md:gap-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white md:text-5xl">{String(value).padStart(2, '0')}</div>
                                        <div className="text-[10px] text-white/60 md:text-xs uppercase">{label}</div>
                                    </div>
                                    {i < 3 && <span className="text-2xl text-white/40 md:text-3xl">:</span>}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-white/70 md:text-base">Join <span className="font-semibold text-white">~{customerCount.toLocaleString()}</span> customers just like you</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                        {tiers.map(tier => {
                            const isSelected = appState.selectedTier === tier.id;
                            return (
                                <button key={tier.id} onClick={() => handleSelectTier(tier.id)} className={`group relative flex flex-col items-center overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 md:p-8 ${isSelected ? 'border-2 border-white bg-white/20 shadow-2xl backdrop-blur-md scale-105 z-10' : 'border border-white/20 bg-white/10 backdrop-blur-md hover:border-white/40 hover:bg-white/15'}`}>
                                    {tier.recommended && <div className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4a9eff] shadow-lg md:text-xs">Best Value</div>}
                                    <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all ${isSelected ? 'bg-white/30' : 'bg-white/10'}`}>
                                        {/* Simplified Icons */}
                                        <span className="text-2xl">⚡</span>
                                    </div>
                                    <div className="text-3xl font-bold text-white md:text-4xl tracking-tight">{tier.price}</div>
                                    <div className="mt-2 text-base font-semibold text-white md:text-lg">{tier.name}</div>
                                    <div className="mt-2 text-xs text-white/70 md:text-sm leading-relaxed">{tier.description}</div>
                                    {tier.bundleDetails && <div className="mt-3 text-xs text-white/80 font-medium md:text-sm border-t border-white/10 pt-3 w-full">{tier.bundleDetails}</div>}
                                    <div className={`mt-6 rounded-full px-6 py-2.5 text-sm transition-all ${isSelected ? 'bg-white text-[#4a9eff] font-bold shadow-lg' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                                        {isSelected ? 'Selected' : 'Select Option'}
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
                                            <Image src="/images/Picture3.avif" alt="Hand" width={80} height={80} className="w-full h-full object-cover" />
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
