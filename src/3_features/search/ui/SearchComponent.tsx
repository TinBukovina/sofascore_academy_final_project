"use client";

import { Icon, search400SvgInfo } from "@/5_shared";
import { css } from "@styled-system/css";
import { Flex } from "@styled-system/jsx";
import React, { useEffect, useRef, useState } from "react";

interface SearchComponentProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchComponent({ value, setValue }: SearchComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleInputFocuse = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <Flex
      tabIndex={0}
      gap={"0.75rem"}
      className={css({
        p: "0.5rem 1rem",
        w: "100%",
        bg: !isInputFocused ? "surface.s1" : "surface.s0",
        border: "1px solid transparent",
        borderColor: "primaryClr",
        borderRadius: "md",
        fontSize: "h6",
        color: "primaryClr",
        fill: "primaryClr",
      })}
      _hover={{
        cursor: "pointer",
        color: "text.normal",
        fill: "text.normal",
      }}
      onClick={() => {
        if (inputRef.current) inputRef.current.focus();
      }}
    >
      <Icon width="32px" height="32px" svgInfo={search400SvgInfo()} />
      <input
        ref={inputRef}
        className={css({
          w: "100%",
          outline: "none",
        })}
        onFocus={handleInputFocuse}
        onBlur={handleInputBlur}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
      />
    </Flex>
  );
}
