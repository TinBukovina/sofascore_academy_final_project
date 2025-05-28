import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { EventInterface, EventItem } from "@/4_entities/event";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";

interface EventListProps {
  events: EventInterface[];
}

export function EventList({ events }: EventListProps) {
  return (
    <Flex direction={"column"} gap={"1rem"}>
      <Box>Event list component</Box>
      {events.map((event: EventInterface) => (
        <EventItem
          favouriteBtn={<FavouriteToggleBtn styles={{ fill: "primaryClr" }} />}
          event={event}
          key={event.id}
        />
      ))}
    </Flex>
  );
}
