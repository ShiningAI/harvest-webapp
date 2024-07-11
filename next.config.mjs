import createNextIntlPlugin from "next-intl/plugin";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/harvest/:path*",
        destination: `https://harvest-api.prius.ai/v1/:path*`,
      },
    ];
  },
};

if (process.env.NODE_ENV === "development") {
  nextConfig.reactStrictMode = false;
}

export default withNextIntl(nextConfig);
