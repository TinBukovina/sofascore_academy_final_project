import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import Image from "next/image";
import { css } from "../../../../styled-system/css";
import { TournamentInterface } from "@/4_entities/event";

interface TournomentRowInfoInterface {
  tournament: TournamentInterface;
  favouriteBtn: React.ReactNode;
}

export function TournamentRowInfo({
  tournament,
  favouriteBtn,
}: TournomentRowInfoInterface) {
  return (
    <Flex
      p={"1rem 1rem"}
      gap={"1rem"}
      borderBottom={"1px solid token(colors.border)"}
    >
      <Image
        src={`/api/tournament/${tournament.id}/image`}
        width={32}
        height={32}
        style={{
          maxWidth: "32px",
          maxHeight: "32px",
        }}
        alt="tournoment logo"
      />
      <Flex direction={"column"} gap={"0.25rem"} w={"100%"} lineHeight={"1"}>
        <p>{tournament.name}</p>
        <p className={css({ fontSize: "sm", color: "text.secondary" })}>
          {tournament.country.name}
        </p>
      </Flex>
      {favouriteBtn && <Box>{favouriteBtn}</Box>}
    </Flex>
  );
}
