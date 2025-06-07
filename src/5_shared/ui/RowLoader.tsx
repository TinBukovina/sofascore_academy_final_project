import { css } from "@styled-system/css";
import { Box, Flex } from "@styled-system/jsx";
import React from "react";

interface RowLoaderProps {
  numberOfRows: number;
  rowHeight?: string;
  rowBorderRadius?: string;
  rowGap?: string;
}

export default function RowLoader({
  numberOfRows,
  rowHeight = "24px",
  rowBorderRadius = "sm",
  rowGap = "1rem",
}: RowLoaderProps) {
  return (
    <Flex
      direction={"column"}
      gap={rowGap}
      p={"1rem"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
    >
      {[...Array(numberOfRows)].map((_, i) => (
        <Box
          key={i}
          w={"100%"}
          borderRadius={rowBorderRadius}
          className={css({
            backgroundColor: "surface.s1",
            position: "relative",
            overflow: "hidden",
            _before: {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(
                    90deg,
                    transparent 25%,
                    token(colors.surface.s0) 50%,
                    transparent 75%
                  )`,
              animationName: "shimmerSlide",
              animationDuration: "1.5s",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            },
          })}
          style={{ height: rowHeight }}
        />
      ))}
    </Flex>
  );
}
