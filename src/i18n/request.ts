// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing"; // Importirajte routing konfiguraciju (koristite
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale ${locale}:`, error);
    messages = {};
  }

  return {
    locale,
    messages,
  };
});
