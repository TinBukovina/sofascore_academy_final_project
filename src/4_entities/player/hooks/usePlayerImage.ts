"use client";

import useSWR from "swr";
import { getPlayerImage } from "../api/apiPlayer";

const getSWRKey = (
  playerId: number | string | null | undefined
): [string, string] | null => {
  if (
    !playerId ||
    (typeof playerId === "string" && isNaN(parseInt(playerId, 10)))
  ) {
    return null;
  }

  return [`/player/image`, String(playerId)];
};

const fetcher = async (keyParts: [string, string]): Promise<string | null> => {
  const [, playerIdStr] = keyParts;
  const playerId = parseInt(playerIdStr, 10);
  return getPlayerImage(playerId);
};

export function usePlayerImage(playerId: number | string | null | undefined) {
  const {
    data: playerImage,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(getSWRKey(playerId), fetcher);

  return {
    playerImage,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
