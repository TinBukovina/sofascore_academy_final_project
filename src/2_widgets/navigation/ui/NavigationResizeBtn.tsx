import {
  leftArrow300SvgInfo,
  rightArrow300SvgInfo,
  sidenavigation300SvgInfo,
} from "@/5_shared/lib/svgPaths";
import React, { useState } from "react";
import { Box } from "../../../../styled-system/jsx";
import Icon from "@/5_shared/ui/Icon";

interface NavigationIconBtnProps {
  currentNavigationWidthState: "normal" | "compact";
  isActive?: boolean;
  svgW?: string;
  svgH?: string;
  boxPx?: string;
  boxPy?: string;
  handleOnClick?: () => void;
}

export default function NavigationResizeBtn({
  currentNavigationWidthState,
  isActive = false,
  svgW = "24px",
  svgH = "24px",
  boxPx = "6px",
  boxPy = "6px",
  handleOnClick,
}: NavigationIconBtnProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const sidenavigationSvgInfo = sidenavigation300SvgInfo();
  const rightArrowSvgInfo = rightArrow300SvgInfo();
  const leftArrowSvgInfo = leftArrow300SvgInfo();

  let displayingSvgInfo;

  if (!isHovered) {
    displayingSvgInfo = sidenavigationSvgInfo;
  } else {
    if (currentNavigationWidthState === "normal") {
      displayingSvgInfo = leftArrowSvgInfo;
    } else {
      displayingSvgInfo = rightArrowSvgInfo;
    }
  }

  return (
    <Box
      px={boxPx}
      py={boxPy}
      bg={isActive ? "rgba(228, 228, 228, 0.2)" : "transparent"}
      borderRadius={"sm"}
      fill={"navLink.active.text"}
      cursor={"pointer"}
      _hover={{ bg: "rgba(228, 228, 228, 0.2)" }}
      onClick={handleOnClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon svgInfo={displayingSvgInfo} width={svgW} height={svgH} />
    </Box>
  );
}
