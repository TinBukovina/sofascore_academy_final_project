"use client";

import useSWR from "swr";
import { EventInterface } from "@/4_entities/event";
import { getPlayerEvents } from "../api/apiPlayer";

const getSWRKey = (
  playerId: number | string | null | undefined,
  page: number | string | null | undefined
): [string, string, string] | null => {
  if (
    !playerId ||
    (typeof playerId === "string" && isNaN(parseInt(playerId, 10)))
  ) {
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

  return [`/player/events`, String(playerId), String(page)];
};

const fetcher = async (
  keyParts: [string, string, string]
): Promise<EventInterface[]> => {
  const [, playerIdStr, pageStr] = keyParts;
  const playerId = parseInt(playerIdStr, 10);
  const page = parseInt(pageStr, 10);

  return getPlayerEvents(playerId, page);
};

export function usePlayerEvents(
  playerId: number | string | null | undefined,
  page: number | string | null | undefined
) {
  const {
    data: playerEvents,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<EventInterface[]>(getSWRKey(playerId, page), fetcher);

  return {
    playerEvents,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
