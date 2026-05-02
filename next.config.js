/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',
  
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  
  // Disable server-side rendering features that require Node.js
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
  
  // Configure webpack for static export
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.path = false;
      config.resolve.fallback.os = false;
      config.resolve.fallback.crypto = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.http = false;
      config.resolve.fallback.https = false;
      config.resolve.fallback.url = false;
      config.resolve.fallback.querystring = false;
      config.resolve.fallback.stream = false;
      config.resolve.fallback.string_decoder = false;
      config.resolve.fallback.buffer = false;
      config.resolve.fallback.assert = false;
      config.resolve.fallback.constants = false;
      config.resolve.fallback.util = false;
      config.resolve.fallback.vm = false;
      config.resolve.fallback.zlib = false;
      config.resolve.fallback.process = false;
      config.resolve.fallback.console = false;
      config.resolve.fallback.global = false;
      config.resolve.fallback.__dirname = false;
      config.resolve.fallback.__filename = false;
    }
    return config;
  },
};

module.exports = nextConfig;