import { SvgReturnType } from "@/5_shared/lib/utils/svgPaths";
import React from "react";
import { Box } from "../../../../styled-system/jsx";
import Icon from "@/5_shared/ui/Icon";

interface NavigationIconBtnProps {
  svgInfo: SvgReturnType;
  isActive?: boolean;
  svgW?: string;
  svgH?: string;
  boxPx?: string;
  boxPy?: string;
  handleOnClick?: () => void;
}

export default function NavigationIconBtn({
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
      px={boxPx}
      py={boxPy}
      bg={isActive ? "rgba(228, 228, 228, 0.2)" : "transparent"}
      borderRadius={"sm"}
      fill={isActive ? "navLink.active.text" : "navLink.default.text"}
      _hover={{ bg: "rgba(228, 228, 228, 0.2)" }}
      onClick={handleOnClick}
    >
      <Icon svgInfo={svgInfo} width={svgW} height={svgH} />
    </Box>
  );
}
