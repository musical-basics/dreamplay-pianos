"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- STORIES DATA ---
const stories = [
    {
        image: "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=2070&auto=format&fit=crop",
        quote: `"I often witness pianists place their hands for the first time on a keyboard that better suits their hand span. How often the pianist spontaneously bursts into tears. A lifetime of struggling with a seemingly insurmountable problem vanishes in the moment they realize, 'It's not me that is the problem; it is the instrument!' Following on that, the joy of possibility overwhelms them."`,
        avatar: "https://ui-avatars.com/api/?name=Carol+Leone&background=random",
        name: "Dr. Carol Leone",
        role: "Chair of Piano Studies",
        school: "SMU Meadows School of the Arts"
    },
    {
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2070&auto=format&fit=crop",
        quote: `"I can play for much longer and continue to play every day. I don’t get frustrated from the pain and from being limited in my playing."`,
        avatar: "https://ui-avatars.com/api/?name=Jen+McCabe&background=random",
        name: "Jen McCabe",
        role: "Pianist, teacher, music director",
        school: "harmonypianostudio.com"
    },
    {
        image: "https://images.unsplash.com/photo-1623933924307-e4359654d673?q=80&w=2070&auto=format&fit=crop",
        quote: `"My favorite story is from a piano performance major, who couldn't believe that playing the piano didn't have to hurt. The instrument restored her joy for piano repertoire. She had been preparing to change over to harpsichord due to keyboard size issues. I will never forget the day she first played a Chopin ballade on the DS5.5. She literally could not stop beaming."`,
        avatar: "https://ui-avatars.com/api/?name=Kathryn+Owens&background=random",
        name: "Kathryn-Ananda Owens",
        role: "Professor of Music - Piano",
        school: "St Olaf College, Minnesota"
    }
];

export default function WhyNarrowPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const scienceSectionRef = useRef<HTMLElement>(null);

    // --- SLIDER LOGIC ---
    const totalSlides = stories.length;
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

    // --- CHART ANIMATION LOGIC ---
    useEffect(() => {
        const section = scienceSectionRef.current;
        if (!section) return;

        const donuts = section.querySelectorAll(".dp-donut") as NodeListOf<HTMLElement>;
        let hasAnimated = false;

        const runAnimation = () => {
            if (hasAnimated) return;
            hasAnimated = true;

            donuts.forEach((donut) => {
                const targetStr = donut.getAttribute("data-target-degree");
                if (!targetStr) return;
                const targetDegree = parseFloat(targetStr);
                const duration = 1500;
                let startTime: number | null = null;
                const colorRed = "#ff2d55";
                const colorGreen = "#34c759";

                function animateFrame(timestamp: number) {
                    if (!startTime) startTime = timestamp;
                    const progress = timestamp - startTime;
                    const percent = Math.min(progress / duration, 1);
                    // EaseOutQuart: 1 - (1-t)^4
                    const ease = 1 - Math.pow(1 - percent, 4);
                    const currentAngle = targetDegree * ease;
                    donut.style.background = `conic-gradient(${colorRed} 0deg ${currentAngle}deg, ${colorGreen} ${currentAngle}deg 360deg)`;
                    if (progress < duration) window.requestAnimationFrame(animateFrame);
                }
                window.requestAnimationFrame(animateFrame);
            });
        };

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            runAnimation();
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.3 }
            );
            observer.observe(section);
            return () => observer.disconnect();
        } else {
            runAnimation();
        }
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="main-wrapper">
                {/* --- STORIES SECTION --- */}
                <section className="dp-stories-wrapper">
                    <style jsx>{`
            .dp-stories-wrapper {
              background-color: #000000;
              color: #ffffff;
              font-family: system-ui, -apple-system, sans-serif;
              padding: 4rem 1.5rem;
              display: flex;
              justify-content: center;
              overflow: hidden;
            }
            .dp-stories-container {
              width: 100%;
              max-width: 80rem;
              margin: 0 auto;
              position: relative;
            }
            .dp-stories-header {
              text-align: center;
              margin-bottom: 4rem;
            }
            .dp-stories-eyebrow {
              font-size: 1rem;
              font-weight: 500;
              letter-spacing: 0.05em;
              color: rgba(255, 255, 255, 0.7);
              margin-bottom: 1rem;
              display: block;
            }
            .dp-stories-title {
              font-size: 3rem;
              font-weight: 700;
              line-height: 1.1;
              letter-spacing: -0.02em;
              margin: 0;
            }
            .dp-slider-viewport {
              position: relative;
              width: 100%;
              overflow: hidden;
            }
            .dp-slider-track {
              display: flex;
              transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
              width: 100%;
            }
            .dp-slide {
              min-width: 100%;
              box-sizing: border-box;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 4rem;
              align-items: center;
              padding: 0 1rem;
            }
            .dp-slide-image-wrapper {
              position: relative;
              width: 100%;
              padding-top: 100%;
              border-radius: 1.5rem;
              overflow: hidden;
              background: #1a1a1a;
            }
            .dp-slide-img {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .dp-quote-text {
              font-size: 1.35rem;
              line-height: 1.5;
              font-weight: 400;
              color: #ffffff;
              margin-bottom: 3rem;
            }
            .dp-author-controls-row {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              border-top: 1px solid rgba(255, 255, 255, 0.2);
              padding-top: 1.5rem;
            }
            .dp-author-info {
              display: flex;
              align-items: center;
              gap: 1rem;
            }
            .dp-author-avatar {
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
              background: #333;
              overflow: hidden;
              flex-shrink: 0;
            }
            .dp-author-avatar img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .dp-author-text h4 {
              font-size: 1rem;
              font-weight: 700;
              margin: 0;
              color: #fff;
            }
            .dp-author-text p {
              font-size: 0.85rem;
              margin: 0.2rem 0 0 0;
              color: rgba(255, 255, 255, 0.6);
              max-width: 16rem;
              line-height: 1.3;
            }
            .dp-nav-container {
              display: flex;
              align-items: center;
              gap: 1.5rem;
            }
            .dp-nav-dots {
              display: flex;
              gap: 0.5rem;
            }
            .dp-dot {
              width: 8px;
              height: 8px;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              cursor: pointer;
              transition: background 0.3s;
            }
            .dp-dot.active {
              background: #ffffff;
            }
            .dp-nav-arrows {
              display: flex;
              gap: 0.75rem;
            }
            .dp-arrow-btn {
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.3);
              color: white;
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            .dp-arrow-btn:hover {
              background: white;
              color: black;
              border-color: white;
            }
            @media (max-width: 900px) {
              .dp-slide {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: left;
              }
            }
            @media (max-width: 768px) {
              .dp-stories-title { font-size: 2.25rem; }
            }
          `}</style>

                    <div className="dp-stories-container">
                        <div className="dp-stories-header">
                            <span className="dp-stories-eyebrow">Why We’re Doing This</span>
                            <h2 className="dp-stories-title">Playing the piano<br />doesn’t have to hurt</h2>
                        </div>
                        <div className="dp-slider-viewport">
                            <div
                                className="dp-slider-track"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {stories.map((story, i) => (
                                    <div key={i} className="dp-slide">
                                        <div className="dp-slide-image-wrapper">
                                            <img src={story.image} alt="Pianist" className="dp-slide-img" />
                                        </div>
                                        <div className="dp-content-col">
                                            <div className="dp-quote-text">{story.quote}</div>
                                            <div className="dp-author-controls-row">
                                                <div className="dp-author-info">
                                                    <div className="dp-author-avatar">
                                                        <img src={story.avatar} alt={story.name} />
                                                    </div>
                                                    <div className="dp-author-text">
                                                        <h4>{story.name}</h4>
                                                        <p>{story.role}<br />{story.school}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
                            <div className="dp-nav-container">
                                <div className="dp-nav-dots">
                                    {stories.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`dp-dot ${i === currentSlide ? "active" : ""}`}
                                            onClick={() => setCurrentSlide(i)}
                                        />
                                    ))}
                                </div>
                                <div className="dp-nav-arrows">
                                    <button className="dp-arrow-btn" onClick={prevSlide} aria-label="Previous Slide">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <button className="dp-arrow-btn" onClick={nextSlide} aria-label="Next Slide">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- DIVIDER --- */}
                <div style={{ width: "100%", maxWidth: "80rem", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", margin: "0 auto", display: "block" }}></div>

                {/* --- SCIENCE SECTION --- */}
                <section id="science-section" ref={scienceSectionRef} className="dp-section-wrapper dp-section-padding">
                    <style jsx>{`
            .dp-section-wrapper {
              width: 100%;
              background-color: #000000;
              color: #ffffff;
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .dp-section-padding { padding: 6rem 0; }
            .dp-content-container {
              width: 100%;
              max-width: 80rem;
              padding: 0 1.5rem;
              box-sizing: border-box;
            }
            .dp-center { text-align: center; }
            .dp-h2 {
              font-size: 2.5rem;
              font-weight: 700;
              letter-spacing: -0.02em;
              margin: 0 0 1.5rem;
              line-height: 1.1;
              color: #fff;
            }
            @media (min-width: 768px) { .dp-h2 { font-size: 3rem; } }
            .dp-mb-lg { margin-bottom: 4rem; }
            .dp-stat-number {
              font-size: 3.5rem;
              font-weight: 700;
              letter-spacing: -0.04em;
              line-height: 1;
              margin-bottom: 0.5rem;
              display: block;
            }
            .dp-sub-stat {
              font-size: 1.25rem;
              font-weight: 600;
              margin-bottom: 0.25rem;
              color: #fff;
            }
            .dp-text-soft {
              color: rgba(255, 255, 255, 0.7);
              font-size: 0.95rem;
              line-height: 1.6;
            }
            .dp-grid-2 {
              display: grid;
              grid-template-columns: 1fr;
              gap: 3rem;
            }
            @media (min-width: 768px) { .dp-grid-2 { grid-template-columns: repeat(2, 1fr); } }
            .dp-chart-card {
              background: #111111;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 1.5rem;
              padding: 2rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              transition: transform 0.2s ease;
            }
            .dp-chart-card:hover { border-color: rgba(255, 255, 255, 0.2); }
            .dp-chart-shell {
              position: relative;
              width: 200px;
              height: 200px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 1rem;
            }
            .dp-donut {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: conic-gradient(#333 0deg 360deg);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .dp-donut-inner {
              width: 120px;
              height: 120px;
              background: #111111;
              border-radius: 50%;
              position: absolute;
            }
            .dp-donut-value {
              position: absolute;
              font-size: 2rem;
              font-weight: 700;
              z-index: 2;
              color: #ff2d55;
            }
            .dp-legend {
              display: flex;
              gap: 1.5rem;
              font-size: 0.85rem;
              margin-top: 1rem;
            }
            .dp-legend-item { display: flex; align-items: center; gap: 0.5rem; color: #ccc; }
            .dp-dot-small { width: 8px; height: 8px; border-radius: 50%; }
            .dp-dot-red { background: #ff2d55; }
            .dp-dot-green { background: #34c759; }
            .dp-split-stats {
              margin-top: 4rem;
              padding-top: 3rem;
              border-top: 1px solid rgba(255, 255, 255, 0.15);
              display: grid;
              grid-template-columns: 1fr;
              gap: 2rem;
            }
            @media (min-width: 768px) { .dp-split-stats { grid-template-columns: repeat(2, 1fr); } }
            .dp-kpi-val { font-size: 3rem; font-weight: 700; line-height: 1; margin-bottom: 0.5rem; }
            .dp-kpi-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 0.5rem; display: block; }
          `}</style>

                    <div className="dp-content-container">
                        <div className="dp-center dp-mb-lg">
                            <h2 className="dp-h2">The Hidden Barrier</h2>
                        </div>
                        <div className="dp-grid-2">
                            <div>
                                <div className="dp-center" style={{ marginBottom: "2rem" }}>
                                    <span className="dp-stat-number">87%</span>
                                    <span className="dp-sub-stat">of females</span>
                                    <p className="dp-text-soft" style={{ maxWidth: "18rem", margin: "0.5rem auto 0" }}>Have hand spans smaller than the 8.5 inch minimum that standard keyboards expect.</p>
                                </div>
                                <div className="dp-chart-card">
                                    <div className="dp-chart-shell">
                                        <div className="dp-donut" data-target-degree="313.2">
                                            <div className="dp-donut-inner"></div>
                                            <div className="dp-donut-value">87%</div>
                                        </div>
                                    </div>
                                    <div className="dp-legend">
                                        <div className="dp-legend-item">
                                            <div className="dp-dot-small dp-dot-red"></div>Too small
                                        </div>
                                        <div className="dp-legend-item">
                                            <div className="dp-dot-small dp-dot-green"></div>Comfortable
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="dp-center" style={{ marginBottom: "2rem" }}>
                                    <span className="dp-stat-number">24%</span>
                                    <span className="dp-sub-stat">of males</span>
                                    <p className="dp-text-soft" style={{ maxWidth: "18rem", margin: "0.5rem auto 0" }}>Also fall below the comfortable reach threshold for a standard 6.5 inch keyboard.</p>
                                </div>
                                <div className="dp-chart-card">
                                    <div className="dp-chart-shell">
                                        <div className="dp-donut" data-target-degree="86.4">
                                            <div className="dp-donut-inner"></div>
                                            <div className="dp-donut-value">24%</div>
                                        </div>
                                    </div>
                                    <div className="dp-legend">
                                        <div className="dp-legend-item">
                                            <div className="dp-dot-small dp-dot-red"></div>Too small
                                        </div>
                                        <div className="dp-legend-item">
                                            <div className="dp-dot-small dp-dot-green"></div>Comfortable
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dp-split-stats">
                            <div>
                                <div className="dp-kpi-val">8.5"</div>
                                <span className="dp-kpi-label">The Threshold</span>
                                <p className="dp-text-soft">Minimum hand span needed to play a conventional 6.5 inch keyboard from Yamaha or Steinway with real comfort.</p>
                            </div>
                            <div>
                                <div className="dp-kpi-val">25-30%</div>
                                <span className="dp-kpi-label">Larger Reach Required</span>
                                <p className="dp-text-soft">Hand span often needs to be at least one quarter larger than the octave just to reach 8ths, 9ths, and 10ths without strain.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- DIVIDER --- */}
                <div style={{ width: "100%", maxWidth: "80rem", height: "1px", backgroundColor: "rgba(255, 255, 255, 0.15)", margin: "0 auto", display: "block" }}></div>

                {/* --- RESEARCH SECTION --- */}
                <section className="dp-section-wrapper dp-section-padding">
                    <style jsx>{`
             .dp-research-grid {
                display: grid;
                gap: 1.5rem;
                margin-bottom: 4rem;
                grid-template-columns: 1fr;
             }
             @media (min-width: 768px) { .dp-research-grid { grid-template-columns: repeat(2, 1fr); } }
             .dp-pill-card {
                border-radius: 1rem;
                border: 1px solid rgba(255, 255, 255, 0.15);
                background: #111111;
                padding: 1.75rem;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
             }
             .dp-pill-card:hover {
                background: #161616;
                transform: translateY(-2px);
                border-color: rgba(255, 255, 255, 0.3);
             }
             .dp-card-title { font-size: 1.1rem; font-weight: 600; color: #fff; margin-bottom: 0.25rem; }
             .dp-card-meta { font-size: 0.85rem; color: #888; margin-bottom: 1rem; }
             .dp-card-body { font-size: 0.95rem; color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 1.5rem; }
             .dp-card-cta {
                margin-top: auto;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: #f5f5f7;
                color: #000;
                padding: 0.5rem 1rem;
                border-radius: 999px;
                font-size: 0.8rem;
                font-weight: 600;
                text-decoration: none;
                transition: background 0.2s;
             }
             .dp-card-cta:hover { background: #fff; }
             .dp-academic-block {
                background: linear-gradient(145deg, #111, #1a1a1a);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 1.5rem;
                padding: 2rem;
             }
             .dp-academic-list {
                display: grid;
                gap: 1.5rem;
                margin-top: 2rem;
                grid-template-columns: 1fr;
             }
             @media (min-width: 768px) { .dp-academic-list { grid-template-columns: repeat(2, 1fr); } }
             .dp-uni-item { display: flex; gap: 1rem; }
             .dp-check-icon { 
                width: 24px; height: 24px; 
                background: #000; 
                border-radius: 50%; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0;
             }
           `}</style>

                    <div className="dp-content-container">
                        <div className="dp-center dp-mb-lg">
                            <h2 className="dp-h2">Published Research</h2>
                            <p className="dp-text-soft" style={{ maxWidth: "36rem", margin: "0 auto" }}>Decades of peer reviewed research explain why standard keyboards hold most pianists back.</p>
                        </div>

                        <div className="dp-research-grid">
                            {/* Card 1 */}
                            <div className="dp-pill-card">
                                <div className="dp-card-title">Hand size and performance related injuries</div>
                                <div className="dp-card-meta">Applied Ergonomics, 2021</div>
                                <div className="dp-card-body">Pianists with smaller hands show <strong>reduced muscular effort and lower perceived strain</strong> when they move to 5.5 inch octave keyboards instead of standard size.</div>
                                <a href="https://www.sciencedirect.com/science/article/abs/pii/S0003687021001654" target="_blank" className="dp-card-cta">
                                    Read full study
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                                </a>
                            </div>
                            {/* Card 2 */}
                            <div className="dp-pill-card">
                                <div className="dp-card-title">Gender differences and career impact</div>
                                <div className="dp-card-meta">Susan Tomes</div>
                                <div className="dp-card-body">Studies note that <strong>internationally acclaimed women pianists tend to have larger hands</strong>, which aligns with a repertoire that often expects very wide reaches.</div>
                                <a href="https://www.susantomes.com/blog/hand-size-gender-differences-pianists-acclaim/" target="_blank" className="dp-card-cta">
                                    Read article
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                                </a>
                            </div>
                            {/* Card 3 */}
                            <div className="dp-pill-card">
                                <div className="dp-card-title">Benefits of ergonomically scaled keyboards</div>
                                <div className="dp-card-meta">Survey of reduced size users</div>
                                <div className="dp-card-body">Players report <strong>relief from pain, faster technical progress, and greater comfort</strong> when they move to keyboards that match their hand span.</div>
                                <a href="https://www.researchgate.net/publication/264457999" target="_blank" className="dp-card-cta">
                                    Read full study
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                                </a>
                            </div>
                            {/* Card 4 */}
                            <div className="dp-pill-card">
                                <div className="dp-card-title">Performance quality improvements</div>
                                <div className="dp-card-meta">PASK findings</div>
                                <div className="dp-card-body"><strong>Shorter reaches and reduced wrist travel</strong> on compatible keyboards are linked to better control and lower risk of overuse injuries.</div>
                                <a href="https://paskpiano.org/performance-quality/" target="_blank" className="dp-card-cta">
                                    Learn more
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                                </a>
                            </div>
                        </div>

                        <div className="dp-academic-block">
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 0.5rem", color: "#fff" }}>Academic recognition</h3>
                            <p className="dp-text-soft">The Donison Steinbuhler standard appears in research and teaching at leading institutions.</p>
                            <div className="dp-academic-list">
                                <div className="dp-uni-item">
                                    <div className="dp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, stroke: "#34c759" }}><path d="M20 6 9 17l-5-5"></path></svg></div>
                                    <div>
                                        <h4 style={{ fontSize: "0.95rem", fontWeight: 600, margin: "0 0 0.25rem", color: "#fff" }}>Stanford University</h4>
                                        <p className="dp-text-soft" style={{ fontSize: "0.85rem", margin: 0 }}>Research and advocacy around scaled keyboards in music education and injury prevention.</p>
                                    </div>
                                </div>
                                <div className="dp-uni-item">
                                    <div className="dp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14, stroke: "#34c759" }}><path d="M20 6 9 17l-5-5"></path></svg></div>
                                    <div>
                                        <h4 style={{ fontSize: "0.95rem", fontWeight: 600, margin: "0 0 0.25rem", color: "#fff" }}>Johns Hopkins Peabody Institute</h4>
                                        <p className="dp-text-soft" style={{ fontSize: "0.85rem", margin: 0 }}>Use of alternative sizes inside curriculum and performance programs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Spacer */}
                <div className="div-block-7"></div>
            </main>
            <Footer />
        </div>
    );
}
