import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: routing.localePrefix,
});

export const config = {
  matcher: ["/", "/(en|hr|es|fr)/:path*", "/((?!_next|_vercel|api|.*\\..*).*)"],
};
