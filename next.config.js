/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com']
  },
  experimental: {
    esmExternals: 'loose'
  }
};

module.exports = nextConfig;