"use client";

import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { EventInterface } from "@/4_entities/event";
import { useEventIncidents } from "@/4_entities/event/hooks/useEventIncidents";
import SpinnerLoader from "@/app/Loader";
import { css } from "../../../../styled-system/css";
import { EventIncidentRow } from "./EventIncidentRow";

interface EventEventsProps {
  event: EventInterface;
}

export function EventIncidents({ event }: EventEventsProps) {
  const { eventIncident, isLoading, isError, error } = useEventIncidents(
    event.id
  );

  if (isLoading) {
    return (
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        minH={"120px"}
      >
        <SpinnerLoader />
      </Flex>
    );
  }

  if (isError) {
    console.log(error);
    return <Box>There was a error while getting incidents.</Box>;
  }

  if (!eventIncident || eventIncident.length <= 0) {
    return <Box>There is no incidents for this event.</Box>;
  }

  const periodIncidents = eventIncident.filter((el) => el.text);

  if (periodIncidents.length < 2) {
    return <Box>There is no incidents for this event.</Box>;
  }

  const halfTimeObj = periodIncidents.at(0);
  const fullTimeObj = periodIncidents.at(1);

  if (!halfTimeObj || !fullTimeObj) {
    return <Box>There is no incidents for this event.</Box>;
  }

  const firstHalfIncidents = eventIncident.filter(
    (el) => el.time <= halfTimeObj.time && !el.text
  );
  const secondHalfIncidetns = eventIncident.filter(
    (el) => el.time > halfTimeObj.time && !el.text
  );
  return (
    <Flex
      direction={"column"}
      gap={"0.75rem"}
      p={"0.5rem"}
      maxH={"250px"}
      bg={"surface.s0"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      overflow={"auto"}
      className={css({
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "table.scrollBar",
          borderRadius: "4px",
        },
      })}
    >
      <Box>Events</Box>
      <Flex direction={"column"} gap={"0.5rem"} p={"0.5rem"} fontSize={"sm"}>
        <Flex gap={"0.5rem"} alignItems={"center"}>
          <Box w={"100%"} h={"2px"} bg={"border"}></Box>
          <Box minW={"fit-content"}>{fullTimeObj.text}</Box>
          <Box w={"100%"} h={"2px"} bg={"border"}></Box>
        </Flex>

        {secondHalfIncidetns
          .sort((a, b) => b.time - a.time)
          .map((el) => (
            <EventIncidentRow
              key={el.id}
              incident={el}
              type={
                !!el.teamSide
                  ? el.teamSide === "home"
                    ? "home"
                    : "away"
                  : !!el.scoringTeam
                    ? el.scoringTeam === "home"
                      ? "home"
                      : "away"
                    : "home"
              }
            />
          ))}

        <Flex gap={"0.5rem"} alignItems={"center"}>
          <Box w={"100%"} h={"2px"} bg={"border"}></Box>
          <Box minW={"fit-content"}>{halfTimeObj.text}</Box>
          <Box w={"100%"} h={"2px"} bg={"border"}></Box>
        </Flex>

        {firstHalfIncidents
          .sort((a, b) => b.time - a.time)
          .map((el) => (
            <EventIncidentRow
              key={el.id}
              incident={el}
              type={
                !!el.teamSide
                  ? el.teamSide === "home"
                    ? "home"
                    : "away"
                  : !!el.scoringTeam
                    ? el.scoringTeam === "home"
                      ? "home"
                      : "away"
                    : "home"
              }
            />
          ))}
      </Flex>
    </Flex>
  );
}
