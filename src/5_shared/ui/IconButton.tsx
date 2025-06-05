import { SvgReturnType } from "@/5_shared/lib/svgPaths";
import React from "react";
import { Flex } from "../../../styled-system/jsx";
import { Icon } from "./Icon";

interface NavigationIconBtnProps {
  svgInfo: SvgReturnType;

  svgW?: string;
  svgH?: string;
  boxPx?: string;
  boxPy?: string;
  handleOnClick?: () => void;
}

export function IconButton({
  svgInfo,
  svgW = "24px",
  svgH = "24px",
  boxPx = "6px",
  boxPy = "6px",
  handleOnClick,
}: NavigationIconBtnProps) {
  return (
    <Flex
      display={"inline-block"}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={"sm"}
      fill={"text.normal"}
      cursor={"pointer"}
      _hover={{ bg: "navLink.hover.bg" }}
      onClick={handleOnClick}
      style={{
        paddingLeft: boxPx,
        paddingRight: boxPx,
        paddingTop: boxPy,
        paddingBottom: boxPy,
      }}
    >
      <Icon svgInfo={svgInfo} width={svgW} height={svgH} />
    </Flex>
  );
}
