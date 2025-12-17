"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function OurStoryPage() {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        // Scroll Spy Logic
        const sections = ['the-struggle', 'the-discovery', 'the-transformation', 'the-teacher'];
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        return;
                    }
                }
            }
            setActiveSection("");
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="page-wrapper">
            {/* Load Tailwind via CDN for this page specifically as per original implementation */}
            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
            <Script id="tailwind-config" strategy="beforeInteractive">
                {`
          tailwind.config = {
            darkMode: 'class',
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter', 'sans-serif'],
                  serif: ['Lora', 'serif'],
                },
                colors: {
                  background: "#fafaf9",       // stone-50
                  foreground: "#1c1917",       // stone-900
                  primary: "#1c1917",          
                  secondary: "#f5f5f4",        
                  muted: "#f5f5f4",            
                  "muted-foreground": "#78716c", 
                  "dark-section": "#0c0a09",   // stone-950
                  "dark-text": "#f5f5f4",      
                  accent: {
                    DEFAULT: "#2563eb",        // Royal Blue
                    dim: "#2563eb33",          
                    foreground: "#ffffff",     
                  },
                }
              }
            }
          }
        `}
            </Script>
            {/* Fonts for this page */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />

            <Navbar />

            <main className="main-wrapper font-sans antialiased selection:bg-accent/20 text-foreground bg-background">

                {/* DESKTOP NAV */}
                <nav className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
                    <div className="relative">
                        <div className="absolute left-[9px] top-0 bottom-0 w-[3px] bg-accent/20"></div>
                        <div className="space-y-16">
                            {[
                                { id: 'the-struggle', year: '1990-2020', title: 'The Struggle' },
                                { id: 'the-discovery', year: '2022', title: 'The Discovery' },
                                { id: 'the-transformation', year: '2022-2025', title: 'The Transformation' },
                                { id: 'the-teacher', year: 'Late 2024', title: 'The Teacher' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="relative flex items-center gap-6 group w-full text-left nav-btn"
                                >
                                    <div className={`w-5 h-5 rounded-full border-[3px] transition-all duration-300 ${activeSection === item.id ? 'bg-accent border-accent scale-125' : 'bg-background border-accent/40 group-hover:border-accent group-hover:scale-125'}`}></div>
                                    <div className={`transition-all duration-300 ${activeSection === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                                        <div className="whitespace-nowrap">
                                            <p className="text-sm text-accent font-semibold">{item.year}</p>
                                            <p className="text-base font-bold text-foreground">{item.title}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* MOBILE NAV */}
                <nav className="fixed bottom-6 left-6 right-6 z-40 lg:hidden">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-4 shadow-xl border border-accent/20">
                        <div className="relative">
                            <div className="absolute top-[9px] left-0 right-0 h-[3px] bg-accent/20"></div>
                            <div className="flex items-center justify-between relative">
                                {[
                                    { id: 'the-struggle', label: 'Ch. 1' },
                                    { id: 'the-discovery', label: 'Ch. 2' },
                                    { id: 'the-transformation', label: 'Ch. 3' },
                                    { id: 'the-teacher', label: 'Ch. 4' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="relative flex flex-col items-center gap-2 group mobile-btn"
                                    >
                                        <div className={`w-5 h-5 rounded-full border-[3px] transition-all duration-300 ${activeSection === item.id ? 'bg-accent border-accent scale-125' : 'bg-white border-accent/40'}`}></div>
                                        <p className={`text-[10px] uppercase tracking-wider text-accent font-bold ${activeSection === item.id ? 'opacity-100' : 'opacity-60'}`}>{item.label}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* HERO */}
                <section className="relative h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-background via-muted/30 to-background">
                    <div className="text-center max-w-4xl mx-auto">
                        <p className="text-xs uppercase tracking-[0.3em] text-accent font-medium mb-8">A Pianist's Story</p>
                        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-none mb-8 text-foreground">
                            The Dream<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
                                of a Lifetime
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            A personal journey through decades of struggle, a chance encounter, and the piano that changed everything.
                        </p>
                    </div>
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
                        <svg className="w-6 h-6 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"></path>
                        </svg>
                    </div>
                </section>

                {/* CHAPTER 1: THE STRUGGLE */}
                <section id="the-struggle" className="bg-dark-section text-dark-text">
                    <div className="min-h-screen flex flex-col justify-center py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto w-full">
                            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                                <div>
                                    <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent bg-accent/10 px-4 py-2 rounded-full mb-6">
                                        Chapter One · The Struggle
                                    </span>
                                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-12 text-white">
                                        I have a confession to make.
                                    </h2>
                                    <div className="space-y-6 text-lg md:text-xl text-stone-300 leading-relaxed max-w-xl">
                                        <p>My hands are not large, especially for a man. In a world where there is only one "conventional" piano size, I spent 3 decades of my life playing on pianos that were simply too big for my hands.</p>
                                        <p>Even though I became a professional pianist late in my life, at age 30, I found myself frequently straining to reach certain notes, and excluded from playing some of my favorite composers like Liszt and Rachmaninoff, both of whom famously had large hands.</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-white/10">
                                        <img src="/images/carnegie-hall-performance.png" alt="Pianist performing" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 opacity-90" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-stone-800 py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-dark-section via-dark-section/95 to-stone-800/90">
                        <div className="max-w-6xl mx-auto">
                            <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent bg-accent/10 px-3 py-2 rounded-full mb-6">
                                History Note
                            </span>
                            <div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-8 items-start">
                                <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
                                    <img src="/images/franz-liszt-in-colour-1546939903-large-article-0.jpg" alt="Franz Liszt" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-1 h-full min-h-[100px] bg-accent rounded-full flex-shrink-0"></div>
                                    <p className="font-serif text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-stone-300">
                                        The modern piano only reached its current size during the time of superstars like Liszt and Anton Rubinstein, with earlier versions of the piano having narrower keys.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CHAPTER 2: THE DISCOVERY */}
                <section id="the-discovery" className="bg-gradient-to-b from-background to-muted text-foreground">
                    <div className="min-h-screen flex flex-col justify-center py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto w-full">
                            <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-start lg:items-end">
                                <div className="order-1 space-y-6 lg:space-y-8">
                                    <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent bg-accent/10 px-4 py-2 rounded-full font-medium">
                                        Chapter Two · A Chance Encounter
                                    </span>
                                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-foreground">
                                        Then I met David Steinbuhler.
                                    </h2>
                                    <div className="space-y-6 text-base md:text-lg text-stone-700 leading-relaxed max-w-2xl">
                                        <p>3 years ago, I met a man named David Steinbuhler, who owns a textile factory in northern Pennsylvania. In the small corner of his factory, he had a small operation going, where he made narrower keyboards for pianists all around the world since 1992.</p>
                                        <p>Focusing on grand pianos, he would create the keybed plus the entire action (which includes the felt hammers and pivots), for pianists and universities to swap out from their existing grand pianos.</p>
                                        <p>David took my Kawai MP11SE, replacing the existing DS6.5 keys for a narrower, reduced DS6.0 size. To this day, my Kawai MP11SE keyboard is the only DS6.0-sized keyboard with the same wood is used for premium, grand pianos.</p>
                                    </div>
                                </div>
                                <div className="order-2 flex items-start lg:-mt-[400px]">
                                    <div className="w-full aspect-video overflow-hidden rounded-3xl ring-1 ring-black/10 shadow-2xl bg-white">
                                        <img src="/images/vlcsnap-2025-11-25-19h10m12s384.png" alt="Workshop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CHAPTER 3: THE TRANSFORMATION */}
                <section id="the-transformation" className="bg-dark-section text-dark-text">
                    <div className="py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto w-full">
                            <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent bg-accent/10 px-4 py-2 rounded-full mb-6">
                                Chapter Three · The Transformation
                            </span>
                            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] mb-16 max-w-4xl text-white">
                                Everything changed.
                            </h2>
                        </div>
                    </div>
                    <div className="relative w-full aspect-[21/9] overflow-hidden">
                        <img src="/images/article-main-placeholder.jpg" alt="Piano close up" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-section via-transparent to-dark-section/50"></div>
                    </div>
                    <div className="py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                                <div className="space-y-6 text-lg md:text-xl text-stone-300 leading-relaxed">
                                    <p>During the first few weeks of practicing, I didn't notice much difference. The main thought I had during this time was, wow, the black keys feel so narrow. Whereas on the conventional pianos, the black keys had enough surface area that you could kind of "approximate" the distance, and still hit the note, with the narrower keys, finger accuracy was paramount.</p>
                                    <p>But this feeling of unease gradually went away. As time went on, the feeling that profoundly affected me as I played on this keyboard, was the feeling of complete relaxation.</p>
                                    <p>For the first time in my life, I didn't have to strain to play the #1 most common interval, the octave. Pieces by Romantic composers, especially by Chopin, Liszt, and Rachmaninoff, began opening up to me, like old friends who moved back into town.</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="relative">
                                        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-accent/20 rounded-full"></div>
                                        <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-white pl-8">
                                            "For the first time in my life, I didn't have to strain."
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CHAPTER 4: THE TEACHER */}
                <section id="the-teacher" className="bg-background text-foreground">
                    <div className="min-h-screen flex flex-col justify-center py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto w-full">
                            {/* Header & Image */}
                            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
                                <div>
                                    <span className="inline-block text-xs uppercase tracking-[0.3em] text-accent bg-accent/10 px-4 py-2 rounded-full mb-6">
                                        Chapter Four · Late 2024
                                    </span>
                                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-8 text-foreground">
                                        I became a teacher.
                                    </h2>
                                    <div className="space-y-6 text-lg md:text-xl text-stone-600 leading-relaxed">
                                        <p>After my worldwide concert tour in 2023, I decided to become a piano teacher. My students were fans of mine from my Youtube channel, many of whom had attended my concerts.</p>
                                        <p>As a new teacher, I learned on the spot—how to demonstrate hand position, posture, and technique. But as I learned more about teaching, I started running into a very common issue amongst my students.</p>
                                    </div>
                                </div>
                                <div className="relative mt-8 lg:mt-0">
                                    {/* Placeholder Image for Teaching Context */}
                                    <div className="aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-black/10 shadow-2xl bg-stone-200">
                                        <img src="https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=2070&auto=format&fit=crop" alt="Teaching Piano" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                            {/* Student Categories Cards */}
                            <div className="grid md:grid-cols-3 gap-6 mb-24">
                                {/* Card 1 */}
                                <div className="bg-secondary p-8 rounded-2xl border border-stone-200">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-accent font-bold text-lg">1</span>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold mb-3">Kids (&lt; 13)</h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        Almost universally, students under 13 faced hand size issues. I constantly had to remind them, “don’t worry, your hands will grow.”
                                    </p>
                                </div>
                                {/* Card 2 */}
                                <div className="bg-secondary p-8 rounded-2xl border border-stone-200">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-accent font-bold text-lg">2</span>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold mb-3">Teenagers (14-22)</h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        Those with smaller hands struggled. I felt bad demonstrating on my DS6.0, knowing they couldn't replicate the technique on their standard keys.
                                    </p>
                                </div>
                                {/* Card 3 */}
                                <div className="bg-secondary p-8 rounded-2xl border border-stone-200">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-accent font-bold text-lg">3</span>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold mb-3">Adults (22+)</h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        Most female students complained about large intervals. While many men could play 9ths and 10ths, those with similar hands to mine, had trouble playing Romantic repertoire.
                                    </p>
                                </div>
                            </div>
                            {/* The Insight / Conclusion */}
                            <div className="bg-dark-section text-white rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                                <div className="relative z-10 max-w-3xl mx-auto">
                                    <p className="text-accent font-bold uppercase tracking-widest mb-4">The Realization</p>
                                    <h3 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
                                        60% of my students would benefit from a narrower keyboard.
                                    </h3>
                                    <p className="text-stone-400 text-lg md:text-xl leading-relaxed">
                                        Nearly all of my female students, and a quarter of my male students. I desperately wanted them to just play once on my DS6.0 keyboard, to feel how easy it was.
                                    </p>
                                </div>
                                {/* Abstract bg decoration */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/20 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-gradient-to-b from-background to-muted text-foreground">
                    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-32 text-center">
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 text-foreground">
                            Ready to play freely?
                        </h2>
                        <p className="text-xl md:text-2xl text-stone-500 mb-12 max-w-xl">
                            Join the waitlist for DreamPlay One.
                        </p>
                        <button className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-10 py-5 text-lg font-medium rounded-full hover:scale-105 transition-transform shadow-lg shadow-accent/20">
                            Get Early Access
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                            </svg>
                        </button>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
