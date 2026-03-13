import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/analytics/',
                    '/login',
                    '/register',
                    '/forgot-password',
                    '/reset-password',
                    '/activate',
                    // Landing page variants — canonical is root /
                    '/intro-offer',
                    '/intro-offer2',
                    '/extended-offer',
                    '/premium-offer',
                    '/landing-page-1',
                    '/landing-page-one',
                    '/special-offer',
                    '/old-homepage',
                    '/old-customize',
                    '/flash-sale',
                    '/mlk-holiday-sale',
                    '/reserve2',
                    '/checkout-pages/',
                ],
            },
        ],
        sitemap: 'https://dreamplaypianos.com/sitemap.xml',
    };
}
