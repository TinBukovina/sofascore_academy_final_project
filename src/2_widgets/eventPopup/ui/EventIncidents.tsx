"use client";

import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { EventInterface } from "@/4_entities/event";
import { useEventIncidents } from "@/4_entities/event/hooks/useEventIncidents";
import { css } from "../../../../styled-system/css";
import { EventIncidentRow } from "./EventIncidentRow";

import { useTranslations } from "next-intl";
import EventIncidentLoader from "./EventIncidentLoader";
import { BasketballIncicentRow } from "./BasketballIncidentRow";
import { RugbyIncidentRow } from "./RugyIncidentRow";

interface EventEventsProps {
  event: EventInterface;
  styles?: React.CSSProperties;
}

export function EventIncidents({ event, styles }: EventEventsProps) {
  const tEventIncidents = useTranslations("event_incidents");
  const tError = useTranslations("error");

  const { eventIncident, isLoading, isError, error } = useEventIncidents(
    event.id
  );

  if (isLoading) {
    return <EventIncidentLoader />;
  }

  if (isError) {
    console.log(error);
    return <Box>{tError("no_incidents_for_event")}</Box>;
  }

  if (!eventIncident || eventIncident.length <= 0) {
    return <Box>{tError("no_incidents_for_event")}</Box>;
  }

  const periodIncidents = eventIncident.filter((el) => el.text)?.toReversed();

  if (periodIncidents.length < 2) {
    return <Box>{tError("no_incidents_for_event")}</Box>;
  }

  const halfTimeObj = periodIncidents.at(0);
  const fullTimeObj = periodIncidents.at(1);

  if (!halfTimeObj || !fullTimeObj) {
    return <Box>{tError("no_incidents_for_event")}</Box>;
  }

  return (
    <Flex
      direction={"column"}
      gap={"0.75rem"}
      p={"0.5rem"}
      h={"fit-content"}
      bg={"surface.s0"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      color={"text.normal"}
      fill={"text.normal"}
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
      style={styles}
    >
      <Box p={"0 0.5rem"} pt={"0.75rem"}>
        {tEventIncidents("title")}
      </Box>
      <Flex direction={"column"} gap={"0.5rem"} p={"0.5rem"} fontSize={"sm"}>
        {periodIncidents.map((period, i) => {
          const periodWithStartTime = {
            ...period,
            startTime:
              i >= periodIncidents.length - 1 ? 0 : periodIncidents[i + 1].time,
          };

          return (
            <React.Fragment key={period.id}>
              <Flex gap={"0.5rem"} alignItems={"center"}>
                <Box w={"100%"} h={"2px"} bg={"border"}></Box>
                <Box minW={"fit-content"}>{period.text}</Box>
                <Box w={"100%"} h={"2px"} bg={"border"}></Box>
              </Flex>

              {eventIncident
                .filter(
                  (el) =>
                    el.time <= periodWithStartTime.time &&
                    el.time >= periodWithStartTime.startTime &&
                    !el.text
                )
                .sort((a, b) => b.time - a.time)
                .map((el) =>
                  event.tournament.sport.slug === "football" ? (
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
                  ) : event.tournament.sport.slug === "basketball" ? (
                    <BasketballIncicentRow
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
                  ) : (
                    <RugbyIncidentRow
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
                  )
                )}
            </React.Fragment>
          );
        })}
      </Flex>
    </Flex>
  );
}
