"use client";

import { useFavourites } from "@/3_features/favourites";
import ApiSearchComponent from "@/3_features/search/ui/ApiSearchComponent";
import { SearchComponent } from "@/3_features/search/ui/SearchComponent";
import { PlayerSearchCard } from "@/4_entities/player";
import { TeamSearchCard } from "@/4_entities/team";
import { TournamentSearchCard } from "@/4_entities/tournament";
import { bookmark400SvgInfo, bookmarkFill300SvgInfo, Icon } from "@/5_shared";
import { css } from "@styled-system/css";
import { Box, Flex } from "@styled-system/jsx";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Page() {
  const tSearch = useTranslations("search");

  const { favouritePlayers, favouriteTeams, favouriteTournaments } =
    useFavourites();

  const [searchMode, setSearchMode] = useState<"favourite" | "normal">(
    "favourite"
  );
  const [isModeBtnHovered, setIsModeBtnHovered] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  let filteredTeams = favouriteTeams;
  let filteredTournaments = favouriteTournaments;
  let filteredPlayers = favouritePlayers;

  if (searchMode === "favourite") {
    filteredTeams = filteredTeams.filter((team) =>
      team.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    filteredTournaments = filteredTournaments.filter((tournament) =>
      tournament.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    filteredPlayers = filteredPlayers.filter((player) =>
      player.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else {
  }

  return (
    <Flex
      direction={"column"}
      gap={"1rem"}
      color={"text.normal"}
      fill={"text.normal"}
    >
      <Flex
        alignItems={"center"}
        gap={"1rem"}
        color={"primaryClr"}
        fill={"primaryClr"}
      >
        <SearchComponent value={searchValue} setValue={setSearchValue} />
        <Box
          onClick={() => {
            setSearchMode((prev) => {
              if (prev === "normal") return "favourite";
              else return "normal";
            });
          }}
          onMouseEnter={() => setIsModeBtnHovered(true)}
          onMouseLeave={() => setIsModeBtnHovered(false)}
          _hover={{
            cursor: "pointer",
          }}
        >
          <Icon
            svgInfo={
              isModeBtnHovered || searchMode === "favourite"
                ? bookmarkFill300SvgInfo()
                : bookmark400SvgInfo()
            }
            width="32px"
            height="32px"
          />
        </Box>
      </Flex>
      {searchMode === "normal" ? (
        <ApiSearchComponent searchValue={searchValue} />
      ) : (
        <Flex direction={"column"} gap={"1rem"}>
          {/*TEAMS*/}
          {filteredTeams.length > 0 ? (
            <Flex
              direction={"column"}
              gap={"0.5rem"}
              pb={"0.25rem"}
              overflow={"auto"}
              className={css({
                "&::-webkit-scrollbar": {
                  height: "3px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "primaryClr",
                  borderRadius: "4px",
                },
              })}
            >
              <Box>{tSearch("teams")}</Box>
              <Flex gap={"1rem"} w={"fit-content"}>
                {filteredTeams.map((team) => (
                  <TeamSearchCard key={team.id} team={team} />
                ))}
              </Flex>
            </Flex>
          ) : (
            <Box display={"none"} />
          )}
          {/*TOURNAMENTS*/}
          {filteredTournaments.length > 0 ? (
            <Flex
              direction={"column"}
              gap={"0.5rem"}
              pb={"0.25rem"}
              overflow={"auto"}
              className={css({
                "&::-webkit-scrollbar": {
                  height: "3px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "primaryClr",
                  borderRadius: "4px",
                },
              })}
            >
              <Box>{tSearch("tournaments")}</Box>
              <Flex gap={"1rem"} w={"fit-content"}>
                {filteredTournaments.map((tournament) => (
                  <TournamentSearchCard
                    key={tournament.id}
                    tournament={tournament}
                  />
                ))}
              </Flex>
            </Flex>
          ) : (
            <Box display={"none"} />
          )}
          {/*Players*/}
          {filteredPlayers.length > 0 ? (
            <Flex
              direction={"column"}
              gap={"0.5rem"}
              pb={"0.25rem"}
              overflow={"auto"}
              className={css({
                "&::-webkit-scrollbar": {
                  height: "3px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "primaryClr",
                  borderRadius: "4px",
                },
              })}
            >
              <Box>{tSearch("players")}</Box>
              <Flex gap={"1rem"} w={"fit-content"}>
                {filteredPlayers.map((player) => (
                  <PlayerSearchCard key={player.id} player={player} />
                ))}
              </Flex>
            </Flex>
          ) : (
            <Box display={"none"}></Box>
          )}
        </Flex>
      )}
    </Flex>
  );
}
