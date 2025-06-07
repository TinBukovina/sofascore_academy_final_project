"use client";

import { useState, ReactNode } from "react";
import { Box, Flex } from "@styled-system/jsx";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useEventsFromSportAndDate } from "@/4_entities/event";
import { ContentLoading, EventWidget } from "@/2_widgets/eventWidget";
import { getDifferentTournomentFromListOfEvents } from "@/4_entities/tournament";
import { useFavourites } from "@/3_features/favourites/context/useFavourites";
import { EventPopup } from "@/2_widgets/eventPopup";
import { EventInterface } from "@/4_entities/event";
import { TournamentMatches } from "@/2_widgets/tournomentMatches";

interface FootballPageClientProps {
  children?: ReactNode;
}

export default function FootballPageClient({
  children,
}: FootballPageClientProps) {
  const router = useRouter();

  const tError = useTranslations("error");

  const [currentDate, setCurrentDate] = useState<string>("2025-05-04");
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
      <EventWidget
        currentDate={currentDate}
        handleDateChange={handleDateChange}
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
      >
        <ContentLoading />
      </EventWidget>
    );

  if (isError) {
    console.log(error);
    router.push("/error");
  }

  if (!events || events?.length <= 0) {
    return (
      <Box color={"white"} overflow={"auto"} w={"100%"}>
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
            {tError("no_events_for_sport_and_date")}
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

  if (!filteredEvents) {
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
            {tError("no_events_for_sport_and_date")}
          </Flex>
        </EventWidget>
      </Box>
    );
  }

  const tournaments = getDifferentTournomentFromListOfEvents(filteredEvents);

  return (
    <>
      <EventWidget
        currentDate={currentDate}
        handleDateChange={handleDateChange}
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
      >
        {filteredEvents.length > 0 ? (
          tournaments.map((tournament, i) => (
            <TournamentMatches
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
          ))
        ) : (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            minH={"80px"}
          >
            {tError("no_favourite_events")}
          </Flex>
        )}
      </EventWidget>
      {children}
      {isPopupDisplayed && popupEvent ? (
        <EventPopup
          sportSlug="football"
          event={popupEvent}
          colsePopup={closePopupWindow}
        />
      ) : (
        <Box display={"none"} />
      )}
    </>
  );
}
