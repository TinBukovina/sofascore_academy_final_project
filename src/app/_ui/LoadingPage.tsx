import React from "react";
import { Box, Flex } from "../../../styled-system/jsx";
import SpinnerLoader from "../[locale]/Loader";

interface LoadingPageProps {
  text?: string;
}

export default function LoadingPage({ text }: LoadingPageProps) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      gap={"3rem"}
      pt={"3rem"}
      pb={"1rem"}
      w={"100%"}
      h={"fit-content"}
      direction={"column"}
      color={"text.normal"}
    >
      <SpinnerLoader />
      {text ? <p>{text}</p> : <Box display={"none"}></Box>}
    </Flex>
  );
}
