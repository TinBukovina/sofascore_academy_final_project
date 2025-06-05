import { TournamentInterface } from "@/4_entities/tournament";

const getAbsoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
};

export async function getTeamTournamentsFromServer(
  teamId: number
): Promise<TournamentInterface[] | null> {
  if (!teamId || isNaN(teamId) || teamId <= 0) {
    console.error(`[Server Fetch] Pogrešan ID tima: ${teamId}`);
    return null;
  }

  const url = getAbsoluteUrl(`/api/team/${teamId}/tournaments`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        `[Server Fetch] Greška pri dohvaćanju turnira od tima s ID-om: ${teamId}. Status: ${response.status}`
      );
      return null;
    }
    return (await response.json()) as TournamentInterface[];
  } catch (error) {
    console.error(
      `[Server Fetch] Greška u getTeamTournamentsFromServer za ID ${teamId}:`,
      error
    );
    return null;
  }
}
