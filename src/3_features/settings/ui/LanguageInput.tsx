"use client";

import React, { useEffect, useState } from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import LanguageInputElement from "./LanguageInputElement";
import { LanguageType } from "../context/SettingsProvider";

interface LanguageInputProps {
  initialValue: LanguageType;
  handleValueChange: (value: LanguageType) => void;
}

const languages: LanguageType[] = ["england", "croatia", "spain", "france"];

const languageIndex = {
  england: 0,
  croatia: 1,
  spain: 2,
  france: 3,
};

export function LanguageInput({
  initialValue,
  handleValueChange,
}: LanguageInputProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageType>(initialValue);

  useEffect(() => {
    if (selectedLanguage !== null) handleValueChange(selectedLanguage);
  }, [selectedLanguage, handleValueChange]);

  return (
    <Flex direction={"column"} gap={"0rem"}>
      <Box onClick={() => setIsExpanded((prev) => !prev)}>
        <LanguageInputElement
          lang={languages[languageIndex[selectedLanguage]]}
        />
      </Box>
      {isExpanded ? (
        <>
          {languages
            .filter((el) => el !== selectedLanguage)
            .map((language) => (
              <Box
                key={language}
                onClick={() => {
                  setSelectedLanguage(language);
                  setIsExpanded(false);
                }}
              >
                <LanguageInputElement lang={language} elementType="dropdown" />
              </Box>
            ))}
        </>
      ) : (
        <Box display="none"></Box>
      )}
    </Flex>
  );
}
