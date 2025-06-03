"use client";

import React, { useState } from "react";
import { Box, Center, Flex } from "../../../../../../styled-system/jsx";
import Image from "next/image";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { useTeamEvents, useTeamWithId } from "@/4_entities/team";
import LoadingPage from "@/app/_ui/LoadingPage";
import { Standings } from "@/2_widgets/standings";
import { useTeamTournaments } from "@/4_entities/team/hooks/useTeamTorunaments";
import { useWindowWidth } from "@/5_shared/lib/hooks/useWindowWidth";
import { ChangeEventsRow, Matches, MatchesEvents } from "@/2_widgets/matches";

interface PageProps {
  params: Promise<{ id: number }>;
}

export default function Page({ params }: PageProps) {
  const windowWidth = useWindowWidth();

  const resolvedParams = React.use(params);
  const teamId = resolvedParams.id;

  const [fetchedPage, setFetchedPage] = useState<number>(0);

  const { team, isLoading, isError, error } = useTeamWithId(teamId);
  const {
    teamTournaments,
    isLoading: isLoadingTournaments,
    isError: isErrorTournaments,
    error: errorTournaments,
  } = useTeamTournaments(teamId);

  const { teamEvents, isLoading: isLoadingTeamEvents } = useTeamEvents(
    team?.id,
    fetchedPage
  );

  if (isLoading || isLoadingTournaments || isLoadingTeamEvents) {
    return <LoadingPage />;
  }

  if (isError || isErrorTournaments) {
    console.log(error);
    console.log(errorTournaments);
    return <Center>Error</Center>;
  }

  if (!team) {
    return <Center>There is no team with that ID.</Center>;
  }

  if (!teamTournaments || teamTournaments.length <= 0) {
    return <Center>There is no team tournamets for this team.</Center>;
  }

  const tournament = teamTournaments.at(0);

  if (!tournament || !teamEvents) {
    return <Center>There is no team tournamets for this team.</Center>;
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
            src={`/api/team/${team.id}/image`}
            width={64}
            height={64}
            alt="tournament image"
          />
          <Flex direction={"column"} gap={"0.5rem"} lineHeight={1}>
            <Box fontSize={"h5"}>{team.name}</Box>
            <Box color={"text.secondary"}>{team.country.name}</Box>
          </Flex>
        </Flex>
        <Flex>
          <FavouriteToggleBtn whatToAdd="team" item={team} />
        </Flex>
      </Flex>
      {/*CONTENT*/}
      <Flex direction={windowWidth < 1050 ? "column" : "row"} gap={"1rem"}>
        <Box flex={windowWidth < 1050 ? "unset" : "7"} h={"fit-content"}>
          <Standings
            tournament={tournament}
            homeTeamId={team.id}
            disableHeroLink={true}
          />
        </Box>

        <Matches tournament={tournament} styles={{ flex: "4" }}>
          <ChangeEventsRow
            text={fetchedPage >= 0 ? "Played" : "Finished"}
            handleLeftBtnClick={() => {
              setFetchedPage((prev) => prev + 1);
            }}
            handleRightBtnClick={() => {
              setFetchedPage((prev) => prev + 1);
            }}
          />
          <MatchesEvents
            events={teamEvents}
            windowType={windowWidth < 1050 ? "normal" : "small"}
          />
        </Matches>
        {/* <Matches
          tournament={tournament}
          teamId={team.id}
          fetchedPage={fetchedPage}
          handleLeftBtnClick={() => {
            setFetchedPage((prev) => prev + 1);
          }}
          handleRightBtnClick={() => {
            setFetchedPage((prev) => prev - 1);
          }}
        /> */}
      </Flex>
    </Flex>
  );
}
