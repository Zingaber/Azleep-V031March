/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache in development to avoid issues with spaces in paths
    if (dev) {
      config.cache = false;
    }

    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      minimize: !dev,
    };

    return config;
  },
  // Remove serverExternalPackages to avoid conflict with transpilePackages
  poweredByHeader: false,
  compress: true,
  trailingSlash: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: true
  },
  // Handle API timeouts
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiTimeout: 8000, // 8 seconds
  },
  // Increase static generation timeout
  staticPageGenerationTimeout: 120,
  // Add custom headers for extra security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  }
};

module.exports = nextConfig; 