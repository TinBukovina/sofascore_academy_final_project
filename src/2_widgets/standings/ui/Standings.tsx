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
import SpinnerLoader from "@/app/Loader";
import { useRouter } from "next/navigation";
interface StandingsProps {
  tournament: TournamentInterface;
  homeTeamId?: number;
  awayTeamId?: number;
}

export function Standings({
  tournament,
  homeTeamId,
  awayTeamId,
}: StandingsProps) {
  const router = useRouter();

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
        <p>Učitavanje početnih događaja...</p>
      </Flex>
    );

  if (isError || isErrorEvent) {
    console.log(error);
    console.log(errorEvent);
    return <div>Error</div>;
  }

  if (!tournamentStandings) {
    return <div>There is no tournament standings with that id</div>;
  }

  if (!tournamentEvents || tournamentEvents.length <= 0) {
    return <div>There is no tournament events with that id and page</div>;
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
    >
      <Box
        p={"1rem 1rem 0.5rem 1rem"}
        w={"100%"}
        color={"primaryClr"}
        fontSize={"h6"}
      >
        Standings
      </Box>

      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"0.5rem 1rem 1rem 1rem"}
        borderBottom={"1px solid transparent"}
        borderColor={"primaryClr"}
        _hover={{
          bg: "surface.s1",
          cursor: "pointer",
        }}
        onClick={() => {
          router.push(`/home/football/tournament/${tournament.id}`);
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
        <FavouriteToggleBtn whatToAdd="tournoment" item={tournament} />
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
