"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HowItWorksPage() {
    // --- CALCULATOR STATE ---
    const [sliderValue, setSliderValue] = useState(50);
    const [calcResult, setCalcResult] = useState({
        realVal: 8.0,
        cm: 20.3,
        zone: "B",
        model: "DS6.0",
        rangeText: "Hand span range: 7.6 to 8.5 inches",
        desc: "The 'Goldilocks' size. Slightly narrower than standard, giving you the power of a concert pianist without the stretching fatigue.",
        reach: "Play 10ths with new ease",
        activeColor: "rgba(245, 158, 11, 1)",
    });

    // --- CALCULATOR LOGIC ---
    const visualZoneA_End = 33.33;
    const visualZoneB_End = 66.66;

    const cZoneA = "rgba(244, 63, 94, 1)";
    const cZoneB = "rgba(245, 158, 11, 1)";
    const cZoneC = "rgba(45, 212, 191, 1)";

    const getRealValue = (percent: number) => {
        if (percent <= visualZoneA_End) {
            return 6.0 + (percent / visualZoneA_End) * (7.6 - 6.0);
        } else if (percent <= visualZoneB_End) {
            const relativeP = (percent - visualZoneA_End) / (visualZoneB_End - visualZoneA_End);
            return 7.6 + relativeP * (8.5 - 7.6);
        } else {
            const relativeP = (percent - visualZoneB_End) / (100 - visualZoneB_End);
            return 8.5 + relativeP * (10.0 - 8.5);
        }
    };

    useEffect(() => {
        const percent = sliderValue;
        const realVal = getRealValue(percent);
        const cm = realVal * 2.54;

        let zone = "";
        let rangeText = "";
        let model = "";
        let desc = "";
        let reach = "";
        let activeColor = "";

        if (realVal < 7.6) {
            zone = "A";
            rangeText = "Hand span range: under 7.6 inches";
            model = "DS5.5";
            desc = "Standard keys are physically too wide for you. The DS5.5 solves this by shrinking the octave, instantly removing tension.";
            reach = "Finally play 10ths comfortably";
            activeColor = cZoneA;
        } else if (realVal <= 8.5) {
            zone = "B";
            rangeText = "Hand span range: 7.6 to 8.5 inches";
            model = "DS6.0";
            desc = "The 'Goldilocks' size. Slightly narrower than standard, giving you the power of a concert pianist without the stretching fatigue.";
            reach = "Play 10ths with new ease";
            activeColor = cZoneB;
        } else {
            zone = "C";
            rangeText = "Hand span range: above 8.5 inches";
            model = "DS6.5";
            desc = "You fit the historical standard. Since your hands are naturally large, this model provides the traditional concert grand key width.";
            reach = "Master standard repertoire";
            activeColor = cZoneC;
        }

        setCalcResult({ realVal, cm, zone, rangeText, model, desc, reach, activeColor });
    }, [sliderValue]);

    // --- ANIMATIONS ---
    const outcomeRef = useRef<HTMLElement>(null);
    const scienceRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Outcome Bars Animation
        const outcomeSection = outcomeRef.current;
        if (outcomeSection) {
            const bars = outcomeSection.querySelectorAll(".dp-bar-fill") as NodeListOf<HTMLElement>;
            const animateBars = () => {
                bars.forEach((bar) => {
                    const target = bar.getAttribute("data-target-width");
                    if (!target) return;
                    bar.style.transition = "none";
                    bar.style.width = "0%";
                    void bar.offsetWidth; // Force reflow
                    bar.style.transition = "width 1.5s cubic-bezier(0.22, 1, 0.36, 1)";
                    bar.style.width = target + "%";
                });
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateBars();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(outcomeSection);
        }

        // Science Charts Animation
        const scienceSection = scienceRef.current;
        if (scienceSection) {
            const donuts = scienceSection.querySelectorAll(".dp-donut") as NodeListOf<HTMLElement>;
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
                    const isMale = donut.classList.contains("dp-donut-male");

                    function animateFrame(timestamp: number) {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const percent = Math.min(progress / duration, 1);
                        const ease = 1 - Math.pow(1 - percent, 4);
                        const currentAngle = targetDegree * ease;

                        if (isMale) {
                            donut.style.background = `conic-gradient(#ff2d55 0deg ${currentAngle}deg, #34c759 ${currentAngle}deg 360deg)`;
                        } else {
                            donut.style.background = `conic-gradient(#34c759 0deg ${currentAngle}deg, #ff2d55 ${currentAngle}deg 100%)`; // Wait, logic in text was: green 0-87%, red rest. But animation code says: conic(`red 0 current, green current 360`).
                            // Original code: donut.style.background = `conic-gradient(${colorRed} 0deg ${currentAngle}deg, ${colorGreen} ${currentAngle}deg 360deg)`; 
                            // This draws Red part first.
                            // Check female chart: 87% "Too small" (Red). So Red should be large.
                            // Check male chart: "24% Too small" (Red). Red should be small.
                            // The original code logic seems to draw Red up to Target.
                            // Female Target: 313.2 deg (87%). Red is major. Correct.
                            // Male Target: 86.4 deg (24%). Red is minor. Correct.
                            donut.style.background = `conic-gradient(${colorRed} 0deg ${currentAngle}deg, ${colorGreen} ${currentAngle}deg 360deg)`;
                        }
                        if (progress < duration) window.requestAnimationFrame(animateFrame);
                    }
                    window.requestAnimationFrame(animateFrame);
                });
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        runAnimation();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(scienceSection);
        }
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="main-wrapper">
                <div className="section-faq">
                    <div className="global-padding">
                        <div className="section-padding">
                            <div className="container-800">
                                <div className="faq-content-wrapper">
                                    <div className="info-content">

                                        {/* --- CALCULATOR SECTION --- */}
                                        <section id="solution" className="dp-solution-wrapper">
                                            <style jsx>{`
                         .dp-solution-wrapper {
                           padding: 2rem 1rem;
                           background: transparent;
                           display: flex;
                           justify-content: center;
                         }
                         .dp-solution-container {
                           background: #000000;
                           color: #f9fafb;
                           width: 100%;
                           max-width: 80rem;
                           margin: 0 auto;
                           border-radius: 3rem;
                           padding: 5rem 2rem;
                           overflow: hidden;
                         }
                         .dp-solution-header { text-align: center; margin-bottom: 4rem; }
                         .dp-solution-title { font-size: 2.4rem; line-height: 1.1; font-weight: 700; margin-bottom: 1rem; color: #fff; }
                         .dp-solution-subtitle { font-size: 1.1rem; color: #9ca3af; max-width: 640px; margin: 0 auto; }
                         .dp-solution-grid { display: grid; gap: 3rem; align-items: stretch; }
                         @media (min-width: 1024px) { .dp-solution-grid { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); } }
                         .dp-card {
                           background: rgba(20, 20, 20, 0.6);
                           border-radius: 2rem;
                           padding: 2.5rem;
                           border: 1px solid rgba(255, 255, 255, 0.08);
                           box-shadow: 0 24px 70px rgba(0, 0, 0, 0.8);
                           backdrop-filter: blur(10px);
                         }
                         /* Slider Styles moved to inline styles for dynamic gradient */
                       `}</style>
                                            <div className="dp-solution-container">
                                                <div className="dp-solution-header">
                                                    <h2 className="dp-solution-title">A Keyboard That Fits You.</h2>
                                                    <p className="dp-solution-subtitle">DreamPlay's DS Standardardized Keyboards come in different sizes to match your biology.</p>
                                                </div>
                                                <div className="dp-solution-grid">
                                                    <div className="dp-card">
                                                        <div className="dp-card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                                                            <div className="dp-icon-circle" style={{ width: '2.6rem', height: '2.6rem', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.1rem' }}><span>📏</span></div>
                                                            <div className="dp-card-title" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Find Your Zone</div>
                                                        </div>
                                                        <div className="dp-slider-wrapper" style={{ marginBottom: '2.5rem', position: 'relative' }}>
                                                            <div className="dp-field-label-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                                                <div className="dp-field-label" style={{ fontSize: '0.8rem', fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Your hand span (thumb to pinky)</div>
                                                                <div className="dp-handspan-value" style={{ fontSize: '1.9rem', fontWeight: 700, color: calcResult.activeColor }}>
                                                                    {calcResult.realVal.toFixed(1)} in <span style={{ fontSize: '1rem', fontWeight: 400, color: '#9ca3af' }}>/ {calcResult.cm.toFixed(1)} cm</span>
                                                                </div>
                                                            </div>
                                                            <input
                                                                type="range"
                                                                min="0" max="100" step="0.5"
                                                                value={sliderValue}
                                                                onChange={(e) => setSliderValue(parseFloat(e.target.value))}
                                                                className="dp-slider"
                                                                style={{
                                                                    width: '100%', height: '6px', borderRadius: '999px', appearance: 'none',
                                                                    background: `linear-gradient(to right, ${calcResult.activeColor} 0%, ${calcResult.activeColor} ${sliderValue}%, rgba(0,0,0,0) ${sliderValue}%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(244, 63, 94, 0.3) 0%, rgba(244, 63, 94, 0.3) 33.33%, rgba(245, 158, 11, 0.3) 33.33%, rgba(245, 158, 11, 0.3) 66.66%, rgba(45, 212, 191, 0.3) 66.66%, rgba(45, 212, 191, 0.3) 100%)`
                                                                }}
                                                            />
                                                            <div className="dp-slider-label-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                                                                <span>Small (6 in)</span><span>Average (8 in)</span><span>Large (10 in)</span>
                                                            </div>
                                                        </div>
                                                        <div className="dp-info-box" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '1.25rem', padding: '1.5rem' }}>
                                                            <div className="dp-measure-row" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                                <div className="dp-measure-visual" style={{ flexShrink: 0, width: '6.5rem', height: '6.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <img src="/images/generated-hand-image.jpg" alt="Hand span measurement" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                                </div>
                                                                <div>
                                                                    <div className="dp-info-title" style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem' }}>How to measure</div>
                                                                    <div className="dp-info-text" style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.6 }}>Spread your hand wide. Measure from the <strong>tip of the thumb</strong> to the <strong>tip of the pinky</strong>.</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dp-card">
                                                        <div className="dp-result-tag" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>Your match</div>
                                                        <div className="dp-result-zone" style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.25rem', color: calcResult.activeColor }}>Zone {calcResult.zone}</div>
                                                        <div className="dp-result-range" style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1.5rem' }}>{calcResult.rangeText}</div>
                                                        <div className="dp-result-model" style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.4rem' }}>{calcResult.model}</div>
                                                        <div className="dp-result-model-label" style={{ fontSize: '1rem', fontWeight: 500, color: '#60a5fa', marginBottom: '1.5rem' }}>Recommended model</div>
                                                        <div className="dp-result-desc" style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: 1.7, marginBottom: '1.5rem' }}>{calcResult.desc}</div>
                                                        <div className="dp-reach-box" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', background: 'rgba(0,0,0,0.4)', borderRadius: '1.25rem', padding: '0.9rem 1rem' }}>
                                                            <div className="dp-reach-icon" style={{ width: '2.2rem', height: '2.2rem', borderRadius: '0.6rem', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c55e' }}>✓</div>
                                                            <div>
                                                                <div className="dp-reach-text-label" style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Reach capability</div>
                                                                <div className="dp-reach-text-value" style={{ fontSize: '0.95rem', fontWeight: 600 }}>{calcResult.reach}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* --- OUTCOME SECTION --- */}
                                        <section id="outcome-v2" ref={outcomeRef} className="dp-outcome-wrapper">
                                            <style jsx>{`
                        .dp-outcome-wrapper { padding: 2rem 1rem; background: transparent; display: flex; justify-content: center; }
                        .dp-outcome-container { background: #000000; color: #f9fafb; width: 100%; max-width: 80rem; margin: 0 auto; border-radius: 3rem; padding: 4rem 2rem; overflow: hidden; }
                        .dp-outcome-header { text-align: center; max-width: 48rem; margin: 0 auto 3rem auto; }
                        .dp-outcome-title { font-size: 2.4rem; line-height: 1.1; font-weight: 700; color: #fff; margin-bottom: 1rem; }
                        .dp-outcome-subtitle { font-size: 1.1rem; color: #9ca3af; line-height: 1.7; }
                        .dp-card-outcome { 
                           display: flex; flex-direction: column; gap: 1.5rem; background: rgba(25, 30, 40, 0.7); borderRadius: 2rem; padding: 2.5rem; border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(10px); transition: transform 0.4s ease;
                        }
                        .dp-card-outcome:hover { transform: translateY(-10px); box-shadow: 0 40px 90px rgba(0,0,0,1); border-color: rgba(255,255,255,0.25); }
                      `}</style>
                                            <div className="dp-outcome-container">
                                                <div className="dp-outcome-header">
                                                    <h2 className="dp-outcome-title">Unlock Your Potential</h2>
                                                    <p className="dp-outcome-subtitle">Matching your hand size to the correct keyboard unlocks greater comfort, accuracy, and musical expression.</p>
                                                </div>
                                                <div className="dp-outcome-main-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '3rem' }}>
                                                    {/* ZONE A */}
                                                    <div className="dp-card-outcome">
                                                        <h3 className="dp-card-title" style={{ fontSize: '2.4rem', fontWeight: 700, lineHeight: 1.1, color: 'rgba(244, 63, 94, 1)' }}>Zone A Players</h3>
                                                        <p className="dp-zone-subtitle" style={{ fontSize: '1.1rem', color: '#cbd5e1', fontWeight: 500 }}>Petite Hands / DS5.5 Standard</p>
                                                        <div className="dp-card-block" style={{ marginBottom: '1.75rem' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#9ca3af' }}>
                                                                <span>Conventional (DS6.5)</span><span>8 Notes</span>
                                                            </div>
                                                            <div style={{ height: '12px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                                                                <div className="dp-bar-fill" data-target-width="60" style={{ height: '100%', width: 0, background: '#4b5563' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="dp-card-block" style={{ marginBottom: '1.75rem' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontWeight: 700, color: 'rgba(244, 63, 94, 1)' }}>
                                                                <span>DS5.5 Model</span><span>10 Notes</span>
                                                            </div>
                                                            <div style={{ height: '12px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                                                                <div className="dp-bar-fill" data-target-width="100" style={{ height: '100%', width: 0, background: 'rgba(244, 63, 94, 1)' }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* ZONE B */}
                                                    <div className="dp-card-outcome">
                                                        <h3 className="dp-card-title" style={{ fontSize: '2.4rem', fontWeight: 700, lineHeight: 1.1, color: 'rgba(245, 158, 11, 1)' }}>Zone B Players</h3>
                                                        <p className="dp-zone-subtitle" style={{ fontSize: '1.1rem', color: '#cbd5e1', fontWeight: 500 }}>Average Hands / DS6.0 Standard</p>
                                                        <div className="dp-card-block" style={{ marginBottom: '1.75rem' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#9ca3af' }}>
                                                                <span>Conventional (DS6.5)</span><span>9 Notes</span>
                                                            </div>
                                                            <div style={{ height: '12px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                                                                <div className="dp-bar-fill" data-target-width="70" style={{ height: '100%', width: 0, background: '#4b5563' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="dp-card-block" style={{ marginBottom: '1.75rem' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontWeight: 700, color: 'rgba(245, 158, 11, 1)' }}>
                                                                <span>DS6.0 Model</span><span>10 Notes</span>
                                                            </div>
                                                            <div style={{ height: '12px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                                                                <div className="dp-bar-fill" data-target-width="100" style={{ height: '100%', width: 0, background: 'rgba(245, 158, 11, 1)' }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* --- SCIENCE SECTION --- */}
                                        <section id="science-section" ref={scienceRef} className="dp-solution-wrapper">
                                            <div className="dp-solution-container" style={{ padding: '5rem 6rem' }}>
                                                <div className="dp-mb-xl" style={{ marginBottom: '5rem' }}>
                                                    <h2 className="dp-h2 dp-center dp-mb-lg" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 650, color: '#fff' }}>The Hidden Barrier</h2>
                                                    <div className="dp-grid-2" style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                                                        <div>
                                                            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                                                                <div style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1 }}>87%</div>
                                                                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>of females</div>
                                                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', maxWidth: '18rem', margin: '0 auto' }}>Have hand spans smaller than the 8.5 inch minimum that standard keyboards expect.</p>
                                                            </div>
                                                            <div className="dp-card" style={{ background: 'rgba(17,17,24,0.9)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                <div className="dp-chart-shell" style={{ width: '200px', height: '200px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <div className="dp-donut" data-target-degree="313.2" style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'conic-gradient(#333 0deg 360deg)' }}>
                                                                        <div className="dp-donut-inner" style={{ width: '120px', height: '120px', background: '#000', borderRadius: '50%', position: 'absolute' }}></div>
                                                                        <div className="dp-donut-value" style={{ position: 'absolute', zIndex: 2, fontSize: '2rem', fontWeight: 700, color: '#ff2d55' }}>87%</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                                                                <div style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1 }}>24%</div>
                                                                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>of males</div>
                                                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', maxWidth: '18rem', margin: '0 auto' }}>Also fall below the comfortable reach threshold for a standard 6.5 inch keyboard.</p>
                                                            </div>
                                                            <div className="dp-card" style={{ background: 'rgba(17,17,24,0.9)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                <div className="dp-chart-shell" style={{ width: '200px', height: '200px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <div className="dp-donut dp-donut-male" data-target-degree="86.4" style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'conic-gradient(#333 0deg 360deg)' }}>
                                                                        <div className="dp-donut-inner" style={{ width: '120px', height: '120px', background: '#000', borderRadius: '50%', position: 'absolute' }}></div>
                                                                        <div className="dp-donut-value" style={{ position: 'absolute', zIndex: 2, fontSize: '2rem', fontWeight: 700, color: '#ff2d55' }}>24%</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* --- RESEARCH SECTION (Reusing components could be better but sticking to pattern) --- */}
                                        <section className="dp-research-wrapper">
                                            <style jsx>{`
                        .dp-research-wrapper { padding: 2rem 1rem; background: transparent; display: flex; justify-content: center; }
                        .dp-research-container { background: #000; color: #f9fafb; width: 100%; max-width: 80rem; margin: 0 auto; border-radius: 3rem; padding: 5rem 6rem; overflow: hidden; }
                        .dp-research-grid { display: grid; gap: 1.5rem; margin-top: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
                        .dp-pill-card { border-radius: 1.25rem; border: 1px solid rgba(255,255,255,0.16); background: rgba(17,17,24,0.96); padding: 1.5rem 1.75rem; display: flex; flex-direction: column; align-items: flex-start; transition: transform 0.2s; }
                        .dp-pill-card:hover { transform: translateY(-2px); background: rgba(22,22,32,0.98); }
                        .dp-cta { display: inline-flex; align-items: center; gap: .4rem; border-radius: 999px; background: #f5f5f7; color: #000; padding: .45rem 1rem; font-size: 0.8rem; font-weight: 500; text-decoration: none; margin-top: auto; }
                      `}</style>
                                            <div className="dp-research-container">
                                                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                                                    <h2 className="dp-h2" style={{ fontSize: '2.5rem', fontWeight: 650, color: '#fff', marginBottom: '1.25rem' }}>Published Research</h2>
                                                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', maxWidth: '36rem', margin: '0 auto' }}>Decades of peer reviewed research explain why standard keyboards hold most pianists back.</p>
                                                </div>
                                                <div className="dp-research-grid">
                                                    <div className="dp-pill-card">
                                                        <div className="dp-card-title" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff' }}>Hand size and performance related injuries</div>
                                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.9rem' }}>Applied Ergonomics, 2021</div>
                                                        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: '1.5rem' }}>Pianists with smaller hands show <strong>reduced muscular effort and lower perceived strain</strong> when they move to 5.5 inch octave keyboards instead of standard size.</p>
                                                        <a href="https://www.sciencedirect.com/science/article/abs/pii/S0003687021001654" target="_blank" className="dp-cta">Read full study <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg></a>
                                                    </div>
                                                    <div className="dp-pill-card">
                                                        <div className="dp-card-title" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff' }}>Gender differences and career impact</div>
                                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.9rem' }}>Susan Tomes</div>
                                                        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: '1.5rem' }}>Studies note that <strong>internationally acclaimed women pianists tend to have larger hands</strong>, which aligns with a repertoire that often expects very wide reaches.</p>
                                                        <a href="https://www.susantomes.com/blog/hand-size-gender-differences-pianists-acclaim/" target="_blank" className="dp-cta">Read article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* --- CTA SECTION --- */}
                                        <section className="dp-cta-wrapper">
                                            <style jsx>{`
                        .dp-cta-wrapper { padding: 2rem 1rem; background: transparent; display: flex; justify-content: center; }
                        .dp-cta-container { background: #000; color: #f9fafb; width: 100%; max-width: 80rem; margin: 0 auto; border-radius: 3rem; padding: 5rem 6rem; text-align: center; }
                      `}</style>
                                            <div className="dp-cta-container">
                                                <h2 className="dp-h2" style={{ fontSize: '2.5rem', fontWeight: 650, color: '#fff' }}>Ready to Play Pain-Free?</h2>
                                                <div style={{ marginTop: '2rem' }}>
                                                    <a href="/checkout-pages/customize" className="button w-inline-block" style={{ display: 'inline-flex' }}>
                                                        <div className="button_text"><div>Reserve Your DreamPlay One</div></div>
                                                    </a>
                                                </div>
                                            </div>
                                        </section>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
