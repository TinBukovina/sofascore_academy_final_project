import React, { useState } from "react";
import { Box } from "../../../../styled-system/jsx";
import Icon from "@/5_shared/ui/Icon";
import {
  bookmark400SvgInfo,
  bookmarkFill300SvgInfo,
} from "@/5_shared/lib/utils/svgPaths";

interface FavouriteToggleBtnProps {
  styles?: React.CSSProperties;
}

export function FavouriteToggleBtn({ styles }: FavouriteToggleBtnProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const bookmarkSvgInfo = bookmark400SvgInfo();
  const bookmarkFillSvgInfo = bookmarkFill300SvgInfo();

  return (
    <Box
      width="24px"
      height="24px"
      style={{ ...styles }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon svgInfo={isHovered ? bookmarkFillSvgInfo : bookmarkSvgInfo} />
    </Box>
  );
}
