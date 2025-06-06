"use client";

import React, { useState } from "react";
import { Box, Flex } from "@styled-system/jsx";
import { usePathname, useRouter } from "next/navigation";

import {
  basketball300SvgInfo,
  bookmark400SvgInfo,
  bookmarkFill300SvgInfo,
  football300SvgInfo,
  rugby300SvgInfo,
  search400SvgInfo,
  settings300SvgInfo,
} from "@/5_shared/lib/svgPaths";
import NavigationLink from "./NavigationLink";
import { NavigationIconBtn } from "@/5_shared";
import NavigationResizeBtn from "./NavigationResizeBtn";
import { useSettings } from "@/3_features/settings";
import { useTranslations } from "next-intl";
import { useSearch } from "@/3_features/search";

export type ActiveLinksType =
  | "football"
  | "basketball"
  | "rugby"
  | "search"
  | "favourites"
  | "settings";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const { areOptionsDisplayed, setAreOptionsDisplayed } = useSettings();
  const { isSearchDisplayed, setIsSearchDisplayed } = useSearch();

  const [navigationWidthState, setNavigationWidthState] = useState<
    "normal" | "compact"
  >("normal");

  const footballSvgInfo = football300SvgInfo();
  const basketballSvgInfo = basketball300SvgInfo();
  const rugbySvgInfo = rugby300SvgInfo();

  const searchSvgInfo = search400SvgInfo();
  const bookmarkSvgInfo = bookmark400SvgInfo();
  const bookmarkFillSvgInfo = bookmarkFill300SvgInfo();
  const settingsSvgInfo = settings300SvgInfo();

  const isCompact = navigationWidthState === "compact";

  return (
    <Flex
      display={{
        base: "none",
        md: "flex",
      }}
      direction={"column"}
      gap={"2rem"}
      py={"2rem"}
      pr={"1rem"}
      w={!isCompact ? "clamp(180px, 20vw, 230px)" : "fit-content"}
      maxW={!isCompact ? "230px" : "60px"}
      minW={!isCompact ? "180px" : "60px"}
      bg={"surface.s0"}
      color={"text.normal"}
      paddingRight={!isCompact ? "1rem" : "0rem"}
      /* transition={"all 2.5s ease"} */
    >
      <Flex px={"0.75rem"} justifyContent={"space-between"}>
        <NavigationResizeBtn
          currentNavigationWidthState={navigationWidthState}
          handleOnClick={() => {
            setNavigationWidthState((prev) => {
              if (prev === "normal") return "compact";
              else return "normal";
            });
          }}
        />
        {!isCompact ? (
          <NavigationIconBtn
            isActive={isSearchDisplayed || pathname?.includes("search")}
            svgInfo={searchSvgInfo}
            handleOnClick={() => {
              console.log(isSearchDisplayed);
              setIsSearchDisplayed(true);
            }}
          />
        ) : (
          <Box></Box>
        )}
      </Flex>

      {/*Navigation actions*/}
      <Flex direction={"column"} gap={"0.5rem"}>
        {isCompact ? (
          <NavigationLink
            isCompact={isCompact}
            isActive={isSearchDisplayed || pathname?.includes("search")}
            svgInfo={searchSvgInfo}
            handleOnClick={() => {
              console.log(isSearchDisplayed);
              setIsSearchDisplayed(true);
            }}
          >
            Search
          </NavigationLink>
        ) : (
          <Box></Box>
        )}

        <NavigationLink
          isCompact={isCompact}
          isActive={
            !areOptionsDisplayed &&
            !isSearchDisplayed &&
            pathname?.includes("favourites")
          }
          svgInfo={
            !areOptionsDisplayed && pathname?.includes("favourites")
              ? bookmarkFillSvgInfo
              : bookmarkSvgInfo
          }
          handleOnClick={() => {
            router.push("/favourites");
          }}
        >
          {t("favourite")}
        </NavigationLink>
        <NavigationLink
          isCompact={isCompact}
          isActive={areOptionsDisplayed || pathname?.includes("settings")}
          svgInfo={settingsSvgInfo}
          handleOnClick={() => {
            if (!pathname?.includes("settings")) setAreOptionsDisplayed(true);
          }}
        >
          {t("settings")}
        </NavigationLink>
      </Flex>

      {/*Sport*/}
      <Flex direction={"column"} gap={"0.5rem"}>
        {!isCompact ? (
          <Box px={"0.75rem"} fontSize={"h5"} color={"primaryClr"}>
            Sports
          </Box>
        ) : (
          <Box></Box>
        )}
        <NavigationLink
          isCompact={isCompact}
          isActive={
            !areOptionsDisplayed &&
            !isSearchDisplayed &&
            pathname?.includes("football")
          }
          svgInfo={footballSvgInfo}
          handleOnClick={() => {
            router.push("/home/football");
          }}
        >
          {t("football")}
        </NavigationLink>
        <NavigationLink
          isCompact={isCompact}
          isActive={
            !areOptionsDisplayed &&
            !isSearchDisplayed &&
            pathname?.includes("basketball")
          }
          svgInfo={basketballSvgInfo}
          handleOnClick={() => {
            router.push("/home/basketball");
          }}
        >
          {t("basketball")}
        </NavigationLink>
        <NavigationLink
          isCompact={isCompact}
          isActive={
            !areOptionsDisplayed &&
            !isSearchDisplayed &&
            pathname?.includes("rugby")
          }
          svgInfo={rugbySvgInfo}
          handleOnClick={() => {
            router.push("/home/rugby");
          }}
        >
          {t("rugby")}
        </NavigationLink>
      </Flex>
    </Flex>
  );
}
