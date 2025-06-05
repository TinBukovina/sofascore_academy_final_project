// src/app/[locale]/page.tsx
"use client";
import { useEffect } from "react";
import { Box } from "../../../styled-system/jsx";
import { useLocale } from "next-intl";
import { redirect } from "@/navigation"; // <<< VAŽNO: Koristite ovo!

export default function LocaleHomePage() {
  const locale = useLocale();

  useEffect(() => {
    if (locale) {
      redirect({ href: "/home/football", locale: locale });
    }
  }, [locale]);
  return <Box>Preusmjeravanje...</Box>;
}
