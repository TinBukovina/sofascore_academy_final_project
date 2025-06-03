import {
  TournamentEventsInterface,
  TournamentInterface,
  TournamentStandingsInterface,
} from "../types";

export const getTournamentById = async (
  tournamentId: number
): Promise<TournamentInterface> => {
  if (!tournamentId) {
    throw new Error(`Wrong tournoment ID passed: ${tournamentId}`);
  }

  const response = await fetch(`/api/tournament/${tournamentId}`);

  if (!response.ok) {
    throw new Error(
      "There was a error catching tournament with id: " + tournamentId
    );
  }

  return response.json();
};

export const getTournamentStandings = async (
  tournamentId: number
): Promise<TournamentStandingsInterface[]> => {
  if (!tournamentId) {
    throw new Error(`Wrong tournament ID passed: ${tournamentId}`);
  }

  const response = await fetch(`/api/tournament/${tournamentId}/standings`);

  if (!response.ok) {
    throw new Error(
      "There was a error catching tournament with id: " + tournamentId
    );
  }

  return response.json();
};

export const getTournamentEvents = async (
  tournamentId: number,
  page: number = 0
): Promise<TournamentEventsInterface[]> => {
  if (!tournamentId) {
    throw new Error(
      `Wrong tournament ID or page passed: ${tournamentId}, ${page}`
    );
  }

  const isNegative = page < 0;

  let newPage;
  if (page < 0) {
    newPage = page * -1;
  } else newPage = page;

  const response = await fetch(
    `/api/tournament/${tournamentId}/events/${isNegative ? "next" : "last"}/${newPage}`
  );

  if (!response.ok) {
    throw new Error(
      `There was a error catching tournoment events with tournament id: ${tournamentId}, and page: ${page}`
    );
  }

  return response.json();
};
