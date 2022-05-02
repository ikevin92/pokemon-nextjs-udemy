/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // configuracion para permitir el acceso de las urls de imgs
    images: {
        domains: ['raw.githubusercontent.com'],
    },
};

module.exports = nextConfig;
