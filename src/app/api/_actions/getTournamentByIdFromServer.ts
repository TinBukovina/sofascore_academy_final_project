import { TournamentInterface } from "@/4_entities/tournament";

export async function getTournamentByIdFromServer(
  tournamentId: number
): Promise<TournamentInterface | null> {
  if (!tournamentId || isNaN(tournamentId) || tournamentId <= 0) {
    console.error(`[Server Fetch] Pogrešan ID turnira: ${tournamentId}`);
    return null;
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/tournament/${tournamentId}`
    );

    if (!response.ok) {
      console.error(
        `[Server Fetch] Error fetching tournament with ID: ${tournamentId}. Status: ${response.status}`
      );
      return null;
    }
    return (await response.json()) as TournamentInterface;
  } catch (error) {
    console.error(
      `[Server Fetch] Error in getTournamentByIdFromServer for ID ${tournamentId}:`,
      error
    );
    return null;
  }
}
