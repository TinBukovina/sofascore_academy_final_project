import { EventInterface, TournomentInterface } from "@/4_entities/event";

export function getDifferentTournomentFromListOfEvents(
  events: EventInterface[]
): TournomentInterface[] {
  const prevTournomentIds: number[] = [];
  const differentTournoments = events
    .filter((el) => {
      if (!prevTournomentIds.includes(el.tournament.id)) {
        prevTournomentIds.push(el.tournament.id);
        return true;
      } else {
        return false;
      }
    })
    ?.map((events) => events.tournament);

  return differentTournoments;
}
