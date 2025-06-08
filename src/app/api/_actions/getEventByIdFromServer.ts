import { EventInterface } from "@/4_entities/event";

export async function getEventByIdWithServer(
  eventId: number
): Promise<EventInterface | null> {
  if (!eventId || isNaN(eventId) || eventId <= 0) {
    console.error(`[Server Fetch] Wrong event ID: ${eventId}`);
    return null;
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/event/${eventId}`
    );

    if (!response.ok) {
      console.error(
        `[Server Fetch] Error fetching event with ID: ${eventId}. Status: ${response.status}`
      );
      return null;
    }
    return (await response.json()) as EventInterface;
  } catch (error) {
    console.error(
      `[Server Fetch] Error in getTeamByIdFromServer for ID ${eventId}:`,
      error
    );
    return null;
  }
}
