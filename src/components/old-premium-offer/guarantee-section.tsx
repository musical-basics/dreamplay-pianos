"use client"

import { ShieldCheck, ArrowRight } from "lucide-react"

export function GuaranteeSection() {
  function handleJoinWaitlist() {
    const footer = document.querySelector(".dp-glass-card")
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "center" })
      // Focus the first input after scrolling
      setTimeout(() => {
        const input = footer.querySelector("input") as HTMLInputElement | null
        if (input) input.focus()
      }, 600)
    }
  }

  return (
    <section id="guarantee" className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <ShieldCheck
            className="h-10 w-10 text-foreground/80 md:h-12 md:w-12"
            strokeWidth={1}
          />
          <h2 className="mt-6 font-serif text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            The {'"'}No-Risk{'"'} Guarantee
          </h2>
          <p className="mt-8 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            Your pre-order is held in a separate account until production
            begins. If we do not hit our production minimums to maintain our
            quality standards, you get a 100% refund immediately.
          </p>
          <p className="mt-6 max-w-xl font-serif text-lg italic text-foreground md:text-xl text-balance">
            You either get the piano of your dreams, or you get your money back.
            You risk nothing.
          </p>

          <div className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground">
            <p>
              We are working overtime to make sure you get your DreamPlay One
              within the estimated time frame. If we cannot hit the deadline, you
              have the option of getting 100% of your money back, or keeping your
              reservation spot.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="/customize"
              className="group flex items-center justify-center gap-2 border border-foreground bg-foreground px-8 py-4 font-sans text-xs uppercase tracking-widest text-background transition-colors hover:bg-foreground/90"
            >
              Reserve Now
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={handleJoinWaitlist}
              className="group flex items-center justify-center gap-2 border border-foreground px-8 py-4 font-sans text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background cursor-pointer"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
