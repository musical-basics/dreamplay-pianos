import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { ABTracker } from "@/components/features/analytics/ABTracker";
import { EmailTracker } from "@/components/EmailTracker";
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
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-wf-site="68b99847f96fcca15429faec" suppressHydrationWarning>
      <head>
        {/* Fonts preconnect */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
      </head>
      <body>
        <AnalyticsTracker />
        <ABTracker />
        <EmailTracker />
        {children}
      </body>
    </html>
  );
}
