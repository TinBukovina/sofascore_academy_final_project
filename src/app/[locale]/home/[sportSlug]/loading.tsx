import { Box, Flex } from "@styled-system/jsx";
import React from "react";

export default function Loader() {
  return (
    <Flex
      gap={"1rem"}
      p={"0"}
      w={"100%"}
      h={"100%"}
      border={"1px solid transparent"}
      color={"text.normal"}
      overflow={"auto"}
      _focus={{
        outline: "none",
        border: "1px solid transparent",
        borderRadius: "md",
      }}
    >
      <Box
        w={"100%"}
        h={"100%"}
        bg={"surface.s0"}
        border={"1px solid transparent"}
        borderColor={"border"}
        borderRadius={"md"}
        overflow={"hidden"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"surface.s1"}
          h={"82px"}
        ></Box>
        <Box bg={"surface.s1"} h={"45px"}></Box>
      </Box>
      <Box
        minW={"230px"}
        h={"300px"}
        bg={"surface.s1"}
        border={"1px solid transparent"}
        borderColor={"border"}
        borderRadius={"md"}
      ></Box>
    </Flex>
  );
}
