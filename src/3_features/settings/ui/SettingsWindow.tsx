import { Modal } from "@/5_shared/ui/Modal";
import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { LanguageInput } from "./LanguageInput";
import { ThemeInput } from "./ThemeInput";
import { useSettings } from "../context/useSettings";

interface SettingsWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsWindow({ isOpen, onClose }: SettingsWindowProps) {
  const { theme, changeTheme, language, changeLanguage } = useSettings();

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title={"Settings"} isOpen={isOpen} onClose={onClose}>
      <Flex direction={"column"} gap={"0.75rem"}>
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
    </Modal>
  );
}
