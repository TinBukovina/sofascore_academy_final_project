import React from "react";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import Image from "next/image";
import { Standings } from "@/2_widgets/standings";
import { EventIncidents } from "@/2_widgets/eventPopup/ui/EventIncidents";
import { Box, Flex } from "@styled-system/jsx";
import { getLocale, getTranslations } from "next-intl/server";
import { getEventByIdWithServer } from "@/app/api/_actions/getEventByIdFromServer";
import { redirect } from "@/navigation";

interface PageProps {
  params: Promise<{
    id: number;
    sportSlug: "football" | "basketball" | "rugby";
  }>;
  status?: string;
}

export default async function Page({ params, status = "Finished" }: PageProps) {
  const resolvedParams = await params;
  const eventId = resolvedParams.id;
  const sportSlug = resolvedParams.sportSlug;

  const tEventPage = await getTranslations("event_page");

  const event = await getEventByIdWithServer(eventId);

  if (!event) {
    redirect({ href: "/error", locale: await getLocale() });
    return <Box display={"none"}></Box>;
  }

  return (
    <Flex direction={"column"} color={"text.normal"} gap={"1rem"}>
      <Flex
        position={"relative"}
        bg={"surface.s1"}
        border={"1px solid transparent"}
        borderColor={"primaryClr"}
        borderRadius={"md"}
        justifyContent={"center"}
        gap={"1rem"}
        p={"0.5rem"}
        color={"primaryClr"}
        fill={"primaryClr"}
        fontSize={"md"}
      >
        <Flex
          direction={"column"}
          w={"fit-content"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"0.5rem"}
          p={"0.5rem"}
          minW={"80px"}
        >
          <Box position={"absolute"} left={"0.5rem"} top={"0.5rem"}>
            <FavouriteToggleBtn whatToAdd="team" item={event.homeTeam} />
          </Box>
          <Image
            src={`/api/team/${event.homeTeam.id}/image`}
            width={48}
            height={48}
            alt="home team"
          />
          <Box>{event.homeTeam.name}</Box>
        </Flex>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          w={"fit-content"}
          color={"text.normal"}
          fontWeight={"bold"}
        >
          <Box>
            <Box
              display={"inline-block"}
              color={
                event.homeScore.total < event.awayScore.total
                  ? "text.secondary"
                  : "inherit"
              }
            >
              {event.homeScore.total}
            </Box>
            <span> - </span>
            <Box
              display={"inline-block"}
              color={
                event.awayScore.total < event.homeScore.total
                  ? "text.secondary"
                  : "inherit"
              }
            >
              {event.awayScore.total}
            </Box>
          </Box>
          <Box fontWeight={"normal"} fontSize={"xs"}>
            {status === "Finished" ? tEventPage("event_status_finished") : "x"}
          </Box>
        </Flex>
        <Flex
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"0.5rem"}
          p={"0.5rem"}
          minW={"80px"}
        >
          <Box position={"absolute"} right={"0.5rem"} top={"0.5rem"}>
            <FavouriteToggleBtn whatToAdd="team" item={event.awayTeam} />
          </Box>
          <Image
            src={`/api/team/${event.awayTeam.id}/image`}
            width={48}
            height={48}
            alt="home team"
          />
          <Box>{event.awayTeam.name}</Box>
        </Flex>
      </Flex>
      <Flex direction={{ base: "column-reverse", md: "row" }} gap={"1rem"}>
        <Box flex={2}>
          <Standings
            tournament={event.tournament}
            homeTeamId={event.homeTeam.id}
            awayTeamId={event.awayTeam.id}
            sportSlug={sportSlug}
          />
        </Box>
        <Box flex={1}>
          <EventIncidents
            sportSlug={sportSlug}
            event={event}
            styles={{ maxHeight: "640px" }}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
