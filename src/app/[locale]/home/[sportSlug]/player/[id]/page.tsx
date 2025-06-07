"use client";

import { usePlayerById } from "@/4_entities/player/hooks/usePlayerById";
import React, { useState } from "react";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { ImageBox } from "@/5_shared";
import { getCountryISO2 } from "@/4_entities/player/lib/utils";
import { useTeamTournaments } from "@/4_entities/team";
import { ChangeEventsRow, Matches, MatchesEvents } from "@/2_widgets/matches";
import { usePlayerEvents } from "@/4_entities/player/hooks/usePlayerEvents";
import { Box, Center, Flex } from "@styled-system/jsx";
import SkeletonLoader from "./SkeletonLoader";

interface PageProps {
  params: Promise<{
    id: string;
    playerId: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const playerId = resolvedParams.id;

  const [fetchedPage, setFetchedPage] = useState<number>(0);

  const { player, isLoading, isError, error } = usePlayerById(playerId);

  const {
    teamTournaments,
    isLoading: isLoadingTeamTournaments,
    isError: isErrorTeamTournaments,
    error: errorTeamTournaments,
  } = useTeamTournaments(player?.team?.id);
  const { playerEvents, isLoading: isLoadingPlayerEvents } = usePlayerEvents(
    player?.id,
    fetchedPage
  );

  if (isLoading || isLoadingTeamTournaments || isLoadingPlayerEvents)
    return <SkeletonLoader />;

  if (isError || isErrorTeamTournaments) {
    console.log(error);
    console.log(errorTeamTournaments);
    return <Center>ERROR</Center>;
  }

  if (!player) {
    return <Center>There is no player with that ID</Center>;
  }

  if (!teamTournaments || teamTournaments.length <= 0) {
    return <Center>There is no tournaments for this team.</Center>;
  }

  const firstTournament = teamTournaments.at(0);

  if (!firstTournament) {
    return <Center>There is no tournaments for this team.</Center>;
  }

  if (!playerEvents) {
    return <Center>There is no events for this player.</Center>;
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
        <Flex alignItems={"center"} gap={"0.75rem"}>
          <Box
            border={"2px solid transparent"}
            borderColor={"primaryClr"}
            borderRadius={"100%"}
          >
            <ImageBox
              initialSrc={`/api/player/${player.id}/image`}
              fallbackSrc={"/images/avatar.png"}
              w="64px"
              h="64px"
              styles={{ borderRadius: "100%" }}
            />
          </Box>
          <Flex direction={"column"} gap={"0.75rem"} lineHeight={1}>
            <Flex gap={"0.5rem"} alignItems={"center"}>
              <ImageBox
                initialSrc={`https://flagcdn.com/w80/${getCountryISO2(player.country.name)}.png`}
                fallbackSrc={"/images/imageFallback.svg"}
                w="24px"
                h="24px"
                styles={{ borderRadius: "100%" }}
              />
              <Box fontSize={"h5"}>{player.name}</Box>
            </Flex>
            <Flex gap={"0.5rem"} alignItems={"center"}>
              <ImageBox
                initialSrc={`/api/team/${player.team.id}/image`}
                fallbackSrc={"/images/imageFallback.svg"}
                w="24px"
                h="24px"
                styles={{ borderRadius: "100%" }}
              />
              <Box fontSize={"md"} color={"text.secondary"}>
                {player.team.name}
              </Box>
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                p={"0.25rem 0.5rem"}
                w={"24px"}
                bg={"border"}
                borderRadius={"sm"}
                fontSize={"xs"}
                fontWeight={"bold"}
              >
                {player.position}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <FavouriteToggleBtn whatToAdd="player" item={player} />
        </Flex>
      </Flex>

      {/*MATCHES*/}
      <Matches tournament={firstTournament}>
        <ChangeEventsRow
          text={fetchedPage >= 0 ? "Played" : "Finished"}
          handleLeftBtnClick={() => {
            setFetchedPage((prev) => prev + 1);
          }}
          handleRightBtnClick={() => {
            setFetchedPage((prev) => prev - 1);
          }}
        />
        <MatchesEvents events={playerEvents} />
      </Matches>
    </Flex>
  );
}
