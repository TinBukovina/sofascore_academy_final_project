"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { ThemeType } from "../context/SettingsProvider";

interface ThemeInputProps {
  initialValue: ThemeType;
  handleValueChange: (value: ThemeType) => void;
}
export function ThemeInput({
  initialValue,
  handleValueChange,
}: ThemeInputProps) {
  const [themeValue, setThemeValue] = useState<ThemeType>(initialValue);

  useEffect(() => {
    if (themeValue !== null) handleValueChange(themeValue);
  }, [themeValue, handleValueChange]);

  return (
    <Flex direction={"column"} gap={"0.75rem"}>
      <Flex
        alignItems={"center"}
        gap={"0.5rem"}
        onClick={() => setThemeValue("system")}
      >
        <Box
          w={"24px"}
          h={"24px"}
          bg={themeValue === "system" ? "primaryClr" : "surface.s1"}
          border={"2px solid transparent"}
          borderColor={"primaryClr"}
          borderRadius={"100%"}
          _hover={{
            bg: "primaryClr",
            cursor: "pointer",
          }}
        ></Box>{" "}
        <Box>System</Box>
      </Flex>
      <Flex
        alignItems={"center"}
        gap={"0.5rem"}
        onClick={() => setThemeValue("light")}
      >
        <Box
          w={"24px"}
          h={"24px"}
          bg={themeValue === "light" ? "primaryClr" : "surface.s1"}
          border={"2px solid transparent"}
          borderColor={"primaryClr"}
          borderRadius={"100%"}
          _hover={{
            bg: "primaryClr",
            cursor: "pointer",
          }}
        ></Box>{" "}
        <Box>Light</Box>
      </Flex>
      <Flex
        alignItems={"center"}
        gap={"0.5rem"}
        onClick={() => setThemeValue("dark")}
      >
        <Box
          w={"24px"}
          h={"24px"}
          bg={themeValue === "dark" ? "primaryClr" : "surface.s1"}
          border={"2px solid transparent"}
          borderColor={"primaryClr"}
          borderRadius={"100%"}
          _hover={{
            bg: "primaryClr",
            cursor: "pointer",
          }}
        ></Box>{" "}
        <Box>Dark</Box>
      </Flex>
    </Flex>
  );
}
