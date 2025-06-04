import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";

interface SettingsComponentProps {
  text?: string;
}

export function SettingsComponent({}: SettingsComponentProps) {
  return (
    <Flex
      direction={"column"}
      gap={"1rem"}
      p={"1rem"}
      maxW={"500px"}
      minW={"350px"}
      maxH={"400px"}
      w={"100%"}
      h={"fit-content"}
      bg={"surface.s0"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      color={"text.normal"}
      fill={"text.normal"}
    >
      <Flex justifyContent={"start"}>
        <Box color={"primaryClr"} fontSize={"h5"}>
          Settings
        </Box>
      </Flex>
      <Flex direction={"column"} gap={"0.75rem"}>
        <Flex direction={"column"} gap={"0.5rem"}>
          <Box fontSize={"h6"}>Language</Box>
          {/* <LanguageInput /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}
