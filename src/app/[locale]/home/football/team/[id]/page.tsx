import React from "react";
import Image from "next/image";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { Standings } from "@/2_widgets/standings";
import { Players } from "@/2_widgets/players";
import { Box, Flex } from "@styled-system/jsx";
import TeamPageClient from "./teamPageClient";
import { getTeamByIdFromServer } from "@/app/api/_actions/getTeamByIdFromServer";
import { redirect } from "@/navigation";
import { getLocale } from "next-intl/server";
import { getTeamTournamentsFromServer } from "@/app/api/_actions/getTeamTournamentsFromServer";

interface PageProps {
  params: Promise<{ id: number }>;
}

export default async function Page({ params }: PageProps) {
  const teamId = (await params).id;

  const team = await getTeamByIdFromServer(teamId);
  const teamTournaments = await getTeamTournamentsFromServer(teamId);

  if (!team || !teamTournaments) {
    redirect({ href: "/error", locale: await getLocale() });
    return;
  }

  return (
    <Flex
      direction={"column"}
      gap={"1rem"}
      color={"text.normal"}
      fill={"text.normal"}
    >
      {/*HERO SECTION*/}
      <Flex
        justifyContent={"space-between"}
        p={"1rem"}
        w={"100%"}
        bg={"surface.s1"}
        border={"1px solid transparent"}
        borderColor={"primaryClr"}
        borderRadius={"md"}
      >
        <Flex alignItems={"center"} gap={"0.5rem"}>
          <Image
            src={`/api/team/${team.id}/image`}
            width={64}
            height={64}
            alt="tournament image"
          />
          <Flex direction={"column"} gap={"0.5rem"} lineHeight={1}>
            <Box fontSize={"h5"}>{team.name}</Box>
            <Box color={"text.secondary"}>{team.country.name}</Box>
          </Flex>
        </Flex>
        <Flex>
          <FavouriteToggleBtn whatToAdd="team" item={team} />
        </Flex>
      </Flex>
      {/*CONTENT*/}
      <TeamPageClient params={params} team={team}>
        {teamTournaments.length <= 0 ? (
          <Box display={"none"}></Box>
        ) : (
          <Standings
            tournament={teamTournaments.at(0)!}
            homeTeamId={team.id}
            disableHeroLink={false}
          />
        )}
        <Players teamId={team.id} />
      </TeamPageClient>
    </Flex>
  );
}
