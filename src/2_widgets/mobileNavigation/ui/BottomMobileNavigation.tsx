"use client";

import React, { useState } from "react";
import { Flex } from "../../../../styled-system/jsx";
import { NavigationIconBtn } from "@/5_shared";
import {
  bookmarkFill300SvgInfo,
  calendar400SvgInfo,
  search400SvgInfo,
  settings300SvgInfo,
} from "@/5_shared/lib/svgPaths";
import { ActiveLinksType } from "@/2_widgets/navigation/ui/Navigation";
import { usePathname, useRouter } from "next/navigation";

export function BottomMobileNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeNavLink, setActiveNavLink] = useState<ActiveLinksType>(
    pathname?.split("/")[pathname.split("/").length - 1] as ActiveLinksType
  );

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
      bg={"surface.s0"}
      color={"text.normal"}
      borderTop={"1px solid token(colors.border)"}
    >
      <NavigationIconBtn
        svgInfo={bookmarkFillSvgInfo}
        svgH="32px"
        svgW="32px"
        boxPx="8px"
        boxPy="8px"
        isActive={activeNavLink === "favourites"}
        handleOnClick={() => {
          setActiveNavLink("favourites");
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
          activeNavLink === "football" ||
          activeNavLink === "basketball" ||
          activeNavLink === "rugby"
        }
        handleOnClick={() => {
          setActiveNavLink("football");
          router.push("/home/football");
        }}
      />
      <NavigationIconBtn
        svgInfo={searchSvgInfo}
        svgH="32px"
        svgW="32px"
        boxPx="8px"
        boxPy="8px"
        isActive={activeNavLink === "search"}
        handleOnClick={() => {
          setActiveNavLink("search");
          router.push("/search");
        }}
      />
      <NavigationIconBtn
        svgInfo={settingsSvgInfo}
        svgH="32px"
        svgW="32px"
        boxPx="8px"
        boxPy="8px"
        isActive={activeNavLink === "settings"}
        handleOnClick={() => {
          setActiveNavLink("settings");
          router.push("/settings");
        }}
      />
    </Flex>
  );
}
