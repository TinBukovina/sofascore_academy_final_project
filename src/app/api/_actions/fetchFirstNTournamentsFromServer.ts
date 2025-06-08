import { TournamentInterface } from "@/4_entities/tournament";
import { getTournamentByIdFromServer } from "./getTournamentByIdFromServer";

export async function fetchFirstNTournamentsDataFromServer(
  count: number
): Promise<TournamentInterface[]> {
  if (isNaN(count) || count <= 0) {
    console.log(`[Server Fetch] Wrong number of tournaments entered: ${count}`);
    return [];
  }
  const tournamentIds = Array.from({ length: count }, (_, i) => i + 1);

  const tournamentPromises = tournamentIds.map((id) =>
    getTournamentByIdFromServer(id)
  );

  try {
    const results = await Promise.all(tournamentPromises);
    return results.filter((t): t is TournamentInterface => t !== null);
  } catch (error) {
    console.error(
      "[Server Fetch] Error fetching tournaments in fetchFirstNTournamentsDataForServer:",
      error
    );
    return [];
  }
}
