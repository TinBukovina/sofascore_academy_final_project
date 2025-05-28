"use client";

import { Box } from "../../../../styled-system/jsx";
import { useEventsFromSportAndDate } from "@/4_entities/event/hooks/useEventsFromSportAndDate";
import { EventList } from "@/2_widgets/eventList";

export default function Page() {
  const { events, isLoading, isError, error } = useEventsFromSportAndDate(
    "football",
    "2024-01-20"
  );

  if (isLoading)
    return <Box color={"white"}>Učitavanje početnih događaja...</Box>;

  if (isError) {
    console.log(error);
    return <Box color={"white"}>There was error fetching</Box>;
  }

  if (!events || events?.length <= 0) {
    return (
      <Box color={"white"}>There is no events for that sport on that date.</Box>
    );
  }

  console.log(events);
  return (
    <Box color={"white"} overflow={"auto"}>
      <EventList events={events} />
    </Box>
  );
}
