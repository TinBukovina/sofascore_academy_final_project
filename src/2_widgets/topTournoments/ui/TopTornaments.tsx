import React, { useState } from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { useFirstNTournaments } from "@/4_entities/tournament";
import Row from "./Row";
import { dropDownArrow400SvgInfo, Icon } from "@/5_shared";
import LoadingPage from "@/app/_ui/LoadingPage";
import { useTranslations } from "next-intl";

export function TopTornaments() {
  const tError = useTranslations("error");
  const tTornaments = useTranslations("top_tournametns");

  const { tournaments, isLoading, isError, error } = useFirstNTournaments(5);

  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }

  if (!tournaments || tournaments.length <= 0) {
    return <div>{tError("no_tournaments")}</div>;
  }

  return (
    <Flex
      display={{ base: "none", sm: "flex" }}
      maxW={"230px"}
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
        {tTornaments("title")}
      </Box>

      <Flex direction={"column"} gap={{ base: "1rem", lg: "0.75rem" }}>
        {tournaments.map((tournament, i) => {
          if (!tournament) return <Box key={i} />;

          return <Row tournoment={tournament} key={tournament?.id} />;
        })}
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
        <Box w={"fit-content"}>{tTornaments("show_more")}</Box>
        <Icon width="24px" height="24px" svgInfo={dropDownArrow400SvgInfo()} />
      </Flex>
    </Flex>
  );
}
