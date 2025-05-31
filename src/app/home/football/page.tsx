"use client";

import { TournomentMatches } from "@/2_widgets/tournomentMatches";
import { Box, Flex } from "../../../../styled-system/jsx";
import { useEventsFromSportAndDate } from "@/4_entities/event/hooks/useEventsFromSportAndDate";
import { SomethingWentWrong, SpinnerLoader } from "@/5_shared";
import { EventWidget } from "@/2_widgets/eventWidget";
import { getDifferentTournomentFromListOfEvents } from "@/4_entities/tournoment/lib/utils";
import { useState } from "react";
import { useFavourites } from "@/3_features/favourites/context/useFavourites";
import { TopTornoments } from "@/2_widgets/topTournoments";
import { css } from "../../../../styled-system/css";

export default function Page() {
  const [currentDate, setCurrentDate] = useState<string>("2024-01-20");
  const [activeWindow, setActiveWindow] = useState<"all" | "favourites">("all");

  const { favouriteEvents } = useFavourites();

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
      <Box color={"white"} overflow={"auto"}>
        <EventWidget
          currentDate={currentDate}
          handleDateChange={handleDateChange}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
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
      <Box color={"white"} overflow={"auto"}>
        <EventWidget
          currentDate={currentDate}
          handleDateChange={handleDateChange}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
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

  let filteredEvents = events;
  if (activeWindow === "favourites") {
    filteredEvents = events.filter((el) =>
      favouriteEvents.map((x) => x.id).includes(el.id)
    );
  }

  console.log(activeWindow);
  console.log(filteredEvents);
  if (!filteredEvents || filteredEvents.length <= 0) {
    return (
      <Box color={"white"} overflow={"auto"}>
        <EventWidget
          currentDate={currentDate}
          handleDateChange={handleDateChange}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
          activeWindow={activeWindow}
          setActiveWindow={setActiveWindow}
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

  const tournoments = getDifferentTournomentFromListOfEvents(filteredEvents);

  console.log(events);
  return (
    <Flex
      color={"white"}
      overflow={"auto"}
      gap={"1rem"}
      className={css({
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "table.scrollBar",
          borderRadius: "4px",
        },
      })}
    >
      <TopTornoments />
      <EventWidget
        currentDate={currentDate}
        handleDateChange={handleDateChange}
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
      >
        {tournoments.map((tournoment, i) => (
          <TournomentMatches
            key={tournoment.id}
            tournoment={tournoment}
            events={filteredEvents}
            lastChild={tournoments.length - 1 === i}
          />
        ))}
      </EventWidget>
    </Flex>
  );
}
