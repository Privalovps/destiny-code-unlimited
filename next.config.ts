import type { NextConfig } from 'next';
import { privateHeaders } from './src/lib/server/personal-response';

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  async headers() {
    const headers = Object.entries(privateHeaders).map(([key, value]) => ({ key, value }));
    return ['/result', '/report/:path*'].map(source => ({ source, headers }));
  },
};

export default nextConfig;
