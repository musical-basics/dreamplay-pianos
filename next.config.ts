import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/checkout-pages/customize',
        destination: '/intro-offer',
        permanent: true,
      },
      {
        source: '/customize',
        destination: '/intro-offer',
        permanent: true,
      },
      {
        source: '/checkout',
        destination: '/intro-offer',
        permanent: true,
      },
      {
        source: '/premium-offer',
        destination: '/intro-offer',
        permanent: true,
      },
      {
        source: '/extended-offer',
        destination: '/intro-offer',
        permanent: true,
      },
      {
        source: '/shipping',
        destination: '/information-and-policies/shipping',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
