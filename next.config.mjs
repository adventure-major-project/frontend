/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["darpankattel3.pythonanywhere.com", "localhost"], // Add your allowed image domains here
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "fs": false,
      "path": false,
      "crypto": false,
    };
    
    // Add rule for handling Excalidraw's production bundle
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/@excalidraw\/excalidraw/,
      type: 'javascript/auto',
    });

    // Handle Excalidraw's assets
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
    });

    return config;
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*/", // Add trailing slash
  //       destination: "https://darpankattel3.pythonanywhere.com/api/:path*/", // Ensure destination also has trailing slash
  //     },
  //     {
  //       source: "/api/:path*", // Also match without trailing slash
  //       destination: "https://darpankattel3.pythonanywhere.com/api/:path*/", // Always redirect with slash
  //     },
  //   ];
  // },
};

export default nextConfig;
