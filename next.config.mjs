/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: null,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
