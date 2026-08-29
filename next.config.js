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

  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ],
      }
    ]
  },

  compress: true,
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  turbopack: {},
};

module.exports = nextConfig;
