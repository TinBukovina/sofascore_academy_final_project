"use client";

import { ReactNode, useEffect, useState } from "react";
import { SettingsContext } from "./SettingContext";
import { usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";

interface SettingsProviderProps {
  children: ReactNode;
}

interface LocalStorageObject {
  language: string;
  theme: ThemeType;
}

export type ThemeType = "dark" | "light" | "system" | null;

export type LanguageType = "england" | "croatia" | "spain" | "france";

const langugaePrefixes = {
  england: "en",
  croatia: "hr",
  spain: "es",
  france: "fr",
};

const LOCAL_STORAGE_KEY = "sofascore_settings";

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [areOptionsDisplayed, setAreOptionsDisplayed] =
    useState<boolean>(false);
  const [language, setLanguage] = useState<LanguageType | null>(null);
  const [theme, setTheme] = useState<ThemeType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();
  const activeNextIntlLocale = useLocale();

  // Loading setting from local storage
  useEffect(() => {
    let isMounted = true;
    const savedSettingsString = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedSettingsString) {
      console.log("There are no saved settings in local storage.");
      if (isMounted) {
        setLanguage("england");
        setTheme("dark");
        setIsLoading(false);
      }
      return;
    }

    try {
      const savedSettings: LocalStorageObject = JSON.parse(savedSettingsString);
      if (isMounted) {
        setLanguage(savedSettings.language as LanguageType);
        setTheme(savedSettings.theme);
        console.log("Loaded settings:", savedSettings);
      }
    } catch (error) {
      console.error("Failed to parse settings from localStorage:", error);

      if (isMounted) {
        setLanguage("england");
        setTheme("dark");
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Saving setting in local storage
  useEffect(() => {
    if (!isLoading && language !== null && theme !== null) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          language: language,
          theme: theme,
        })
      );
    }
  }, [language, theme, isLoading]);

  // Changing theme on page based on theme
  useEffect(() => {
    if (isLoading || theme === null) {
      return;
    }

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let currentThemeListener:
      | ((this: MediaQueryList, ev: MediaQueryListEvent) => void)
      | null = null;

    if (theme === "system") {
      const isDarkSystem = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      root.classList.add(isDarkSystem ? "dark" : "light");
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      currentThemeListener = (e: MediaQueryListEvent) => {
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", currentThemeListener);
    } else {
      root.classList.add(theme);
    }

    return () => {
      if (currentThemeListener) {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.removeEventListener("change", currentThemeListener);
      }
    };
  }, [theme, isLoading]);

  // Changing language of the app based on language state
  useEffect(() => {
    if (isLoading || !language || language === activeNextIntlLocale) {
      return;
    }

    router.push(pathname, { locale: langugaePrefixes[language] });
  }, [language, activeNextIntlLocale, pathname, router, isLoading]);

  // actions
  const changeTheme = (value: ThemeType) => {
    setTheme(value);
  };

  const changeLanguage = (value: LanguageType) => {
    setLanguage(value);
  };

  if (isLoading) {
    return null;
  }

  return (
    <SettingsContext.Provider
      value={{
        areOptionsDisplayed,
        setAreOptionsDisplayed,
        theme,
        changeTheme,
        language,
        changeLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
