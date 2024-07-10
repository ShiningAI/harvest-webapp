import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./lib/navigation";

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  localeDetection: false,
});

export const config = {
  // Include all paths that should be internationalized,
  // including the "api" folder, and excluding "_next" folder
  // and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!_next|.*\\..*).*)"],
};

export const runtime = "experimental-edge";
