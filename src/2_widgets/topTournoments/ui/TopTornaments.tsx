import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import Row from "./Row";
import { getTranslations } from "next-intl/server";
import { TournamentInterface } from "@/4_entities/tournament";

import { fetchFirstNTournamentsDataFromServer } from "@/app/api/_actions/fetchFirstNTournamentsFromServer";
import { AvailableSportsType } from "@/app/[locale]/home/[sportSlug]/page";

interface TopTournamentsProps {
  sportSlug?: AvailableSportsType;
}

export async function TopTornaments({ sportSlug }: TopTournamentsProps) {
  const tTornaments = await getTranslations("top_tournametns");

  let tournaments: TournamentInterface[] = [];
  try {
    tournaments = await fetchFirstNTournamentsDataFromServer(5);
  } catch (error) {
    console.error("Greška u TopTornaments pri dohvaćanju podataka:", error);
    return <Box display={"none"}></Box>;
  }

  if (!tournaments || tournaments.length === 0) {
    return <Box display={"none"}></Box>;
  }

  const filteredTournaments = tournaments.filter(
    (tournament) => tournament.sport.slug === sportSlug || !sportSlug
  );

  return (
    <Flex
      display={{ base: "none", sm: "flex" }}
      maxW={"230px"}
      w={{ base: "fit-content", lg: "100%" }}
      h={"fit-content"}
      direction={"column"}
      gap={"1rem"}
      p={"1rem 0.75rem"}
      bg={"surface.s1"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
    >
      <Box
        w={"100%"}
        textAlign={"center"}
        fontSize={"h6"}
        display={{
          base: "none",
          lg: "inline-block",
        }}
      >
        {tTornaments("title")}
      </Box>

      <Flex direction={"column"} gap={{ base: "1rem", lg: "0.75rem" }}>
        {filteredTournaments.map((tournament, i) => {
          if (!tournament) return <Box key={i} />;

          return (
            <Row
              sportSlug={sportSlug || "football"}
              tournoment={tournament}
              key={tournament?.id}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
