import React from "react";
import { Box } from "../../../../styled-system/jsx";

interface EventWidgetLinkProps {
  children: React.ReactNode;
  isActive: boolean;
  handleOnClick?: () => void;
}

export function EventWidgetLink({
  children,
  isActive,
  handleOnClick,
}: EventWidgetLinkProps) {
  return (
    <Box
      p={"0.25rem 0.75rem"}
      cursor={"pointer"}
      borderBottom={
        isActive
          ? "2px solid token(colors.primaryClr)"
          : "1px solid transparent"
      }
      color={isActive ? "primaryClr" : "text.secondary"}
      _hover={{ color: "primaryClr" }}
      onClick={handleOnClick}
    >
      {children}
    </Box>
  );
}
