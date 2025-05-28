import React from "react";
import { EventInterface } from "../types";
import { Box, Flex } from "../../../../styled-system/jsx";
import Image from "next/image";

interface EventItemProps {
  event: EventInterface;
  type?: "finished" | "playing" | "toBePlayed";
  favouriteBtn: React.ReactNode;
}

export function EventItem({
  event,
  type = "finished",
  favouriteBtn,
}: EventItemProps) {
  if (type) {
  }

  return (
    <Flex justifyContent={"space-between"} p={"0.75rem 1rem"}>
      <Box
        bg={"actions.postive"}
        color={"base.black"}
        fontWeight={"bold"}
        p={"0.25rem 0.5rem"}
        borderRadius={"sm"}
        fontSize={"sm"}
      >
        88
      </Box>
      <Flex gap={"1rem"} w={"100%"} justifyContent={"center"}>
        <Box>{event.homeTeam.name}</Box>
        <Image
          src={`/api/team/${event.homeTeam.id}/image`}
          width={32}
          height={32}
          alt="Home team image"
        />
        <Box>
          {event.homeScore.total} - {event.awayScore.total}
        </Box>
        <Image
          src={`/api/team/${event.awayTeam.id}/image`}
          width={32}
          height={32}
          alt="Home team image"
        />
        <Box>{event.awayTeam.name}</Box>
      </Flex>

      {favouriteBtn && <Box>{favouriteBtn}</Box>}
    </Flex>
  );
}
