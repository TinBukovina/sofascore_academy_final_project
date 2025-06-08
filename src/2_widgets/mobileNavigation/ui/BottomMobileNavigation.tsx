"use client";

import React from "react";
import { Flex } from "@styled-system/jsx";
import { usePathname, useRouter } from "next/navigation";

import { NavigationIconBtn } from "@/5_shared";
import {
  bookmarkFill300SvgInfo,
  calendar400SvgInfo,
  search400SvgInfo,
  settings300SvgInfo,
} from "@/5_shared/lib/svgPaths";

export function BottomMobileNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const bookmarkFillSvgInfo = bookmarkFill300SvgInfo();
  const calendarSvgInfo = calendar400SvgInfo();
  const searchSvgInfo = search400SvgInfo();
  const settingsSvgInfo = settings300SvgInfo();

  return (
    <Flex
      display={{
        base: "flex",
        md: "none",
      }}
      justifyContent={"center"}
      gap={"clamp(1rem, 5vw ,2rem)"}
      py={"0.75rem"}
      h={"fit-content"}
      bg={"navigation.bg"}
      color={"text.normal"}
      borderTop={"1px solid token(colors.border)"}
    >
      <NavigationIconBtn
        svgInfo={bookmarkFillSvgInfo}
        svgH="32px"
        svgW="32px"
        boxPx="8px"
        boxPy="8px"
        isActive={pathname?.includes("favourites")}
        handleOnClick={() => {
          router.push("/favourites");
        }}
      />
      <NavigationIconBtn
        svgInfo={calendarSvgInfo}
        svgH="32px"
        svgW="32px"
        boxPx="8px"
        boxPy="8px"
        isActive={
          pathname?.includes("football") ||
          pathname?.includes("basketball") ||
          pathname?.includes("american-footabll")
        }
        handleOnClick={() => {
          router.push("/home/football");
        }}
      />
      <NavigationIconBtn
        svgInfo={searchSvgInfo}
        svgH="32px"
        svgW="32px"
        boxPx="8px"
        boxPy="8px"
        isActive={pathname?.includes("search")}
        handleOnClick={() => {
          router.push("/search");
        }}
      />
      <NavigationIconBtn
        svgInfo={settingsSvgInfo}
        svgH="32px"
        svgW="32px"
        boxPx="8px"
        boxPy="8px"
        isActive={pathname?.includes("settings")}
        handleOnClick={() => {
          router.push("/settings");
        }}
      />
    </Flex>
  );
}
