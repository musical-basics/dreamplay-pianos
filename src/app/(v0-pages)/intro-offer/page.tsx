"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, ChevronRight, Play, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const professorQuotes = [
    {
        quote: "We would never expect a world-class athlete to compete with equipment that does not fit their body. Yet we ask pianists, particularly women, to adapt to a one-size-fits-all design that was never built with them in mind.",
        author: "Elizabeth Schumann",
        title: "Director of Keyboard Studies, Stanford University"
    },
    {
        quote: "The standard keyboard width was established over a century ago, without consideration for the diversity of human hand sizes. This has created unnecessary barriers for countless talented pianists.",
        author: "Dr. Carol Leone",
        title: "Professor of Piano, Southern Methodist University"
    },
    {
        quote: "Hand span requirements in advanced repertoire often exclude pianists with smaller hands from performing certain works. This is not a limitation of ability, but of equipment.",
        author: "Dr. Rhonda Boyle",
        title: "International Piano Ergonomics Expert"
    }
]

const factoryImages = [
    "https://dreamplaypianos.com/images/manufacturing-1.jpg",
    "https://dreamplaypianos.com/images/manufacturing-2.jpg",
    "https://dreamplaypianos.com/images/manufacturing-3.jpg",
    "https://dreamplaypianos.com/images/manufacturing-4.jpg",
    "https://dreamplaypianos.com/images/manufacturing-5.jpg",
    "https://dreamplaypianos.com/images/manufacturing-6.jpg",
    "https://dreamplaypianos.com/images/manufacturing-7.jpg",
    "https://dreamplaypianos.com/images/manufacturing-8.jpg",
]

const founderQuotes = [
    {
        quote: "I watched enough of my students struggle, both adults and children, that I want to make this keyboard for them. To show them what is possible when the piano finally fits one's hands.",
        author: "Lionel Yu",
        title: "Founder & Concert Pianist",
        image: "https://dreamplaypianos.com/images/carnegie-hall-performance.png"
    },
    {
        quote: "Everything is easier for me now. The stretches that used to cause pain are now comfortable. I can finally focus on the music instead of fighting the instrument.",
        author: "Claudia Wang",
        title: "Professional Pianist & Early Backer",
        image: "https://dreamplaypianos.com/images/claudia-wang.jpg"
    }
]

const TOTAL_SLIDES = 17

export default function IntroOfferPage() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Horizontal slide states
    const [statsHorizontalSlide, setStatsHorizontalSlide] = useState(0)
    const [quoteHorizontalSlide, setQuoteHorizontalSlide] = useState(0)
    const [productHorizontalSlide, setProductHorizontalSlide] = useState(0)
    const [learnHorizontalSlide, setLearnHorizontalSlide] = useState(0)
    const [founderHorizontalSlide, setFounderHorizontalSlide] = useState(0)

    const scrollToSlide = useCallback((index: number) => {
        const el = scrollRef.current
        if (!el) return
        const clamped = Math.max(0, Math.min(index, TOTAL_SLIDES - 1))
        el.scrollTo({ top: clamped * window.innerHeight, behavior: "smooth" })
    }, [])

    // Track current slide based on scroll position (for dot nav indicator)
    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const onScroll = () => {
            const slideIndex = Math.round(el.scrollTop / window.innerHeight)
            setCurrentSlide(Math.max(0, Math.min(slideIndex, TOTAL_SLIDES - 1)))
        }

        el.addEventListener("scroll", onScroll, { passive: true })
        return () => el.removeEventListener("scroll", onScroll)
    }, [])

    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.play()
            setIsVideoPlaying(true)
        }
    }

    const ScrollIndicator = ({ next, dark }: { next: number; dark?: boolean }) => (
        <button
            onClick={() => scrollToSlide(next)}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors cursor-pointer z-20 ${dark ? "text-black/60 hover:text-black" : "text-white/60 hover:text-white"}`}
            aria-label="Next section"
        >
            <span className="font-sans text-xs uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
    )

    return (
        <>
            {/* Announcement Banner */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white py-2 px-4 text-center">
                <p className="font-sans text-xs">
                    Prices go up in April 2026 to $1,099 MSRP.{" "}
                    <Link href="/reserve" className="underline hover:no-underline">Reserve now</Link>
                </p>
            </div>

            {/* Dot navigation */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
                {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${currentSlide === i ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/*
        This single div is both the viewport (h-screen, overflow-hidden)
        AND the scroll target. We attach the ref here.
      */}
            <div
                ref={scrollRef}
                className="h-screen overflow-y-scroll"
                style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
            >

                {/* Slide 1: Launch Video */}
                <section className="h-screen snap-start relative flex items-center justify-center bg-black" style={{ scrollSnapAlign: "start" }}>
                    <div className="absolute inset-0">
                        <Image
                            src="https://dreamplaypianos.com/images/Main-Product-In-Studio-1-1_1.avif"
                            alt="DreamPlay One"
                            fill
                            className="object-cover opacity-40"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 flex flex-col items-center text-center px-6">
                        {!isVideoPlaying ? (
                            <>
                                <button
                                    onClick={playVideo}
                                    className="group relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all mb-8"
                                >
                                    <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" />
                                    <div className="absolute inset-2 rounded-full border border-white/20" />
                                    <Play className="w-12 h-12 md:w-16 md:h-16 text-white fill-white ml-2" />
                                </button>
                                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight max-w-3xl text-balance">
                                    Click to watch our official launch video
                                </h1>
                                <p className="mt-4 font-sans text-sm text-white/60">2 minute introduction</p>
                            </>
                        ) : (
                            <video
                                ref={videoRef}
                                className="w-full max-w-4xl aspect-video"
                                controls
                                autoPlay
                                playsInline
                            >
                                <source src="https://pub-ae162277c7104eb2b558af08104deafc.r2.dev/Final%204k%20Video%20DreamPlay%20Intro.mp4" type="video/mp4" />
                            </video>
                        )}
                    </div>
                    <ScrollIndicator next={1} />
                </section>

                {/* Slide 2: 55% Stats with horizontal swipe */}
                <section className="h-screen relative bg-black overflow-hidden" style={{ scrollSnapAlign: "start" }}>
                    <div className="h-full flex transition-transform duration-500" style={{ transform: `translateX(-${statsHorizontalSlide * 100}%)` }}>
                        {/* Stats Slide */}
                        <div className="h-full w-full flex-shrink-0 relative">
                            <Image
                                src="https://dreamplaypianos.com/images/_DSC1180-2-copy.jpg"
                                alt="Hands playing piano"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60" />
                            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                                <div className="flex flex-col lg:flex-row items-center gap-12">
                                    <div className="text-center lg:text-right">
                                        <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto lg:mx-0">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                                <circle
                                                    cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8"
                                                    strokeDasharray={`${55 * 2.83} ${100 * 2.83}`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="font-serif text-5xl md:text-7xl text-white">55<span className="text-3xl md:text-5xl">%</span></span>
                                            </div>
                                        </div>
                                        <p className="mt-4 font-sans text-sm uppercase tracking-[0.3em] text-white">of Pianists Have Hands</p>
                                    </div>
                                    <div className="hidden lg:block h-40 w-px bg-white/60" />
                                    <div className="text-center lg:text-left">
                                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/80">Under</p>
                                        <p className="font-serif text-6xl md:text-8xl text-white">8.5</p>
                                        <p className="font-sans text-sm uppercase tracking-[0.3em] text-white">Inches</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setStatsHorizontalSlide(1)}
                                className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        {/* Pain Point Slide */}
                        <div className="h-full w-full flex-shrink-0 relative">
                            <Image
                                src="https://dreamplaypianos.com/images/Biomechanical%20Impact%20on%20Small%20Hands.png"
                                alt="Pain points"
                                fill
                                className="object-contain bg-black"
                            />
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                                <Link
                                    href="/how-it-works"
                                    className="inline-flex items-center gap-2 bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black hover:bg-white/90 transition-colors"
                                >
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <button
                                onClick={() => setStatsHorizontalSlide(0)}
                                className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer rotate-180"
                                aria-label="Previous"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                    <ScrollIndicator next={2} />
                </section>

                {/* Slide 3: Professor Quotes */}
                <section className="h-screen relative bg-black overflow-hidden" style={{ scrollSnapAlign: "start" }}>
                    <div className="h-full flex transition-transform duration-500" style={{ transform: `translateX(-${quoteHorizontalSlide * 100}%)` }}>
                        {professorQuotes.map((quote, index) => (
                            <div key={index} className="h-full w-full flex-shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24">
                                <div className="max-w-4xl">
                                    <div className="border-l-2 border-white/20 pl-8 md:pl-12">
                                        <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/90 italic">
                                            &ldquo;{quote.quote}&rdquo;
                                        </blockquote>
                                        <div className="mt-8 flex flex-col gap-1">
                                            <cite className="font-serif text-lg font-medium text-white not-italic">{quote.author}</cite>
                                            <span className="font-sans text-sm text-white/50">{quote.title}</span>
                                        </div>
                                    </div>
                                </div>
                                {index < professorQuotes.length - 1 && (
                                    <button
                                        onClick={() => setQuoteHorizontalSlide(index + 1)}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                                        aria-label="Next quote"
                                    >
                                        <ChevronRight className="w-6 h-6 text-white" />
                                    </button>
                                )}
                                {index > 0 && (
                                    <button
                                        onClick={() => setQuoteHorizontalSlide(index - 1)}
                                        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer rotate-180"
                                        aria-label="Previous quote"
                                    >
                                        <ChevronRight className="w-6 h-6 text-white" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {professorQuotes.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setQuoteHorizontalSlide(i)}
                                className={`h-2 rounded-full transition-all cursor-pointer ${quoteHorizontalSlide === i ? "bg-white w-6" : "bg-white/30 w-2"
                                    }`}
                                aria-label={`Quote ${i + 1}`}
                            />
                        ))}
                    </div>
                    <ScrollIndicator next={3} />
                </section>

                {/* Slide 4: DreamPlay One Hero */}
                <section className="h-screen relative bg-black overflow-hidden" style={{ scrollSnapAlign: "start" }}>
                    <div className="h-full flex transition-transform duration-500" style={{ transform: `translateX(-${productHorizontalSlide * 100}%)` }}>
                        <div className="h-full w-full flex-shrink-0 relative">
                            <Image
                                src="https://dreamplaypianos.com/images/Piano%20Front%202.jpg"
                                alt="DreamPlay One"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
                                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50">Introducing</p>
                                <h2 className="mt-2 font-serif text-4xl md:text-6xl lg:text-7xl text-white">DreamPlay One</h2>
                                <p className="mt-4 max-w-md font-sans text-base text-white/70">88 weighted keys. Narrower by design. Built for hands that don&apos;t fit the standard.</p>
                            </div>
                            <button
                                onClick={() => setProductHorizontalSlide(1)}
                                className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <div className="h-full w-full flex-shrink-0 relative flex items-center justify-center bg-black">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster="https://dreamplaypianos.com/images/Piano%20+%20Bench%20Frontal%20+%20Bundle.png"
                            >
                                <source src="https://pub-ae162277c7104eb2b558af08104deafc.r2.dev/DreamPlay-Product-Render.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                                <Link
                                    href="/product-information"
                                    className="inline-flex items-center gap-2 bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black hover:bg-white/90 transition-colors"
                                >
                                    View All Product Information <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <button
                                onClick={() => setProductHorizontalSlide(0)}
                                className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer rotate-180"
                                aria-label="Previous"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                    <ScrollIndicator next={4} />
                </section>

                {/* Slide 5: LEDs / Learning App */}
                <section className="h-screen relative bg-black overflow-hidden" style={{ scrollSnapAlign: "start" }}>
                    <div className="h-full flex transition-transform duration-500" style={{ transform: `translateX(-${learnHorizontalSlide * 100}%)` }}>
                        <div className="h-full w-full flex-shrink-0 relative">
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="https://pub-ae162277c7104eb2b558af08104deafc.r2.dev/LED-Animation.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
                                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight max-w-3xl text-balance">
                                    Dedicated learning app to improving even faster
                                </h2>
                                <p className="mt-6 font-sans text-base text-white/70 max-w-xl">
                                    LED lights above every key make learning songs fast and fun. Want a classic look? They toggle off completely.
                                </p>
                            </div>
                            <button
                                onClick={() => setLearnHorizontalSlide(1)}
                                className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <div className="h-full w-full flex-shrink-0 relative flex items-center justify-center bg-neutral-950">
                            <div className="text-center px-6">
                                <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">Learn Your Favorite Songs</h2>
                                <p className="font-sans text-white/60 max-w-xl mx-auto mb-12">Our companion app guides you through every note with visual feedback and progress tracking.</p>
                                <Link
                                    href="/learn"
                                    className="inline-flex items-center gap-2 bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black hover:bg-white/90 transition-colors"
                                >
                                    View All Learning Features <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <button
                                onClick={() => setLearnHorizontalSlide(0)}
                                className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer rotate-180"
                                aria-label="Previous"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>
                    <ScrollIndicator next={5} />
                </section>

                {/* Slide 6: Expected Shipping */}
                <section className="h-screen relative bg-neutral-950 flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="text-center px-6">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Expected Shipping</p>
                        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white">August 2026</h2>
                        <p className="mt-8 font-sans text-base text-white/60 max-w-md mx-auto">
                            We&apos;re working hard to bring DreamPlay One to your doorstep.
                        </p>
                        <Link
                            href="/shipping"
                            className="mt-8 inline-flex items-center gap-2 border border-white/30 px-8 py-4 font-sans text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                        >
                            View Shipping Details <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <ScrollIndicator next={6} />
                </section>

                {/* Slide 7: Manufacturing */}
                <section className="h-screen relative bg-black flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="w-full max-w-6xl px-6">
                        <div className="text-center mb-8">
                            <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50 mb-2">Behind the Scenes</p>
                            <h2 className="font-serif text-3xl md:text-4xl text-white">Manufacturing Timeline</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {factoryImages.map((img, i) => (
                                <div key={i} className="aspect-square relative overflow-hidden bg-neutral-900">
                                    <Image
                                        src={img}
                                        alt={`Manufacturing ${i + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link
                                href="/production-timeline"
                                className="inline-flex items-center gap-2 bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black hover:bg-white/90 transition-colors"
                            >
                                View Production Timeline <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                    <ScrollIndicator next={7} />
                </section>

                {/* Slide 8: Social Proof */}
                <section className="h-screen relative bg-black flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="text-center px-6">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50 mb-8">Join the Movement</p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                            <div className="text-center">
                                <p className="font-serif text-6xl md:text-8xl text-white">120k</p>
                                <p className="mt-2 font-sans text-sm uppercase tracking-[0.2em] text-white/50">Reserved</p>
                            </div>
                            <div className="hidden md:block h-24 w-px bg-white/20" />
                            <div className="text-center">
                                <p className="font-serif text-6xl md:text-8xl text-white">300+</p>
                                <p className="mt-2 font-sans text-sm uppercase tracking-[0.2em] text-white/50">Confirmed Reservations</p>
                            </div>
                        </div>
                        <p className="mt-12 font-serif text-xl md:text-2xl text-white/80 italic max-w-2xl mx-auto text-balance">
                            Join the revolution of pianists escaping hand strain forever.
                        </p>
                    </div>
                    <ScrollIndicator next={8} />
                </section>

                {/* Slide 9: Official Price */}
                <section className="h-screen relative bg-white flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="text-center px-6">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-black/50 mb-4">Official Release Price</p>
                        <p className="font-sans text-sm text-black/60 mb-2">Here&apos;s how much DreamPlay One will cost once our product is officially released:</p>
                        <p className="font-serif text-7xl md:text-9xl text-black">$1,099</p>
                    </div>
                    <ScrollIndicator next={9} dark />
                </section>

                {/* Slide 10: But Wait */}
                <section className="h-screen relative bg-black flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="text-center px-6">
                        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white italic">But wait...</h2>
                    </div>
                    <ScrollIndicator next={10} />
                </section>

                {/* Slide 11: Lock in $699 */}
                <section className="h-screen relative bg-neutral-950 flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="text-center px-6">
                        <p className="font-sans text-sm text-white/60 mb-4">You can lock in our exclusive limited introductory price of just</p>
                        <p className="font-serif text-6xl md:text-8xl text-white line-through text-white/30">$699</p>
                        <p className="mt-4 font-sans text-lg text-white/80">for the keyboard TODAY for...</p>
                        <p className="mt-2 font-sans text-sm text-white/50">Reservation price today</p>
                    </div>
                    <ScrollIndicator next={11} />
                </section>

                {/* Slide 12: $99 Deposit */}
                <section className="h-screen relative bg-black flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="text-center px-6">
                        <p className="font-sans text-sm text-white/60 mb-2">...for the tiny deposit of</p>
                        <p className="font-serif text-8xl md:text-[12rem] text-white">$99</p>
                        <p className="mt-4 font-sans text-sm text-white/50">Pay the rest when your keyboard is ready to ship</p>
                    </div>
                    <ScrollIndicator next={12} />
                </section>

                {/* Slide 13: Money Back Guarantee */}
                <section className="h-screen relative bg-white flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="max-w-3xl mx-auto text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-black mb-8">Our Money Back Guarantee</h2>
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            <span className="px-4 py-2 border border-black/20 font-sans text-sm">Full Refund</span>
                            <span className="px-4 py-2 border border-black/20 font-sans text-sm">Cancel Anytime</span>
                            <span className="px-4 py-2 border border-black/20 font-sans text-sm">90 Day Trial</span>
                            <span className="px-4 py-2 border border-black/20 font-sans text-sm">No Risk</span>
                            <span className="px-4 py-2 border border-black/20 font-sans text-sm">Free Shipping</span>
                        </div>
                        <div className="bg-neutral-100 p-8 md:p-12">
                            <p className="font-serif text-lg md:text-xl text-black leading-relaxed">
                                <strong>Our promise:</strong> When we are ready to ship to you, we will reach out to confirm with you, your exact shipping address. At this point, you may cancel and get a 100% full refund (no fees) if you changed your mind.
                            </p>
                        </div>
                        <Link
                            href="/shipping"
                            className="mt-8 inline-block font-sans text-sm text-black/60 underline hover:no-underline"
                        >
                            View our full shipping &amp; taxes policy
                        </Link>
                    </div>
                    <ScrollIndicator next={13} dark />
                </section>

                {/* Slide 14: Founder Quotes */}
                <section className="h-screen relative bg-black overflow-hidden" style={{ scrollSnapAlign: "start" }}>
                    <div className="h-full flex transition-transform duration-500" style={{ transform: `translateX(-${founderHorizontalSlide * 100}%)` }}>
                        {founderQuotes.map((quote, index) => (
                            <div key={index} className="h-full w-full flex-shrink-0 flex items-center">
                                <div className="w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                                    <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden flex-shrink-0">
                                        <Image src={quote.image} alt={quote.author} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 text-center lg:text-left">
                                        <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-white/90 italic leading-relaxed">
                                            &ldquo;{quote.quote}&rdquo;
                                        </blockquote>
                                        <div className="mt-6">
                                            <cite className="font-serif text-lg text-white not-italic">{quote.author}</cite>
                                            <p className="font-sans text-sm text-white/50">{quote.title}</p>
                                        </div>
                                    </div>
                                </div>
                                {index < founderQuotes.length - 1 && (
                                    <button
                                        onClick={() => setFounderHorizontalSlide(index + 1)}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                                        aria-label="Next quote"
                                    >
                                        <ChevronRight className="w-6 h-6 text-white" />
                                    </button>
                                )}
                                {index > 0 && (
                                    <button
                                        onClick={() => setFounderHorizontalSlide(index - 1)}
                                        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer rotate-180"
                                        aria-label="Previous quote"
                                    >
                                        <ChevronRight className="w-6 h-6 text-white" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {founderQuotes.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setFounderHorizontalSlide(i)}
                                className={`h-2 rounded-full transition-all cursor-pointer ${founderHorizontalSlide === i ? "bg-white w-6" : "bg-white/30 w-2"
                                    }`}
                                aria-label={`Quote ${i + 1}`}
                            />
                        ))}
                    </div>
                    <ScrollIndicator next={14} />
                </section>

                {/* Slide 15: Ready to Take Next Step */}
                <section className="h-screen relative bg-neutral-950 flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="text-center px-6">
                        <h2 className="font-serif text-3xl md:text-5xl text-white mb-8">Ready to take the next step?</h2>
                        <Link
                            href="/reserve"
                            className="inline-flex items-center gap-3 bg-white px-12 py-6 font-sans text-sm uppercase tracking-widest text-black hover:bg-white/90 transition-colors"
                        >
                            Start Your DreamPlay One Reservation <ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="mt-6 font-sans text-sm text-white/50">Receive it by August 2026</p>
                    </div>
                    <ScrollIndicator next={15} />
                </section>

                {/* Slide 16: FAQ / Contact */}
                <section className="h-screen relative bg-white flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="text-center px-6 max-w-2xl">
                        <h2 className="font-serif text-3xl md:text-4xl text-black mb-6">Still have questions?</h2>
                        <p className="font-sans text-base text-black/60 mb-8">
                            Visit our FAQ, or contact us here. We would love to hear from you. If you truly believe that this keyboard will change your piano playing experience, please tell us your story. We want to deliver your dream keyboard.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/faq"
                                className="inline-flex items-center gap-2 border border-black px-8 py-4 font-sans text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors"
                            >
                                View FAQ <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-black px-8 py-4 font-sans text-xs uppercase tracking-widest text-white hover:bg-black/80 transition-colors"
                            >
                                Contact Us <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                    <ScrollIndicator next={16} dark />
                </section>

                {/* Slide 17: Buyers Guide */}
                <section className="h-screen relative bg-neutral-100 flex items-center justify-center" style={{ scrollSnapAlign: "start" }}>
                    <div className="text-center px-6">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-black/50 mb-4">Find Your Perfect Fit</p>
                        <h2 className="font-serif text-3xl md:text-4xl text-black mb-12">Visit Our Buyer&apos;s Guide</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/buyers-guide?type=adult"
                                className="group flex flex-col items-center gap-4 p-8 bg-white hover:shadow-xl transition-shadow"
                            >
                                <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="font-sans text-sm uppercase tracking-widest text-black">Adult Pianists</span>
                            </Link>
                            <Link
                                href="/buyers-guide?type=child"
                                className="group flex flex-col items-center gap-4 p-8 bg-white hover:shadow-xl transition-shadow"
                            >
                                <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span className="font-sans text-sm uppercase tracking-widest text-black">Child Pianists</span>
                            </Link>
                        </div>
                        <p className="mt-12 font-sans text-xs text-black/40">
                            Prices go up in April 2026 to $1,099 MSRP
                        </p>
                    </div>
                </section>

            </div>
        </>
    )
}
