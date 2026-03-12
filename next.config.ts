import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dreamplaypianos.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/shipping',
        destination: '/information-and-policies/shipping',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
