import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* Override default cache headers so Cloudflare doesn't cache HTML for 1 year */
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Target only HTML pages - exclude static assets, APIs, and file extension paths (e.g. .env, .xml)
        source: '/((?!api/|_next/|favicon\\.ico|images/|.*\\..*).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=300',
          },
        ],
      },
      {
        // Static assets from Next.js - long cache (immutable)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
