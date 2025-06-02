"use client";

import useSWR from "swr";
import { getTournamentById } from "../api/apiTournaments";
import { TournamentInterface } from "../types";

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

const fetcher = async (
  keyParts: [string, string]
): Promise<TournamentInterface> => {
  const [, tournamentIdStr] = keyParts;
  const tournamentId = parseInt(tournamentIdStr, 10);
  return getTournamentById(tournamentId);
};

export function useTournamentById(
  tournamentId: number | string | null | undefined
) {
  const {
    data: tournament,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<TournamentInterface>(getSWRKey(tournamentId), fetcher);

  return {
    tournament,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
