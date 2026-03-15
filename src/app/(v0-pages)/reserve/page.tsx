"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"
import { SpecialOfferHeader } from "@/components/special-offer/header"

const TOTAL_SLIDES = 3

export default function ReservePage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [email, setEmail] = useState("")
  const [showEmailForm, setShowEmailForm] = useState(false)

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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const { subscribeToNewsletter } = await import("@/actions/email-actions")
      const result = await subscribeToNewsletter({
        email,
        tags: ["reserve_reminder"],
      })
      if (result.success) {
        setToast({ message: "You're on the list! We'll send you a reminder.", type: "success" })
        setShowEmailForm(false)
        setEmail("")
      } else {
        setToast({ message: result.error || "Something went wrong. Please try again.", type: "error" })
      }
    } catch {
      setToast({ message: "Something went wrong. Please try again.", type: "error" })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setToast(null), 4000)
    }
  }

  const ScrollIndicator = ({ next }: { next: number }) => (
    <button
      onClick={() => scrollToSlide(next)}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer z-20"
      aria-label="Next section"
    >
      <span className="font-sans text-xs uppercase tracking-[0.2em]">Scroll</span>
      <ChevronDown className="w-5 h-5 animate-bounce" />
    </button>
  )

  return (
    <>
      <SpecialOfferHeader forceOpaque={true} darkMode={true} className="border-b border-white/10 bg-[#050505] backdrop-blur-md" />

      {/* Back link */}
      <Link
        href="/intro-offer"
        className="fixed top-12 left-6 z-50 flex items-center gap-2 text-white/60 hover:text-white transition-colors font-sans text-sm"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back
      </Link>

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

      <div
        ref={scrollRef}
        className="h-screen overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
      >

        {/* Slide 1: Price and Timeline */}
        <section className="h-screen relative bg-black flex items-center justify-center pt-12" style={{ scrollSnapAlign: "start" }}>
          <div className="w-full max-w-4xl mx-auto px-6 text-center">
            <div className="mb-8">
              <p className="font-serif text-7xl md:text-9xl text-white">$99</p>
              <p className="mt-2 font-sans text-base text-white/60">Pay the rest ($600) when we ship</p>
            </div>
            <p className="font-serif text-xl md:text-2xl text-white/80 italic mb-8">
              Eliminate strain forever.
            </p>
            <p className="font-sans text-base text-white/70 max-w-xl mx-auto mb-12">
              Lock in your DreamPlay keyboard reservation now. Earlier backers receive their keyboards first.
            </p>
            {/* Timeline */}
            <div className="relative mb-12">
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full" />
              <div className="flex justify-between mt-4">
                <div className="text-left">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-emerald-400">Earliest Backers</p>
                  <p className="font-sans text-xs text-white/50">1st Production Batch</p>
                  <p className="font-sans text-xs text-white/40">150 backers - July</p>
                </div>
                <div className="text-center relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white mx-auto mt-1" />
                  </div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">Order Today</p>
                  <p className="font-sans text-xs text-white/70">August Shipping</p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-purple-400">Second Batch</p>
                  <p className="font-sans text-xs text-white/50">December</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToSlide(1)}
              className="inline-flex items-center gap-3 bg-white px-12 py-5 font-sans text-sm uppercase tracking-widest text-black hover:bg-white/90 transition-colors cursor-pointer"
            >
              Next Step <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <ScrollIndicator next={1} />
        </section>

        {/* Slide 2: Reservation Info */}
        <section className="h-screen relative bg-neutral-950 flex items-center justify-center pt-12" style={{ scrollSnapAlign: "start" }}>
          <div className="w-full max-w-3xl mx-auto px-6 text-center">
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 mb-8">
              <p className="font-serif text-xl md:text-2xl text-white leading-relaxed mb-8">
                This reservation is for <span className="text-white font-semibold">all sizes and colors</span> of the DreamPlay One keyboard.
              </p>
              <p className="font-serif text-lg md:text-xl text-white/80 mb-8">
                Following your reservation, here&apos;s what will happen:
              </p>
              <ol className="text-left space-y-6 font-sans text-base text-white/70 list-decimal list-inside">
                <li>You will receive a <span className="text-white font-medium">Step by Step Customize your DreamPlay Keyboard Configuration Link</span> immediately following your reservation.</li>
                <li>At any time before we are ready to ship you your keyboard, you may adjust or cancel your reservation.</li>
                <li>3 weeks before your delivery, we will confirm with you your address.</li>
                <li>We want you to love your keyboard. For 90 days, you may return with full return shipping expenses paid, or exchange for a different size.</li>
              </ol>
            </div>
            <button
              onClick={() => scrollToSlide(2)}
              className="inline-flex items-center gap-3 bg-white px-12 py-5 font-sans text-sm uppercase tracking-widest text-black hover:bg-white/90 transition-colors cursor-pointer"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <ScrollIndicator next={2} />
        </section>

        {/* Slide 3: Purchase / Think About It */}
        <section className="h-screen relative bg-neutral-950 flex items-center justify-center pt-12" style={{ scrollSnapAlign: "start" }}>
          <div className="w-full max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-12 leading-tight">Ready to Escape<br />Strain Forever?</h2>
            <div className="flex flex-col gap-4 mb-8">
              {!showEmailForm ? (
                <>
                  <a
                    href="https://dreamplay-pianos.myshopify.com/cart/clear?return_to=/cart/53150736253242:1"
                    className="inline-flex items-center justify-center gap-3 bg-white px-12 py-5 font-sans text-sm uppercase tracking-widest text-black hover:bg-white/90 transition-colors w-full"
                  >
                    Yes, Reserve Now <ArrowRight className="w-5 h-5" />
                  </a>
                </>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                  <p className="font-sans text-sm text-white/60 mb-2">Enter your email and we&apos;ll send you a reminder:</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-sans text-sm focus:outline-none focus:border-white/40"
                    required
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white px-8 py-4 font-sans text-xs uppercase tracking-widest text-black hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Reminder"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="px-6 py-4 border border-white/30 font-sans text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
            <p className="font-sans text-xs text-white/40 mb-8">
              Prices go up in April 2026 to $1,099/$1,199 MSRP.
            </p>
            <div className="border-t border-white/10 pt-8">
              <blockquote className="font-serif text-xl md:text-2xl text-white/60 italic">
                &ldquo;Everything is easier on the 6.0 for me... I feel very comfortable playing scales, fast passages, or big chords&rdquo;
              </blockquote>
              <p className="mt-4 font-sans text-xs text-white/40">— Claudia Wang</p>
              <p className="font-sans text-xs text-white/30">Master&apos;s Student at Southern Methodist University (SMU), Dallas</p>
              <p className="font-sans text-xs text-white/30">Pianist With 7.2&quot; Handspan</p>
            </div>
          </div>
        </section>

      </div>
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg font-sans text-sm shadow-lg transition-all ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}>
          {toast.message}
        </div>
      )}
    </>
  )
}
