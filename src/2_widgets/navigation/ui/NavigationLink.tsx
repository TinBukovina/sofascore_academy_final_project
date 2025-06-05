import React, { ReactNode } from "react";
import { Flex } from "@styled-system/jsx";

import { SvgReturnType } from "@/5_shared/lib/svgPaths";
import { Icon } from "@/5_shared";

interface NavigationLinkProps {
  children: ReactNode;
  svgInfo: SvgReturnType;
  isActive?: boolean;
  isCompact: boolean;
  handleOnClick?: () => void;
}

export default function NavigationLink({
  children,
  svgInfo,
  isActive = false,
  isCompact,
  handleOnClick,
}: NavigationLinkProps) {
  return (
    <Flex
      gap={"0.5rem"}
      px={"0.75rem"}
      py={"0.75rem"}
      w={!isCompact ? "100%" : "fit-content"}
      fill={isActive ? "navLink.active.text" : "navLink.default.text"}
      color={isActive ? "navLink.active.text" : "navLink.default.text"}
      bg={isActive ? "rgba(288, 288, 288, 0.2)" : "transparent"}
      borderRightRadius={"md"}
      cursor={"pointer"}
      _hover={{
        bg: "rgba(288, 288, 288, 0.2)",
      }}
      onClick={handleOnClick}
    >
      <Icon width="24px" height="24px" svgInfo={svgInfo} />
      {!isCompact ? children : ""}
    </Flex>
  );
}
