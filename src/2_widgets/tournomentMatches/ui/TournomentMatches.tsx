import React from "react";
import { Flex } from "../../../../styled-system/jsx";

import {
  EventInterface,
  EventItem,
  TournomentInterface,
} from "@/4_entities/event";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { TournomentRowInfo } from "@/4_entities/tournoment";

interface EventListProps {
  tournoment: TournomentInterface;
  events: EventInterface[];
  lastChild?: boolean;
}

export function TournomentMatches({
  tournoment,
  events,
  lastChild = false,
}: EventListProps) {
  const filteredEvents = events.filter(
    (el) => el.tournament.id === tournoment.id
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
      <TournomentRowInfo
        tournoment={tournoment}
        favouriteBtn={
          <FavouriteToggleBtn whatToAdd="tournoment" item={tournoment} />
        }
      />
      {filteredEvents.map((event: EventInterface, i) => (
        <EventItem
          favouriteBtn={<FavouriteToggleBtn whatToAdd="event" item={event} />}
          event={event}
          key={event.id}
          lastChild={filteredEvents.length - 1 === i}
        />
      ))}
    </Flex>
  );
}
