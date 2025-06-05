"use client";

import useSWR from "swr";
import { getTeamTournaments } from "../api/apiTeam";
import { TournamentInterface } from "@/4_entities/tournament";

const getSWRKey = (
  teamId: number | string | null | undefined
): [string, string] | null => {
  if (!teamId || (typeof teamId === "string" && isNaN(parseInt(teamId, 10)))) {
    return null;
  }
  return [`/team/tournaments`, String(teamId)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<TournamentInterface[]> => {
  const [, teamIdStr] = keyParts;
  const teamId = parseInt(teamIdStr, 10);
  return getTeamTournaments(teamId);
};

export function useTeamTournaments(teamId: number | string | null | undefined) {
  const {
    data: teamTournaments,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<TournamentInterface[]>(getSWRKey(teamId), fetcher);

  return {
    teamTournaments,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
