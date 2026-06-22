import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
];

const nextConfig: NextConfig = {
  // Compiler optimisations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Image optimisation — allow external sources used in the app
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdnjs.cloudflare.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "tile.openstreetmap.org" },
    ],
  },

  // Security & caching headers on every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Cache static assets aggressively
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirect bare /index to /
  async redirects() {
    return [];
  },
};

export default nextConfig;
