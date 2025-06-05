"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@styled-system/jsx";

import { Icon } from "@/5_shared";
import {
  bookmark400SvgInfo,
  bookmarkFill300SvgInfo,
} from "@/5_shared/lib/svgPaths";
import { EventInterface } from "@/4_entities/event";
import { TeamInterface } from "@/4_entities/team";
import { PlayerInterface } from "@/4_entities/player";
import { TournamentInterface } from "@/4_entities/tournament";
import { useFavourites } from "../context/useFavourites";

interface FavouriteToggleBtnProps {
  styles?: React.CSSProperties;
  whatToAdd: "event" | "team" | "tournament" | "player";
  item: EventInterface | TeamInterface | TournamentInterface | PlayerInterface;
}

export function FavouriteToggleBtn({
  styles,
  whatToAdd,
  item,
}: FavouriteToggleBtnProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isAlreadyFavourite, setIsAlreadyFavourite] = useState<boolean>(false);

  const {
    isEventAlreadyFavourite,
    isTeamAlreadyFavourite,
    isTournomentAlreadyFavourite,
    isPlayerAlreadyFavourite,
    addEventToFavourites,
    addTeamToFavourites,
    addTournomentToFavourites,
    addPlayerToFavourites,
    removeEventFromFavourites,
    removeTeamFromFavourites,
    removeTournomentFromFavourites,
    removePlayerFromFavourites,
  } = useFavourites();

  useEffect(() => {
    if (whatToAdd === "event") {
      setIsAlreadyFavourite(isEventAlreadyFavourite(item.id));
    } else if (whatToAdd === "team") {
      setIsAlreadyFavourite(isTeamAlreadyFavourite(item.id));
    } else if (whatToAdd === "tournament") {
      setIsAlreadyFavourite(isTournomentAlreadyFavourite(item.id));
    } else if (whatToAdd === "player") {
      setIsAlreadyFavourite(isPlayerAlreadyFavourite(item.id));
    }
  }, [
    whatToAdd,
    isEventAlreadyFavourite,
    isTeamAlreadyFavourite,
    isTournomentAlreadyFavourite,
    isPlayerAlreadyFavourite,
    item.id,
    item,
  ]);

  const bookmarkSvgInfo = bookmark400SvgInfo();
  const bookmarkFillSvgInfo = bookmarkFill300SvgInfo();

  return (
    <Box
      width="24px"
      height="24px"
      minHeight={"24px"}
      maxHeight={"24px"}
      minWidth={"24px"}
      maxWidth={"24px"}
      fill={"primaryClr"}
      cursor={"pointer"}
      style={{ ...styles }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (whatToAdd === "event") {
          if (isAlreadyFavourite) {
            removeEventFromFavourites(item.id);
          } else {
            addEventToFavourites(item as EventInterface);
          }
        } else if (whatToAdd === "team") {
          if (isAlreadyFavourite) {
            removeTeamFromFavourites(item.id);
          } else {
            addTeamToFavourites(item as TeamInterface);
          }
        } else if (whatToAdd === "tournament") {
          if (isAlreadyFavourite) {
            removeTournomentFromFavourites(item.id);
          } else {
            addTournomentToFavourites(item as TournamentInterface);
          }
        } else if (whatToAdd === "player") {
          if (isAlreadyFavourite) {
            removePlayerFromFavourites(item.id);
          } else {
            addPlayerToFavourites(item as PlayerInterface);
          }
        }
      }}
    >
      <Icon
        svgInfo={
          isHovered || isAlreadyFavourite
            ? bookmarkFillSvgInfo
            : bookmarkSvgInfo
        }
      />
    </Box>
  );
}
