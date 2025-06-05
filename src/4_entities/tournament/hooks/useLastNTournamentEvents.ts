"use client";

import useSWR from "swr";
import { getTournamentEvents } from "../api/apiTournaments";
import { TournamentEventsInterface } from "../types";

const getSWRKey = (
  tournamentId: number | string | null | undefined,
  groupNum: number | string | null | undefined
): [string, string, string] | null => {
  if (
    !tournamentId ||
    (typeof tournamentId === "string" && isNaN(parseInt(tournamentId, 10)))
  ) {
    return null;
  }

  if (
    !groupNum ||
    (typeof groupNum === "string" && isNaN(parseInt(groupNum, 10)))
  ) {
    return null;
  }

  return [`/tournament/events/group`, String(tournamentId), String(groupNum)];
};

const fetcher = async (
  keyParts: [string, string, string]
): Promise<TournamentEventsInterface[]> => {
  const [, tournamentIdStr, groupNumStr] = keyParts;
  const tournamentId = parseInt(tournamentIdStr, 10);
  const groupNum = parseInt(groupNumStr, 10);

  let allEvents: TournamentEventsInterface[] = [];
  for (let i = 0; i < groupNum; i++) {
    const eventFromOneGroup: TournamentEventsInterface[] =
      await getTournamentEvents(tournamentId, i);

    if (!eventFromOneGroup || eventFromOneGroup.length >= 0) {
      allEvents = [...allEvents, ...eventFromOneGroup];
    }
  }

  return allEvents;
};

export function useLastNTournamentEvents(
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
