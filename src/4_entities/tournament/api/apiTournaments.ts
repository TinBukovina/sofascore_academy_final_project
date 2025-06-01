import { TournamentInterface } from "@/4_entities/event";

export const getTournamentById = async (
  tournamentId: number
): Promise<TournamentInterface | null> => {
  if (!tournamentId) {
    throw new Error(`Wrong tournoment ID passed: ${tournamentId}`);
  }

  const response = await fetch(`/api/tournament/${tournamentId}`);

  if (!response.ok) {
    throw new Error(
      "There was a error catching event with id: " + tournamentId
    );
  }

  return response.json();
};
