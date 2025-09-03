/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Add your CDN(s) here
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.imgix.net' },
      { protocol: 'https', hostname: '**.unsplash.com' }
    ]
  },
  experimental: {
    typedRoutes: false
  }
};
export default nextConfig;
