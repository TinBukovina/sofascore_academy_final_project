"use client";

import {
  useTournamentById,
  useTournamentEvents,
} from "@/4_entities/tournament";
import LoadingPage from "@/app/_ui/LoadingPage";
import React, { useState } from "react";
import Image from "next/image";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { Standings } from "@/2_widgets/standings";
import { useWindowWidth } from "@/5_shared/lib/hooks/useWindowWidth";
import { ChangeEventsRow, Matches, MatchesEvents } from "@/2_widgets/matches";
import { Box, Center, Flex } from "@styled-system/jsx";

interface PageProps {
  params: Promise<{ id: number }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const tournamentId = resolvedParams.id;

  const windowWidth = useWindowWidth();

  const [fetchedPage, setFetchedPage] = useState<number>(0);

  const { tournament, isLoading, isError, error } =
    useTournamentById(tournamentId);
  const {
    tournamentEvents,
    isLoading: isLoadingTournamentsEvents,
    isError: isErrorTournamentEvents,
    error: errorTrournaentEvents,
  } = useTournamentEvents(tournamentId, fetchedPage);

  if (isLoading || isLoadingTournamentsEvents)
    return <LoadingPage text="Loading tournament data..." />;

  if (isError || isErrorTournamentEvents) {
    console.log(error);
    console.log(errorTrournaentEvents);
    return <Box>Error</Box>;
  }

  if (!tournament) {
    return <Center>There is no tournament with that ID.</Center>;
  }

  if (!tournamentEvents) {
    return <Center>There is no events for this tournament.</Center>;
  }

  return (
    <Flex
      direction={"column"}
      gap={"1rem"}
      color={"text.normal"}
      fill={"text.normal"}
    >
      {/*HERO SECTION*/}
      <Flex
        justifyContent={"space-between"}
        p={"1rem"}
        w={"100%"}
        bg={"surface.s1"}
        border={"1px solid transparent"}
        borderColor={"primaryClr"}
        borderRadius={"md"}
      >
        <Flex alignItems={"center"} gap={"0.5rem"}>
          <Image
            src={`/api/tournament/${tournament?.id}/image`}
            width={64}
            height={64}
            alt="tournament image"
          />
          <Flex direction={"column"} gap={"0.5rem"} lineHeight={1}>
            <Box fontSize={"h5"}>{tournament?.name}</Box>
            <Box color={"text.secondary"}>{tournament?.country.name}</Box>
          </Flex>
        </Flex>
        <Flex>
          <FavouriteToggleBtn whatToAdd="tournament" item={tournament} />
        </Flex>
      </Flex>
      {/*CONTENT*/}
      <Flex direction={windowWidth < 1050 ? "column" : "row"} gap={"1rem"}>
        <Box flex={windowWidth < 1050 ? "unset" : "7"} h={"fit-content"}>
          <Standings tournament={tournament} disableHeroLink={true} />
        </Box>
        {/*TOURNAMENT MATCHES*/}

        <Matches tournament={tournament} styles={{ flex: "4" }}>
          <ChangeEventsRow
            text={fetchedPage >= 0 ? "Played" : "Finished"}
            handleLeftBtnClick={() => {
              setFetchedPage((prev) => prev + 1);
            }}
            handleRightBtnClick={() => {
              setFetchedPage((prev) => prev - 1);
            }}
          />
          <MatchesEvents
            windowType={windowWidth < 1050 ? "normal" : "small"}
            events={tournamentEvents}
          />
        </Matches>
      </Flex>
    </Flex>
  );
}
