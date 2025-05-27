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

/**
 * SWR fetcher funkcija koja koristi getEventById.
 * SWR prosljeđuje ključ kao argumente.
 * @param keyParts - Dijelovi SWR ključa, npr. ['/event', '123']
 * @returns Promise koji razrješava EventInterface ili null.
 */
const eventFetcher = async (
  keyParts: [string, string]
): Promise<EventInterface | null> => {
  const [, eventIdStr] = keyParts;
  const eventIdNum = parseInt(eventIdStr, 10); // Konvertiraj string ID natrag u broj
  return getEventById(eventIdNum);
};

export function useEventById(eventId: number | string | null | undefined) {
  const {
    data: event,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<EventInterface | null>(getSWRKey(eventId), eventFetcher);

  return {
    event,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
