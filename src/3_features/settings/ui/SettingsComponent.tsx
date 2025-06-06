"use client";

import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { LanguageInput } from "./LanguageInput";
import { ThemeInput } from "./ThemeInput";
import { useSettings } from "../context/useSettings";

interface SettingsComponentProps {
  text?: string;
}

export function SettingsComponent({}: SettingsComponentProps) {
  const { theme, changeTheme, language, changeLanguage } = useSettings();

  return (
    <Flex
      direction={"column"}
      gap={"0.75rem"}
      w={"100%"}
      h={"100%"}
      color={"text.normal"}
      fill={"text.normal"}
    >
      {/*LANGUAGE*/}
      <Flex
        direction={"column"}
        gap={"0.5rem"}
        bg={"surface.s1"}
        border={"1px solid transparent"}
        borderColor={"border"}
        borderRadius={"md"}
      >
        <Box p={"1rem"} pb={"0"} fontSize={"h6"}>
          Language
        </Box>
        <LanguageInput
          initialValue={language || "england"}
          handleValueChange={changeLanguage}
        />
      </Flex>
      {/*Theme*/}
      <Flex
        direction={"column"}
        gap={"0.75rem"}
        p={"1rem"}
        bg={"surface.s1"}
        border={"1px solid transparent"}
        borderColor={"border"}
        borderRadius={"md"}
      >
        <Box fontSize={"h6"}>Theme</Box>
        <ThemeInput initialValue={theme} handleValueChange={changeTheme} />
      </Flex>
    </Flex>
  );
}
