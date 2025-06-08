import React, { ReactNode } from "react";
import { css } from "@styled-system/css";
import { Flex } from "@styled-system/jsx";

import { Navigation } from "@/2_widgets/navigation";
import {
  BottomMobileNavigation,
  TopMobileNavigation,
} from "@/2_widgets/mobileNavigation";
import { FavouritesProvider } from "@/3_features/favourites";
import { SettingsProvider } from "@/3_features/settings";
import SettingsWindowCompoents from "@/3_features/settings/ui/SettingsWindowCompoents";
import SearchWindowComponent from "@/3_features/search/ui/SearchWindowComponent";
import { SearchProvider } from "@/3_features/search";
import MainLogo from "./MainLogo";

export default function ClientLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: { base: "unset", md: "auto 1fr" },
        gridTemplateRows: { base: "auto 1fr auto", md: "unset" },

        height: "100dvh",

        bg: "surface.s0",
      })}
    >
      <SettingsProvider>
        <SearchProvider>
          <FavouritesProvider>
            <Navigation />
            <TopMobileNavigation />
            <Flex
              direction={"column"}
              p={"16px"}
              pt={"34px"}
              gap={"32px"}
              overflow={"auto"}
              scrollbarWidth={"none"}
            >
              <MainLogo />
              {children}

              <SettingsWindowCompoents />
              <SearchWindowComponent />
            </Flex>
            <BottomMobileNavigation />
          </FavouritesProvider>
        </SearchProvider>
      </SettingsProvider>
    </div>
  );
}
