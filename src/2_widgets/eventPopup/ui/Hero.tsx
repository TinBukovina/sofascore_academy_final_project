import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { TeamInterface } from "@/4_entities/team";
import Image from "next/image";
import { ScoreInterface } from "@/4_entities/event";
import { useTranslations } from "next-intl";

interface HeroProps {
  homeTeam: TeamInterface;
  homeScore: ScoreInterface;
  awayTeam: TeamInterface;
  awayScore: ScoreInterface;
  status?: string;
}

export function Hero({
  homeTeam,
  homeScore,
  awayTeam,
  awayScore,
  status = "Finished",
}: HeroProps) {
  const tEventPopup = useTranslations("event_popup");

  return (
    <Flex
      position={"relative"}
      bg={"surface.s0"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      justifyContent={"center"}
      gap={"1rem"}
      p={"0.5rem"}
      color={"primaryClr"}
      fill={"primaryClr"}
      fontSize={"sm"}
    >
      <Flex
        direction={"column"}
        w={"fit-content"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"0.5rem"}
        p={"0.5rem"}
        minW={"80px"}
      >
        <Box position={"absolute"} left={"0.5rem"} top={"0.5rem"}>
          <FavouriteToggleBtn whatToAdd="team" item={homeTeam} />
        </Box>
        <Image
          src={`/api/team/${homeTeam.id}/image`}
          width={32}
          height={32}
          alt="home team"
        />
        <Box>{homeTeam.name}</Box>
      </Flex>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"fit-content"}
        color={"text.normal"}
        fontWeight={"bold"}
      >
        <Box>
          <Box
            display={"inline-block"}
            color={
              homeScore.total < awayScore.total ? "text.secondary" : "inherit"
            }
          >
            {homeScore.total}
          </Box>
          <span> - </span>
          <Box
            display={"inline-block"}
            color={
              awayScore.total < homeScore.total ? "text.secondary" : "inherit"
            }
          >
            {awayScore.total}
          </Box>
        </Box>
        <Box fontWeight={"normal"} fontSize={"xs"}>
          {status === "Finished" ? tEventPopup("status_finished") : "x"}
        </Box>
      </Flex>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"0.5rem"}
        p={"0.5rem"}
        minW={"80px"}
      >
        <Box position={"absolute"} right={"0.5rem"} top={"0.5rem"}>
          <FavouriteToggleBtn whatToAdd="team" item={awayTeam} />
        </Box>
        <Image
          src={`/api/team/${awayTeam.id}/image`}
          width={32}
          height={32}
          alt="home team"
        />
        <Box>{awayTeam.name}</Box>
      </Flex>
    </Flex>
  );
}
