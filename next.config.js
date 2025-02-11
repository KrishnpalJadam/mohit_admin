/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  images: {
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: "localhost", // Remove this on production
      // },
      {
        protocol: "https",
        hostname: "www.kiaancloud.store", // Corrected domain name
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google Profile Pictures
      },
    ],
  },
};

module.exports = nextConfig;
