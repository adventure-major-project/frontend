/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/api/:path*", // Any request to /api/* will be proxied
          destination: "https://darpankattel3.pythonanywhere.com/api/:path*", // Backend API
        },
      ];
    },
  };

export default nextConfig;
  