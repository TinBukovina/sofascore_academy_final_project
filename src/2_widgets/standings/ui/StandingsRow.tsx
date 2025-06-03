import {
  StandingRowInterface,
  TournamentEventsInterface,
} from "@/4_entities/tournament";
import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import Image from "next/image";
import { MatchBox } from "./MatchBox";
import { useRouter } from "next/navigation";

interface StandingsRowInterface {
  standingRowData: StandingRowInterface;
  position: number;
  status: "pass" | "noPass" | "selected";
  pastMatches: TournamentEventsInterface[];
}

export function StandingsRow({
  standingRowData,
  position,
  status,
  pastMatches,
}: StandingsRowInterface) {
  const router = useRouter();

  const team = standingRowData.team;

  const performances: ("W" | "L" | "D")[] = [];
  for (const event of pastMatches) {
    if (performances.length >= 5) break;

    if (
      standingRowData.team.name === event.awayTeam.name &&
      event.winnerCode === "away"
    ) {
      performances.push("W");
    } else if (
      standingRowData.team.name === event.homeTeam.name &&
      event.winnerCode === "home"
    ) {
      performances.push("W");
    } else if (event.winnerCode === "draw") {
      performances.push("D");
    } else {
      performances.push("L");
    }
  }

  return (
    <Flex
      justifyContent={"space-between"}
      gap={"1rem"}
      p={"0.75rem 1rem"}
      w={"100%"}
      bg={"surface.s1"}
      fontSize={"sm"}
      _hover={{
        bg: "surface.s0",
        cursor: "pointer",
      }}
      onClick={() => {
        router.push(`/home/football/team/${team.id}`);
      }}
    >
      <Flex alignItems={"center"} gap={"1rem"}>
        <Flex
          justifyContent={"center"}
          p={"0.1rem 0.5rem"}
          minW={"32px"}
          h={"fit-content"}
          bg={
            status === "pass"
              ? "actions.positive2"
              : status === "noPass"
                ? "actions.negative2"
                : "orange"
          }
          borderRadius={"sm"}
          color={"surface.s1"}
          fontWeight={"bold"}
          fontSize={"sm"}
        >
          {position}
        </Flex>
        <Image
          src={`/api/team/${team.id}/image`}
          width={24}
          height={24}
          alt="team image"
        />
        <Box
          display={{
            base: "none",
            xs: "inline-block",
            md: "none",
            xl: "inline-block",
          }}
        >
          {team.name}
        </Box>
      </Flex>
      <Flex alignItems={"center"} gap={"1rem"}>
        <Flex
          display={{
            base: "none",
            sm: "inline-block",
            md: "none",
            lg: "inline-block",
          }}
          justifyContent={"center"}
          alignItems={"center"}
          minW={"20px"}
        >
          {standingRowData.played}
        </Flex>
        <Flex
          display={{ base: "none", lg: "inline-block" }}
          justifyContent={"center"}
          alignItems={"center"}
          minW={"20px"}
        >
          {standingRowData.wins}
        </Flex>
        <Flex
          display={{ base: "none", lg: "inline-block" }}
          justifyContent={"center"}
          alignItems={"center"}
          minW={"20px"}
        >
          {standingRowData.draws}
        </Flex>
        <Flex
          display={{ base: "none", lg: "inline-block" }}
          justifyContent={"center"}
          alignItems={"center"}
          minW={"20px"}
        >
          {standingRowData.losses}
        </Flex>
        <Flex
          display={{ base: "none", xxs: "inline-block" }}
          justifyContent={"center"}
          alignItems={"center"}
          minW={"25px"}
        >
          {standingRowData.scoresFor - standingRowData.scoresAgainst}
        </Flex>
        <Flex gap={"0.5rem"}>
          {performances.map((el, i) => (
            <MatchBox key={i} type={el} last={i === 4} />
          ))}
        </Flex>
        <Box minW={"20px"} color={"primaryClr"} fontWeight={"bold"}>
          {standingRowData.points}
        </Box>
      </Flex>
    </Flex>
  );
}
