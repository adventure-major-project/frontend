/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*/", // Add trailing slash
        destination: "https://darpankattel3.pythonanywhere.com/api/:path*/", // Ensure destination also has trailing slash
      },
      {
        source: "/api/:path*", // Also match without trailing slash
        destination: "https://darpankattel3.pythonanywhere.com/api/:path*/", // Always redirect with slash
      },
    ];
  },
};

export default nextConfig;
  