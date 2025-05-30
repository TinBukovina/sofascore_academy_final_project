"use client";

import { TournomentInterface } from "@/4_entities/event";
import useSWR from "swr";
import { getTournomentById } from "../api/apiTournoments";

const getSWRKey = (
  tournomentId: number | string | null | undefined
): [string, string] | null => {
  if (
    !tournomentId ||
    (typeof tournomentId === "string" && isNaN(parseInt(tournomentId, 10)))
  ) {
    return null;
  }
  return [`/tournoment`, String(tournomentId)];
};

const eventFetcher = async (
  keyParts: [string, string]
): Promise<TournomentInterface | null> => {
  const [, tournomentIdStr] = keyParts;
  const eventIdNum = parseInt(tournomentIdStr, 10);
  return getTournomentById(eventIdNum);
};

export function useTournomentById(eventId: number | string | null | undefined) {
  const {
    data: tournoment,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<TournomentInterface | null>(getSWRKey(eventId), eventFetcher);

  return {
    tournoment,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
