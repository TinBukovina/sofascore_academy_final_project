"use client";

import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { TournamentInterface } from "../types";
import { ImageBox } from "@/5_shared";
import { useRouter } from "next/navigation";
import { getCountryISO2 } from "@/4_entities/player/lib/utils";

interface TournamentItemProps {
  tournament: TournamentInterface;
}

export function TournamentItem({ tournament }: TournamentItemProps) {
  const router = useRouter();

  return (
    <Flex
      justifyContent={"space-between"}
      p={"1rem"}
      w={"100%"}
      bg={"surface.s0"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      _hover={{
        bg: "surface.s1",
        borderColor: "primaryClr",
        cursor: "pointer",
      }}
      onClick={() => {
        router.push(
          `/home/${tournament.sport.slug}/tournament/${tournament.id}`
        );
      }}
    >
      <Flex alignItems={"center"} gap={"1rem"}>
        <ImageBox
          initialSrc={`/api/tournament/${tournament.id}/image`}
          fallbackSrc="/images/imageFallback.svg"
          w="48px"
          h="48px"
        />
        <Flex direction={"column"} gap={"0.75rem"} lineHeight={1}>
          <Box fontSize={"md"}>{tournament?.name}</Box>
          <Flex alignItems={"center"} gap={"0.5rem"}>
            <ImageBox
              initialSrc={`https://flagcdn.com/w80/${getCountryISO2(tournament.country.name)}.png`}
              fallbackSrc="/images/imageFallback.svg"
              w="16px"
              h="16px"
              styles={{ borderRadius: "100%" }}
            />
            <Box color={"text.secondary"} fontSize={"sm"}>
              {tournament?.country.name}
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <FavouriteToggleBtn whatToAdd="tournament" item={tournament} />
      </Flex>
    </Flex>
  );
}
