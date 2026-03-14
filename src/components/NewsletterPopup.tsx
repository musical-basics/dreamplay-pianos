"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, FileText, Package, DollarSign, CheckCircle2 } from "lucide-react";

import { getDiscountPopupStatus, getJourneyById } from "@/actions/admin-actions";
import type { JourneyPopup } from "@/actions/admin-actions";
import { subscribeToNewsletter } from "@/actions/email-actions";
import { trackEmailConversion } from "@/components/EmailTracker";

type PopupType = "none" | "shipping" | "pdf" | "discount" | "discount_44" | "accessory_25" | "store_credit_25" | "priority_shipping";

/** Safe analytics wrapper — won't crash if tracker is blocked or hasn't loaded */
const trackPopup = (action: 'yes' | 'no', popupName: string) => {
    if (typeof window !== 'undefined' && (window as any).dreamplay?.track) {
        (window as any).dreamplay.track(`click_popup_${action}`, { popup: popupName });
    }
};

export default function NewsletterPopup() {
    const [activePopup, setActivePopup] = useState<PopupType>("none");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState<PopupType>("none");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const popupTimersRef = useRef<NodeJS.Timeout[]>([]);
    const hasExitFired = useRef(false);
    const pathname = usePathname();

    // Journey popup queue
    const journeyPopupsRef = useRef<JourneyPopup[]>([]);
    const popupIndexRef = useRef(0);

    // A/B test refs
    const abBucketRef = useRef<string | null>(null);

    useEffect(() => {
        const initPopups = async () => {
            console.log('[PopupDebug] initPopups() called');

            // If user is already mapped, skip popups entirely
            if (localStorage.getItem("dp_user_email")) {
                console.log('[PopupDebug] SKIPPED: dp_user_email found in localStorage');
                return;
            }
            if (localStorage.getItem("dp_v2_subscribed") === "true") {
                console.log('[PopupDebug] SKIPPED: dp_v2_subscribed=true in localStorage');
                return;
            }

            try {
                const status = await getDiscountPopupStatus();
                console.log('[PopupDebug] getDiscountPopupStatus() returned:', status, '(type:', typeof status, ')');
                if (String(status) !== 'true') {
                    console.log('[PopupDebug] SKIPPED: discount popup status is not true');
                    return;
                }
            } catch (e) {
                console.log('[PopupDebug] getDiscountPopupStatus() threw error, proceeding anyway:', e);
            }

            // Store journey ID for A/B conversion tracking
            const journeyMatch = document.cookie.match(/(^| )dp_journey_id=([^;]+)/);
            abBucketRef.current = journeyMatch?.[2] || 'default';
            console.log('[PopupDebug] dp_journey_id cookie:', journeyMatch?.[2] || 'NOT FOUND');

            // Fetch journey popups
            let popups: JourneyPopup[] = [];
            if (journeyMatch?.[2]) {
                try {
                    const journey = await getJourneyById(journeyMatch[2]);
                    console.log('[PopupDebug] getJourneyById() returned:', JSON.stringify(journey?.popups));
                    if (journey?.popups?.length) {
                        popups = journey.popups;
                    }
                } catch (e) {
                    console.log('[PopupDebug] getJourneyById() threw error:', e);
                }
            }

            // Fallback: if no journey popups configured, use a single PDF popup at 12s
            if (popups.length === 0) {
                popups = [{ type: "pdf", delaySeconds: 12 }];
                console.log('[PopupDebug] Using fallback popup (pdf at 12s)');
            }

            journeyPopupsRef.current = popups;
            console.log('[PopupDebug] Scheduling', popups.length, 'popups:', JSON.stringify(popups));

            // Schedule each popup with its delay
            popups.forEach((popup, index) => {
                const popupType = popup.type as PopupType;
                if (localStorage.getItem(`dp_v2_${popupType}_seen`) === 'true') {
                    console.log(`[PopupDebug] SKIPPED popup ${index} (${popupType}): already seen`);
                    return;
                }

                console.log(`[PopupDebug] Scheduling popup ${index}: ${popupType} at ${popup.delaySeconds}s`);
                const timer = setTimeout(() => {
                    console.log(`[PopupDebug] Timer fired for popup ${index}: ${popupType}`);
                    if (localStorage.getItem('dp_v2_subscribed') === 'true') {
                        console.log(`[PopupDebug] SKIPPED: user subscribed during wait`);
                        return;
                    }
                    if (localStorage.getItem(`dp_v2_${popupType}_seen`) === 'true') {
                        console.log(`[PopupDebug] SKIPPED: popup ${popupType} marked seen during wait`);
                        return;
                    }
                    // Only show if no popup is currently active
                    setActivePopup(prev => {
                        if (prev === "none") {
                            console.log(`[PopupDebug] SHOWING popup: ${popupType}`);
                            popupIndexRef.current = index;
                            return popupType;
                        }
                        console.log(`[PopupDebug] SKIPPED: another popup (${prev}) is already active`);
                        return prev;
                    });
                }, popup.delaySeconds * 1000);

                popupTimersRef.current.push(timer);
            });
        };

        initPopups();

        return () => {
            popupTimersRef.current.forEach(t => clearTimeout(t));
        };
    }, []);

    // --- EXIT-INTENT POPUP ---
    useEffect(() => {
        const excludedPaths = ["/vip", "/login", "/register", "/activate", "/forgot-password", "/reset-password"];
        if (excludedPaths.includes(pathname)) return;

        const handleMouseLeave = (e: MouseEvent) => {
            if (hasExitFired.current) return;
            if (e.clientY > 0) return;

            const isSubscribed = localStorage.getItem("dp_v2_subscribed") === "true" || !!localStorage.getItem("dp_user_email");
            if (isSubscribed) return;

            hasExitFired.current = true;
            console.log('[PopupDebug] Exit-intent fired');
            // Show first unseen popup from journey, or shipping as fallback
            const unseen = journeyPopupsRef.current.find(p =>
                localStorage.getItem(`dp_v2_${p.type}_seen`) !== 'true'
            );
            setActivePopup((unseen?.type || "shipping") as PopupType);
        };

        // Delay attaching exit-intent by 5s to prevent false triggers on page load/refresh
        const attachTimer = setTimeout(() => {
            document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        }, 5000);

        return () => {
            clearTimeout(attachTimer);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [pathname]);


    const handleClose = () => {
        setErrorMsg("");
        const popupTrackNames: Record<string, string> = {
            shipping: 'free_shipping',
            pdf: 'hand_size',
            discount: 'discount_300',
            discount_44: 'discount_44',
            accessory_25: 'accessory_25',
            store_credit_25: 'store_credit_25',
            priority_shipping: 'priority_shipping',
        };
        const trackName = popupTrackNames[activePopup];
        if (trackName) {
            trackPopup('no', trackName);
            localStorage.setItem(`dp_v2_${activePopup}_seen`, "true");
            setActivePopup("none");
            setIsSubmitted("none");
        } else {
            setActivePopup("none");
            setIsSubmitted("none");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        const currentOffer = activePopup;

        try {
            const tagMap: Record<string, string> = {
                shipping: "Free Shipping Lead",
                discount: "$300 Off Lead",
                discount_44: "44% Off Lead",
                accessory_25: "25% Accessory Lead",
                pdf: "Hand Guide Download",
            };
            const tag = tagMap[currentOffer] || "Hand Guide Download";
            const tempSession = localStorage.getItem("dp_temp_session") || undefined;

            const res = await subscribeToNewsletter({
                email,
                first_name: "",
                tags: [tag],
                temp_session_id: tempSession,
            });

            if (!res.success) {
                throw new Error(res.error || "Failed to subscribe");
            }

            // ── A/B Conversion Tracking ──
            if (abBucketRef.current) {
                fetch('/api/popup-ab', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'convert',
                        bucket: abBucketRef.current,
                        offer_type: currentOffer,
                    }),
                }).catch(() => { });
            }

            localStorage.setItem("dp_v2_subscribed", "true");
            localStorage.setItem("dp_v2_shipping_seen", "true");
            localStorage.setItem("dp_v2_pdf_seen", "true");
            localStorage.setItem("dp_v2_discount_seen", "true");
            localStorage.setItem("dp_user_email", email);
            if (res.id) localStorage.setItem("dp_subscriber_id", res.id);

            setIsSubmitted(currentOffer);
            trackEmailConversion('conversion_t1', window.location.pathname);
            trackPopup('yes', currentOffer === 'shipping' ? 'free_shipping' : currentOffer === 'discount' ? 'discount_300' : 'hand_size');

            // Auto-open PDF for pdf offer
            if (currentOffer === "pdf") {
                window.open(
                    "https://www.dropbox.com/scl/fi/9b72rbi4ga0pjterxyoan/DreamPlay-Infographic.pdf?rlkey=mc08i1ahn5tp3thdd0qjnag2d&st=olbh1t9w&dl=1",
                    "_blank"
                );
            }
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (activePopup === "none" && isSubmitted === "none") return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-none shadow-2xl p-8 md:p-10 animate-in fade-in zoom-in-95 duration-300">

                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                {isSubmitted === "none" ? (
                    <>
                        <div className="mb-8 text-center">
                            <div className="mx-auto bg-white/5 border border-white/10 w-14 h-14 rounded-none flex items-center justify-center mb-6">
                                {activePopup === "shipping" || activePopup === "priority_shipping" ? (
                                    <Package className="text-white" size={24} strokeWidth={1.5} />
                                ) : activePopup === "discount" || activePopup === "discount_44" ? (
                                    <DollarSign className="text-white" size={24} strokeWidth={1.5} />
                                ) : activePopup === "accessory_25" || activePopup === "store_credit_25" ? (
                                    <DollarSign className="text-white" size={24} strokeWidth={1.5} />
                                ) : (
                                    <FileText className="text-white" size={24} strokeWidth={1.5} />
                                )}
                            </div>

                            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">
                                {activePopup === "shipping" ? "Waitlist Exclusive"
                                    : activePopup === "discount" ? "Founder's Batch"
                                        : activePopup === "discount_44" ? "Limited Time Offer"
                                            : activePopup === "accessory_25" ? "Bundle & Save"
                                                : activePopup === "store_credit_25" ? "Exclusive Offer"
                                                    : activePopup === "priority_shipping" ? "Priority Access"
                                                        : "Free Resource"}
                            </p>

                            <h2 className="text-2xl md:text-3xl font-serif text-white tracking-tight leading-tight mb-4">
                                {activePopup === "shipping"
                                    ? "Unlock Free Global Shipping."
                                    : activePopup === "discount"
                                        ? "Lock in Founder's Pricing."
                                        : activePopup === "discount_44"
                                            ? "Get 44% Off Today."
                                            : activePopup === "accessory_25"
                                                ? "25% Off All Accessories."
                                                : activePopup === "store_credit_25"
                                                    ? "Get $25 Store Credit."
                                                    : activePopup === "priority_shipping"
                                                        ? "Get Priority Shipping."
                                                        : "Are standard keys holding you back?"}
                            </h2>

                            <p className="text-white/60 font-sans text-sm leading-relaxed">
                                {activePopup === "shipping"
                                    ? "Join our VIP list and get a Free Shipping Pass applied to your next reservation. Limited availability."
                                    : activePopup === "discount"
                                        ? "Enter your email to secure early-adopter pricing for the DreamPlay One Founder's Batch, shipping August 2026."
                                        : activePopup === "discount_44"
                                            ? "Enter your email now to unlock an exclusive 44% discount on the DreamPlay One. This offer won't last."
                                            : activePopup === "accessory_25"
                                                ? "Enter your email to get 25% off our stand, pedal, and bench bundle when you order with your DreamPlay One."
                                                : activePopup === "store_credit_25"
                                                    ? "Enter your email and we'll send you $25 off any piano accessory — bench, stand, or headphones."
                                                    : activePopup === "priority_shipping"
                                                        ? "Enter your email to get priority status for early shipping. Be among the first to receive your DreamPlay One."
                                                        : "Enter your email to instantly download our Hand-Measuring Guide to see exactly which piano size will help you the most."}
                            </p>
                        </div>

                        {errorMsg && (
                            <div className="mb-4 p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-sans text-center">
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-4 rounded-none border border-white/20 bg-transparent placeholder-white/40 text-white focus:ring-1 focus:ring-white focus:border-white outline-none transition-all font-sans text-sm"
                            />

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white text-black font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-none hover:bg-white/90 transition-colors disabled:opacity-70 cursor-pointer"
                            >
                                {isLoading
                                    ? "Processing..."
                                    : activePopup === "shipping"
                                        ? "Get Free Shipping Pass"
                                        : activePopup === "discount"
                                            ? "Secure My Spot"
                                            : activePopup === "discount_44"
                                                ? "Claim 44% Off"
                                                : activePopup === "accessory_25"
                                                    ? "Get 25% Off Accessories"
                                                    : activePopup === "store_credit_25"
                                                        ? "Claim My $25 Credit"
                                                        : activePopup === "priority_shipping"
                                                            ? "Get Priority Status"
                                                            : "Get Free PDF Guide"}
                            </button>

                            <button
                                type="button"
                                onClick={handleClose}
                                className="w-full mt-1 text-white/30 hover:text-white/60 font-sans text-xs uppercase tracking-widest transition-colors cursor-pointer py-2"
                            >
                                Remind Me Later
                            </button>
                            <p className="text-[10px] text-center text-white/40 uppercase tracking-widest mt-2">
                                No spam. Unsubscribe anytime.
                            </p>
                        </form>
                    </>
                ) : isSubmitted === "shipping" || isSubmitted === "discount" || isSubmitted === "discount_44" || isSubmitted === "accessory_25" || isSubmitted === "store_credit_25" || isSubmitted === "priority_shipping" ? (
                    /* ── Shipping / Discount Success: Check your email ── */
                    <div className="text-center py-6">
                        <div className="mx-auto bg-white border border-white/20 w-16 h-16 rounded-none flex items-center justify-center mb-6">
                            <CheckCircle2 className="text-black" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif text-white mb-3">Check your inbox.</h3>
                        <p className="text-white/60 font-sans text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                            {isSubmitted === "discount"
                                ? "We just sent you an email with your exclusive $300 discount code. Use it at checkout to save on any DreamPlay keyboard or bundle."
                                : isSubmitted === "discount_44"
                                    ? "We just sent you an email with your exclusive 44% discount code. Use it at checkout to save on any DreamPlay keyboard."
                                    : isSubmitted === "accessory_25"
                                        ? "We just sent you an email with your exclusive 25% accessory discount. Use it at checkout with your DreamPlay order."
                                        : isSubmitted === "store_credit_25"
                                            ? "Your $25 store credit has been reserved. We'll send the details to your email."
                                            : isSubmitted === "priority_shipping"
                                                ? "You're on the priority list for early shipping. We'll keep you updated."
                                                : "We just sent you an email with instructions to unlock your VIP Free Shipping Pass. Create your account to claim it."
                            }
                        </p>
                        <button
                            onClick={handleClose}
                            className="bg-transparent border border-white/30 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 w-full rounded-none hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            Continue Exploring
                        </button>
                    </div>
                ) : (
                    /* ── PDF Success ── */
                    <div className="text-center py-6">
                        <div className="mx-auto bg-white border border-white/20 w-16 h-16 rounded-none flex items-center justify-center mb-6">
                            <CheckCircle2 className="text-black" size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-serif text-white mb-3">Your guide is downloading!</h3>
                        <p className="text-white/60 font-sans text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                            Check your new tab for the PDF. Print it out, place your hand on the guide, and discover your ideal key size.
                        </p>
                        <button
                            onClick={handleClose}
                            className="bg-transparent border border-white/30 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 w-full rounded-none hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            Continue Exploring
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
