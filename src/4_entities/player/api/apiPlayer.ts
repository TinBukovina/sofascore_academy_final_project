import { EventInterface } from "@/4_entities/event";
import { PlayerInterface } from "../types";

export const getPlayerById = async (
  playerId: number
): Promise<PlayerInterface> => {
  if (!playerId) {
    throw new Error("Passed player ID has nullish value.");
  }

  const response = await fetch(`/api/player/${playerId}`);

  if (!response.ok) {
    throw new Error(
      `There was a error while fetcing player with ID: ${playerId}.`
    );
  }

  return response.json();
};

export const getPlayerImage = async (playerId: number): Promise<string> => {
  if (!playerId) {
    throw new Error("Passed player ID has nullish value.");
  }

  const response = await fetch(`/api/player/${playerId}/image`);

  if (!response.ok) {
    throw new Error(
      `There was a error while fetcing player image with ID: ${playerId}.`
    );
  }

  return response.json();
};

export const getPlayerEvents = async (
  playerId: number,
  page: number
): Promise<EventInterface[]> => {
  if (!playerId) {
    throw new Error(`Wrong player ID or page passed: ${playerId}, ${page}`);
  }

  const isNegative = page < 0;

  let newPage;
  if (page < 0) {
    newPage = page * -1;
  } else newPage = page;

  const response = await fetch(
    `/api/player/${playerId}/events/${isNegative ? "next" : "last"}/${newPage}`
  );

  if (!response.ok) {
    throw new Error(
      `There was a error catching player events with team id: ${playerId}, and page: ${newPage}`
    );
  }

  return response.json();
};
