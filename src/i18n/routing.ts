import { defineRouting } from "next-intl/routing";

export const locales = ["en", "hr", "es", "fr"] as const;
export const defaultLocale = "en" as const;
export const localePrefix = "always";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
});
