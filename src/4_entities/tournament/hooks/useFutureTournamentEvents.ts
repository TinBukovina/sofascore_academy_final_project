"use client";

import useSWR from "swr";
import { getFutureTournamentEvents } from "../api/apiTournaments";
import { TournamentEventsInterface } from "../types";

const getSWRKey = (
  tournamentId: number | string | null | undefined,
  page: number | string | null | undefined
): [string, string, string] | null => {
  if (
    !tournamentId ||
    (typeof tournamentId === "string" && isNaN(parseInt(tournamentId, 10)))
  ) {
    console.log("Vraceno null");
    return null;
  }

  if (
    page !== 0 &&
    (!page || (typeof page === "string" && isNaN(parseInt(page, 10))))
  ) {
    console.log("Vraceno null");
    return null;
  }

  return [`/tournament/events/next`, String(tournamentId), String(page)];
};

const fetcher = async (
  keyParts: [string, string, string]
): Promise<TournamentEventsInterface[]> => {
  const [, tournamentIdStr, pageStr] = keyParts;
  const tournamentId = parseInt(tournamentIdStr, 10);
  const page = parseInt(pageStr, 10);

  return getFutureTournamentEvents(tournamentId, page);
};

export function useFutureTournamentEvents(
  tournamentId: number | string | null | undefined,
  page: number | string | null | undefined
) {
  const {
    data: tournamentEvents,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<TournamentEventsInterface[]>(
    getSWRKey(tournamentId, page),
    fetcher
  );

  return {
    tournamentEvents,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
