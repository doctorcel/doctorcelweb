/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
      images: {
        domains: ['res.cloudinary.com'],
      },
    reactStrictMode: true,
    experimental: {
      serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    },
};

export default nextConfig;