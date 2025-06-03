"use client";

import useSWR from "swr";
import { getEventById } from "../api/apiEvents";
import { EventInterface } from "../types";

const getSWRKey = (
  eventId: number | string | null | undefined
): [string, string] | null => {
  if (
    !eventId ||
    (typeof eventId === "string" && isNaN(parseInt(eventId, 10)))
  ) {
    return null;
  }
  return [`/event`, String(eventId)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<EventInterface | null> => {
  const [, eventIdStr] = keyParts;
  const eventIdNum = parseInt(eventIdStr, 10);
  return getEventById(eventIdNum);
};

export function useEventById(eventId: number | string | null | undefined) {
  const {
    data: event,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<EventInterface | null>(getSWRKey(eventId), fetcher);

  return {
    event,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
