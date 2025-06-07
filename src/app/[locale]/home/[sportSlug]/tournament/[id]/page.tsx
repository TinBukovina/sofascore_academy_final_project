import React from "react";
import Image from "next/image";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { Box, Flex } from "@styled-system/jsx";
import { getTournamentByIdFromServer } from "@/app/api/_actions/getTournamentByIdFromServer";
import { redirect } from "@/navigation";
import { getLocale } from "next-intl/server";
import TournamentPageClient from "./tournamentPageClient";
import { Standings } from "@/2_widgets/standings";
import { AvailableSportsType } from "../../page";

interface PageProps {
  params: Promise<{ sportSlug: AvailableSportsType; id: number }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const tournamentId = resolvedParams.id;
  const sportSlug = resolvedParams.sportSlug;
  const locale = await getLocale();

  const tournament = await getTournamentByIdFromServer(tournamentId);

  if (!tournament) {
    redirect({ href: "/error", locale });
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
            src={`/api/tournament/${tournament?.id}/image`}
            width={64}
            height={64}
            alt="tournament image"
          />
          <Flex direction={"column"} gap={"0.5rem"} lineHeight={1}>
            <Box fontSize={"h5"}>{tournament?.name}</Box>
            <Box color={"text.secondary"}>{tournament?.country.name}</Box>
          </Flex>
        </Flex>
        <Flex>
          <FavouriteToggleBtn whatToAdd="tournament" item={tournament} />
        </Flex>
      </Flex>
      <TournamentPageClient tournament={tournament} params={params}>
        <Standings
          sportSlug={sportSlug}
          tournament={tournament}
          disableHeroLink={true}
        />
      </TournamentPageClient>
    </Flex>
  );
}
