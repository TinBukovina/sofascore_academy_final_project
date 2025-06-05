// src/i18n/routing.ts
import { /* Pathnames ,*/ defineRouting } from "next-intl/routing";

export const locales = ["en", "hr", "es", "fr"] as const;
export const defaultLocale = "en" as const;
export const localePrefix = "always";

/* export const pathnames = {
  "/": "/", 
  "/home/football": "/home/football", 
} satisfies Pathnames<typeof locales>;  */

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  /* pathnames, */
});
