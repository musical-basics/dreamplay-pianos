import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DreamPlay One | Small Hands Piano with Narrow Keys',
    description: 'The DreamPlay One is a premium digital piano with narrow keys, designed for pianists with small hands. Prevent hand injury and play freely.',
    alternates: {
        canonical: 'https://dreamplaypianos.com',
    },
};

export default function LandingPage1Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
