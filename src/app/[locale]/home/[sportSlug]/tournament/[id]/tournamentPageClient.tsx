"use client";

import { ChangeEventsRow, Matches, MatchesEvents } from "@/2_widgets/matches";
import {
  TournamentInterface,
  useTournamentEvents,
} from "@/4_entities/tournament";
import { useWindowWidth } from "@/5_shared/lib/hooks/useWindowWidth";
import { redirect } from "@/navigation";
import { css } from "@styled-system/css";
import { Box, Center, Flex } from "@styled-system/jsx";
import { useLocale } from "next-intl";
import React, { ReactNode, useState } from "react";
import { AvailableSportsType } from "../../page";

interface TournamentPageClientProps {
  params: Promise<{ sportSlug: AvailableSportsType; id: number }>;
  children: ReactNode;
  tournament: TournamentInterface;
}

export default function TournamentPageClient({
  params,
  children,
  tournament,
}: TournamentPageClientProps) {
  const resolvedParams = React.use(params);
  const tournamentId = resolvedParams.id;
  const locale = useLocale();

  const windowWidth = useWindowWidth();

  const [fetchedPage, setFetchedPage] = useState<number>(0);

  const {
    tournamentEvents,
    isLoading: isLoadingTournamentsEvents,
    isError: isErrorTournamentEvents,
    error: errorTrournaentEvents,
  } = useTournamentEvents(tournamentId, fetchedPage);

  if (isLoadingTournamentsEvents)
    return (
      <Flex direction={windowWidth < 1050 ? "column" : "row"} gap={"1rem"}>
        <Box flex={windowWidth < 1050 ? "unset" : "7"} h={"fit-content"}>
          {children}
        </Box>
        <Box
          flex={"4"}
          maxH={"600px"}
          w={"100%"}
          h={"fit-content"}
          bg={"surface.s0"}
          border={"1px solid transparent"}
          borderColor={"border"}
          borderRadius={"md"}
          overflow={"hidden"}
        >
          <Box
            w={"100%"}
            h={"102px"}
            borderBottom={"1px solid transparent"}
            borderColor={"primaryClr"}
          ></Box>
          <Flex direction={"column"} gap={"0.75rem"} p={"1rem"}>
            {[...Array(9)].map((_, i) => (
              <Box
                key={i}
                h={"24px"}
                w={"100%"}
                borderRadius={"sm"}
                className={css({
                  backgroundColor: "surface.s1",
                  position: "relative",
                  overflow: "hidden",
                  _before: {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `linear-gradient(
                          90deg,
                          transparent 25%,
                          token(colors.surface.s0) 50%,
                          transparent 75%
                        )`,
                    animationName: "shimmerSlide",
                    animationDuration: "1.5s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "linear",
                  },
                })}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    );

  if (isErrorTournamentEvents) {
    console.log(errorTrournaentEvents);
    redirect({ href: "/error", locale: locale });
    return;
  }

  if (!tournament) {
    redirect({ href: "/error", locale: locale });
    return;
  }

  if (!tournamentEvents) {
    return <Center>There is no events for this tournament.</Center>;
  }

  return (
    <Flex direction={windowWidth < 1050 ? "column" : "row"} gap={"1rem"}>
      {/*STANDINGS*/}
      <Box flex={windowWidth < 1050 ? "unset" : "7"} h={"fit-content"}>
        {children}
      </Box>
      {/*TOURNAMENT MATCHES*/}
      <Matches tournament={tournament} styles={{ flex: "4" }}>
        <ChangeEventsRow
          text={tournamentEvents ? "Played" : "Finished"}
          handleLeftBtnClick={() => {
            setFetchedPage((prev) => prev + 1);
          }}
          handleRightBtnClick={() => {
            setFetchedPage((prev) => prev - 1);
          }}
        />
        <MatchesEvents
          windowType={windowWidth < 1050 ? "normal" : "small"}
          events={tournamentEvents}
        />
      </Matches>
    </Flex>
  );
}
