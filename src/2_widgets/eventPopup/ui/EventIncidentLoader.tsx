import { css } from "@styled-system/css";
import { Box, Flex } from "@styled-system/jsx";
import React from "react";

export default function EventIncidentLoader() {
  return (
    <Flex
      direction={"column"}
      gap={"0.75rem"}
      p={"1rem"}
      h={"250px"}
      bg={"surface.s0"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
    >
      {[...Array(7)].map((_, i) => (
        <Box
          key={i}
          h={"24px"}
          w={"100%"}
          borderRadius={"sm"}
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
        />
      ))}
    </Flex>
  );
}
