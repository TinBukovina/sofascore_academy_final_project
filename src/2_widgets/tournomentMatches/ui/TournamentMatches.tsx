import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";

import { EventInterface, EventItem } from "@/4_entities/event";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import {
  TournamentInterface,
  TournamentRowInfo,
} from "@/4_entities/tournament";

interface EventListProps {
  tournament: TournamentInterface;
  events: EventInterface[];
  lastChild?: boolean;
  handleOnClick?: () => void;
  setSelectedEvent?: (event: EventInterface) => void;
}

export function TournamentMatches({
  tournament,
  events,
  lastChild = false,
  handleOnClick,
  setSelectedEvent,
}: EventListProps) {
  const filteredEvents = events.filter(
    (el) => el.tournament.id === tournament.id
  );
  return (
    <Flex
      direction={"column"}
      borderBottom={
        !lastChild
          ? "1px solid token(colors.primaryClr)"
          : "1px solid transparent"
      }
    >
      <Box borderBottom={"1px solid transparent"} borderColor={"border"}>
        <TournamentRowInfo
          tournament={tournament}
          favouriteBtn={
            <FavouriteToggleBtn whatToAdd="tournament" item={tournament} />
          }
        />
      </Box>
      {filteredEvents.map((event: EventInterface, i) => (
        <EventItem
          favouriteBtn={<FavouriteToggleBtn whatToAdd="event" item={event} />}
          event={event}
          key={event.id}
          lastChild={filteredEvents.length - 1 === i}
          handleOnClick={handleOnClick}
          setSelectedEvent={setSelectedEvent}
        />
      ))}
    </Flex>
  );
}
