"use client";

import React from "react";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { ImageBox } from "@/5_shared";
import { useRouter } from "next/navigation";
import { getCountryISO2 } from "@/4_entities/player/lib/utils";
import { TeamInterface } from "../../types";
import { Box, Flex } from "../../../../../styled-system/jsx";
import { AvailableSportsType } from "@/app/[locale]/home/[sportSlug]/page";

interface TeamItemProp {
  team: TeamInterface;
  sportSlug: AvailableSportsType;
}

export function TeamItem({ team, sportSlug }: TeamItemProp) {
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
        router.push(`/home/${sportSlug}/team/${team.id}`);
      }}
    >
      <Flex alignItems={"center"} gap={"1rem"}>
        <ImageBox
          initialSrc={`/api/team/${team.id}/image`}
          fallbackSrc="/images/imageFallback.svg"
          w="48px"
          h="48px"
        />
        <Flex direction={"column"} gap={"0.75rem"} lineHeight={1}>
          <Box fontSize={"md"}>{team?.name}</Box>
          <Flex alignItems={"center"} gap={"0.5rem"}>
            <ImageBox
              initialSrc={`https://flagcdn.com/w80/${getCountryISO2(team.country.name)}.png`}
              fallbackSrc="/images/imageFallback.svg"
              w="16px"
              h="16px"
              styles={{ borderRadius: "100%" }}
            />
            <Box color={"text.secondary"} fontSize={"sm"}>
              {team?.country.name}
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <FavouriteToggleBtn whatToAdd="team" item={team} />
      </Flex>
    </Flex>
  );
}
