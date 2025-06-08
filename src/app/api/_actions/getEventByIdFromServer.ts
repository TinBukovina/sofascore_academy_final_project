import { EventInterface } from "@/4_entities/event";

const getAbsoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/";
  return `${baseUrl}${path}`;
};

export async function getEventByIdWithServer(
  eventId: number
): Promise<EventInterface | null> {
  if (!eventId || isNaN(eventId) || eventId <= 0) {
    console.error(`[Server Fetch] Wrong event ID: ${eventId}`);
    return null;
  }

  const url = getAbsoluteUrl(`api/event/${eventId}`);
  console.log(`[Vercel Debug] Pokušavam dohvatiti URL: ${url}`);

  try {
    const response = await fetch(url);

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
