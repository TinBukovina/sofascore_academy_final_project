import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { EventInterface } from "../types";
import Image from "next/image";

interface FinishedEventItemProps {
  event: EventInterface;
  favouriteBtn: React.ReactNode;
  lastChild?: boolean;
}

export function PlayingEventItem({
  event,
  favouriteBtn,
  lastChild = false,
}: FinishedEventItemProps) {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      p={"0.75rem 1rem"}
      borderBottom={
        !lastChild ? "1px solid token(colors.border)" : "1px solid transparent"
      }
    >
      <Box
        bg={"actions.postive"}
        color={"base.black"}
        fontWeight={"bold"}
        p={"0.1rem 0.5rem"}
        borderRadius={"sm"}
        fontSize={"xs"}
      >
        88
      </Box>
      <Flex
        gap={"1rem"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex alignItems={"center"}>{event.homeTeam.name}</Flex>
        <Image
          src={`/api/team/${event.homeTeam.id}/image`}
          width={32}
          height={32}
          style={{
            maxWidth: "32px",
            maxHeight: "32px",
          }}
          alt="Home team image"
        />
        <Flex flexDirection={"column"} alignItems={"center"} fontSize={"sm"}>
          <Box color={"actions.negative"} fontWeight={"bold"}>
            <Box display={"inline"}>{event.homeScore.total}</Box> -{" "}
            <Box display={"inline"}>{event.awayScore.total}</Box>
          </Box>
        </Flex>
        <Image
          src={`/api/team/${event.awayTeam.id}/image`}
          width={32}
          height={32}
          style={{
            maxWidth: "32px",
            maxHeight: "32px",
          }}
          alt="Home team image"
        />
        <Flex alignItems={"center"}>{event.awayTeam.name}</Flex>
      </Flex>

      {favouriteBtn && <Box>{favouriteBtn}</Box>}
    </Flex>
  );
}
