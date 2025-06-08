"use client";

import { useFavourites } from "@/3_features/favourites/context/useFavourites";
import { css } from "@styled-system/css";
import { Box, Center, Flex } from "@styled-system/jsx";
import { FavouriteWidget } from "@/2_widgets/favouriteWidget";
import { useState } from "react";
import { EventInterface, EventItem } from "@/4_entities/event";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { EventPopup } from "@/2_widgets/eventPopup";
import { TournamentItem } from "@/4_entities/tournament/ui/TournamentItem";
import { TeamItem } from "@/4_entities/team/api/ui/TeamItem";
import { PlayerCard } from "@/4_entities/player";
import { SettingsWindow, useSettings } from "@/3_features/settings";

export type SectionsType = "Events" | "Teams" | "Tournaments" | "Players";

export default function Page() {
  const { areOptionsDisplayed, setAreOptionsDisplayed } = useSettings();

  const [activeWindow, setActiveWindow] = useState<SectionsType>("Events");
  const [isPopupDisplayed, setIsPopupDisplayed] = useState<boolean>(false);
  const [popupEvent, setPopupEvent] = useState<EventInterface | null>(null);

  const {
    favouriteEvents,
    favouriteTeams,
    favouriteTournaments,
    favouritePlayers,
  } = useFavourites();

  const closePopupWindow = () => {
    setIsPopupDisplayed(false);
  };

  return (
    <Flex
      gap={"1rem"}
      p={"0"}
      pb={"0.1rem"}
      position={"relative"}
      border={"1px solid transparent"}
      color={"text.normal"}
      overflow={"auto"}
      _focus={{
        outline: "none",
        border: "1px solid transparent",
        borderColor: "primaryClr",
        borderRadius: "md",
      }}
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
      <FavouriteWidget
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
      >
        {activeWindow === "Events" ? (
          favouriteEvents.length > 0 ? (
            favouriteEvents.map((event: EventInterface, i) => (
              <EventItem
                favouriteBtn={
                  <FavouriteToggleBtn whatToAdd="event" item={event} />
                }
                event={event}
                key={event.id}
                lastChild={favouriteEvents.length - 1 === i}
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
            <Center p={"1rem"}>There are no favourite events.</Center>
          )
        ) : (
          <Box display={"none"}></Box>
        )}

        {activeWindow === "Teams" ? (
          favouriteTeams.length > 0 ? (
            <Flex direction={"column"} gap={"1rem"} p={"1rem"}>
              {favouriteTeams.map((team) => (
                <TeamItem sportSlug="football" key={team.id} team={team} />
              ))}
            </Flex>
          ) : (
            <Center p={"1rem"}>There are no favourite teams.</Center>
          )
        ) : (
          <Box display={"none"}></Box>
        )}

        {activeWindow === "Tournaments" ? (
          favouriteTournaments.length > 0 ? (
            <Flex direction={"column"} gap={"1rem"} p={"1rem"}>
              {favouriteTournaments.map((tournament) => (
                <TournamentItem key={tournament.id} tournament={tournament} />
              ))}
            </Flex>
          ) : (
            <Center p={"1rem"}>There are no favourite tournaments.</Center>
          )
        ) : (
          <Box display={"none"}></Box>
        )}

        {activeWindow === "Players" ? (
          favouritePlayers.length > 0 ? (
            <Flex gap={"1rem"} p={"1rem"} wrap={"wrap"}>
              {favouritePlayers.map((player) => (
                <PlayerCard
                  sportSlug="football"
                  key={player.id}
                  player={player}
                />
              ))}
            </Flex>
          ) : (
            <Center p={"1rem"}>There are no favourite players.</Center>
          )
        ) : (
          <Box display={"none"}></Box>
        )}
      </FavouriteWidget>
      {isPopupDisplayed && popupEvent ? (
        <EventPopup
          sportSlug="football"
          event={popupEvent}
          colsePopup={closePopupWindow}
        />
      ) : (
        <Box display={"none"} />
      )}
      <SettingsWindow
        isOpen={areOptionsDisplayed}
        onClose={() => {
          setAreOptionsDisplayed(false);
        }}
      />
    </Flex>
  );
}
