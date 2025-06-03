import { TournamentInterface } from "@/4_entities/tournament";
import { TeamInterface } from "../types";
import { EventInterface } from "@/4_entities/event";
import { PlayerInterface } from "@/4_entities/player";

export const getTeamImageWithTeamId = async (
  teamId: number
): Promise<string | null> => {
  if (!teamId) {
    console.log("Passed team ID was null.");
    return null;
  }

  const response = await fetch(`/api/team/${teamId}/image`);

  if (!response.ok) {
    throw new Error(
      `There was a error while fetcing team image with ID: ${teamId}.`
    );
  }

  return response.json();
};

export const getTeamById = async (teamId: number): Promise<TeamInterface> => {
  if (!teamId) {
    throw new Error(`Passed team ID is invalid: ${teamId}`);
  }

  const response = await fetch(`/api/team/${teamId}`);

  if (!response.ok) {
    throw new Error(`There was a error catching team with id: ${teamId}`);
  }

  return response.json();
};

export const getTeamTournaments = async (
  teamId: number
): Promise<TournamentInterface[]> => {
  if (!teamId) {
    throw new Error(`Passed team ID is invalid: ${teamId}`);
  }

  const response = await fetch(`/api/team/${teamId}/tournaments`);

  if (!response.ok) {
    throw new Error(
      `There was a error catching team tournaments with team id: ${teamId}`
    );
  }

  return response.json();
};

export const getTeamEvents = async (
  teamId: number,
  page: number
): Promise<EventInterface[]> => {
  if (!teamId) {
    throw new Error(`Wrong team ID or page passed: ${teamId}, ${page}`);
  }

  const isNegative = page < 0;

  let newPage;
  if (page < 0) {
    newPage = page * -1;
  } else newPage = page;

  const response = await fetch(
    `/api/team/${teamId}/events/${isNegative ? "next" : "last"}/${newPage}`
  );

  if (!response.ok) {
    throw new Error(
      `There was a error catching team events with team id: ${teamId}, and page: ${page}`
    );
  }

  return response.json();
};

export const getTeamPlayers = async (
  teamId: number
): Promise<PlayerInterface[]> => {
  if (!teamId) {
    throw new Error(`Passed team ID is invalid: ${teamId}`);
  }

  const response = await fetch(`/api/team/${teamId}/players`);

  if (!response.ok) {
    throw new Error(
      `There was a error catching team players with team id: ${teamId}`
    );
  }

  return response.json();
};
