import React from "react";
import SpinnerLoader from "../Loader";
import { Flex } from "../../../styled-system/jsx";

interface LoadingPageProps {
  text?: string;
}

export default function LoadingPage({ text }: LoadingPageProps) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      gap={"3rem"}
      w={"100%"}
      minH={"220px"}
      direction={"column"}
      color={"text.normal"}
    >
      {" "}
      <SpinnerLoader />
      {text ? <p>{text}</p> : <p></p>}
    </Flex>
  );
}
