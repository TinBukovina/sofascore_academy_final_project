"use client";

import { ChangeEventsRow, Matches, MatchesEvents } from "@/2_widgets/matches";
import {
  TeamInterface,
  useTeamEvents,
  useTeamTournaments,
} from "@/4_entities/team";
import { useWindowWidth } from "@/5_shared/lib/hooks/useWindowWidth";
import { redirect } from "@/navigation";
import { css } from "@styled-system/css";
import { Box, Center, Flex } from "@styled-system/jsx";
import { useLocale } from "next-intl";
import React, { ReactNode, useState } from "react";
import { AvailableSportsType } from "../../page";

interface TeamPageClientProps {
  children: ReactNode;
  params: Promise<{ sportSlug: AvailableSportsType; id: number }>;
  team: TeamInterface;
}

export default function TeamPageClient({
  children,
  params,
  team,
}: TeamPageClientProps) {
  const resolvedParams = React.use(params);
  const teamId = resolvedParams.id;
  const locale = useLocale();

  const windowWidth = useWindowWidth();

  const [fetchedPage, setFetchedPage] = useState<number>(0);

  const {
    teamTournaments,
    isLoading: isLoadingTournaments,
    isError: isErrorTournaments,
    error: errorTournaments,
  } = useTeamTournaments(teamId);

  const { teamEvents, isLoading: isLoadingTeamEvents } = useTeamEvents(
    team?.id,
    fetchedPage
  );

  if (isLoadingTournaments || isLoadingTeamEvents) {
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
  }

  if (isErrorTournaments) {
    console.log(errorTournaments);
    redirect({ href: "/error", locale: locale });
    return;
  }

  if (!team) {
    return <Center>There is no team with that ID.</Center>;
  }

  if (!teamTournaments || teamTournaments.length <= 0) {
    return <Center>There is no team tournamets for this team.</Center>;
  }

  const tournament = teamTournaments.at(0);

  if (!tournament || !teamEvents) {
    return <Center>There is no team tournamets for this team.</Center>;
  }
  return (
    <Flex direction={windowWidth < 1050 ? "column" : "row"} gap={"1rem"}>
      <Flex
        flex={windowWidth < 1050 ? "usnet" : "7"}
        direction={"column"}
        gap={"1rem"}
        h={"fit-content"}
      >
        {children}
      </Flex>

      <Matches tournament={tournament} styles={{ flex: "4" }}>
        <ChangeEventsRow
          text={teamEvents ? "Played" : "Finished"}
          handleLeftBtnClick={() => {
            setFetchedPage((prev) => prev + 1);
          }}
          handleRightBtnClick={() => {
            setFetchedPage((prev) => prev - 1);
          }}
        />
        <MatchesEvents
          events={teamEvents}
          windowType={windowWidth < 1050 ? "normal" : "small"}
        />
      </Matches>
    </Flex>
  );
}
