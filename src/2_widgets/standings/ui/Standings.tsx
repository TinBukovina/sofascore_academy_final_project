import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import Image from "next/image";
import { TournomentInterface } from "@/4_entities/event";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";

interface StandingsProps {
  tournoment: TournomentInterface;
}

export function Standings({ tournoment }: StandingsProps) {
  return (
    <Flex
      direction={"column"}
      w={"100%"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
    >
      <Box
        p={"1rem 1rem 0.5rem 1rem"}
        w={"100%"}
        color={"primaryClr"}
        fontSize={"h6"}
      >
        Standings
      </Box>

      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"0.5rem 1rem 1rem 1rem"}
        borderBottom={"1px solid transparent"}
        borderColor={"primaryClr"}
      >
        <Flex gap={"0.75rem"}>
          <Image
            src={`/api/tournoment/${tournoment.id}/image`}
            width={48}
            height={48}
            alt="tournoment logo"
          />
          <Flex direction={"column"} gap={"0.5rem"} lineHeight={1}>
            <Box>{tournoment.name}</Box>
            <Box fontSize={"sm"} color={"text.secondary"}>
              {tournoment.country.name}
            </Box>
          </Flex>
        </Flex>
        <FavouriteToggleBtn whatToAdd="tournoment" item={tournoment} />
      </Flex>
    </Flex>
  );
}
