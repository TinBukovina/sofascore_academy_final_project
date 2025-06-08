"use client";

import React from "react";
import { useSearchTeams } from "../hook/useSearchTeams";
import { Box, Flex } from "@styled-system/jsx";
import { css } from "@styled-system/css";
import { useLocale, useTranslations } from "next-intl";
import { TeamSearchCard } from "@/4_entities/team";
import { useSearchPlayers } from "../hook/useSearchPlayers";
import { PlayerSearchCard } from "@/4_entities/player";
import { ThreeDot } from "react-loading-indicators";
import { redirect } from "@/navigation";
import { useParams } from "next/navigation";
import { AvailableSportsType } from "@/app/[locale]/home/[sportSlug]/page";

interface ApiSearchComponentProps {
  searchValue: string;
}

export default function ApiSearchComponent({
  searchValue,
}: ApiSearchComponentProps) {
  const tSearch = useTranslations("search");
  const params = useParams();

  const locale = useLocale();

  const { searchTeams, isLoading, isError, error } =
    useSearchTeams(searchValue);
  const {
    searchPlayers,
    isLoading: isLoadingPlayers,
    isError: isErrorPlayers,
    error: errorPlayers,
  } = useSearchPlayers(searchValue);

  if (isError || isErrorPlayers) {
    console.log(error);
    console.log(errorPlayers);
    redirect({ href: "/error", locale });
  }

  console.log(searchTeams);
  return (
    <Flex direction={"column"} gap={"1rem"}>
      {/*TEAMS*/}
      <Flex
        direction={"column"}
        gap={"0.5rem"}
        pb={"0.25rem"}
        overflow={"auto"}
        className={css({
          "&::-webkit-scrollbar": {
            height: "3px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "primaryClr",
            borderRadius: "4px",
          },
        })}
      >
        <Box>{tSearch("teams")}</Box>
        {searchTeams && searchTeams.length > 0 ? (
          <Flex gap={"1rem"} w={"fit-content"}>
            {searchTeams.map((team) => (
              <TeamSearchCard
                key={team.id}
                team={team}
                sportSlug={params.sportSlug as AvailableSportsType}
              />
            ))}
          </Flex>
        ) : (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            p={"1rem"}
            minH={"140px"}
            bg={"surface.s1"}
            border={"1px solid transparent"}
            borderColor={"border"}
            borderRadius={"md"}
            fontSize={"h5"}
          >
            {isLoading ? (
              <ThreeDot color="#F6D757" size="medium" text="" textColor="" />
            ) : searchValue.length > 0 ? (
              tSearch("no_results")
            ) : (
              <Box display={"none"} />
            )}
          </Flex>
        )}
      </Flex>
      {/*Players*/}

      <Flex
        direction={"column"}
        gap={"0.5rem"}
        pb={"0.25rem"}
        overflow={"auto"}
        className={css({
          "&::-webkit-scrollbar": {
            height: "3px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "primaryClr",
            borderRadius: "4px",
          },
        })}
      >
        <Box>{tSearch("players")}</Box>
        {searchPlayers && searchPlayers.length > 0 ? (
          <Flex gap={"1rem"} w={"fit-content"}>
            {searchPlayers.map((player) => (
              <PlayerSearchCard
                key={player.id}
                player={player}
                sportSlug={params.sportSlug as AvailableSportsType}
              />
            ))}
          </Flex>
        ) : (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            p={"1rem"}
            minH={"140px"}
            bg={"surface.s1"}
            border={"1px solid transparent"}
            borderColor={"border"}
            borderRadius={"md"}
            fontSize={"h5"}
          >
            {isLoadingPlayers ? (
              <ThreeDot color="#F6D757" size="medium" text="" textColor="" />
            ) : searchValue.length > 0 ? (
              tSearch("no_results")
            ) : (
              <Box display={"none"} />
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
