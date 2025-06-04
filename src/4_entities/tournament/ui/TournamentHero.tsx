import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { TournamentInterface } from "../types";
import { ImageBox } from "@/5_shared";

interface TournamentHeroProps {
  tournament: TournamentInterface;
}

export function TournamentHero({ tournament }: TournamentHeroProps) {
  return (
    <Flex
      justifyContent={"space-between"}
      p={"1rem"}
      w={"100%"}
      bg={"surface.s1"}
      border={"1px solid transparent"}
      borderColor={"primaryClr"}
      borderRadius={"md"}
    >
      <Flex alignItems={"center"} gap={"0.75rem"}>
        <ImageBox
          initialSrc={`/api/tournament/${tournament.id}/image`}
          fallbackSrc="/images/imageFallback.svg"
          w="64px"
          h="64px"
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
  );
}
