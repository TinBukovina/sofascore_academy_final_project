import { Box, Flex } from "@styled-system/jsx";
import React from "react";

export default function Loader() {
  return (
    <Flex gap={"1rem"} h={"100%"} color={"text.normal"} fill={"text.normal"}>
      <Flex
        justifyContent={"space-between"}
        p={"1rem"}
        w={"100%"}
        bg={"surface.s1"}
        border={"1px solid transparent"}
        borderColor={"primaryClr"}
        borderRadius={"md"}
      >
        <Flex alignItems={"center"} gap={"0.5rem"}>
          <Box
            w={"64px"}
            h={"64px"}
            bg={"surface.s0"}
            borderRadius={"100%"}
          ></Box>
          <Flex direction={"column"} gap={"0.5rem"} lineHeight={1}>
            <Box
              h={"24px"}
              w={"160px"}
              bg={"surface.s0"}
              borderRadius={"md"}
            ></Box>
            <Box
              h={"18px"}
              w={"80px"}
              bg={"surface.s0"}
              borderRadius={"sm"}
            ></Box>
          </Flex>
        </Flex>
        <Flex>
          <Box w={"24px"} h={"24px"} bg={"surface.s0"} borderRadius={"md"} />
        </Flex>
      </Flex>
      <Flex
        gap={"1rem"}
        h={"100%"}
        overflow={"hidden"}
        direction={{ base: "row", lg: "column" }}
      >
        <Box
          flex={"7"}
          w={"100%"}
          h={"100%"}
          bg={"surface.s1"}
          border={"1px solid transparent"}
          borderColor={"border"}
          borderRadius={"md"}
          overflow={"hidden"}
        >
          <Box w={"100%"} h={"52px"} bg={"surface.s0"}></Box>
          <Box w={"100%"} h={"72px"} bg={"surface.s0"}></Box>
        </Box>
        <Box
          flex={"4"}
          w={"100%"}
          h={"100%"}
          bg={"surface.s0"}
          border={"1px solid transparent"}
          borderColor={"border"}
          borderRadius={"md"}
          overflow={"hidden"}
        ></Box>
      </Flex>
    </Flex>
  );
}
