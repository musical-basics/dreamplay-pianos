"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // --- SIZING SECTION SCRIPT ---
    const mappings = [
      { source: 'loader-piano-1', target: 'target-piano-1' },
      { source: 'loader-hand-1', target: 'target-hand-1' },
      { source: 'loader-piano-2', target: 'target-piano-2' },
      { source: 'loader-hand-2', target: 'target-hand-2' },
      { source: 'loader-piano-3', target: 'target-piano-3' },
      { source: 'loader-hand-3', target: 'target-hand-3' }
    ];
    mappings.forEach(map => {
      const sourceImg = document.getElementById(map.source) as HTMLImageElement;
      const targetImg = document.getElementById(map.target) as HTMLImageElement;
      if (sourceImg && targetImg) {
        targetImg.src = sourceImg.src;
        if (sourceImg.srcset) targetImg.srcset = sourceImg.srcset;
      }
    });

    // --- SWIPER INIT ---
    // Poll for Swiper availability since it's loaded via lazy script
    const initSwiper = () => {
      // @ts-ignore
      if (typeof window.Swiper !== 'undefined') {
        // @ts-ignore
        const swiper = new window.Swiper(".piano", {
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".slide-next",
            prevEl: ".slide-back",
          },
          watchOverflow: true,
          on: {
            slideChange: function () {
              // @ts-ignore
              if (this.isBeginning) {
                document.querySelector(".slide-back")?.setAttribute("style", "display: none !important");
              } else {
                document.querySelector(".slide-back")?.setAttribute("style", "display: flex !important");
              }
              // @ts-ignore
              if (this.isEnd) {
                document.querySelector(".slide-next")?.setAttribute("style", "display: none !important");
              } else {
                document.querySelector(".slide-next")?.setAttribute("style", "display: flex !important");
              }
            }
          }
        });

        // Initial check
        if (swiper.isBeginning) {
          document.querySelector(".slide-back")?.setAttribute("style", "display: none !important");
        }
      } else {
        setTimeout(initSwiper, 100);
      }
    };
    initSwiper();

  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-wrapper">
        <section className="section-hero">
          <div className="global-padding">
            <div className="container">
              <div className="hero-content-wrapper">
                <div className="hero-title-block">
                  <h1 data-w-id="a59ecacd-c7ce-77bd-8ce2-30263c56d483" style={{ opacity: 0 }} className="h1-heading text-white">Introducing:&nbsp; DreamPlay One</h1>
                </div>
                <div data-w-id="ca99a284-ce87-a7a3-e5b5-f127871c8368" style={{ opacity: 0 }} className="hero-lower-content">
                  <p className="p-large text-white-80"><strong>The keyboard that feels like a dream to play.</strong></p>
                  <div className="hero-lower-cta-block">
                    <div className="hero-btn-wrap">
                      <Link data-wf--button-primary--variant="base" data-w-id="3571025f-8656-4207-fe0a-7eddcbc423cd" href="/checkout-pages/customize" className="button w-inline-block">
                        <div className="button_text">
                          <div>Pre-Order Now</div>
                        </div>
                        <div className="button_icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 18 10" fill="none" className="button_icon-svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 5.00391C12.0002 4.45162 11.5525 4.00391 11.0002 4.00391L1.00025 4.00391C0.44796 4.00391 0.000245026 4.45162 0.000245051 5.00391C0.000245075 5.55619 0.44796 6.00391 1.00025 6.00391L11.0002 6.00391C11.5525 6.00391 12.0002 5.55619 12.0002 5.00391Z" fill="currentColor"></path>
                            <path d="M17.3616 3.77448C18.2131 4.36865 18.2131 5.63135 17.3616 6.22552L12.3417 9.72824C11.3409 10.4266 10.0002 9.6933 10.0002 8.50272L10.0002 1.49728C10.0002 0.306709 11.3409 -0.426616 12.3417 0.271762L17.3616 3.77448Z" fill="currentColor"></path>
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="About" className="section-about">
          <div className="global-padding">
            <div className="section-padding">
              <div className="container">
                <div className="about-content-wrapper">
                  <div className="about-title-block">
                    <h2 className="h2-heading text-dark">Stop fighting a keyboard<br />that wasn't built for you.</h2>
                  </div>
                  <div data-w-id="6564439e-ea22-fa56-985e-c5e60601d5de" style={{ opacity: 0 }} className="about-content-box">
                    <div className="about-c-image-block">
                      <div className="about-c-wrapper">
                        <h3 className="h3-large">Did you know?</h3>
                        <p className="p-medium text-white-80">Traditional pianos are designed for handspans of 8.5 inches or more, leaving behind most women and nearly a third of men.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-btn-wrapper">
                  <Link data-wf--button-primary--variant="base" data-w-id="3571025f-8656-4207-fe0a-7eddcbc423cd" href="/how-it-works" className="button w-inline-block">
                    <div className="button_text">
                      <div>Learn More About These Statistics</div>
                    </div>
                    <div className="button_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 18 10" fill="none" className="button_icon-svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 5.00391C12.0002 4.45162 11.5525 4.00391 11.0002 4.00391L1.00025 4.00391C0.44796 4.00391 0.000245026 4.45162 0.000245051 5.00391C0.000245075 5.55619 0.44796 6.00391 1.00025 6.00391L11.0002 6.00391C11.5525 6.00391 12.0002 5.55619 12.0002 5.00391Z" fill="currentColor"></path>
                        <path d="M17.3616 3.77448C18.2131 4.36865 18.2131 5.63135 17.3616 6.22552L12.3417 9.72824C11.3409 10.4266 10.0002 9.6933 10.0002 8.50272L10.0002 1.49728C10.0002 0.306709 11.3409 -0.426616 12.3417 0.271762L17.3616 3.77448Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-video">
          <div data-poster-url="/videos/Clip-4-poster-00001.jpg" data-video-urls="/videos/Clip-4-transcode.mp4,/videos/Clip-4-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="background-video w-background-video w-background-video-atom">
            <video id="4e62a9f2-c6eb-7386-5791-e43c1255e09b-video" autoPlay loop muted playsInline style={{ backgroundImage: 'url("/videos/Clip-4-poster-00001.jpg")' }} data-wf-ignore="true" data-object-fit="cover">
              <source src="/videos/Clip-4-transcode.mp4" data-wf-ignore="true" />
              <source src="/videos/Clip-4-transcode.webm" data-wf-ignore="true" />
            </video>
            <noscript>
              <style>{`
                [data-wf-bgvideo-fallback-img] {
                  display: none;
                }
                @media (prefers-reduced-motion: reduce) {
                  [data-wf-bgvideo-fallback-img] {
                    position: absolute;
                    z-index: -100;
                    display: inline-block;
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                  }
                }
              `}</style>
              <img data-wf-bgvideo-fallback-img="true" src="/videos/Clip-4-poster-00001.jpg" alt="" />
            </noscript>
            <div aria-live="polite">
              <button type="button" data-w-bg-video-control="true" aria-controls="4e62a9f2-c6eb-7386-5791-e43c1255e09b-video" className="w-backgroundvideo-backgroundvideoplaypausebutton play-pause-btn w-background-video--control">
                <span className="play-state"><img src="https://uploads-ssl.webflow.com/6022af993a6b2191db3ed10c/628299f8aa233b83918e24fd_Pause.svg" loading="lazy" alt="Pause video" className="play-sate-image" /></span>
                <span hidden className="pause-state"><img loading="lazy" alt="Play video" src="https://uploads-ssl.webflow.com/6022af993a6b2191db3ed10c/628298b20ae0236682d4b87f_Play-24.svg" className="pause-state-image" /></span>
              </button>
            </div>
          </div>
        </section>
        <section id="Sizing" className="section-product">
          <div className="section-padding">
            <div className="global-padding">
              <div className="container">
                <div className="product-content-wrapper">
                  <div>
                    <div className="div-block-9">
                      <img src="/images/DS5.5-white_1.png" loading="lazy" sizes="(max-width: 5000px) 100vw, 5000px" srcSet="/images/DS5.5-white_1-p-500.png 500w, /images/DS5.5-white_1-p-800.png 800w, /images/DS5.5-white_1-p-1080.png 1080w, /images/DS5.5-white_1-p-1600.png 1600w, /images/DS5.5-white_1-p-2000.png 2000w, /images/DS5.5-white_1-p-2600.png 2600w, /images/DS5.5-white_1-p-3200.png 3200w, /images/DS5.5-white_1.png 5000w" alt="" id="loader-piano-1" />
                      <img src="/images/Zone-A-Diagram.png" loading="lazy" sizes="(max-width: 1808px) 100vw, 1808px" srcSet="/images/Zone-A-Diagram-p-500.png 500w, /images/Zone-A-Diagram-p-800.png 800w, /images/Zone-A-Diagram-p-1080.png 1080w, /images/Zone-A-Diagram-p-1600.png 1600w, /images/Zone-A-Diagram.png 1808w" alt="" id="loader-hand-1" />
                      <img src="/images/DS6.0-Black-2.png" loading="lazy" sizes="(max-width: 1224px) 100vw, 1224px" srcSet="/images/DS6.0-Black-2-p-500.png 500w, /images/DS6.0-Black-2-p-800.png 800w, /images/DS6.0-Black-2-p-1080.png 1080w, /images/DS6.0-Black-2.png 1224w" alt="" id="loader-piano-2" />
                      <img src="/images/Zone-B-DIagram.png" loading="lazy" sizes="(max-width: 1802px) 100vw, 1802px" srcSet="/images/Zone-B-DIagram-p-500.png 500w, /images/Zone-B-DIagram-p-800.png 800w, /images/Zone-B-DIagram-p-1080.png 1080w, /images/Zone-B-DIagram-p-1600.png 1600w, /images/Zone-B-DIagram.png 1802w" alt="" id="loader-hand-2" />
                      <img src="/images/DS6.5-Black.png" loading="lazy" sizes="(max-width: 5000px) 100vw, 5000px" srcSet="/images/DS6.5-Black-p-500.png 500w, /images/DS6.5-Black-p-800.png 800w, /images/DS6.5-Black-p-1080.png 1080w, /images/DS6.5-Black-p-1600.png 1600w, /images/DS6.5-Black-p-2000.png 2000w, /images/DS6.5-Black-p-2600.png 2600w, /images/DS6.5-Black-p-3200.png 3200w, /images/DS6.5-Black.png 5000w" alt="" id="loader-piano-3" className="image-5" />
                      <img src="/images/Zone-C-Diagram.png" loading="lazy" sizes="(max-width: 1808px) 100vw, 1808px" srcSet="/images/Zone-C-Diagram-p-500.png 500w, /images/Zone-C-Diagram-p-800.png 800w, /images/Zone-C-Diagram-p-1080.png 1080w, /images/Zone-C-Diagram-p-1600.png 1600w, /images/Zone-C-Diagram.png 1808w" alt="" id="loader-hand-3" />
                    </div>
                    {/* Embedded Sizing Section with Tailwind via CDN in source but we can just use styles provided */}
                    <div>
                      <style>{`
                        /* --- GLOBAL SETTINGS --- */
                        .piano-section { font-family: 'Manrope', sans-serif; }
                        .piano-title { font-size: 2rem; font-weight: 800; margin-bottom: 0.75rem; line-height: 1.1; }
                        .piano-desc { font-size: 1.125rem; line-height: 1.6; font-weight: 500; white-space: pre-line; }
                        .zone-label { font-size: 3rem; font-weight: 800; text-align: center; margin-top: 1.5rem; letter-spacing: -0.02em; }
                        @media (min-width: 768px) { .zone-label { font-size: 3.75rem; } }
                        .piano-card { border-radius: 1.5rem; padding: 2rem; display: flex; flex-direction: column; transition: all 0.3s ease-out; }
                        .piano-card:hover { transform: scale(1.03) translateY(-8px); z-index: 50; }
                        .theme-dark { background-color: #000000; color: #ffffff; }
                        .theme-dark .piano-desc { color: #9ca3af; }
                        .theme-dark:hover { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
                        .theme-light { background-color: #ffffff; color: #000000; border: 5px solid #000000; }
                        .theme-light .piano-desc { color: #6b7280; }
                        .theme-light:hover { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
                        .img-container { width: 100%; aspect-ratio: 3/2; position: relative; overflow: hidden; }
                        .img-container.piano-view { display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
                        .img-container.hand-view { border-radius: 1rem; margin-top: auto; }
                      `}</style>
                      {/* Using Tailwind classes as in index.html. Note: You disabled tailwind in create-next-app, so these might not work unless we add tailwind CDN. 
                          The user's original HTML loaded tailwind via CDN: <script src="https://cdn.tailwindcss.com"></script>. 
                          I will include that Script in layout or here? It's better to just include it as a Script tag here if it's localized, or rely on global CSS. 
                          Since it's an embed in Webflow, I'll add the script here. */}
                      <script src="https://cdn.tailwindcss.com"></script>

                      <section className="max-w-[1600px] mx-auto px-4 py-16 piano-section">
                        <div className="text-center mb-12">
                          <p className="text-gray-500 text-sm tracking-wide mb-4 uppercase font-bold">Introducing the Sizes</p>
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-balance tracking-tight">Find Your Perfect Fit.</h1>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                          <div className="flex flex-col md:flex-row flex-[2]">
                            <div className="flex-1 piano-card theme-dark md:rounded-r-none">
                              <div className="img-container piano-view">
                                <img id="target-piano-1" src="" alt="Piano DS5.5" className="object-contain max-h-full w-auto" />
                              </div>
                              <div className="text-center mb-6">
                                <h2 className="piano-title">Piano DS5.5</h2>
                                <p className="piano-desc">Perfect for handspans under 7.6 inches.</p>
                              </div>
                              <div className="img-container hand-view">
                                <img id="target-hand-1" src="" alt="Hand Zone A" className="absolute inset-0 w-full h-full object-cover" />
                              </div>
                              <p className="zone-label">Zone A</p>
                            </div>
                            <div className="flex-1 piano-card theme-light relative z-10 mt-4 md:mt-0 md:-ml-4 md:rounded-l-none">
                              <div className="img-container piano-view">
                                <img id="target-piano-2" src="" alt="Piano DS6.0" className="object-contain max-h-full w-auto" />
                              </div>
                              <div className="text-center mb-6">
                                <h2 className="piano-title">Piano DS6.0</h2>
                                <p className="piano-desc">Perfect for handspans between 7.6-8.5 inches.</p>
                              </div>
                              <div className="img-container hand-view">
                                <img id="target-hand-2" src="" alt="Hand Zone B" className="absolute inset-0 w-full h-full object-cover" />
                              </div>
                              <p className="zone-label">Zone B</p>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="piano-card theme-dark h-full">
                              <div className="img-container piano-view">
                                <img id="target-piano-3" src="" alt="Standard Piano" className="object-contain max-h-full w-auto" />
                              </div>
                              <div className="text-center mb-6">
                                <h2 className="piano-title">Standard Piano</h2>
                                <p className="piano-desc">Perfect for handspans over 8.5 inches.</p>
                              </div>
                              <div className="img-container hand-view">
                                <img id="target-hand-3" src="" alt="Hand Zone C" className="absolute inset-0 w-full h-full object-cover" />
                              </div>
                              <p className="zone-label">Zone C</p>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                  <div className="product-btn-wrapper">
                    <a data-wf--button-primary--variant="base" data-w-id="3571025f-8656-4207-fe0a-7eddcbc423cd" href="https://www.dropbox.com/scl/fi/9b72rbi4ga0pjterxyoan/DreamPlay-Infographic.pdf?rlkey=mc08i1ahn5tp3thdd0qjnag2d&amp;st=olbh1t9w&amp;dl=1" target="_blank" className="button w-inline-block">
                      <div className="button_text">
                        <div>Download Our Hand-Measuring Guide</div>
                      </div>
                      <div className="button_icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 18 10" fill="none" className="button_icon-svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 5.00391C12.0002 4.45162 11.5525 4.00391 11.0002 4.00391L1.00025 4.00391C0.44796 4.00391 0.000245026 4.45162 0.000245051 5.00391C0.000245075 5.55619 0.44796 6.00391 1.00025 6.00391L11.0002 6.00391C11.5525 6.00391 12.0002 5.55619 12.0002 5.00391Z" fill="currentColor"></path>
                          <path d="M17.3616 3.77448C18.2131 4.36865 18.2131 5.63135 17.3616 6.22552L12.3417 9.72824C11.3409 10.4266 10.0002 9.6933 10.0002 8.50272L10.0002 1.49728C10.0002 0.306709 11.3409 -0.426616 12.3417 0.271762L17.3616 3.77448Z" fill="currentColor"></path>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ... Skipping Feature/Video/Details/Reviews sections for brevity? No, user needs full migration. I will add them in blocks ... */}
        {/* I will add the remaining sections now. Features, Video 2, Details, Reviews, Reserve */}

        <section id="Feature" className="section-feature">
          <div className="section-padding top-0">
            <div className="global-padding">
              <div className="container">
                <div className="feature-wrapper">
                  <div className="feature-tittle-upper">
                    <div data-w-id="30e253e2-26e0-500b-5a23-12b313dc5392" style={{ opacity: 0 }} className="p-large text-gray">Our Features</div>
                    <h2 className="h2-heading text-dark">Everything You Need, Built In</h2>
                  </div>
                  <div className="feature-card-block">
                    {/* Feature Cards - I'll just copy structure */}
                    <div className="feature-card-wrap">
                      <div className="f-card-icon-block"><img src="/images/image-3.svg" loading="lazy" alt="" className="f-card-icon" /></div>
                      <div className="f-card-text-block"><div className="p-regular">Built-in Metronome</div></div>
                    </div>
                    {/* ... (repeated for other cards) ... */}
                    {/* For brevity in this tool call I included key ones, but I'll paste all. 
                        Wait, I must produce the full file. */}
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/image-4.svg" loading="lazy" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">Recording &amp; Playback</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/Feature-Icon.svg" loading="lazy" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">256-note Polyphony</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/Feature-Icon_1.svg" loading="lazy" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="small">Dual-Sensor Velocity Keys</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/Feature-Icon-5.svg" loading="lazy" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">MIDI Sequencing</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/volume.png" loading="lazy" srcSet="/images/volume-p-500.png 500w, /images/volume.png 512w" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">18 Essential Presets</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/monitor.png" loading="lazy" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">Backlit LCD Screen</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/grand-piano-icon-v3.png" loading="lazy" srcSet="/images/grand-piano-icon-v3-p-500.png 500w, /images/grand-piano-icon-v3.png 600w" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">Grand Piano Sound</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/headphone.png" loading="lazy" width={200} height={200} alt="" srcSet="/images/headphone-p-500.png 500w, /images/headphone.png 512w" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">High-fidelity Speakers and Headphone Audio</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/Feature-Icon-4.svg" loading="lazy" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">88 Graded, Weighted Keys</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/bluetooth-app-icon.png" loading="lazy" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">Bluetooth Connectivity</div></div></div>
                    <div className="feature-card-wrap"><div className="f-card-icon-block"><img src="/images/LED-lights.png" loading="lazy" alt="" className="f-card-icon" /></div><div className="f-card-text-block"><div className="p-regular">LED&nbsp;Lighting<br />For Every Key</div></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-video">
          <div data-poster-url="/videos/Clip-6_poster.0000000.jpg" data-video-urls="/videos/Clip-6_mp4.mp4,/videos/Clip-6_webm.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="background-video w-background-video w-background-video-atom">
            <video id="b54bc504-e392-a5be-2c03-818d3fff894c-video" autoPlay loop muted playsInline style={{ backgroundImage: 'url("/videos/Clip-6_poster.0000000.jpg")' }} data-wf-ignore="true" data-object-fit="cover">
              <source src="/videos/Clip-6_mp4.mp4" data-wf-ignore="true" />
              <source src="/videos/Clip-6_webm.webm" data-wf-ignore="true" />
            </video>
          </div>
        </section>

        <section id="details" className="section-product">
          <div className="section-padding">
            <div className="global-padding">
              <div className="container">
                <div className="product-cards">
                  <div className="product-card-wrapper">
                    <div className="product-card-block">
                      <div className="product-image-wrap"><img src="/images/New-Hero-1.jpg" loading="lazy" width={1024} height={200} alt="" srcSet="/images/New-Hero-1-p-500.jpg 500w, /images/New-Hero-1-p-800.jpg 800w, /images/New-Hero-1-p-1080.jpg 1080w, /images/New-Hero-1-p-1600.jpg 1600w, /images/New-Hero-1-p-2000.jpg 2000w, /images/New-Hero-1-p-2600.jpg 2600w, /images/New-Hero-1.jpg 3000w" sizes="100vw" className="product-picture" /></div>
                    </div>
                    <div className="product-card-content-wrap">
                      <div className="product-card-content-block">
                        <div className="product-card-tittle-block">
                          <h2 className="h2-heading">Modern Design, Subtle Brilliance</h2>
                        </div>
                        <div className="product-card-text-block">
                          <p className="p-large">LED lights make each key press feel extra satisfying. A sleek design that looks good in any setting.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-card-wrapper is-reversed">
                    <div className="product-card-block">
                      <div className="product-image-wrap"><img src="/images/article-main-placeholder.jpg" loading="lazy" width={100} height="Auto" alt="" srcSet="/images/article-main-placeholder-p-500.jpg 500w, /images/article-main-placeholder-p-800.jpg 800w, /images/article-main-placeholder.jpg 1024w" sizes="100px" className="product-picture" /></div>
                    </div>
                    <div className="product-card-content-wrap">
                      <div className="product-card-content-block">
                        <div className="product-card-tittle-block">
                          <h2 className="h2-heading">Authentic Grand<br />Piano Feel</h2>
                        </div>
                        <div className="product-card-text-block">
                          <p className="p-large">High quality, graded keys that feel like a real grand piano.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-card-wrapper">
                    <div className="product-card-block">
                      <div className="product-image-wrap"><img src="/images/_DSC1180-2-copy.jpg" loading="lazy" sizes="100vw" srcSet="/images/_DSC1180-2-copy-p-500.jpg 500w, /images/_DSC1180-2-copy-p-800.jpg 800w, /images/_DSC1180-2-copy-p-1080.jpg 1080w, /images/_DSC1180-2-copy-p-1600.jpg 1600w, /images/_DSC1180-2-copy-p-2000.jpg 2000w, /images/_DSC1180-2-copy-p-2600.jpg 2600w, /images/_DSC1180-2-copy.jpg 3000w" alt="" className="product-picture" /></div>
                    </div>
                    <div className="product-card-content-wrap">
                      <div className="product-card-content-block">
                        <div className="product-card-tittle-block">
                          <h2 className="h2-heading">Pristine,<br />Inspiring Sound</h2>
                        </div>
                        <div className="product-card-text-block">
                          <p className="p-large">A beautiful, rich grand piano sound with every key press.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="section-slider">
          {/* Slider section content */}
          <div className="section-padding">
            <div className="global-padding">
              <div className="container">
                <div className="slider-wrapper">
                  {/* ... Content ... */}
                  {/* I'll approximate the structure for brevity but ensure it works. 
                       Actually, I should copy the slider HTML properly. */}
                  <div className="slider-tittle-block">
                    <div className="feature-tittle-upper">
                      <div data-w-id="dcc09ef3-7f0f-df81-95bf-044228b340d9" style={{ opacity: 0 }} className="p-large text-white-80">Why We’re Doing This</div>
                      <h2 data-w-id="dcc09ef3-7f0f-df81-95bf-044228b340db" style={{ opacity: 0 }} className="h2-heading text-white">Playing the piano<br />doesn’t have to hurt</h2>
                    </div>
                  </div>
                  <div className="slider-main">
                    <div className="t-slider-wrapper">
                      {/* This part uses Webflow Slider typically (w-slider). 
                             Webflow.js handles it. Text content is critical. */}
                      <div data-delay="4000" data-animation="slide" className="testimonial-slider w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="true" data-disable-swipe="true" data-autoplay-limit="0" data-nav-spacing="3" data-duration="500" data-infinite="true">
                        <div className="mask w-slider-mask">
                          {/* Slide 1 */}
                          <div className="testimonial-slide w-slide">
                            <div className="testi-slider-slide">
                              <div className="slider-content-block">
                                <div className="slider-summury-block">
                                  <p className="p-xxl _w-bold text-white">I often witness pianists place their hands for the first time on a keyboard that better suits their hand span. How often the pianist spontaneously bursts into tears. A lifetime of struggling with a seemingly insurmountable problem vanishes in the moment they realize, &quot;It&#x27;s not me that is the problem; it is the instrument!&quot; Following on that, the joy of possibility overwhelms them.</p>
                                </div>
                                <div className="slide-author-wrap">
                                  <div className="slide-author-image-block"><img src="/images/carol-leone.jpeg" loading="lazy" width="Auto" alt="" className="s-author-image" /></div>
                                  <div className="author-desc-block">
                                    <div className="author-name-block"><div className="p-large text-white">Dr. Carol Leone</div></div>
                                    <div className="author-text-block"><div className="p-small grey">Chair of Piano Studies</div><div className="p-small grey">SMU Meadows School of the Arts in Dallas, Texas,</div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Slide 2 */}
                          <div className="testimonial-slide w-slide">
                            <div className="testi-slider-slide">
                              <div className="slider-content-block">
                                <div className="slider-summury-block">
                                  <p className="p-xxl _w-bold text-white">My favorite story is from a piano performance major, who couldn’t believe that playing the piano didn’t have to hurt. The instrument restored her joy for piano repertoire. She had been preparing to change over to harpsichord due to keyboard size issues. I will never forget the day she first played a Chopin ballade on the DS5.5. She literally could not stop beaming.</p>
                                </div>
                                <div className="slide-author-wrap">
                                  <div className="slide-author-image-block"><img src="/images/Kathryn-Ananda-Owens.png" loading="lazy" alt="" className="s-author-image" /></div>
                                  <div className="author-desc-block">
                                    <div className="author-name-block"><div className="p-large text-white">Kathryn-Ananda Owens</div></div>
                                    <div className="author-text-block"><div className="p-small grey">Professor of Music - Piano</div><div className="p-small grey">St Olaf College, Minnesota</div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Slide 3 */}
                          <div className="testimonial-slide w-slide">
                            <div className="testi-slider-slide">
                              <div className="slider-content-block">
                                <div className="slider-summury-block">
                                  <p className="p-xxl _w-bold text-white">I can play for much longer and continue to play every day. I don’t get frustrated from the pain and from being limited in my playing.<br /><br />- Jen McCabe, <em>harmonypianostudio.com</em><br /></p>
                                </div>
                                <div className="slide-author-wrap">
                                  <div className="slide-author-image-block"><img src="/images/Jen-McCabe.png" loading="lazy" alt="" className="s-author-image" /></div>
                                  <div className="author-desc-block">
                                    <div className="author-name-block"><div className="p-large text-white">Jen McCabe</div></div>
                                    <div className="author-text-block"><div className="p-small grey">Pianist, teacher, music director</div><div className="p-small grey">North Park, Chicago, IL</div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="slider-arrow back w-slider-arrow-left"><div className="w-icon-slider-left"></div></div>
                        <div className="slider-arrow w-slider-arrow-right"><div className="icon w-icon-slider-right"></div></div>
                        <div className="slide-nav w-slider-nav w-round"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-dreamplay">
          <div className="section-padding">
            <div className="global-padding">
              <div className="container">
                <div className="dreamplay-big-image-wrap">
                  <div data-w-id="621ec278-cfa0-294d-e5e3-062afdd38e54" style={{ opacity: 0 }} className="dreamplay-big-image-block">
                    <div className="cta-c-block">
                      <div><h2 className="h2-heading text-white">Be the First to<br />Experience DreamPlay.</h2></div>
                      <div><p className="p-regular text-white">We&#x27;ve finished the design. Now, we need your help to begin production. By reserving now, you&#x27;re not just pre-ordering a keyboard - you&#x27;re helping bring a new standard of instrument to life.</p></div>
                    </div>
                  </div>
                  <div className="bg-blur"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="Reserve" className="section-discount">
          <div className="section-padding">
            <div className="global-padding">
              <div className="container">
                <div className="discount-all-content-wrap">
                  <div className="discount-all-content-block">
                    <div className="discount-summury-block">
                      <p className="p-xl _w-medium"><strong>Lock in the $599 Founder&#x27;s Price<br /></strong></p>
                      <div className="p-medium _w-medium">The DreamPlay One will launch at <strong>$899</strong>. Due to the early stage, we are offering this keyboard at the incredible price of $599 (with free shipping). This is the lowest price we will ever offer.</div>
                    </div>
                    <div className="discount-btn-block">
                      <Link data-w-id="f1d5c3cb-94af-550d-2aa5-b4cc60c9289e" href="/checkout-pages/customize" className="btn-secondary w-inline-block">
                        <div className="s-btn-text"><strong>Secure My Discount</strong></div>
                        <div className="button_icon white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 18 10" fill="none" className="button_icon-svg black">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.0002 5.00391C12.0002 4.45162 11.5525 4.00391 11.0002 4.00391L1.00025 4.00391C0.44796 4.00391 0.000245026 4.45162 0.000245051 5.00391C0.000245075 5.55619 0.44796 6.00391 1.00025 6.00391L11.0002 6.00391C11.5525 6.00391 12.0002 5.55619 12.0002 5.00391Z" fill="currentColor"></path>
                            <path d="M17.3616 3.77448C18.2131 4.36865 18.2131 5.63135 17.3616 6.22552L12.3417 9.72824C11.3409 10.4266 10.0002 9.6933 10.0002 8.50272L10.0002 1.49728C10.0002 0.306709 11.3409 -0.426616 12.3417 0.271762L17.3616 3.77448Z" fill="currentColor"></path>
                          </svg>
                        </div>
                      </Link>
                    </div>
                    <div className="d-sm-text-block">
                      <div className="p-medium _w-medium">Available in White or Black</div>
                    </div>

                    {/* Swiper Section */}
                    <div className="piano-slider-block">
                      <div className="swiper piano">
                        <div data-w-id="a343a42c-8900-04d5-8f4b-feda93bf949b" style={{ opacity: 0 }} className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="discount-image-wrap">
                              <div className="slider-image-block"><img src="/images/DS6.0-Black-1.png" loading="lazy" sizes="100vw" srcSet="/images/DS6.0-Black-1-p-500.png 500w, /images/DS6.0-Black-1-p-800.png 800w, /images/DS6.0-Black-1-p-1080.png 1080w, /images/DS6.0-Black-1-p-1600.png 1600w, /images/DS6.0-Black-1-p-2000.png 2000w, /images/DS6.0-Black-1-p-2600.png 2600w, /images/DS6.0-Black-1-p-3200.png 3200w, /images/DS6.0-Black-1.png 6144w" alt="" className="discount-im" /></div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="discount-image-wrap">
                              <div className="slider-image-block"><img src="/images/DS5.5-White.png" loading="lazy" sizes="100vw" srcSet="/images/DS5.5-White-p-500.png 500w, /images/DS5.5-White-p-800.png 800w, /images/DS5.5-White-p-1080.png 1080w, /images/DS5.5-White-p-1600.png 1600w, /images/DS5.5-White-p-2000.png 2000w, /images/DS5.5-White-p-2600.png 2600w, /images/DS5.5-White-p-3200.png 3200w, /images/DS5.5-White.png 6144w" alt="" className="discount-im" /></div>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-pagination"></div>
                        <div className="slide-back"><div className="w-icon-slider-left"></div></div>
                        <div className="slide-next"><div className="icon w-icon-slider-right"></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
