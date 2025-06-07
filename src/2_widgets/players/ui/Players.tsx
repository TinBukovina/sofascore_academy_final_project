"use client";

import React from "react";
import { Box, Center, Flex } from "../../../../styled-system/jsx";
import { useTeamPlayers } from "@/4_entities/team/hooks/useTeamPlayers";
import { PlayerCard } from "@/4_entities/player";
import { useTranslations } from "next-intl";
import { css } from "@styled-system/css";
import { AvailableSportsType } from "@/app/[locale]/home/[sportSlug]/page";

interface PlayersProps {
  teamId: number;
  sportSlug: AvailableSportsType;
}

export function Players({ teamId, sportSlug }: PlayersProps) {
  const tError = useTranslations("error");
  const tPlayers = useTranslations("players");

  const { teamPlayers, isLoading, isError, error } = useTeamPlayers(teamId);

  if (isLoading)
    return (
      <Flex
        direction={"column"}
        gap={"1rem"}
        w={"100%"}
        border={"1px solid transparent"}
        borderColor={"border"}
        borderRadius={"md"}
        overflow={"hidden"}
      >
        <Box w={"100%"} h={"60px"} bg={"surface.s1"}></Box>
        <Flex direction={"column"} gap={"0.75rem"} p={"1rem"}>
          {[...Array(12)].map((_, i) => (
            <Box
              key={i}
              h={"24px"}
              w={"100%"}
              borderRadius={"sm"}
              className={css({
                backgroundColor: "surface.s0",
                position: "relative",
                overflow: "hidden",
                _before: {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `linear-gradient(
                                          90deg,
                                          transparent 25%,
                                          token(colors.surface.s1) 50%,
                                          transparent 75%
                                        )`,
                  animationName: "shimmerSlide",
                  animationDuration: "1.5s",
                  animationIterationCount: "infinite",
                  animationTimingFunction: "linear",
                },
              })}
            />
          ))}
        </Flex>
      </Flex>
    );

  if (isError) {
    console.log(error);
    return <Center>Error</Center>;
  }

  if (!teamPlayers || teamPlayers.length <= 0) {
    return <Center>{tError("no_players_for_team")}</Center>;
  }

  return (
    <Flex
      direction={"column"}
      gap={"1rem"}
      w={"100%"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      overflow={"hidden"}
    >
      <Box p={"1rem"} bg={"surface.s1"} color={"primaryClr"} fontSize={"h6"}>
        {tPlayers("title")}
      </Box>
      <Flex direction={"column"} gap={"2rem"} p={"1rem"} pt={"0"}>
        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "C").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box textAlign={"center"} mb={"0.5rem"}>
            {tPlayers("position_coach")}
          </Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "C")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard
                    key={player.id}
                    player={player}
                    sportSlug={sportSlug}
                  />
                </Box>
              ))}
          </Flex>
        </Flex>

        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "F").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box textAlign={"center"} mb={"0.5rem"}>
            {tPlayers("position_forward")}
          </Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "F")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard
                    key={player.id}
                    player={player}
                    sportSlug={sportSlug}
                  />
                </Box>
              ))}
          </Flex>
        </Flex>

        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "M").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box textAlign={"center"} mb={"0.5rem"}>
            {tPlayers("position_midfilder")}
          </Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "M")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard
                    key={player.id}
                    player={player}
                    sportSlug={sportSlug}
                  />
                </Box>
              ))}
          </Flex>
        </Flex>

        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "D").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box textAlign={"center"} mb={"0.5rem"}>
            {tPlayers("position_defender")}
          </Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "D")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard player={player} sportSlug={sportSlug} />
                </Box>
              ))}
          </Flex>
        </Flex>

        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "G").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box textAlign={"center"} mb={"0.5rem"}>
            {tPlayers("position_goalkeeper")}
          </Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "G")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard
                    key={player.id}
                    player={player}
                    sportSlug={sportSlug}
                  />
                </Box>
              ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
