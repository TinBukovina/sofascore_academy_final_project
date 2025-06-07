"use client";

import { ReactNode } from "react";
import { Portal } from "./Portal";
import { Box, Flex } from "../../../styled-system/jsx";
import { IconButton } from "./IconButton";
import { closeSvgInfo } from "../lib/svgPaths";
import { css } from "../../../styled-system/css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  mw?: string;
  mh?: string;
  h?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  mw = "500px",
  mh = "400px",
  h = "fit-content",
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      <Box
        position={"fixed"}
        top={0}
        right={0}
        bottom={0}
        left={0}
        backgroundColor={"rgba(0, 0, 0, 0.5)"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={onClose}
        zIndex={9999}
      >
        <Flex
          direction={"column"}
          gap={"1rem"}
          onClick={handleContentClick}
          p={"1rem"}
          maxW={mw}
          minW={"350px"}
          maxH={mh}
          h={h}
          w={"100%"}
          bg={"surface.s0"}
          border={"1px solid transparent"}
          borderColor={"border"}
          borderRadius={"md"}
          color={"text.normal"}
          fill={"text.normal"}
          overflow={"auto"}
          className={css({
            "&::-webkit-scrollbar": {
              width: "0px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "primaryClr",
              borderRadius: "4px",
            },
          })}
          style={{ maxWidth: mw }}
        >
          <Flex justifyContent={"space-between"}>
            <Box color={"primaryClr"} fontSize={"h5"}>
              {title}
            </Box>
            <IconButton svgInfo={closeSvgInfo()} handleOnClick={onClose} />
          </Flex>
          <Box>{children}</Box>
        </Flex>
      </Box>
    </Portal>
  );
};
