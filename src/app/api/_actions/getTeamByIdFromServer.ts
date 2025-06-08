import { TournamentInterface } from "@/4_entities/tournament";

const getAbsoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
};

export async function getTeamByIdFromServer(
  teamId: number
): Promise<TournamentInterface | null> {
  if (!teamId || isNaN(teamId) || teamId <= 0) {
    console.error(`[Server Fetch] Wrong team ID: ${teamId}`);
    return null;
  }

  const url = getAbsoluteUrl(`api/team/${teamId}`);
  console.log(`[Vercel Debug] Pokušavam dohvatiti URL: ${url}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        `[Server Fetch] Error fetching team with ID: ${teamId}. Status: ${response.status}`
      );
      return null;
    }
    return (await response.json()) as TournamentInterface;
  } catch (error) {
    console.error(
      `[Server Fetch] Error in getTeamByIdFromServer for ID ${teamId}:`,
      error
    );
    return null;
  }
}
