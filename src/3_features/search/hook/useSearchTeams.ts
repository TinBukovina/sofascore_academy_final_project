"use client";

import useSWR from "swr";
import { getTeamsBySearch } from "../api/api";
import { TeamInterface } from "@/4_entities/team";

const getSWRKey = (
  query: string | null | undefined
): [string, string] | null => {
  if (!query || query.length < 2) {
    return null;
  }

  return [`/query/teams`, String(query)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<TeamInterface[]> => {
  const [, queryStr] = keyParts;

  return getTeamsBySearch(queryStr);
};

export function useSearchTeams(query: string | null | undefined) {
  const {
    data: searchTeams,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<TeamInterface[]>(getSWRKey(query), fetcher);

  return {
    searchTeams,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
