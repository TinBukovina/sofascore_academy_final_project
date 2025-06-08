"use client";

import React, { useState } from "react";
import { Box, Flex } from "@styled-system/jsx";
import { dropDownArrow400SvgInfo, Icon } from "@/5_shared";
import { useTranslations } from "next-intl";

interface ShowMoreButtonProps {
  text?: string;
}

export function ShowMoreButton({}: ShowMoreButtonProps) {
  const tTornaments = useTranslations("top_tournametns");
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      fill={"primaryClr"}
      color={"primaryClr"}
      mx={"auto"}
      p={"0.25rem 0.75rem"}
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      cursor={"pointer"}
      bg={isButtonHovered ? "surface.s0" : "normal"}
      border={
        isButtonHovered
          ? "1px solid token(colors.border)"
          : "1px solid transparent"
      }
      borderRadius={"sm"}
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
    >
      <Box w={"fit-content"}>{tTornaments("show_more")}</Box>
      <Icon width="24px" height="24px" svgInfo={dropDownArrow400SvgInfo()} />
    </Flex>
  );
}
