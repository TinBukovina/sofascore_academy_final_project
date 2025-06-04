import React, { ReactNode } from "react";
import { css } from "../../../styled-system/css";
import { Navigation } from "@/2_widgets/navigation";
import {
  BottomMobileNavigation,
  TopMobileNavigation,
} from "@/2_widgets/mobileNavigation";
import { FavouritesProvider } from "@/3_features/favourites/context/FavouritesProvider";
import { Box, Flex } from "../../../styled-system/jsx";
import Image from "next/image";
import { SettingsProvider } from "@/3_features/settings/context/SettingsProvider";

export default function ClientLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <body
      className={css({
        display: "grid",
        gridTemplateColumns: { base: "unset", md: "auto 1fr" },
        gridTemplateRows: { base: "auto 1fr auto", md: "unset" },

        height: "100dvh",

        bg: "surface.s0",
      })}
    >
      <SettingsProvider>
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
            <Box display={{ base: "none", md: "flex" }}>
              <Image
                src={"/images/sofascore_logo_small.png"}
                width={160}
                height={26}
                alt="Sofascore logo"
                priority={true}
              />
            </Box>
            {children}
          </Flex>
          <BottomMobileNavigation />
        </FavouritesProvider>
      </SettingsProvider>
    </body>
  );
}
