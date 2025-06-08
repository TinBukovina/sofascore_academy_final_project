"use client";

import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import Image from "next/image";

import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import {
  TournamentInterface,
  useTournamentStandings,
} from "@/4_entities/tournament";
import { StandingsRow } from "./StandingsRow";
import { useLastNTournamentEvents } from "@/4_entities/tournament/hooks/useLastNTournamentEvents";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { css } from "@styled-system/css";
import { AvailableSportsType } from "@/app/[locale]/home/[sportSlug]/page";

interface StandingsProps {
  tournament: TournamentInterface;
  homeTeamId?: number;
  awayTeamId?: number;
  disableHeroLink?: boolean;
  styles?: React.CSSProperties;
}

export function Standings({
  tournament,
  homeTeamId,
  awayTeamId,
  disableHeroLink = false,
  styles,
}: StandingsProps) {
  const router = useRouter();

  const tError = useTranslations("error");
  const tStandings = useTranslations("standings");

  const { tournamentStandings, isLoading, isError, error } =
    useTournamentStandings(tournament.id);

  const {
    tournamentEvents,
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
    error: errorEvent,
  } = useLastNTournamentEvents(tournament.id, 5);

  if (isLoading || isLoadingEvent)
    return (
      <Box
        w={"100%"}
        h={"100%"}
        bg={"surface.s1"}
        border={"1px solid transparent"}
        borderColor={"border"}
        borderRadius={"md"}
        overflow={"hidden"}
      >
        <Box w={"100%"} h={"52px"} bg={"surface.s0"}></Box>
        <Box w={"100%"} h={"72px"} bg={"surface.s0"}></Box>
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
      </Box>
    );

  if (isError || isErrorEvent) {
    console.log(error);
    console.log(errorEvent);
    return <div>Error</div>;
  }

  if (!tournamentStandings) {
    return <div>{tError("no_tournament_standings_for_id")}</div>;
  }

  if (!tournamentEvents || tournamentEvents.length <= 0) {
    return <div>{tError("no_tournament_events_for_id")}</div>;
  }

  tournamentEvents.sort(
    (a, b) =>
      new Date(b.startDate).getMilliseconds() -
      new Date(a.startDate).getMilliseconds()
  );

  const totalStandigns = tournamentStandings
    ?.filter((el) => el.type === "total")
    .at(0);

  return (
    <Flex
      direction={"column"}
      w={"100%"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      overflow={"hidden"}
      style={styles}
    >
      <Box
        p={"1rem 1rem 0.5rem 1rem"}
        w={"100%"}
        color={"primaryClr"}
        fontSize={"h6"}
      >
        {tStandings("title")}
      </Box>

      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"0.5rem 1rem 1rem 1rem"}
        borderBottom={"1px solid transparent"}
        borderColor={"primaryClr"}
        _hover={
          !disableHeroLink
            ? {
                bg: "surface.s1",
                cursor: "pointer",
              }
            : {}
        }
        onClick={() => {
          if (!disableHeroLink)
            router.push(
              `/home/${tournament.sport.slug}/tournament/${tournament.id}`
            );
        }}
      >
        <Flex gap={"0.75rem"}>
          <Image
            src={`/api/tournament/${tournament.id}/image`}
            width={48}
            height={48}
            alt="tournoment logo"
          />
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"start"}
            gap={"0.5rem"}
            lineHeight={1}
          >
            <Box>{tournament.name}</Box>
            <Box fontSize={"sm"} color={"text.secondary"}>
              {tournament.country.name}
            </Box>
          </Flex>
        </Flex>
        <FavouriteToggleBtn whatToAdd="tournament" item={tournament} />
      </Flex>

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={"0.5rem 1rem"}
        pb={"0"}
        bg={"surface.s1"}
        color={"text.secondary"}
      >
        <Flex gap={"3.5rem"}>
          <Flex justifyContent={"center"} alignItems={"center"} minW={"32px"}>
            #
          </Flex>
          <Flex
            display={{
              base: "none",
              xs: "inline-block",
              md: "none",
              xl: "inline-block",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            minW={"20px"}
          >
            Team
          </Flex>
        </Flex>

        <Flex gap={"1rem"} fontSize={"sm"}>
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
            P
          </Flex>
          <Flex
            display={{ base: "none", lg: "inline-block" }}
            justifyContent={"center"}
            alignItems={"center"}
            minW={"20px"}
          >
            W
          </Flex>
          <Flex
            display={{ base: "none", lg: "inline-block" }}
            justifyContent={"center"}
            alignItems={"center"}
            minW={"20px"}
          >
            D
          </Flex>
          <Flex
            display={{ base: "none", lg: "inline-block" }}
            justifyContent={"center"}
            alignItems={"center"}
            minW={"20px"}
          >
            L
          </Flex>
          <Flex
            display={{ base: "none", xxs: "inline-block" }}
            justifyContent={"center"}
            alignItems={"center"}
            minW={"20px"}
          >
            DIFF
          </Flex>
          <Flex justifyContent={"center"} alignItems={"center"} minW={"150px"}>
            Last 5
          </Flex>
          <Flex justifyContent={"center"} alignItems={"center"} minW={"20px"}>
            PTS
          </Flex>
        </Flex>
      </Flex>
      {totalStandigns?.sortedStandingsRows?.map((el, i) => (
        <StandingsRow
          key={el.id}
          standingRowData={el}
          status={
            homeTeamId === el.team.id || awayTeamId === el.team.id
              ? "selected"
              : Math.round(totalStandigns.sortedStandingsRows.length / 2) > i
                ? "pass"
                : "noPass"
          }
          position={i + 1}
          sportSlug={tournament.sport.slug as AvailableSportsType}
          pastMatches={tournamentEvents.filter(
            (event) =>
              event.homeTeam.name === el.team.name ||
              event.awayTeam.name === el.team.name
          )}
        />
      ))}
    </Flex>
  );
}
