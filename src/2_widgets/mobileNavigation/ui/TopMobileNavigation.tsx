"use client";

import React from "react";
import { Flex } from "../../../../styled-system/jsx";
import Link from "next/link";
import Icon from "@/5_shared/ui/Icon";
import {
  basketball300SvgInfo,
  football300SvgInfo,
  rugby300SvgInfo,
} from "@/5_shared/lib/svgPaths";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { css } from "../../../../styled-system/css";

const activeLinkStyles = {
  color: "primaryClr",
  fill: "primaryClr",
  borderColor: "primaryClr",
};

export function TopMobileNavigation() {
  const pathname = usePathname();

  const footballSvgInfo = football300SvgInfo();
  const basketballSvgInfo = basketball300SvgInfo();
  const rugbySvgInfo = rugby300SvgInfo();

  if (!pathname) {
    throw new Error("There is no pathname.");
  }

  return (
    <Flex
      display={{
        base: "flex",
        md: "none",
      }}
      justifyContent={"space-between"}
      gap={"clamp(1rem, 10vw ,2rem)"}
      py={"0.75rem"}
      px={"1rem"}
      bg={"surface.s0"}
      color={"text.normal"}
      fill={"text.normal"}
      fontSize={"sm"}
      borderBottom={"1px solid token(colors.border)"}
    >
      <Flex justifyContent={"center"} gap={"clamp(1rem, 5vw ,2rem)"} w={"70%"}>
        <Link
          href={"/home/football"}
          style={{
            borderBottomWidth: "1px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.25rem 0.5rem",
          }}
          className={css(
            pathname.includes("football")
              ? activeLinkStyles
              : { borderColor: "white" }
          )}
        >
          <Icon width="24px" height="24px" svgInfo={footballSvgInfo} />
          Football
        </Link>

        <Link
          href={"/home/basketball"}
          style={{
            borderBottomWidth: "1px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.25rem 0.5rem",
          }}
          className={css(
            pathname.includes("basketball")
              ? activeLinkStyles
              : { borderColor: "white" }
          )}
        >
          <Icon width="24px" height="24px" svgInfo={basketballSvgInfo} />
          Basketball
        </Link>

        <Link
          href={"/home/rugby"}
          style={{
            borderBottomWidth: "1px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.25rem 0.5rem",
          }}
          className={css(
            pathname.includes("rugby")
              ? activeLinkStyles
              : { borderColor: "white" }
          )}
        >
          <Icon width="24px" height="24px" svgInfo={rugbySvgInfo} />
          Rugby
        </Link>
      </Flex>

      <Image
        src={"/images/sofascore_logo_icon_white.png"}
        width={48}
        height={48}
        alt="Logo image"
        priority={true}
      />
    </Flex>
  );
}
