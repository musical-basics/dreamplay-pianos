"use strict";
"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Links from the original HTML
    const links = [
        { text: "Why Narrow?", href: "https://www.dreamplaypianos.com/why-narrow" },
        { text: "How It Works", href: "https://www.dreamplaypianos.com/how-it-works" },
        { text: "Our Story", href: "https://www.dreamplaypianos.com/our-story" },
        { text: "FAQ", href: "https://www.dreamplaypianos.com/faq" },
        { text: "Shipping", href: "/information-and-policies/shipping" }, // Corrected local link
        { text: "Refund Policy", href: "https://www.dreamplaypianos.com/reserve" },
        { text: "Contact Us", href: "https://www.dreamplaypianos.com/reserve" },
        { text: "Careers", href: "https://www.dreamplaypianos.com/reserve" },
        // { text: "Text Link", href: "#" }, // Filtered out by script logic if href is #
        // { text: "Text Link", href: "#" },
    ];

    // Logic to split links
    const midPoint = Math.ceil(links.length / 2);
    const leftLinks = links.slice(0, midPoint);
    const rightLinks = links.slice(midPoint);

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const email = (form.elements.namedItem("EMAIL") as HTMLInputElement).value;
        const fname = (form.elements.namedItem("FNAME") as HTMLInputElement).value;
        const ACTION_URL = 'https://dreamplaypianos.us12.list-manage.com/subscribe/post?u=90fbaa21ba86eecae78c767a8&id=cc37fd2637&f_id=00c46be9f0';

        // Create hidden iframe and form to simulate the submission
        const iframeName = 'footer_iframe_' + Date.now();
        const iframe = document.createElement('iframe');
        iframe.name = iframeName;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const hiddenForm = document.createElement('form');
        hiddenForm.action = ACTION_URL;
        hiddenForm.method = 'POST';
        hiddenForm.target = iframeName;

        const payload = { EMAIL: email, FNAME: fname };
        for (const [key, value] of Object.entries(payload)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            hiddenForm.appendChild(input);
        }

        document.body.appendChild(hiddenForm);
        hiddenForm.submit();

        // Mock success after delay (since we can't easily read iframe response cross-origin)
        setTimeout(() => {
            alert('Thanks for subscribing!');
            setSuccess(true);
            setLoading(false);

            // Cleanup
            setTimeout(() => {
                setSuccess(false);
                document.body.removeChild(hiddenForm);
                document.body.removeChild(iframe);
                form.reset();
            }, 2000);
        }, 1500);
    };

    return (
        <>
            <style jsx>{`
        /* --- BASE SETTINGS --- */
        .dp-footer {
          background-color: #050505;
          color: #a1a1aa;
          font-family: 'Manrope', sans-serif;
          padding: 100px 5% 60px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .dp-footer::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%);
          pointer-events: none;
          z-index: 0;
        }
        .dp-footer-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr 1.4fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        /* --- COLUMN 1: BRAND & LOGO --- */
        .dp-brand-logo-link {
          display: inline-block;
          margin-bottom: 25px;
          text-decoration: none;
        }
        .dp-brand-logo {
          height: 32px;
          width: auto;
          display: block;
        }
        .dp-brand-desc {
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 30px;
          max-width: 300px;
          color: #888;
        }
        .dp-social-links {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .dp-social-icon-link {
          color: #ffffff;
          text-decoration: none;
          opacity: 0.6;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dp-social-icon-link:hover {
          opacity: 1;
          transform: translateY(-3px);
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.4));
        }
        .dp-social-svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }
        /* --- COLUMN 2: NAVIGATION --- */
        .dp-nav-title {
          color: #ffffff;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          margin-bottom: 25px;
          opacity: 0.8;
        }
        .dp-nav-inner-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .dp-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .dp-nav-link {
          color: #a1a1aa;
          text-decoration: none;
          font-size: 15px;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
          white-space: nowrap;
        }
        .dp-nav-link:hover {
          color: #ffffff;
          transform: translateX(8px);
        }
        .dp-nav-link::before {
          content: '→';
          position: absolute;
          left: -20px;
          opacity: 0;
          transition: all 0.3s ease;
        }
        .dp-nav-link:hover::before {
          opacity: 1;
          left: -15px;
        }
        /* --- COLUMN 3: GLASS CARD NEWSLETTER --- */
        .dp-glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 40px;
          border-radius: 20px;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .dp-glass-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
        }
        .dp-glass-title {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 10px;
        }
        .dp-input-wrapper {
          position: relative;
          margin-top: 25px;
        }
        .dp-email-input {
          width: 100%;
          padding: 16px 20px;
          padding-right: 120px; // Space for button
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s;
        }
        .dp-email-input:focus {
          border-color: rgba(255,255,255,0.4);
        }
        .dp-subscribe-btn {
          position: absolute;
          right: 5px;
          top: 5px;
          bottom: 5px;
          padding: 0 24px;
          border-radius: 40px;
          background: #ffffff;
          color: #000;
          border: none;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .dp-subscribe-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
        }
        /* --- BOTTOM BAR --- */
        .dp-footer-bottom {
          max-width: 1200px;
          margin: 80px auto 0;
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #555;
        }
        .dp-legal-link {
          color: #555;
          text-decoration: none;
          margin-left: 25px;
          transition: color 0.2s;
        }
        .dp-legal-link:hover { color: #a1a1aa; }
        /* --- MOBILE --- */
        @media (max-width: 768px) {
          .dp-footer-grid { grid-template-columns: 1fr; gap: 50px; }
          .dp-nav-inner-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
          .dp-footer { padding: 60px 5%; }
          .dp-footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
          .dp-legal-link { margin: 0 10px; }
        }
        @media (max-width: 480px) {
          .dp-nav-inner-grid { grid-template-columns: 1fr; }
        }
      `}</style>
            <footer className="dp-footer">
                <div className="dp-footer-grid">
                    <div>
                        <Link href="/" className="dp-brand-logo-link">
                            <img src="/images/Logo.svg" alt="DreamPlay Logo" className="dp-brand-logo" />
                        </Link>
                        <p className="dp-brand-desc">
                            Pianos designed for the human hand. Experience the joy of possibility without the strain.
                        </p>
                        <div className="dp-social-links">
                            <a href="#" className="dp-social-icon-link" aria-label="Instagram">
                                <svg className="dp-social-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.645.069 1.645.069 4.85s-.012 3.584-.069 4.85c-.148 3.252-1.667 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.012-4.85-.069c-3.252-.148-4.771-1.667-4.919-4.919-.058-1.265-.069-1.644-.069-4.85s.012-3.584.069-4.85c.148-3.252 1.667-4.771 4.919-4.919 1.265-.058 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.073-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                                </svg>
                            </a>
                            <a href="#" class="dp-social-icon-link" aria-label="YouTube">
                                <svg className="dp-social-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                                </svg>
                            </a>
                            <a href="#" class="dp-social-icon-link" aria-label="X (Twitter)">
                                <svg className="dp-social-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="dp-nav-title">Explore</div>
                        <div className="dp-nav-inner-grid">
                            <ul className="dp-nav-list" id="dp-footer-list-left">
                                {leftLinks.map((link, i) => (
                                    <li key={i}>
                                        {link.href.startsWith("http") ? (
                                            <a href={link.href} className="dp-nav-link">{link.text}</a>
                                        ) : (
                                            <Link href={link.href} className="dp-nav-link">{link.text}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <ul className="dp-nav-list" id="dp-footer-list-right">
                                {rightLinks.map((link, i) => (
                                    <li key={i}>
                                        {link.href.startsWith("http") ? (
                                            <a href={link.href} className="dp-nav-link">{link.text}</a>
                                        ) : (
                                            <Link href={link.href} className="dp-nav-link">{link.text}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="dp-glass-card">
                        <div className="dp-glass-title">Join the movement</div>
                        <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "0" }}>
                            Be the first to know when pre-orders open.
                        </p>
                        <form onSubmit={handleSubscribe}>
                            <div style={{ marginBottom: "12px" }}>
                                <input type="text" name="FNAME" id="footer-fname" className="dp-email-input" placeholder="First Name" style={{ paddingRight: "20px" }} required />
                            </div>
                            <div className="dp-input-wrapper" style={{ marginTop: "0" }}>
                                <input type="email" name="EMAIL" id="footer-email" className="dp-email-input" placeholder="email@address.com" required />
                                <button type="submit" id="footer-submit-btn" className="dp-subscribe-btn" disabled={loading}>
                                    {loading ? "..." : success ? "✓" : "Subscribe"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="dp-footer-bottom">
                    <div>© 2025 DreamPlay Pianos. All rights reserved.</div>
                    <div>
                        <Link href="#" className="dp-legal-link">Privacy Policy</Link>
                        <Link href="#" className="dp-legal-link">Terms of Service</Link>
                        <Link href="#" className="dp-legal-link">Cookies</Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
