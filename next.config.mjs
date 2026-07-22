/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Real photography will be dropped into /public/images (see README).
    // If you later serve images from a CDN or Squarespace export, whitelist
    // the host here, e.g. { protocol: 'https', hostname: 'images.squarespace-cdn.com' }.
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
