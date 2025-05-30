"use client";

import { TournomentMatches } from "@/2_widgets/tournomentMatches";
import { Box, Flex } from "../../../../styled-system/jsx";
import { useEventsFromSportAndDate } from "@/4_entities/event/hooks/useEventsFromSportAndDate";
import { SomethingWentWrong, SpinnerLoader } from "@/5_shared";
import { EventWidget } from "@/2_widgets/eventWidget";
import { getDifferentTournomentFromListOfEvents } from "@/4_entities/tournoment/lib/utils";
import { useState } from "react";

export default function Page() {
  const [currentDate, setCurrentDate] = useState<string>("2024-01-20");

  const { events, isLoading, isError, error } = useEventsFromSportAndDate(
    "football",
    currentDate
  );

  const handleDateChange = (newDate: string) => {
    setCurrentDate(newDate);
  };

  const handlePrevDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    setCurrentDate(date.toISOString().split("T")[0]);
  };

  const handleNextDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    setCurrentDate(date.toISOString().split("T")[0]);
  };

  if (isLoading)
    return (
      <Box color={"white"} overflow={"auto"} p={"1rem"}>
        <EventWidget
          currentDate={currentDate}
          handleDateChange={handleDateChange}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            minH={"220px"}
            direction={"column"}
            gap={"3rem"}
          >
            {" "}
            <SpinnerLoader />
            <p>Učitavanje početnih događaja...</p>
          </Flex>
        </EventWidget>
      </Box>
    );

  if (isError) {
    console.log(error);
    return <SomethingWentWrong />;
  }

  if (!events || events?.length <= 0) {
    return (
      <Box color={"white"} overflow={"auto"} p={"1rem"}>
        <EventWidget
          currentDate={currentDate}
          handleDateChange={handleDateChange}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            minH={"80px"}
          >
            There is no events for that sport on that date.
          </Flex>
        </EventWidget>
      </Box>
    );
  }

  const tournoments = getDifferentTournomentFromListOfEvents(events);

  console.log(events);
  return (
    <Box color={"white"} overflow={"auto"} p={"1rem"}>
      <EventWidget
        currentDate={currentDate}
        handleDateChange={handleDateChange}
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
      >
        {tournoments.map((tournoment, i) => (
          <TournomentMatches
            key={tournoment.id}
            tournoment={tournoment}
            events={events}
            lastChild={tournoments.length - 1 === i}
          />
        ))}
      </EventWidget>
    </Box>
  );
}
