import { EventInterface, IncidentsInterface } from "../types";

export const getEventById = async (
  eventId: number
): Promise<EventInterface | null> => {
  if (!eventId) {
    throw new Error(`Passed event ID is invalid: ${eventId}.`);
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
  if (!sportSlug || !date) {
    throw new Error(
      `Passed sport slug or date is invalid: ${sportSlug}, ${date}.`
    );
  }

  const response = await fetch(`/api/sport/${sportSlug}/events/${date}`);

  if (!response.ok) {
    throw new Error(
      `There was error catching all events from a sport on a given date (${sportSlug}, ${date})`
    );
  }

  return response.json();
};

export const getEventIncidentsWithEventId = async (
  eventId: number
): Promise<IncidentsInterface[]> => {
  if (!eventId || eventId <= 0) {
    throw new Error(`Passed event ID is invalid: ${eventId}.`);
  }

  const response = await fetch(`/api/event/${eventId}/incidents`);

  if (!response.ok) {
    throw new Error(
      `There was a error fetching event incidents with event id: ${eventId}`
    );
  }

  return response.json();
};
