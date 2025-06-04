import React from "react";
import { Box, Flex } from "../../../styled-system/jsx";
import Link from "next/link";

export function SomethingWentWrong() {
  return (
    <Flex
      direction={"column"}
      gap={"1rem"}
      color={"text.normal"}
      fill={"text.normal"}
    >
      <Box>
        <p>Something went wrong</p>
        <p>Try again</p>
      </Box>

      <Link href="/">Go home</Link>
    </Flex>
  );
}
