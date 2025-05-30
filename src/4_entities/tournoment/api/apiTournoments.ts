import { TournomentInterface } from "@/4_entities/event";

export const getTournomentById = async (
  tournomentId: number
): Promise<TournomentInterface | null> => {
  if (!tournomentId) {
    return null;
  }

  const response = await fetch(`/api/tournoment/${tournomentId}`);

  if (!response.ok) {
    throw new Error(
      "There was a error catching event with id: " + tournomentId
    );
  }

  return response.json();
};
