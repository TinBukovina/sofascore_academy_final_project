"use client";

import useSWR from "swr";
import { getEventsFromSportAndDate } from "../api/apiEvents";
import { EventInterface } from "../types";

const getSWRKey = (
  sportSlug: string,
  date: string
): [string, string, string] | null => {
  return [`/events`, sportSlug, date];
};

const eventFetcher = async (
  keyParts: [string, string, string]
): Promise<EventInterface[] | null> => {
  const [, sportSlug, date] = keyParts;
  return getEventsFromSportAndDate(sportSlug, date);
};

export function useEventsFromSportAndDate(sportSlug: string, date: string) {
  const {
    data: events,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<EventInterface[] | null>(getSWRKey(sportSlug, date), eventFetcher);

  return {
    events,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
