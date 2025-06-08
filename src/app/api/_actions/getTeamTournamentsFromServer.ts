import { TournamentInterface } from "@/4_entities/tournament";

export async function getTeamTournamentsFromServer(
  teamId: number
): Promise<TournamentInterface[] | null> {
  if (!teamId || isNaN(teamId) || teamId <= 0) {
    console.error(`[Server Fetch] Wrong team ID: ${teamId}`);
    return null;
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/team/${teamId}/tournaments`
    );

    if (!response.ok) {
      console.error(
        `[Server Fetch] Error fetching tournaments from a team with ID: ${teamId}. Status: ${response.status}`
      );
      return null;
    }
    return (await response.json()) as TournamentInterface[];
  } catch (error) {
    console.error(
      `[Server Fetch] Error in getTeamTournamentsFromServer for ID ${teamId}:`,
      error
    );
    return null;
  }
}
