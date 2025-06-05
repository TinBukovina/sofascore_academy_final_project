import React from "react";
import { SvgReturnType } from "../lib/svgPaths";

interface IconTemplateProps {
  styles?: React.CSSProperties;
  width?: string;
  height?: string;
  svgInfo: SvgReturnType;
  fill?: string;
  svgContent?: React.ReactNode;
}

export const Icon: React.FC<IconTemplateProps> = ({
  svgInfo,
  styles = {},
  width = "100%",
  height = "100%",
  fill = "inherit",
  svgContent,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={svgInfo.viewBox}
      fill={fill}
      style={styles}
      xmlns="http://www.w3.org/2000/svg"
    >
      {svgInfo.path ? <path d={svgInfo.path} fill="inherit" /> : svgContent}
    </svg>
  );
};
