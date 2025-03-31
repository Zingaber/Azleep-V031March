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
  // Enable output file tracing
  output: 'standalone',
};

module.exports = nextConfig; 