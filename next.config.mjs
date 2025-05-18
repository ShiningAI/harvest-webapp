import createNextIntlPlugin from "next-intl/plugin";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

const withNextIntl = createNextIntlPlugin();

const apiBaseUrl = 'http://api.notion-nice.com';

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/privacy-policy",
        destination: "https://priusai.notion.site/Privacy-Policy-c0b43ed5d4c14a8ea74d32e2f810990f",
        permanent: true,
      },
      {
        source: "/terms-of-use",
        destination: "https://priusai.notion.site/Terms-of-use-789f242f42ca4f43bdf8bb1de1b5c684",
        permanent: true,
      },
    ]
  },
  rewrites: async () => {
    return [
      {
        source: "/api/harvest/:path*",
        destination: `https://harvest-api.prius.ai/v1/:path*`,
      },
      {
        source: "/api/mp/:path*",
        destination: `${apiBaseUrl}/mp/:path*`,
      },
      {
        source: "/api/pay/:path*",
        destination: `${apiBaseUrl}/pay/:path*`,
      }
    ];
  },
};

if (process.env.NODE_ENV === "development") {
  nextConfig.reactStrictMode = false;
}

export default withNextIntl(nextConfig);
