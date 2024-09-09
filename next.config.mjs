/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    distDir: 'dist',
    experimental: {
        appDir: true,
      }
};

export default nextConfig;