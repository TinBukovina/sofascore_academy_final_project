"use client";

import useSWR from "swr";
import { PlayerInterface } from "../types";
import { getPlayerById } from "../api/apiPlayer";

const getSWRKey = (
  playerId: number | string | null | undefined
): [string, string] | null => {
  if (
    !playerId ||
    (typeof playerId === "string" && isNaN(parseInt(playerId, 10)))
  ) {
    console.log("Vraca null");
    return null;
  }
  return [`/player`, String(playerId)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<PlayerInterface | null> => {
  const [, playerIdStr] = keyParts;
  const playerIdNum = parseInt(playerIdStr, 10);
  return getPlayerById(playerIdNum);
};

export function usePlayerById(playerId: number | string | null | undefined) {
  const {
    data: player,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<PlayerInterface | null>(getSWRKey(playerId), fetcher);

  return {
    player,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
