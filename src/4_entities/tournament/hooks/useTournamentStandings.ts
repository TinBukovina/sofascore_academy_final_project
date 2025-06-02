"use client";

import useSWR from "swr";
import { getTournamentStandings } from "../api/apiTournaments";
import { TournamentStandingsInterface } from "../types";

const getSWRKey = (
  tournamentId: number | string | null | undefined
): [string, string] | null => {
  if (
    !tournamentId ||
    (typeof tournamentId === "string" && isNaN(parseInt(tournamentId, 10)))
  ) {
    return null;
  }
  return [`/tournament/standings`, String(tournamentId)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<TournamentStandingsInterface[]> => {
  const [, tournamentIdStr] = keyParts;
  const tournamentId = parseInt(tournamentIdStr, 10);
  return getTournamentStandings(tournamentId);
};

export function useTournamentStandings(
  tournamentId: number | string | null | undefined
) {
  const {
    data: tournamentStandings,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<TournamentStandingsInterface[]>(getSWRKey(tournamentId), fetcher);

  return {
    tournamentStandings,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
