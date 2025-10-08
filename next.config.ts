import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/webhook',
        destination: 'https://automate.indiaaccelerator.co/webhook/b688bd42-a402-45ed-874a-a816601bcad3',
      },
    ]
  },
};

export default nextConfig;
