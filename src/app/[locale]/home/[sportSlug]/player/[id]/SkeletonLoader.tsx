import RowLoader from "@/5_shared/ui/RowLoader";
import { Box, Flex } from "@styled-system/jsx";
import React from "react";

export default function SkeletonLoader() {
  return (
    <Flex
      direction={"column"}
      gap={"1rem"}
      color={"text.normal"}
      fill={"text.normal"}
    >
      {/*HERO SECTION*/}
      <Flex
        justifyContent={"space-between"}
        p={"1rem"}
        w={"100%"}
        bg={"surface.s1"}
        border={"1px solid transparent"}
        borderColor={"primaryClr"}
        borderRadius={"md"}
      >
        <Flex alignItems={"center"} gap={"0.75rem"}>
          <Box
            border={"2px solid transparent"}
            borderColor={"primaryClr"}
            borderRadius={"100%"}
          >
            <Box
              w={"64px"}
              h={"64px"}
              borderRadius={"100%"}
              bg={"surface.s0"}
            ></Box>
          </Box>
          <Flex direction={"column"} gap={"0.75rem"} lineHeight={1}>
            <Flex gap={"0.5rem"} alignItems={"center"}>
              <Box
                w={"24px"}
                h={"24px"}
                borderRadius={"100%"}
                bg={"surface.s0"}
              ></Box>
              <Box
                h={"23px"}
                w={"160px"}
                bg={"surface.s0"}
                borderRadius={"md"}
              ></Box>
            </Flex>
            <Flex gap={"0.5rem"} alignItems={"center"}>
              <Box
                w={"24px"}
                h={"24px"}
                borderRadius={"100%"}
                bg={"surface.s0"}
              ></Box>
              <Box
                h={"16px"}
                w={"100px"}
                bg={"surface.s0"}
                borderRadius={"md"}
              ></Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Box
            w={"24px"}
            h={"24px"}
            borderRadius={"100%"}
            bg={"surface.s0"}
          ></Box>
        </Flex>
      </Flex>

      {/*MATCHES*/}

      <Flex
        direction={"column"}
        w={"100%"}
        h={"100%"}
        border={"1px solid transparent"}
        borderColor={"border"}
      >
        <Box
          w={"100%"}
          h={"101px"}
          borderBottom={"1px solid transparent"}
          borderColor={"primaryClr"}
        ></Box>

        <RowLoader numberOfRows={7} rowHeight="32px" rowBorderRadius="md" />
      </Flex>
    </Flex>
  );
}
