"use client";

import { TournamentInterface } from "@/4_entities/event";
import useSWR from "swr";
import { getTournamentById } from "../api/apiTournaments";

const getSWRKey = (
  tournamentId: number | string | null | undefined
): [string, string] | null => {
  if (
    !tournamentId ||
    (typeof tournamentId === "string" && isNaN(parseInt(tournamentId, 10)))
  ) {
    return null;
  }
  return [`/tournament`, String(tournamentId)];
};

const eventFetcher = async (
  keyParts: [string, string]
): Promise<TournamentInterface | null> => {
  const [, tournamentIdStr] = keyParts;
  const tournamentId = parseInt(tournamentIdStr, 10);
  return getTournamentById(tournamentId);
};

export function useTournamentById(eventId: number | string | null | undefined) {
  const {
    data: tournoment,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<TournamentInterface | null>(getSWRKey(eventId), eventFetcher);

  return {
    tournoment,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
