"use client";

import useSWR from "swr";
import { getTeamById } from "../api/apiTeam";
import { TeamInterface } from "../types";

const getSWRKey = (
  teamId: number | string | null | undefined
): [string, string] | null => {
  if (!teamId || (typeof teamId === "string" && isNaN(parseInt(teamId, 10)))) {
    console.log("Vraceno null");
    return null;
  }
  return [`/team`, String(teamId)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<TeamInterface | null> => {
  const [, teamIdStr] = keyParts;
  const teamId = parseInt(teamIdStr, 10);
  return getTeamById(teamId);
};

export function useTeamWithId(teamId: number | string | null | undefined) {
  const {
    data: team,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<TeamInterface | null>(getSWRKey(teamId), fetcher);

  return {
    team,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
