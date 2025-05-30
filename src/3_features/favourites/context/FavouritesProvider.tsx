"use client";

import { EventInterface, TournomentInterface } from "@/4_entities/event";
import { PlayerInterface } from "@/4_entities/player";
import { TeamInterface } from "@/4_entities/team";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { FavouritesContext } from "./FavouritesContext";

interface FavouritesProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = "sofascore_favourites";

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({
  children,
}) => {
  const [favouriteEvents, setFavouriteEvents] = useState<EventInterface[]>([]);
  const [favouriteTeams, setFavouriteTeams] = useState<TeamInterface[]>([]);
  const [favouriteTournoments, setFavouriteTournoments] = useState<
    TournomentInterface[]
  >([]);
  const [favouritePlayers, setFavouritePlayers] = useState<PlayerInterface[]>(
    []
  );

  useEffect(() => {
    const savedFavouritesString = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedFavouritesString) {
      console.log("There no saved favourite items in local storage.");
      return;
    }

    const savedFavourites = JSON.parse(savedFavouritesString);

    setFavouriteEvents(savedFavourites.events);
    setFavouriteTeams(savedFavourites.teams);
    setFavouriteTournoments(savedFavourites.tournoments);
    setFavouritePlayers(savedFavourites.players);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        events: favouriteEvents,
        teams: favouriteTeams,
        tournoments: favouriteTournoments,
        players: favouritePlayers,
      })
    );
  }, [favouriteEvents, favouriteTeams, favouriteTournoments, favouritePlayers]);

  const addEventToFavourites = useCallback((event: EventInterface) => {
    setFavouriteEvents((prev) => [...prev, event]);
  }, []);

  const removeEventFromFavourites = useCallback((eventIdToRemove: number) => {
    setFavouriteEvents((prev) =>
      prev.filter((el) => el.id !== eventIdToRemove)
    );
  }, []);

  const addTeamToFavourites = useCallback((team: TeamInterface) => {
    setFavouriteTeams((prev) => [...prev, team]);
  }, []);

  const removeTeamFromFavourites = useCallback((teamIdToRemove: number) => {
    setFavouriteTeams((prev) => prev.filter((el) => el.id !== teamIdToRemove));
  }, []);

  const addTournomentToFavourites = useCallback(
    (tournoment: TournomentInterface) => {
      setFavouriteTournoments((prev) => [...prev, tournoment]);
    },
    []
  );

  const removeTournomentFromFavourites = useCallback(
    (tournomentIdToRemove: number) => {
      setFavouriteTournoments((prev) =>
        prev.filter((el) => el.id !== tournomentIdToRemove)
      );
    },
    []
  );

  const addPlayerToFavourites = useCallback((player: PlayerInterface) => {
    setFavouritePlayers((prev) => [...prev, player]);
  }, []);

  const removePlayerFromFavourites = useCallback((playerIdToRemove: number) => {
    setFavouritePlayers((prev) =>
      prev.filter((el) => el.id !== playerIdToRemove)
    );
  }, []);

  const isEventAlreadyFavourite = useCallback(
    (eventId: number): boolean => {
      return favouriteEvents.some((el) => el.id === eventId);
    },
    [favouriteEvents]
  );
  const isTeamAlreadyFavourite = useCallback(
    (teamtId: number): boolean => {
      return favouriteTeams.some((el) => el.id === teamtId);
    },
    [favouriteTeams]
  );
  const isTournomentAlreadyFavourite = useCallback(
    (tournomentId: number): boolean => {
      return favouriteTournoments.some((el) => el.id === tournomentId);
    },
    [favouriteTournoments]
  );
  const isPlayerAlreadyFavourite = useCallback(
    (playerId: number): boolean => {
      return favouritePlayers.some((el) => el.id === playerId);
    },
    [favouritePlayers]
  );

  return (
    <FavouritesContext.Provider
      value={{
        favouriteEvents,
        favouriteTeams,
        favouriteTournoments,
        favouritePlayers,
        addEventToFavourites,
        addTeamToFavourites,
        addTournomentToFavourites,
        addPlayerToFavourites,
        removeEventFromFavourites,
        removeTeamFromFavourites,
        removeTournomentFromFavourites,
        removePlayerFromFavourites,
        isEventAlreadyFavourite,
        isTeamAlreadyFavourite,
        isTournomentAlreadyFavourite,
        isPlayerAlreadyFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
