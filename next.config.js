/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/app/api/v1/:path*',
        destination: 'http://localhost:8900/app/api/v1/:path*',
      }
    ]
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config;
  },
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io"
    ]
  }
}

module.exports = nextConfig
