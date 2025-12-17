"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// FAQ Data
const faqItems = [
    {
        question: "What does DS stand for?",
        answer: `<p class="p-regular text-gray">DS stands for the Donison-Steinbuhler Standard, which was created in 1991 to standardize alternative piano sizes. The DS5.5 and DS6.0 sizes are supported widely by piano competitions such as the Dallas International Competition and universities such as Stanford University, Johns Hopkins Peabody Institute, University of Wisconsin-Madison, University of Memphis, State University of Music (HDMK) in Stuttgart, Germany, and countless others. When purchasing a keyboard stamped with the “DS5.5” or “DS6.0” size, you can feel confident knowing your keyboard was manufactured to the exact precision dictated by the DS standard, and they can play on any DS5.5 or DS6.0 keyboard and have the same experience. For more information: <a href="https://dsstandardfoundation.org/" target="_blank" rel="noopener noreferrer">https://dsstandardfoundation.org/</a></p>`
    },
    {
        question: "Why not do more sizes such as DS5.7 or DS6.2?",
        answer: `<p class="p-regular text-gray">It comes down to one thing: <strong>compatibility.</strong> We don't want you to fall in love with a piano size at home that you can't find anywhere else.<br><br>We strictly build to the International DS standards (5.5 and 6.0) because these are the sizes being adopted by universities and concert halls. If we built a custom size like a 5.7, you’ll need more time to adjust if you had to perform onstage. <br><br>Plus, the data is clear: these two sizes solve the handspan issue for 87% of women and 24% of men. We’d rather build a tool that connects you to the wider music world than a niche instrument that isolates you.</p>`
    },
    {
        question: "If I practice on this, will I lose my ability to play on a standard keyboard?",
        answer: `<p class="p-regular text-gray"><strong>It’s a natural fear, but the data suggests the opposite: <strong>playing on narrower keys often improves your technique on standard ones (DS6.5 conventional size)<br><br>When you practice on a size that fits your hand (like the DS6.0), you learn to play with less tension. That relaxation carries over when you switch back to a standard keyboard. Your fingers and hands develop smooth, seamless micro-adjustments that carry over to a standard keyboard - it's much easier to "rescale" <strong>proper technique</strong> developed from a smaller keyboard to a larger keyboard, than it is to "fix" <strong>broken technique</strong> from spending years practicing on a keyboard that is too large.<br><br><strong>The Real-World Proof:</strong> Our co-founder, Lionel Yu, practices on a DS6.0 but regularly performs on concert-sized Steinway & Yamaha grand pianos in venues like Carnegie Hall and the Barbican Center. He switches between them seamlessly.<br><br>Hubert Ness, Professor of Jazz Piano (HMDK Stuttgart), noted: <em>"Playing the DS6.0 had a positive effect when going back to the normal keyboard."</em><br><br><strong>See the switch in action:</strong><br><strong>Watch:</strong> [Pianist Linda Gould switching between all three sizes instantly] <a href="https://youtu.be/KkIz-uq5M_k" target="_blank" rel="noopener noreferrer">https://youtu.be/KkIz-uq5M_k</a> <br><strong>Watch:</strong> [Professor Carol Leone playing DS6.0 and DS6.5 back-to-back] <a href="https://youtu.be/fZRML4LOkoo" target="_blank" rel="noopener noreferrer">https://youtu.be/fZRML4LOkoo</a></p>`
    },
    {
        question: "What's the advantage of reaching a 10th?",
        // Custom render for this one because it has images
        customRender: true
    },
    {
        question: "How does pre-ordering work?",
        answer: `<p class="p-regular text-gray">Reserve your keyboard by pre-ordering now. Your support helps us finish our prototype and start production. We’ll keep you updated, with shipping planned for June 2026.</p>`
    },
    {
        question: "Does it feel like a real piano?",
        answer: `<p class="p-regular text-gray">Yes! You’ll enjoy weighted, graded keys and a natural touch. Plus, the LED lights above each key make learning and performing more fun for everyone.</p>`
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first item like in HTML

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="main-wrapper">
                <div className="section-faq">
                    <div className="global-padding">
                        <div className="section-padding">
                            <div className="container-1045">
                                <style jsx>{`
                  .container-1045 { max-width: 65.3125rem; margin: 0 auto; }
                  .faq-title-block { margin-bottom: 2.5rem; text-align: center; }
                  .h2-heading { font-size: 2.5rem; font-weight: 700; line-height: 1.1; margin-top: 0; margin-bottom: 0; }
                  .faq-qa-wrap { width: 100%; max-width: 48rem; margin: 0 auto; }
                  .faq4_item-wrfrm {
                    display: block;
                    width: 100%;
                    border-bottom: 1px solid #e5e7eb;
                    padding: 1.5rem 0;
                    cursor: pointer;
                    text-align: left;
                    background: none;
                    border-left: none; border-right: none; border-top: none; 
                  }
                  .faq_trigger { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
                  .heading-style-wrfrm-h5 { font-size: 1.25rem; font-weight: 600; line-height: 1.4; margin: 0; color: #111827; }
                  .faq4_toggle-icon-wrfrm { position: relative; width: 1rem; height: 1rem; flex-shrink: 0; }
                  .faq4_icon-line-wrfrm, .faq4_icon-line-static-wrfrm {
                    position: absolute; top: 50%; left: 0; width: 100%; height: 2px; background-color: #111827;
                    transition: transform 0.3s ease; transform: translateY(-50%);
                  }
                  .faq4_icon-line-wrfrm { transform: translateY(-50%) rotate(90deg); }
                  /* When active, rotate line to make minus */
                  .active .faq4_icon-line-wrfrm { transform: translateY(-50%) rotate(0deg); }
                  
                  .faq_description {
                    display: grid;
                    grid-template-rows: 0fr;
                    transition: grid-template-rows 0.3s ease-out;
                    overflow: hidden;
                  }
                  .faq_description.open { grid-template-rows: 1fr; }
                  .faq_description-inner { min-height: 0; padding-top: 1rem; }
                  .p-regular { font-size: 1rem; line-height: 1.6; color: #4b5563; margin-bottom: 1rem; }
                  .faq-image-block { margin: 1.5rem 0; border-radius: 0.75rem; overflow: hidden; }
                  .faq-image { width: 100%; height: auto; display: block; }
                `}</style>

                                <div className="faq-content-wrapper">
                                    <div className="faq-title-block">
                                        <h2 className="h2-heading">Frequently Asked Questions</h2>
                                    </div>
                                    <div className="faq-qa-wrap">
                                        <div className="faq_wrapper-wrfrm">
                                            {faqItems.map((item, index) => {
                                                const isOpen = openIndex === index;
                                                return (
                                                    <div key={index} className="faq4_item-wrfrm" onClick={() => toggleAccordion(index)}>
                                                        <div className={`faq_trigger ${isOpen ? 'active' : ''}`}>
                                                            <div className="faq_trigger-info">
                                                                <h3 className="heading-style-wrfrm-h5">{item.question}</h3>
                                                            </div>
                                                            <div className={`faq4_toggle-icon-wrfrm ${isOpen ? 'active' : ''}`}>
                                                                <div className="faq4_icon-line-wrfrm"></div>
                                                                <div className="faq4_icon-line-static-wrfrm"></div>
                                                            </div>
                                                        </div>
                                                        <div className={`faq_description ${isOpen ? 'open' : ''}`}>
                                                            <div className="faq_description-inner">
                                                                {item.customRender ? (
                                                                    <div className="is-flex">
                                                                        <div className="faq-image-block">
                                                                            <img src="/images/Picture8_1.avif" alt="Hand span comparison" className="faq-image" />
                                                                        </div>
                                                                        <p className="p-regular text-gray">Being able to reach a 10th isn't just about playing 10ths. Most modern & classical composers avoided using 10ths or more because they knew that women and children would be playing their pieces, even if they could reach the intervals themselves.<br /><br />However, being able to reach a 10th means 9ths and octaves are also much easier. Similarly, the interval between fingers such as the thumb and index finger, or index & pinky, are also commonly used intervals within larger chords.</p>
                                                                        <div className="faq-image-block">
                                                                            <img src="/images/Picture1.avif" alt="Chord reach example" className="faq-image" />
                                                                        </div>
                                                                        <p className="p-regular text-gray">For example, the 5-note chord D-G-Bb-D-E has a total interval of a 9th, but pianists who can only reach a 9th will have a hard time playing this chord due to stretching the fingers for the inner notes. They might be able to play it, but only with much strain. With a DS6.0 keyboard, they will be able to play this chord with ease.</p>
                                                                    </div>
                                                                ) : (
                                                                    <div dangerouslySetInnerHTML={{ __html: item.answer || "" }} />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
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
