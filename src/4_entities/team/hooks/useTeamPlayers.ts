"use client";

import useSWR from "swr";
import { getTeamPlayers } from "../api/apiTeam";
import { PlayerInterface } from "@/4_entities/player";

const getSWRKey = (
  teamId: number | string | null | undefined
): [string, string] | null => {
  if (!teamId || (typeof teamId === "string" && isNaN(parseInt(teamId, 10)))) {
    return null;
  }
  return [`/team/players`, String(teamId)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<PlayerInterface[]> => {
  const [, teamIdStr] = keyParts;
  const teamId = parseInt(teamIdStr, 10);
  return getTeamPlayers(teamId);
};

export function useTeamPlayers(teamId: number | string | null | undefined) {
  const {
    data: teamPlayers,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<PlayerInterface[]>(getSWRKey(teamId), fetcher);

  return {
    teamPlayers,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
