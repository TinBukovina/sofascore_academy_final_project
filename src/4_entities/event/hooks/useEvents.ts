"use client";

import { getEventById } from "../api/apiEvents";
import { EventInterface } from "../types";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

const BATCH_SIZE = 10;

const getKey = (
  pageIndex: number,
  previousPageData: EventInterface[]
): [string, number, number] | null => {
  if (pageIndex === 0) {
    return ["events_batch", 0, BATCH_SIZE];
  }

  if (previousPageData && previousPageData.length < BATCH_SIZE) {
    return null;
  }

  if (previousPageData && previousPageData.length === 0) {
    return null;
  }

  return ["event_batch", pageIndex, BATCH_SIZE];
};

const eventsBatchFetcher = async (
  keyArgs: [string, number, number]
): Promise<EventInterface[]> => {
  const [, pageIndex, batchSize] = keyArgs;
  const fetchedEventsInBatch: EventInterface[] = [];
  const startIndexForIds = pageIndex * batchSize + 1;

  for (let i = 0; i < batchSize; i++) {
    const currentEventId = startIndexForIds + i;

    try {
      const event = await getEventById(currentEventId);
      if (event) {
        fetchedEventsInBatch.push(event);
      } else {
        console.log(`Event s ID-om ${currentEventId} nije pronađen.`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return fetchedEventsInBatch;
};

export function useEvents(
  swrOptions?: SWRInfiniteConfiguration<EventInterface[]>
) {
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite<EventInterface[]>(getKey, eventsBatchFetcher, swrOptions);

  console.log("data\n", data);
  const events = data ? data.flat() : [];

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < BATCH_SIZE);

  return {
    events,
    error,
    isLoadingInitialData: isLoading,
    isLoadingMore: isLoading && size > 1 ? false : isValidating,
    isError: !!error,
    isValidating,
    mutate,
    size,
    setSize,
    isReachingEnd,
  };
}
