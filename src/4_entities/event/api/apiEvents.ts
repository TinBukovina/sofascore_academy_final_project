import { EventInterface } from "../types";

export const getEventById = async (
  eventId: number
): Promise<EventInterface | null> => {
  if (!eventId) {
    return null;
  }

  const response = await fetch(`/api/event/${eventId}`);

  if (!response.ok) {
    throw new Error("There was a error catching event with id: " + eventId);
  }

  return response.json();
};

export const getEventsFromSportAndDate = async (
  sportSlug: string,
  date: string
): Promise<EventInterface[] | null> => {
  if (!sportSlug || !date) return null;

  const response = await fetch(`/api/sport/${sportSlug}/events/${date}`);

  console.log(response);
  if (!response.ok) {
    throw new Error(
      `There was error catching all events from a sport on a given date (${sportSlug}, ${date})`
    );
  }

  return response.json();
};
