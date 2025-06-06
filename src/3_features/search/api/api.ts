import { PlayerInterface } from "@/4_entities/player";
import { TeamInterface } from "@/4_entities/team";

export const getTeamsBySearch = async (
  query: string
): Promise<TeamInterface[]> => {
  if (!query) {
    throw new Error(`There is no passed query!`);
  }

  const response = await fetch(`/api/search/team/${query}`);
  if (!response.ok) {
    throw new Error(`There was a error fetching teams with query: ${query}`);
  }

  return response.json();
};

export const getPlayersBySearch = async (
  query: string
): Promise<PlayerInterface[]> => {
  if (!query) {
    throw new Error(`There is no passed query!`);
  }

  const response = await fetch(`/api/search/player/${query}`);
  if (!response.ok) {
    throw new Error(`There was a error fetching players with query: ${query}`);
  }

  return response.json();
};
