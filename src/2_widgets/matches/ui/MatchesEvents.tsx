import React from "react";
import { Box, Center } from "../../../../styled-system/jsx";
import { EventInterface, EventItem } from "@/4_entities/event";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { useTranslations } from "next-intl";

interface MatchesEventsProps {
  events: EventInterface[];
  windowType?: "normal" | "small";
}

export function MatchesEvents({
  events,
  windowType = "normal",
}: MatchesEventsProps) {
  const tMatches = useTranslations("matches");

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
      {events.length <= 0 ? (
        <Center p={"1rem"}>{tMatches("no_events")}</Center>
      ) : (
        <Box display={"hidden"}></Box>
      )}
    </Box>
  );
}
