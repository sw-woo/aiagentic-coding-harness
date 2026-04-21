import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      {
        source: "/manifesto",
        destination: "/handbook",
        permanent: true,
      },
      {
        source: "/manifesto/:slug",
        destination: "/handbook",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
