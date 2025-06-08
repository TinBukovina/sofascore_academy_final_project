"use client";

import { EventInterface } from "@/4_entities/event";
import { PlayerInterface } from "@/4_entities/player";
import { TeamInterface } from "@/4_entities/team";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { FavouritesContext } from "./FavouritesContext";
import { TournamentInterface } from "@/4_entities/tournament";

interface FavouritesProviderProps {
  children: ReactNode;
}

interface LoaclStorageObject {
  events: EventInterface[];
  teams: TeamInterface[];
  tournaments: TournamentInterface[];
  players: PlayerInterface[];
}

const LOCAL_STORAGE_KEY = "sofascore_favourites";

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({
  children,
}) => {
  const [favouriteEvents, setFavouriteEvents] = useState<EventInterface[]>([]);
  const [favouriteTeams, setFavouriteTeams] = useState<TeamInterface[]>([]);
  const [favouriteTournaments, setFavouriteTournaments] = useState<
    TournamentInterface[]
  >([]);
  const [favouritePlayers, setFavouritePlayers] = useState<PlayerInterface[]>(
    []
  );
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    const savedFavouritesString = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedFavouritesString) {
      try {
        const savedFavourites = JSON.parse(
          savedFavouritesString
        ) as Partial<LoaclStorageObject>;

        setFavouriteEvents((prev) => {
          if (!savedFavourites.events) {
            return prev;
          }

          return [...savedFavourites.events];
        });
        setFavouriteTeams((prev) => {
          if (!savedFavourites.teams) {
            return prev;
          }

          return [...savedFavourites.teams];
        });
        setFavouriteTournaments((prev) => {
          if (!savedFavourites.tournaments) {
            return prev;
          }

          return [...savedFavourites.tournaments];
        });
        setFavouritePlayers((prev) => {
          if (!savedFavourites.players) {
            return prev;
          }

          return [...savedFavourites.players];
        });
        setIsMounted(true);
      } catch (error) {
        console.error("Failed to parse favourites from localStorage:", error);
        setFavouriteEvents([]);
        setFavouriteTeams([]);
        setFavouriteTournaments([]);
        setFavouritePlayers([]);
      }
    } else {
      console.log(
        "No saved favourite items in local storage. Initializing with empty arrays."
      );
      setFavouriteEvents([]);
      setFavouriteTeams([]);
      setFavouriteTournaments([]);
      setFavouritePlayers([]);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    console.log(
      `Spremanje: ${favouriteEvents}, ${favouriteTeams},
        ${favouriteTournaments}, ${favouritePlayers}`
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        events: favouriteEvents,
        teams: favouriteTeams,
        tournaments: favouriteTournaments,
        players: favouritePlayers,
      })
    );
  }, [
    favouriteEvents,
    favouriteTeams,
    favouriteTournaments,
    favouritePlayers,
    isMounted,
  ]);

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
    (tournament: TournamentInterface) => {
      setFavouriteTournaments((prev) => [...prev, tournament]);
    },
    []
  );

  const removeTournomentFromFavourites = useCallback(
    (tournomentIdToRemove: number) => {
      setFavouriteTournaments((prev) =>
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
      return favouriteEvents?.some((el) => el.id === eventId);
    },
    [favouriteEvents]
  );
  const isTeamAlreadyFavourite = useCallback(
    (teamtId: number): boolean => {
      return favouriteTeams?.some((el) => el.id === teamtId);
    },
    [favouriteTeams]
  );
  const isTournomentAlreadyFavourite = useCallback(
    (tournomentId: number): boolean => {
      return favouriteTournaments?.some((el) => el.id === tournomentId);
    },
    [favouriteTournaments]
  );
  const isPlayerAlreadyFavourite = useCallback(
    (playerId: number): boolean => {
      return favouritePlayers?.some((el) => el.id === playerId);
    },
    [favouritePlayers]
  );

  return (
    <FavouritesContext.Provider
      value={{
        favouriteEvents,
        favouriteTeams,
        favouriteTournaments,
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
