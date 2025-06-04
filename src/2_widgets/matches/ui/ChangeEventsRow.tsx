import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import {
  Icon,
  leftShortArrow400SvgInfo,
  rightShortArrow400SvgInfo,
} from "@/5_shared";

interface ChangeEventsRowProps {
  text: "Played" | "Finished";
  handleLeftBtnClick: () => void;
  handleRightBtnClick: () => void;
}

export function ChangeEventsRow({
  text,
  handleLeftBtnClick,
  handleRightBtnClick,
}: ChangeEventsRowProps) {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      p={"0.75rem 1rem"}
      pt={"0"}
      w={"100%"}
      borderBottom={"1px solid transparent"}
      borderColor={"primaryClr"}
      fontSize={"ms"}
    >
      <Box
        _hover={{ fill: "primaryClr", cursor: "pointer" }}
        onClick={handleLeftBtnClick}
      >
        <Icon width="20px" height="20px" svgInfo={leftShortArrow400SvgInfo()} />
      </Box>
      <Flex w={"fit-content"} borderRadius={"sm"}>
        <Box>{text}</Box>
      </Flex>
      <Box
        visibility={text === "Finished" ? "hidden" : "unset"}
        _hover={{ fill: "primaryClr", cursor: "pointer" }}
        onClick={handleRightBtnClick}
      >
        <Icon
          width="20px"
          height="20px"
          svgInfo={rightShortArrow400SvgInfo()}
        />
      </Box>
    </Flex>
  );
}
