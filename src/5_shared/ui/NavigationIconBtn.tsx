import { SvgReturnType } from "@/5_shared/lib/svgPaths";
import React from "react";
import { Box } from "../../../styled-system/jsx";
import { Icon } from "./Icon";

interface NavigationIconBtnProps {
  svgInfo: SvgReturnType;
  isActive?: boolean;
  svgW?: string;
  svgH?: string;
  boxPx?: string;
  boxPy?: string;
  handleOnClick?: () => void;
}

export function NavigationIconBtn({
  svgInfo,
  isActive = false,
  svgW = "24px",
  svgH = "24px",
  boxPx = "6px",
  boxPy = "6px",
  handleOnClick,
}: NavigationIconBtnProps) {
  return (
    <Box
      bg={isActive ? "navLink.hover.bg" : "transparent"}
      borderRadius={"sm"}
      fill={isActive ? "navLink.active.text" : "navLink.default.text"}
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
    </Box>
  );
}
