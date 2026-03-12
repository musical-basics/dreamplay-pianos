import Script from "next/script";
import NewsletterPopup from "@/components/NewsletterPopup";
import Chatbot from "@/components/chatbot/Chatbot";
import { getChatbotEnabled } from "@/actions/admin-actions";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";

export default async function WebsitePagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isChatbotEnabled = await getChatbotEnabled();

    return (
        <>
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

            <Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" strategy="beforeInteractive" />
            <Script id="webfont-load" strategy="beforeInteractive">
                {`WebFont.load({  google: {    families: ["Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic","Manrope:regular,500,600,700,800"]  }});`}
            </Script>

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
        </>
    );
}
