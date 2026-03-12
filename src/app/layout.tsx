import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { ABTracker } from "@/components/features/analytics/ABTracker";
import { EmailTracker } from "@/components/EmailTracker";
import NewsletterPopup from "@/components/NewsletterPopup";
import Chatbot from "@/components/chatbot/Chatbot";
import { getChatbotEnabled } from "@/actions/admin-actions";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Introducing: DreamPlay One",
  description: "The keyboard that feels like a dream to play.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/webclip.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isChatbotEnabled = await getChatbotEnabled();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-wf-site="68b99847f96fcca15429faec" suppressHydrationWarning>
      <head>
        <meta content="Webflow" name="generator" />

        {/* Fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />

        {/* CSS Order Matters */}
        <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/css/lionels-stunning-site-07720d.webflow.css" rel="stylesheet" type="text/css" />

        {/* External CSS */}
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.1.14/dist/lenis.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

        <Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" strategy="beforeInteractive" />
        <Script id="webfont-load" strategy="beforeInteractive">
          {`WebFont.load({  google: {    families: ["Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic","Manrope:regular,500,600,700,800"]  }});`}
        </Script>
      </head>
      <body>
        <AnnouncementBanner />
        <AnalyticsTracker />
        <ABTracker />
        <EmailTracker />
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
      </body>
    </html>
  );
}
