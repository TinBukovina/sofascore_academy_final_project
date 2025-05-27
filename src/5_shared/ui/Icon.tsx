import React from "react";
import { SvgReturnType } from "../lib/utils/svgPaths";

interface IconTemplateProps {
  width?: string;
  height?: string;
  svgInfo: SvgReturnType;
  fill?: string;
  svgContent?: React.ReactNode;
}

const Icon: React.FC<IconTemplateProps> = ({
  svgInfo,
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
      xmlns="http://www.w3.org/2000/svg"
    >
      {svgInfo.path ? <path d={svgInfo.path} fill="inherit" /> : svgContent}
    </svg>
  );
};

export default Icon;
