/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache in development to avoid issues with spaces in paths
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  // For Vercel deployment
  experimental: {
    serverComponentsExternalPackages: ["date-fns"]
  },
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig; 