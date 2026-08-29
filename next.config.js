/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    loader: 'default',
    dangerouslyAllowSVG: true,
  },

  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=31536000'
          },
          {
            key: 'Content-Encoding',
            value: 'gzip'
          }
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          }
        ],
      }
    ]
  },

  compress: true,
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  webpack: (config) => {
    config.optimization.usedExports = true;
    return config;
  },
};

module.exports = nextConfig;
