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
    domains: ['localhost', '192.168.1.41'],
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
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      }
    ];
  },
  // Add experimental features
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'azleep-ui.vercel.app']
    }
  }
};

module.exports = nextConfig; 