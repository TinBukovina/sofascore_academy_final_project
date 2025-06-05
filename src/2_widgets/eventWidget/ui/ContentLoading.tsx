import { Box, Flex } from "@styled-system/jsx";
import React from "react";

export function ContentLoading() {
  return (
    <Flex direction={"column"} gap={"1rem"} p={"1rem"}>
      <Box w={"100%"} h={"33px"} bg={"surface.s1"} borderRadius={"30px"}></Box>
      <Box w={"100%"} h={"33px"} bg={"surface.s1"} borderRadius={"30px"}></Box>
      <Box w={"100%"} h={"33px"} bg={"surface.s1"} borderRadius={"30px"}></Box>
      <Box w={"100%"} h={"33px"} bg={"surface.s1"} borderRadius={"30px"}></Box>
      <Box w={"100%"} h={"33px"} bg={"surface.s1"} borderRadius={"30px"}></Box>
      <Box w={"100%"} h={"33px"} bg={"surface.s1"} borderRadius={"30px"}></Box>
      <Box w={"100%"} h={"33px"} bg={"surface.s1"} borderRadius={"30px"}></Box>
    </Flex>
  );
}
