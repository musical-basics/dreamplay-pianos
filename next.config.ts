import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
