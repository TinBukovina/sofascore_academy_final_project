import React from "react";
import { TournamentInterface } from "../types";
import { Box, Flex } from "../../../../styled-system/jsx";
import { useRouter } from "next/navigation";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { ImageBox } from "@/5_shared";
import { useSearch } from "@/3_features/search";

interface TournamentSearchCardProps {
  tournament: TournamentInterface;
}

export function TournamentSearchCard({
  tournament,
}: TournamentSearchCardProps) {
  const router = useRouter();

  const { setIsSearchDisplayed } = useSearch();

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      w={"175px"}
      h={"fit-content"}
      bg={"surface.s1"}
      border={"2px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      overflow={"hidden"}
      _hover={{
        borderColor: "primaryClr",
        color: "primaryClr",
        cursor: "pointer",
      }}
      onClick={() => {
        setIsSearchDisplayed(false);
        router.push(`/home/football/tournament/${tournament.id}`);
      }}
    >
      {/*TOP PART*/}
      <Flex
        position={"relative"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"0.75rem"}
        p={"1rem"}
        w={"100%"}
        minH={"140px"}
      >
        <Box position={"relative"}>
          <ImageBox
            initialSrc={`/api/tournament/${tournament.id}/image`}
            fallbackSrc="/images/imageFallback.svg"
            w="48px"
            h="48px"
          />
        </Box>

        <Box position={"absolute"} top={"0.75rem"} right={"0.5rem"}>
          <FavouriteToggleBtn whatToAdd="tournament" item={tournament} />
        </Box>

        <Box textAlign={"center"} fontSize={"md"}>
          {tournament.name}
        </Box>
      </Flex>
    </Flex>
  );
}
