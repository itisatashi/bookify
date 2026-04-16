import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      {
        protocol: "https",
        hostname: "us5umkdxwpxd0ugn.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
