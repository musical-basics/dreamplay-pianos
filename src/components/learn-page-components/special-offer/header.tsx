"use client"

import Link from "next/link"
import { ArrowRight, Menu, X, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useABAnalytics } from "@/hooks/use-ab-analytics"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { RegisterModal } from "@/components/RegisterModal"
import { CountdownBanner } from "@/components/premium-offer/countdown-banner"

interface SpecialOfferHeaderProps {
    forceOpaque?: boolean;
    darkMode?: boolean;
    className?: string;
}

// --- Desktop Dropdown ---
function NavDropdown({ label, items, useDarkText }: { label: string; items: { label: string; href: string }[]; useDarkText: boolean }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                className={`flex items-center gap-1 text-sm transition-colors cursor-pointer ${useDarkText ? "text-neutral-700 hover:text-neutral-900" : "text-white/70 hover:text-white"}`}
            >
                {label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            <div
                className={cn(
                    "absolute top-full right-0 mt-1 min-w-[180px] rounded-lg shadow-xl overflow-hidden transition-all duration-200 border",
                    useDarkText
                        ? "bg-white border-black/5 ring-1 ring-black/5"
                        : "bg-[#0a0a0f] border-white/10",
                    open ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"
                )}
                style={{ zIndex: 100 }}
            >
                {items.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`block px-4 py-3 text-sm transition-colors ${useDarkText
                            ? "text-gray-600 hover:text-black hover:bg-black/5"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function SpecialOfferHeader({ forceOpaque = false, darkMode = false, className = "" }: SpecialOfferHeaderProps) {
    const { trackClick } = useABAnalytics("special_offer_variant", { trackTime: false })
    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)

    useEffect(() => {
        const supabase = createClient()
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isScrolled = forceOpaque || scrolled || isMobileMenuOpen;
    const useDarkText = isScrolled && !darkMode;

    const linkClass = (useDarkText: boolean) =>
        `text-sm transition-colors ${useDarkText ? "text-neutral-700 hover:text-neutral-900" : "text-white/70 hover:text-white"}`;

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex flex-col",
                    className
                )}
            >
                {/* Countdown Banner */}
                <CountdownBanner />
                <div className={cn(
                    "w-full transition-all duration-300",
                    darkMode
                        ? "bg-[#050505]/95 backdrop-blur-md"
                        : isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
                )}>
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src={useDarkText ? "/images/Logo.svg" : "/images/DreamPlay Logo White.png"}
                                alt="DreamPlay Pianos"
                                className={`h-8 transition-all ${useDarkText ? "brightness-0" : ""}`}
                            />
                        </Link>

                        {/* Main navigation */}
                        <nav className="hidden md:flex items-center gap-6 h-full">
                            <Link href="/how-it-works" className={linkClass(useDarkText)}>How It Works</Link>
                            <Link href="/better-practice" className={linkClass(useDarkText)}>The Benefits</Link>
                            <Link href="/learn" className={linkClass(useDarkText)}>DreamPlay Learn</Link>
                            <NavDropdown
                                label="Features"
                                useDarkText={useDarkText}
                                items={[
                                    { label: "Product Info", href: "/product-information" },
                                    { label: "Buyer's Guide", href: "/buyers-guide" },
                                ]}
                            />

                            <NavDropdown
                                label="About Us"
                                useDarkText={useDarkText}
                                items={[
                                    { label: "Our Story", href: "/our-story" },
                                    { label: "The DS Standard", href: "/about-us/ds-standard" },
                                ]}
                            />

                            <NavDropdown
                                label="Manufacturing & Shipping"
                                useDarkText={useDarkText}
                                items={[
                                    { label: "Manufacturing", href: "/production-timeline" },
                                    { label: "Shipping", href: "/information-and-policies/shipping" },
                                ]}
                            />

                            <Link href="/information-and-policies/faq" className={linkClass(useDarkText)}>FAQ</Link>
                            <Link href="https://blog.dreamplaypianos.com/blog" className={linkClass(useDarkText)}>Blog</Link>

                        </nav>

                        {/* CTA + Auth */}
                        <div className="flex items-center gap-4">
                            <Link
                                onClick={() => trackClick("header", "start_customization")}
                                href="/customize"
                                className={`hidden md:flex items-center gap-2 rounded-none px-5 py-2.5 text-sm font-medium transition-all duration-300 ${useDarkText
                                    ? "bg-black border border-black text-white hover:bg-neutral-800"
                                    : "bg-white/5 backdrop-blur-sm border border-white/30 text-white hover:bg-white/15"
                                    }`}
                            >
                                Configure Yours
                                <span className="w-6 h-6 rounded-none flex items-center justify-center bg-white">
                                    <ArrowRight className="w-3 h-3 text-black" />
                                </span>
                            </Link>

                            {user ? (
                                <Link href="/vip" className={`hidden md:flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${useDarkText ? "text-neutral-500 hover:text-black" : "text-white/50 hover:text-white"}`}>
                                    <User className="w-3.5 h-3.5" /> Account
                                </Link>
                            ) : (
                                <div className={`hidden md:flex items-center gap-0 text-[10px] uppercase tracking-[0.15em] font-medium ${useDarkText ? "text-neutral-500" : "text-white/50"}`}>
                                    <button onClick={() => setIsRegisterOpen(true)} className={`uppercase transition-colors cursor-pointer ${useDarkText ? "hover:text-black" : "hover:text-white"}`}>
                                        Register
                                    </button>
                                    <span className="mx-1.5 opacity-30">|</span>
                                    <Link href="/login" className={`transition-colors ${useDarkText ? "hover:text-black" : "hover:text-white"}`}>
                                        Login
                                    </Link>
                                </div>
                            )}

                            <Button
                                variant="ghost"
                                size="icon"
                                className={`md:hidden ${useDarkText ? "text-neutral-900" : "text-white"}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {
                    isMobileMenuOpen && (
                        <div className="md:hidden absolute top-[100px] left-0 right-0 bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-2 duration-200">
                            <nav className="flex flex-col p-4">
                                <Link href="/how-it-works" className="py-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
                                <Link href="/better-practice" className="py-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>The Benefits</Link>
                                <Link href="/learn" className="py-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>DreamPlay Learn</Link>
                                <div className="border-t border-gray-200 my-2" />
                                <div className="px-1 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Features</div>
                                <Link href="/product-information" className="py-3 pl-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Product Info</Link>
                                <Link href="/buyers-guide" className="py-3 pl-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Buyer&apos;s Guide</Link>

                                <div className="border-t border-gray-200 my-2" />
                                <div className="px-1 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">About Us</div>
                                <Link href="/our-story" className="py-3 pl-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                                <Link href="/about-us/ds-standard" className="py-3 pl-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>The DS Standard</Link>

                                <div className="border-t border-gray-200 my-2" />
                                <div className="px-1 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Manufacturing & Shipping</div>
                                <Link href="/production-timeline" className="py-3 pl-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Manufacturing</Link>
                                <Link href="/information-and-policies/shipping" className="py-3 pl-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Shipping</Link>

                                <div className="border-t border-gray-200 my-2" />
                                <Link href="/information-and-policies/faq" className="py-3 text-neutral-600 hover:text-black font-medium border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
                                <Link href="https://blog.dreamplaypianos.com/blog" className="py-3 text-neutral-600 hover:text-black font-medium" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>


                                {!user && (
                                    <div className="py-2 flex items-center gap-3 border-t border-gray-100">
                                        <button
                                            onClick={() => { setIsRegisterOpen(true); setIsMobileMenuOpen(false); }}
                                            className="py-3 text-sm font-medium text-neutral-600 hover:text-black cursor-pointer"
                                        >
                                            Register
                                        </button>
                                        <span className="text-neutral-300">|</span>
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="py-3 text-sm font-medium text-neutral-600 hover:text-black"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                )}
                                {user && (
                                    <Link
                                        href="/vip"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="py-3 text-sm font-bold text-neutral-600 hover:text-black flex items-center gap-2"
                                    >
                                        <User className="w-4 h-4" /> My Account
                                    </Link>
                                )}
                                <Link
                                    href="/customize"
                                    className="mt-4 flex items-center justify-center gap-2 w-full bg-black text-white rounded-none py-3 font-medium"
                                    onClick={() => {
                                        trackClick("header", "start_customization_mobile")
                                        setIsMobileMenuOpen(false)
                                    }}
                                >
                                    Configure Yours
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </nav>
                        </div>
                    )
                }
            </header>

            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
    )
}
