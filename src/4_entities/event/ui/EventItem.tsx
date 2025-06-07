import React from "react";
import { EventInterface } from "../types";
import { FinishedEventItem } from "./FinishedEventItem";
import { ToBePlayedEventItem } from "./ToBePlayedEventItem";
import { PlayingEventItem } from "./PlayingEventItem";
import { Box } from "../../../../styled-system/jsx";
import { useWindowWidth } from "@/5_shared/lib/hooks/useWindowWidth";
import { useRouter } from "next/navigation";
import { SmallFinishedEventItem } from "./SmallFinishedEventItem";

interface EventItemProps {
  event: EventInterface;
  favouriteBtn: React.ReactNode;
  type?: "finished" | "playing" | "toBePlayed";
  widthType?: "normal" | "small";
  lastChild?: boolean;
  handleOnClick?: () => void;
  setSelectedEvent?: (event: EventInterface) => void;
}

export function EventItem({
  event,
  type = "finished",
  widthType = "normal",
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
          router.push(`/home/${event.tournament.sport.slug}/event/${event.id}`);
          return;
        }

        if (setSelectedEvent) setSelectedEvent(event);
        if (handleOnClick) handleOnClick();

        if (!setSelectedEvent && !handleOnClick)
          router.push(`/home/${event.tournament.sport.slug}/event/${event.id}`);
      }}
      _hover={{ bg: "surface.s1", cursor: "pointer" }}
    >
      {type === "playing" ? (
        widthType === "normal" ? (
          <PlayingEventItem
            event={event}
            favouriteBtn={favouriteBtn}
            lastChild={lastChild}
          />
        ) : (
          <Box></Box>
        )
      ) : type === "toBePlayed" ? (
        widthType === "normal" ? (
          <ToBePlayedEventItem
            event={event}
            favouriteBtn={favouriteBtn}
            lastChild={lastChild}
          />
        ) : (
          <Box></Box>
        )
      ) : widthType === "normal" ? (
        <FinishedEventItem
          event={event}
          favouriteBtn={favouriteBtn}
          lastChild={lastChild}
        />
      ) : (
        <SmallFinishedEventItem
          event={event}
          favouriteBtn={favouriteBtn}
          lastChild={lastChild}
        />
      )}
    </Box>
  );
}
