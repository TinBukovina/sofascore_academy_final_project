"use client";

import { TournamentInterface } from "@/4_entities/event";
import useSWR from "swr";
import { getTournamentById } from "../api/apiTournaments";

const getSWRKey = (
  numberoOfTournaments: number | null | undefined
): [string, string] | null => {
  if (
    !numberoOfTournaments ||
    (typeof numberoOfTournaments === "string" && isNaN(numberoOfTournaments)) ||
    numberoOfTournaments <= 0
  ) {
    return null;
  }
  return [`/tournaments/first-n`, String(numberoOfTournaments)];
};

const fetcher = async (
  keyParts: [string, string]
): Promise<(TournamentInterface | null)[]> => {
  const [, numberoOfTournamentsStr] = keyParts;
  const numberoOfTournoments = parseInt(numberoOfTournamentsStr, 10);

  if (isNaN(numberoOfTournoments) || numberoOfTournoments <= 0) {
    console.log(`Unvalid number of tournoments: ${numberoOfTournoments}`);
    return [];
  }

  const tournomentIds = Array.from(
    { length: numberoOfTournoments },
    (_, i) => i + 1
  );
  const tournomentPromises = tournomentIds.map((id) => getTournamentById(id));

  try {
    const results = await Promise.all(tournomentPromises);
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export function useFirstNTournaments(
  numberOfTournoments: number | null | undefined
) {
  const {
    data: tournaments,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<(TournamentInterface | null)[]>(
    getSWRKey(numberOfTournoments),
    fetcher
  );

  return {
    tournaments,
    isLoading,
    isError: !!error,
    error,
    isValidating,
    mutate,
  };
}
