import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            // Explicit allowlist instead of the browser default of "allow
            // everything": scripts/connections only to self + Google
            // Analytics (the only third party this site actually loads),
            // no <iframe> embedding of us anywhere, no <object>/<embed>.
            // 'unsafe-inline' stays on script-src because next/script's
            // inline gtag bootstrap isn't nonce-based here; still a real
            // reduction from "anything goes" to "only these known hosts".
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 'unsafe-eval' only in dev: React's dev-mode debugging tools
              // (component stack reconstruction) call eval() locally, but
              // React itself guarantees it never does in production — so
              // this widens nothing in what actually ships.
              `script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval' " : ''}https://www.googletagmanager.com`,
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
              "img-src 'self' data: https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
