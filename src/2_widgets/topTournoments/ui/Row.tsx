import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import Image from "next/image";
import { TournomentInterface } from "@/4_entities/event";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";

interface RowProps {
  tournoment: TournomentInterface;
}
export default function Row({ tournoment }: RowProps) {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={{ base: "fit-content", lg: "100%" }}
    >
      <Flex alignItems={"center"} gap={"0.5rem"}>
        <Image
          src={`/api/tournoment/${tournoment.id}/image`}
          width={32}
          height={32}
          alt="Tournoment image"
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
        <FavouriteToggleBtn whatToAdd="tournoment" item={tournoment} />
      </Box>
    </Flex>
  );
}
