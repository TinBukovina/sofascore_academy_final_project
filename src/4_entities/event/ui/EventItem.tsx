import React from "react";
import { EventInterface } from "../types";
import { FinishedEventItem } from "./FinishedEventItem";
import { ToBePlayedEventItem } from "./ToBePlayedEventItem";
import { PlayingEventItem } from "./PlayingEventItem";

interface EventItemProps {
  event: EventInterface;
  favouriteBtn: React.ReactNode;
  type?: "finished" | "playing" | "toBePlayed";
  lastChild?: boolean;
}

export function EventItem({
  event,
  type = "finished",
  favouriteBtn,
  lastChild = false,
}: EventItemProps) {
  if (type === "playing") {
    return (
      <PlayingEventItem
        event={event}
        favouriteBtn={favouriteBtn}
        lastChild={lastChild}
      />
    );
  } else if (type === "toBePlayed") {
    return (
      <ToBePlayedEventItem
        event={event}
        favouriteBtn={favouriteBtn}
        lastChild={lastChild}
      />
    );
  } else
    return (
      <FinishedEventItem
        event={event}
        favouriteBtn={favouriteBtn}
        lastChild={lastChild}
      />
    );
}
