import React from "react";
import { Flex } from "../../../../styled-system/jsx";

interface MatchBoxProps {
  type: "W" | "L" | "D";
  last?: boolean;
}

export function MatchBox({ type, last = false }: MatchBoxProps) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      p={"0.5rem"}
      w={"24px"}
      h={"24px"}
      bg={
        type === "W"
          ? "actions.positive2"
          : type === "L"
            ? "actions.negative2"
            : "border"
      }
      border={"2px solid transparent"}
      borderColor={last ? "text.normal" : "transparent"}
      borderRadius={"sm"}
      fontSize={"sm"}
      fontWeight={"bold"}
    >
      {type}
    </Flex>
  );
}
