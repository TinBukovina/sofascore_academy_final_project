import React from "react";
import { Box } from "../../../../styled-system/jsx";
import { EventInterface, EventItem } from "@/4_entities/event";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";

interface MatchesEventsProps {
  events: EventInterface[];
  windowType: "normal" | "small";
}

export function MatchesEvents({ events, windowType }: MatchesEventsProps) {
  return (
    <Box w={"100%"}>
      {events.map((event: EventInterface, i) => (
        <EventItem
          favouriteBtn={<FavouriteToggleBtn whatToAdd="event" item={event} />}
          event={event}
          key={event.id}
          lastChild={events.length - 1 === i}
          widthType={windowType}
        />
      ))}
    </Box>
  );
}
