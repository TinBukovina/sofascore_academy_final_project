"use client";

import React, { useState } from "react";
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
import NavigationIconBtn from "./NavigationIconBtn";
import NavigationResizeBtn from "./NavigationResizeBtn";

export default function Navigation() {
  const [activeNavLink, setActiveNavLink] = useState<string>("football");
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
      direction={"column"}
      gap={"2rem"}
      py={"2rem"}
      pr={"1rem"}
      w={!isCompact ? "230px" : "fit-content"}
      maxW={!isCompact ? "230px" : "60px"}
      minW={!isCompact ? "230px" : "60px"}
      bg={"surface.s0"}
      color={"text.normal"}
      paddingRight={!isCompact ? "1rem" : "0rem"}
      transition={"all 0.3s ease"}
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
          }}
        >
          Basketball
        </NavigationLink>
        <NavigationLink
          isCompact={isCompact}
          isActive={activeNavLink === "american footbal"}
          svgInfo={rugbySvgInfo}
          handleOnClick={() => {
            setActiveNavLink("american footbal");
          }}
        >
          Rugby
        </NavigationLink>
      </Flex>
    </Flex>
  );
}
