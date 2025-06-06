import { TournamentInterface } from "@/4_entities/tournament";

const getAbsoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
};

export async function getTournamentByIdFromServer(
  tournamentId: number
): Promise<TournamentInterface | null> {
  if (!tournamentId || isNaN(tournamentId) || tournamentId <= 0) {
    console.error(`[Server Fetch] Pogrešan ID turnira: ${tournamentId}`);
    return null;
  }

  const url = getAbsoluteUrl(`/api/tournament/${tournamentId}`);

  try {
    const response = await fetch(url);

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
