"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { dropDownArrow400SvgInfo, Icon } from "@/5_shared";
import { css } from "../../../../styled-system/css";

interface MyDateInputProps {
  initialDate?: string;
  onDateChange?: (date: string) => void;
  fontSize?: string;
  hoverBgToken?: string;
  textColorToken?: string;
}

export function MyDateInput({
  initialDate = new Date().toISOString().split("T")[0],
  onDateChange,
  fontSize = "inherit",
  hoverBgToken = "navLink.hover.bg",
  textColorToken = "text.normal",
}: MyDateInputProps) {
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return "Odaberite datum";
    try {
      const dateObj = new Date(dateString);
      return dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.log(error);
      return dateString;
    }
  };

  const iconInfo = dropDownArrow400SvgInfo();

  const inputOverlayStyles = css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
    border: "none",
    padding: 0,
    zIndex: 3,
    margin: 0,
  });

  return (
    <Flex
      position="relative"
      justifyContent={"center"}
      alignItems={"center"}
      p={"0.5rem"}
      borderRadius={"sm"}
      fontSize={fontSize}
      cursor={"pointer"}
      _hover={{ bg: hoverBgToken }}
      gap={"0.25rem"}
      minWidth="180px"
    >
      <Box color={textColorToken} whiteSpace="nowrap">
        {formatDateForDisplay(selectedDate)}
      </Box>

      <Icon
        width="20px"
        height="20px"
        svgInfo={iconInfo}
        fill="currentColor"
        styles={{ zIndex: 1 }}
      />

      <input
        ref={inputRef}
        type="date"
        id="date-picker-event-widget"
        value={selectedDate}
        onChange={handleDateChange}
        className={inputOverlayStyles}
      />
    </Flex>
  );
}
