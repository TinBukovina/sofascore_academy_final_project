"use client";

import useSWR from "swr";
import { EventInterface } from "@/4_entities/event";
import { getTeamEvents } from "../api/apiTeam";

const getSWRKey = (
  teamId: number | string | null | undefined,
  page: number | string | null | undefined
): [string, string, string] | null => {
  if (!teamId || (typeof teamId === "string" && isNaN(parseInt(teamId, 10)))) {
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

  return [`/team/events`, String(teamId), String(page)];
};

const fetcher = async (
  keyParts: [string, string, string]
): Promise<EventInterface[]> => {
  const [, teamIdStr, pageStr] = keyParts;
  const teamId = parseInt(teamIdStr, 10);
  const page = parseInt(pageStr, 10);

  return getTeamEvents(teamId, page);
};

export function useTeamEvents(
  tournamentId: number | string | null | undefined,
  page: number | string | null | undefined
) {
  const {
    data: teamEvents,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<EventInterface[]>(getSWRKey(tournamentId, page), fetcher);

  return {
    teamEvents,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
