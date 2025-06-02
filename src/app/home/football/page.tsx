"use client";

import { TournomentMatches } from "@/2_widgets/tournomentMatches";
import { Box, Flex } from "../../../../styled-system/jsx";
import { useEventsFromSportAndDate } from "@/4_entities/event/hooks/useEventsFromSportAndDate";
import { SomethingWentWrong } from "@/5_shared";
import { EventWidget } from "@/2_widgets/eventWidget";
import { getDifferentTournomentFromListOfEvents } from "@/4_entities/tournament/lib/utils";
import { useState } from "react";
import { useFavourites } from "@/3_features/favourites/context/useFavourites";
import { TopTornaments } from "@/2_widgets/topTournoments";
import { css } from "../../../../styled-system/css";
import { EventPopup } from "@/2_widgets/eventPopup";
import { EventInterface } from "@/4_entities/event";
import LoadingPage from "@/app/_ui/LoadingPage";

export default function Page() {
  const [currentDate, setCurrentDate] = useState<string>("2024-01-20");
  const [activeWindow, setActiveWindow] = useState<"all" | "favourites">("all");
  const [isPopupDisplayed, setIsPopupDisplayed] = useState<boolean>(false);
  const [popupEvent, setPopupEvent] = useState<EventInterface | null>(null);

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

  const closePopupWindow = () => {
    setIsPopupDisplayed(false);
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
          <LoadingPage text="Loading events" />
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

  const tournaments = getDifferentTournomentFromListOfEvents(filteredEvents);

  return (
    <Flex
      color={"text.normal"}
      overflow={"auto"}
      gap={"1rem"}
      p={"0"}
      className={css({
        "&::-webkit-scrollbar": {
          width: "0px",
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
      <EventWidget
        currentDate={currentDate}
        handleDateChange={handleDateChange}
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
      >
        {tournaments.map((tournament, i) => (
          <TournomentMatches
            key={tournament.id}
            tournament={tournament}
            events={filteredEvents}
            lastChild={tournaments.length - 1 === i}
            handleOnClick={() => {
              setIsPopupDisplayed((prev) => {
                if (prev) {
                  setTimeout(() => setIsPopupDisplayed(true), 200);
                  return false;
                }

                return true;
              });
            }}
            setSelectedEvent={setPopupEvent}
          />
        ))}
      </EventWidget>
      <TopTornaments />
      {isPopupDisplayed && popupEvent ? (
        <EventPopup event={popupEvent} colsePopup={closePopupWindow} />
      ) : (
        <Box display={"none"} />
      )}
    </Flex>
  );
}
