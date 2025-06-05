import { Link } from "@/navigation";
import { Box, Flex } from "@styled-system/jsx";
import React from "react";

export default function ErrorPage() {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"1rem"}
      color={"text.normal"}
      fill={"text.normal"}
      h={"100%"}
    >
      <Flex direction={"column"} gap={"1rem"} textAlign={"center"}>
        <Box fontSize={"h1"}>Something went wrong!</Box>
        <Box fontSize={"h5"}>Try again</Box>
      </Flex>

      <Box
        mt={"1rem"}
        w={"fit-content"}
        bg={"primaryClr"}
        border={"1px solid transparent"}
        borderRadius={"md"}
        color={"base.black"}
        _hover={{
          bg: "surface.s1",
          borderColor: "primaryClr",
          color: "primaryClr",
          cursor: "pointer",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
        >
          Go home
        </Link>
      </Box>
    </Flex>
  );
}
