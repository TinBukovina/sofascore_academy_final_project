"use client";

import useSWR from "swr";
import { getPlayersBySearch } from "../api/api";
import { PlayerInterface } from "@/4_entities/player";

const getSWRKey = (
  query: string | null | undefined
): [string, string] | null => {
  if (!query || query.length < 2) {
    return null;
  }

  return [`/query/players`, String(query)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<PlayerInterface[]> => {
  const [, queryStr] = keyParts;

  return getPlayersBySearch(queryStr);
};

export function useSearchPlayers(query: string | null | undefined) {
  const {
    data: searchPlayers,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<PlayerInterface[]>(getSWRKey(query), fetcher);

  return {
    searchPlayers,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
