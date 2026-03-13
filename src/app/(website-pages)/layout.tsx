import Script from "next/script";
import { Lato, Manrope } from "next/font/google";
import NewsletterPopup from "@/components/NewsletterPopup";
import Chatbot from "@/components/chatbot/Chatbot";
import { getChatbotEnabled } from "@/actions/admin-actions";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";

const lato = Lato({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
    style: ["normal", "italic"],
    variable: "--font-lato",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-manrope",
    display: "swap",
});

export default async function WebsitePagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isChatbotEnabled = await getChatbotEnabled();

    return (
        <div className={`${lato.variable} ${manrope.variable}`}>
            {/* Webflow CSS — loaded in body since nested layouts can't add to <head> */}
            {/* eslint-disable-next-line @next/next/no-css-tags */}
            <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
            {/* eslint-disable-next-line @next/next/no-css-tags */}
            <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
            {/* eslint-disable-next-line @next/next/no-css-tags */}
            <link href="/css/lionels-stunning-site-07720d.webflow.css" rel="stylesheet" type="text/css" />

            {/* External CSS */}
            <link rel="stylesheet" href="https://unpkg.com/lenis@1.1.14/dist/lenis.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />



            <AnnouncementBanner />
            {children}
            <NewsletterPopup />
            {isChatbotEnabled && <Chatbot />}

            {/* Scripts */}
            <Script
                src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=68b99847f96fcca15429faec"
                strategy="beforeInteractive"
            />
            <Script src="/js/webflow.js" strategy="lazyOnload" />
            <Script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js" strategy="lazyOnload" />
            <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="lazyOnload" />
        </div>
    );
}
