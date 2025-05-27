"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import {
  basketball300SvgInfo,
  bookmark400SvgInfo,
  bookmarkFill300SvgInfo,
  football300SvgInfo,
  rugby300SvgInfo,
  search400SvgInfo,
  settings300SvgInfo,
} from "@/5_shared/lib/utils/svgPaths";
import NavigationLink from "./NavigationLink";
import NavigationIconBtn from "../../../5_shared/ui/NavigationIconBtn";
import NavigationResizeBtn from "./NavigationResizeBtn";
import { usePathname, useRouter } from "next/navigation";
import { getActiveLinkFromUrl } from "@/5_shared/lib/utils/utilsFunction";

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
  console.log(pathname);

  const [activeNavLink, setActiveNavLink] = useState<ActiveLinksType>(
    pathname?.split("/")[pathname.split("/").length - 1] as ActiveLinksType
  );
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

  useEffect(() => {
    if (!pathname) return;

    setActiveNavLink(getActiveLinkFromUrl(pathname));
  }, [pathname]);

  const isCompact = navigationWidthState === "compact";

  return (
    <Flex
      direction={"column"}
      gap={"2rem"}
      py={"2rem"}
      pr={"1rem"}
      w={!isCompact ? "clamp(190px, 20vw, 230px)" : "fit-content"}
      maxW={!isCompact ? "230px" : "60px"}
      minW={!isCompact ? "190px" : "60px"}
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
            isActive={activeNavLink === "search"}
            svgInfo={searchSvgInfo}
            handleOnClick={() => {
              setActiveNavLink("search");
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
            isActive={activeNavLink === "search"}
            svgInfo={searchSvgInfo}
            handleOnClick={() => {
              setActiveNavLink("search");
            }}
          >
            Search
          </NavigationLink>
        ) : (
          <Box></Box>
        )}

        <NavigationLink
          isCompact={isCompact}
          isActive={activeNavLink === "favourites"}
          svgInfo={
            activeNavLink === "favourites"
              ? bookmarkFillSvgInfo
              : bookmarkSvgInfo
          }
          handleOnClick={() => {
            setActiveNavLink("favourites");
            router.push("/favourites");
          }}
        >
          Favourites
        </NavigationLink>
        <NavigationLink
          isCompact={isCompact}
          isActive={activeNavLink === "settings"}
          svgInfo={settingsSvgInfo}
          handleOnClick={() => {
            setActiveNavLink("settings");
            router.push("/settings");
          }}
        >
          Settings
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
          isActive={activeNavLink === "football"}
          svgInfo={footballSvgInfo}
          handleOnClick={() => {
            setActiveNavLink("football");
            router.push("/home/football");
          }}
        >
          Football
        </NavigationLink>
        <NavigationLink
          isCompact={isCompact}
          isActive={activeNavLink === "basketball"}
          svgInfo={basketballSvgInfo}
          handleOnClick={() => {
            setActiveNavLink("basketball");
            router.push("/home/basketball");
          }}
        >
          Basketball
        </NavigationLink>
        <NavigationLink
          isCompact={isCompact}
          isActive={activeNavLink === "rugby"}
          svgInfo={rugbySvgInfo}
          handleOnClick={() => {
            setActiveNavLink("rugby");
            router.push("/home/rugby");
          }}
        >
          Rugby
        </NavigationLink>
      </Flex>
    </Flex>
  );
}
