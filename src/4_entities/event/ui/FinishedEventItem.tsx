import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { EventInterface } from "../types";
import Image from "next/image";
import { formatDateFromDate } from "@/5_shared";

interface FinishedEventItemProps {
  event: EventInterface;
  favouriteBtn: React.ReactNode;
  lastChild?: boolean;
}

export function FinishedEventItem({
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
      gap={"0.5rem"}
      fontSize={"sm"}
    >
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"0.5rem"}
      >
        <Box
          bg={"border"}
          color={"base.white"}
          fontWeight={"bold"}
          p={"0.1rem 0.5rem"}
          borderRadius={"sm"}
          fontSize={"xs"}
        >
          FT
        </Box>
        <Box
          fontSize={"xs"}
          display={{
            base: "block",
            sm: "none",
          }}
        >
          {formatDateFromDate(event.startDate)}
        </Box>
      </Flex>

      <Flex
        display={{ base: "none", sm: "flex" }}
        gap={"1rem"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        border={"1px solid transparent"}
      >
        <Flex
          display={{ base: "flex", md: "none", lg: "flex" }}
          alignItems={"center"}
          color={
            event.homeScore.total >= event.awayScore.total
              ? "text.normal"
              : "text.secondary"
          }
        >
          {event.homeTeam.name}
        </Flex>
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
          <Box>
            <Box
              display={"inline"}
              color={
                event.homeScore.total >= event.awayScore.total
                  ? "text.normal"
                  : "text.secondary"
              }
              fontWeight={
                event.homeScore.total >= event.awayScore.total
                  ? "bold"
                  : "normal"
              }
            >
              {event.homeScore.total}
            </Box>{" "}
            -{" "}
            <Box
              display={"inline"}
              color={
                event.awayScore.total >= event.homeScore.total
                  ? "text.normal"
                  : "text.secondary"
              }
              fontWeight={
                event.awayScore.total >= event.homeScore.total
                  ? "bold"
                  : "normal"
              }
            >
              {event.awayScore.total}
            </Box>
          </Box>
          <Box>{formatDateFromDate(event.startDate)}</Box>
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
        <Flex
          display={{ base: "flex", md: "none", lg: "flex" }}
          alignItems={"center"}
          color={
            event.awayScore.total >= event.homeScore.total
              ? "text.normal"
              : "text.secondary"
          }
        >
          {event.awayTeam.name}
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        display={{ base: "flex", sm: "none" }}
        gap={"0.5rem"}
        p={"0.25rem 0.5rem"}
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        border={"1px solid transparent"}
        borderLeftColor={{ base: "primaryClr", sm: "transparent" }}
        borderRightColor={{ base: "primaryClr", sm: "transparent" }}
        fontSize={"sm"}
      >
        <Flex justifyContent={"space-between"} w={"100%"}>
          <Flex gap={"0.5rem"}>
            <Image
              src={`/api/team/${event.homeTeam.id}/image`}
              width={32}
              height={32}
              style={{
                maxWidth: "16px",
                maxHeight: "16px",
              }}
              alt="Home team image"
            />
            <Flex
              alignItems={"center"}
              color={
                event.homeScore.total >= event.awayScore.total
                  ? "text.normal"
                  : "text.secondary"
              }
            >
              {event.homeTeam.name}
            </Flex>
          </Flex>

          <Box
            color={
              event.homeScore.total >= event.awayScore.total
                ? "text.normal"
                : "text.secondary"
            }
          >
            {event.homeScore.total}
          </Box>
        </Flex>

        <Flex justifyContent={"space-between"} w={"100%"}>
          <Flex gap={"0.5rem"}>
            <Image
              src={`/api/team/${event.awayTeam.id}/image`}
              width={16}
              height={16}
              style={{
                maxWidth: "16px",
                maxHeight: "16px",
              }}
              alt="Home team image"
            />
            <Flex
              alignItems={"center"}
              color={
                event.homeScore.total <= event.awayScore.total
                  ? "text.normal"
                  : "text.secondary"
              }
            >
              {event.awayTeam.name}
            </Flex>
          </Flex>

          <Box
            color={
              event.homeScore.total <= event.awayScore.total
                ? "text.normal"
                : "text.secondary"
            }
          >
            {event.awayScore.total}
          </Box>
        </Flex>
      </Flex>

      {favouriteBtn && <Box>{favouriteBtn}</Box>}
    </Flex>
  );
}
