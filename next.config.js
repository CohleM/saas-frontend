/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = nextConfig

module.exports = {
  reactStrictMode: false, //remove this line, I added this because useEffect was running twice on mount
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};
