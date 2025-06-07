"use client";

import React, { useState } from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { SearchComponent } from "./SearchComponent";
import { useTranslations } from "next-intl";
import { PlayerSearchCard } from "@/4_entities/player";
import { useFavourites } from "@/3_features/favourites";
import { css } from "@styled-system/css";
import { TeamSearchCard } from "@/4_entities/team";
import { TournamentSearchCard } from "@/4_entities/tournament";
import { bookmark400SvgInfo, bookmarkFill300SvgInfo, Icon } from "@/5_shared";
import { Modal } from "@/5_shared/ui/Modal";
import ApiSearchComponent from "./ApiSearchComponent";

interface SearchWindowProp {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchWindow({ isOpen, onClose }: SearchWindowProp) {
  const tSearch = useTranslations("search");

  const { favouritePlayers, favouriteTeams, favouriteTournaments } =
    useFavourites();

  const [searchMode, setSearchMode] = useState<"favourite" | "normal">(
    "favourite"
  );
  const [isModeBtnHovered, setIsModeBtnHovered] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  if (!isOpen) {
    return null;
  }

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
    <Modal
      title={"Search"}
      isOpen={isOpen}
      onClose={onClose}
      mw="600px"
      mh="520px"
      h="520px"
    >
      <Flex direction={"column"} gap={"1rem"}>
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
                    <TeamSearchCard
                      key={team.id}
                      team={team}
                      sportSlug={"football"}
                    />
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
                      sportSlug={"football"}
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
                    <PlayerSearchCard
                      key={player.id}
                      player={player}
                      sportSlug={"football"}
                    />
                  ))}
                </Flex>
              </Flex>
            ) : (
              <Box display={"none"}></Box>
            )}
          </Flex>
        )}
      </Flex>
    </Modal>
  );
}
