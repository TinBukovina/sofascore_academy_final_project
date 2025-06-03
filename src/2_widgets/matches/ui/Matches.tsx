import React, { ReactNode } from "react";
import { Flex } from "../../../../styled-system/jsx";
import {
  TournamentInterface,
  TournamentRowInfo,
} from "@/4_entities/tournament";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";

interface MatchesProps {
  children: ReactNode;
  tournament: TournamentInterface;
  styles?: React.CSSProperties;
}

export function Matches({ children, tournament, styles }: MatchesProps) {
  return (
    <Flex
      direction={"column"}
      w={"100%"}
      h={"fit-content"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      overflow={"hidden"}
      style={styles}
    >
      <TournamentRowInfo
        tournament={tournament}
        disableLink={true}
        favouriteBtn={
          <FavouriteToggleBtn whatToAdd="tournament" item={tournament} />
        }
      />
      {children}
    </Flex>
  );
}
