"use client";

import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import Image from "next/image";
import { TournamentInterface } from "@/4_entities/tournament";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { useRouter } from "@/navigation";

interface RowProps {
  tournoment: TournamentInterface;
}
export default function Row({ tournoment }: RowProps) {
  const router = useRouter();

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={{ base: "fit-content", lg: "100%" }}
      fontSize={"15px"}
      onClick={() => router.push(`/home/football/tournament/${tournoment.id}`)}
      _hover={{
        color: "primaryClr",
        cursor: "pointer",
      }}
    >
      <Flex alignItems={"center"} gap={"0.5rem"}>
        <Image
          src={`/api/tournament/${tournoment.id}/image`}
          width={24}
          height={24}
          alt="Tournoment image"
          style={{ objectFit: "cover" }}
        />
        <Box
          display={{
            base: "none",
            lg: "inline-block",
          }}
        >
          {tournoment.name}
        </Box>
      </Flex>
      <Box
        display={{
          base: "none",
          lg: "inline-block",
        }}
      >
        <FavouriteToggleBtn whatToAdd="tournament" item={tournoment} />
      </Box>
    </Flex>
  );
}
