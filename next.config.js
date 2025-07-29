/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.manpuku.app', 'manpuku.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.manpuku.app',
      },
    ],
  },
}

module.exports = nextConfig
