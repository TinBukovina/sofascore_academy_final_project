import React, { ReactNode } from "react";
import { css } from "../../../styled-system/css";

interface ButtonProps {
  children: ReactNode;
  handleOnClick?: () => void;
}
export function Button({ children, handleOnClick }: ButtonProps) {
  return (
    <button
      onClick={handleOnClick}
      className={css({
        p: "0.25rem 0.75rem",
        bg: "primaryClr",
        border: "1px solid transparent",
        borderRadius: "sm",
        color: "base.black",
        fontWeight: "bold",
        cursor: "pointer",

        _hover: {
          bg: "surface.s0",
          borderColor: "border",
          color: "base.white",
        },
      })}
    >
      {children}
    </button>
  );
}
