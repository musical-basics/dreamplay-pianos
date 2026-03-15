"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { logEvent } from "@/lib/analytics"

const allTiers = [
  {
    id: 'reservation',
    badge: null,
    title: "Lock My Spot",
    subtitle: "Batch 1 — August 2026",
    price: "$99",
    msrp: null,
    description:
      "100% refundable reservation. Lock in Founder\u0027s pricing and secure your Batch 1 (August) delivery. Pay the remaining balance only when your piano is boxed and ready to ship.",
    includes: ["Batch 1 Delivery Slot", "Founder\u0027s Price Lock", "Full Refund Anytime"],
    delivery: "Aug 2026",
    backers: 0,
    remaining: 50,
    total: 50,
    highlight: false,
  },
  {
    id: 'reserve50',
    badge: null,
    title: "Reserve (50%)",
    subtitle: "",
    price: "$274",
    msrp: null,
    description:
      "Pay 50% now, the rest (50% + shipping/taxes) when ready to ship.",
    includes: ["DreamPlay One Keyboard"],
    delivery: "Aug 2026",
    backers: 2,
    remaining: 8,
    total: 10,
    highlight: false,
  },
  {
    id: 'solo',
    badge: null,
    title: "DreamPlay One",
    subtitle: "",
    price: "$1,099",
    msrp: null,
    description:
      "The DreamPlay One Keyboard. Available in DS5.5 or DS6.0. Choose Midnight Black or Pearl White.",
    includes: ["DreamPlay One Keyboard"],
    delivery: "Aug 2026",
    backers: 40,
    remaining: 10,
    total: 50,
    highlight: false,
  },
  {
    id: 'full',
    badge: "Most Popular",
    title: "DreamPlay Bundle",
    subtitle: "",
    price: "$1,199",
    msrp: null,
    description:
      "The complete DreamPlay experience. Keyboard, adjustable stand, responsive sustain pedal, and comfortable padded bench.",
    includes: ["DreamPlay One Keyboard", "Keyboard Stand", "Sustain Pedal", "Padded Bench"],
    delivery: "Aug 2026",
    backers: 208,
    remaining: 42,
    total: 250,
    highlight: true,
  },
]

export function PricingSection({ hiddenProducts = [] }: { hiddenProducts?: string[] }) {
  const tiers = allTiers.filter(t => !hiddenProducts.includes(t.id))
  return (
    <section id="pricing" className="relative overflow-hidden bg-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-background/50">
            Pre-Order Now
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-background md:text-4xl lg:text-5xl text-balance">
            Reserve your DreamPlay One.
          </h2>
          <p className="mt-6 font-sans text-sm leading-relaxed text-background/60 md:text-base">
            Ships worldwide. Choose the size and color that suits you after
            placing your order.
          </p>
        </div>



        {/* Import Duties Call-out */}
        <div className="mb-12 border border-background/20 bg-background/5 px-6 py-5 max-w-2xl mt-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-background/60 text-lg leading-none">⚖️</span>
            <div>
              <p className="font-sans text-sm font-semibold text-background/90">
                A Note on Duties & Taxes
              </p>
              <p className="mt-1 font-sans text-xs leading-relaxed text-background/60">
                To guarantee the most accurate rates, standard import duties and local taxes are not included in the reservation price today. We ship Delivered Duty Paid (DDP) — meaning we prepay and handle all customs clearance on your behalf, so there are no surprise carrier fees at your door. This applies to all shipping regions including the US, UK, EU, Australia, and Japan. We will calculate and invoice any applicable duties/taxes right before shipping.
              </p>
            </div>
          </div>
        </div>

        {/* Single CTA — pricing is managed on /customize */}
        <a
          href="/customize"
          onClick={() => logEvent("homepage_ab_cta_click", { path: "/premium-offer", metadata: { variant: "premium-offer", destination: "/customize" } })}
          className="group inline-flex items-center justify-center gap-2 border border-background bg-background text-foreground px-10 py-4 font-sans text-xs uppercase tracking-widest transition-colors hover:bg-background/90"
        >
          Choose Your Configuration
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
