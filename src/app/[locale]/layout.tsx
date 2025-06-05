import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import ClientLayoutWrapper from "../_ui/ClientLayoutWrapper";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const awaitedParams = await params;
  const currentLocale = awaitedParams.locale;

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={currentLocale} messages={messages}>
      <ClientLayoutWrapper>
        {children}
        <div id="portal-root"></div>
      </ClientLayoutWrapper>
    </NextIntlClientProvider>
  );
}
