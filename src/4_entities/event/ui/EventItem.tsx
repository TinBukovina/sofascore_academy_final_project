import React from "react";
import { EventInterface } from "../types";
import { FinishedEventItem } from "./FinishedEventItem";
import { ToBePlayedEventItem } from "./ToBePlayedEventItem";
import { PlayingEventItem } from "./PlayingEventItem";
import { Box } from "../../../../styled-system/jsx";
import { useWindowWidth } from "@/5_shared/lib/hooks/useWindowWidth";
import { useRouter } from "next/navigation";

interface EventItemProps {
  event: EventInterface;
  favouriteBtn: React.ReactNode;
  type?: "finished" | "playing" | "toBePlayed";
  lastChild?: boolean;
  handleOnClick?: () => void;
  setSelectedEvent?: (event: EventInterface) => void;
}

export function EventItem({
  event,
  type = "finished",
  favouriteBtn,
  lastChild = false,
  handleOnClick,
  setSelectedEvent,
}: EventItemProps) {
  const router = useRouter();
  const windowWidth = useWindowWidth();

  return (
    <Box
      onClick={() => {
        if (windowWidth <= 768) {
          router.push(`/home/football/event/${event.id}`);
          return;
        }
        if (setSelectedEvent) setSelectedEvent(event);
        if (handleOnClick) handleOnClick();
      }}
      _hover={{ bg: "surface.s1", cursor: "pointer" }}
    >
      {type === "playing" ? (
        <PlayingEventItem
          event={event}
          favouriteBtn={favouriteBtn}
          lastChild={lastChild}
        />
      ) : type === "toBePlayed" ? (
        <ToBePlayedEventItem
          event={event}
          favouriteBtn={favouriteBtn}
          lastChild={lastChild}
        />
      ) : (
        <FinishedEventItem
          event={event}
          favouriteBtn={favouriteBtn}
          lastChild={lastChild}
        />
      )}
    </Box>
  );
}
