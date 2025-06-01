"use client";

import useSWR from "swr";
import { getEventIncidentsWithEventId } from "../api/apiEvents";
import { IncidentsInterface } from "../types";

const getSWRKey = (
  eventId: number | string | null | undefined
): [string, string] | null => {
  if (
    !eventId ||
    (typeof eventId === "string" && isNaN(parseInt(eventId, 10)))
  ) {
    return null;
  }
  return [`/event/incidents`, String(eventId)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<IncidentsInterface[]> => {
  const [, eventIdStr] = keyParts;
  const eventIdNum = parseInt(eventIdStr, 10);
  return getEventIncidentsWithEventId(eventIdNum);
};

export function useEventIncidents(eventId: number | null | undefined) {
  const {
    data: eventIncident,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<IncidentsInterface[]>(getSWRKey(eventId), fetcher);

  return {
    eventIncident,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
