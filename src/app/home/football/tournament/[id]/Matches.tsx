import React from "react";

import { useWindowWidth } from "@/5_shared/lib/hooks/useWindowWidth";
import { Box, Center, Flex } from "../../../../../../styled-system/jsx";
import {
  TournamentInterface,
  TournamentRowInfo,
  useTournamentEvents,
} from "@/4_entities/tournament";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import {
  Icon,
  leftShortArrow400SvgInfo,
  rightShortArrow400SvgInfo,
} from "@/5_shared";
import { EventInterface, EventItem } from "@/4_entities/event";
import LoadingPage from "@/app/_ui/LoadingPage";

interface MatchesProps {
  tournament: TournamentInterface;
  fetchedPage: number;
  handleLeftBtnClick: () => void;
  handleRightBtnClick: () => void;
}

export default function Matches({
  tournament,
  fetchedPage,
  handleLeftBtnClick,
  handleRightBtnClick,
}: MatchesProps) {
  const windowWidth = useWindowWidth();

  const { tournamentEvents, isLoading, isError, error } = useTournamentEvents(
    tournament.id,
    fetchedPage
  );

  if (isLoading)
    return (
      <Flex
        flex={windowWidth < 1000 ? "unset" : "4"}
        direction={"column"}
        w={"100%"}
        h={"fit-content"}
        border={"1px solid transparent"}
        borderColor={"border"}
        borderRadius={"md"}
        overflow={"hidden"}
      >
        <LoadingPage text="Loading tournament data..." />
      </Flex>
    );

  if (isError) {
    console.log(error);
    return <Center>Error</Center>;
  }

  if (!tournament) {
    return <Center>There is no tournament with that ID.</Center>;
  }

  if (!tournamentEvents || tournamentEvents.length <= 0) {
    return (
      <Flex
        flex={windowWidth < 1000 ? "unset" : "4"}
        direction={"column"}
        w={"100%"}
        h={"fit-content"}
        border={"1px solid transparent"}
        borderColor={"border"}
        borderRadius={"md"}
        overflow={"hidden"}
      >
        <TournamentRowInfo
          tournament={tournament}
          disableLink={true}
          favouriteBtn={
            <FavouriteToggleBtn whatToAdd="tournament" item={tournament} />
          }
        />
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          p={"0.75rem 1rem"}
          pt={"0"}
          borderBottom={"1px solid transparent"}
          borderColor={"primaryClr"}
          fontSize={"ms"}
        >
          <Box
            _hover={{ fill: "primaryClr", cursor: "pointer" }}
            onClick={handleLeftBtnClick}
          >
            <Icon
              width="20px"
              height="20px"
              svgInfo={leftShortArrow400SvgInfo()}
            />
          </Box>
          <Flex w={"fit-content"} borderRadius={"sm"}>
            <Box>{fetchedPage >= 0 ? "Played" : "Future"}</Box>
          </Flex>
          <Box
            visibility={"hidden"}
            _hover={{ fill: "primaryClr", cursor: "pointer" }}
            onClick={handleRightBtnClick}
          >
            <Icon
              width="20px"
              height="20px"
              svgInfo={rightShortArrow400SvgInfo()}
            />
          </Box>
        </Flex>
        <Center p={"1rem"}>There is no more tournament events.</Center>
      </Flex>
    );
  }

  tournamentEvents.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <Flex
      flex={windowWidth < 1000 ? "unset" : "4"}
      direction={"column"}
      w={"100%"}
      h={"fit-content"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      overflow={"hidden"}
    >
      <TournamentRowInfo
        tournament={tournament}
        disableLink={true}
        favouriteBtn={
          <FavouriteToggleBtn whatToAdd="tournament" item={tournament} />
        }
      />
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={"0.75rem 1rem"}
        pt={"0"}
        borderBottom={"1px solid transparent"}
        borderColor={"primaryClr"}
        fontSize={"ms"}
      >
        <Box
          _hover={{ fill: "primaryClr", cursor: "pointer" }}
          onClick={handleLeftBtnClick}
        >
          <Icon
            width="20px"
            height="20px"
            svgInfo={leftShortArrow400SvgInfo()}
          />
        </Box>
        <Flex w={"fit-content"} borderRadius={"sm"}>
          <Box>{fetchedPage >= 0 ? "Played" : "Not played"}</Box>
        </Flex>
        <Box
          _hover={{ fill: "primaryClr", cursor: "pointer" }}
          onClick={handleRightBtnClick}
        >
          <Icon
            width="20px"
            height="20px"
            svgInfo={rightShortArrow400SvgInfo()}
          />
        </Box>
      </Flex>
      {tournamentEvents.map((event: EventInterface, i) => (
        <EventItem
          favouriteBtn={<FavouriteToggleBtn whatToAdd="event" item={event} />}
          event={event}
          key={event.id}
          lastChild={tournamentEvents.length - 1 === i}
          widthType={windowWidth < 1050 ? "normal" : "small"}
        />
      ))}
    </Flex>
  );
}
