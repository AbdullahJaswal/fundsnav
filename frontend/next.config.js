/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nivo"],
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
