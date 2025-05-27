import { EventInterface } from "../types";

export const getEventById = async (
  eventId: number
): Promise<EventInterface | null> => {
  if (!eventId) {
    return null;
  }

  const response = await fetch(
    `https://academy-backend.sofascore.dev/event/${eventId}`
  );

  if (!response.ok) {
    throw new Error("There was a error catching event with id: " + eventId);
  }

  return response.json();
};
