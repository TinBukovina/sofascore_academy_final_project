import React, { useState } from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { useTournomentById } from "@/4_entities/tournoment";
import Row from "./Row";
import { dropDownArrow400SvgInfo, Icon } from "@/5_shared";

export function TopTornoments() {
  const { tournoment, isLoading, isError, error } = useTournomentById(1);

  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }

  if (!tournoment) {
    return <div>There is no tournoment</div>;
  }

  return (
    <Flex
      display={{ base: "none", sm: "flex" }}
      maxW={"250px"}
      w={{ base: "fit-content", lg: "100%" }}
      h={"fit-content"}
      direction={"column"}
      gap={"1rem"}
      p={"1rem 0.75rem"}
      bg={"surface.s1"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
    >
      <Box
        w={"100%"}
        textAlign={"center"}
        fontSize={"h6"}
        display={{
          base: "none",
          lg: "inline-block",
        }}
      >
        Top Tornoments
      </Box>

      <Flex direction={"column"} gap={{ base: "1rem", lg: "0.5rem" }}>
        <Row tournoment={tournoment} />
        <Row tournoment={tournoment} />
        <Row tournoment={tournoment} />
        <Row tournoment={tournoment} />
      </Flex>

      <Flex
        display={{ base: "none", lg: "flex" }}
        fill={"primaryClr"}
        color={"primaryClr"}
        mx={"auto"}
        p={"0.25rem 0.75rem"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"pointer"}
        bg={isButtonHovered ? "surface.s0" : "normal"}
        border={
          isButtonHovered
            ? "1px solid token(colors.border)"
            : "1px solid transparent"
        }
        borderRadius={"sm"}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        <Box w={"fit-content"}>Show more</Box>
        <Icon width="24px" height="24px" svgInfo={dropDownArrow400SvgInfo()} />
      </Flex>
    </Flex>
  );
}
