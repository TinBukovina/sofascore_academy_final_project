import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { dropDownArrow400SvgInfo, Icon, ImageBox } from "@/5_shared";
import { getCountryISO2 } from "@/4_entities/player/lib/utils";

interface LanguageInputElementProps {
  lang: string;
  elementType?: "selected" | "dropdown";
}

export default function LanguageInputElement({
  lang,
  elementType = "selected",
}: LanguageInputElementProps) {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      p={"1rem"}
      pt={"0.75rem"}
      borderRadius={"md"}
      border={"1px solid transparent"}
      _hover={{
        bg: "surface.s0",
        borderTopColor:
          elementType === "selected" ? "primaryClr" : "transparent",
        cursor: "pointer",
      }}
    >
      <Flex gap={"0.75rem"}>
        <ImageBox
          initialSrc={`https://flagcdn.com/w80/${getCountryISO2(lang.toLowerCase())}.png`}
          fallbackSrc="/images/imageFallback.svg"
          alt="country image"
          w="24px"
          h="24px"
          styles={{ borderRadius: "100%" }}
        />
        {lang.toUpperCase().at(0) + lang.slice(1).toLowerCase()}
      </Flex>
      {elementType === "selected" ? (
        <Icon svgInfo={dropDownArrow400SvgInfo()} width="24px" height="24px" />
      ) : (
        <Box display={"none"}></Box>
      )}
    </Flex>
  );
}
