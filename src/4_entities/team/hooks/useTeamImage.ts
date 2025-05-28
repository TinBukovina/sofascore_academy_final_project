"use client";

import useSWR from "swr";
import { getTeamImageWithTeamId } from "../api/apiTeam";

const getSWRKey = (
  teamId: number | string | null | undefined
): [string, string] | null => {
  if (!teamId || (typeof teamId === "string" && isNaN(parseInt(teamId, 10)))) {
    return null;
  }

  return [`/teamImage`, String(teamId)];
};

const teamImageFetcher = async (
  keyParts: [string, string]
): Promise<string | null> => {
  const [, teamId] = keyParts;
  const eventIdNum = parseInt(teamId, 10);
  return getTeamImageWithTeamId(eventIdNum);
};

export function useTeamImage(eventId: number | string | null | undefined) {
  const {
    data: teamImage,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(getSWRKey(eventId), teamImageFetcher);

  return {
    teamImage,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
