"use client";
import { SectionsType } from "@/app/favourites/page";
import { Box, Flex } from "../../../../styled-system/jsx";
import { FavouriteLink } from "./FavouriteLink";
import { css } from "../../../../styled-system/css";

interface FavouriteWidgetProps {
  children: React.ReactNode;
  activeWindow: SectionsType;
  setActiveWindow: React.Dispatch<React.SetStateAction<SectionsType>>;
}

export function FavouriteWidget({
  children,
  activeWindow,
  setActiveWindow,
}: FavouriteWidgetProps) {
  return (
    <Box
      border={"1px solid token(colors.border)"}
      borderRadius={"md"}
      overflow={"hidden"}
      p={"0.1rem"}
      w={"100%"}
      h={"fit-content"}
    >
      <Flex
        direction={"column"}
        bg={"surface.s0"}
        borderBottom={"1px solid token(colors.border)"}
      >
        <Box
          p={"0.5rem 1rem"}
          bg={"surface.s1"}
          fontSize={"h5"}
          color={"primaryClr"}
          borderBottom={"1px solid transparent"}
          borderColor={"border"}
        >
          Favourites
        </Box>
        <Flex
          p={"0.5rem 1rem"}
          gap={"2rem"}
          pb={"0.75rem"}
          borderBottom={"1px solid transparent"}
          borderColor={{ base: "transparent", md: "primaryClr" }}
          overflowY={"auto"}
          className={css({
            "&::-webkit-scrollbar": {
              height: "3px",
            },
            "&::-webkit-scrollbar-track": {
              //background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "primaryClr",
              borderRadius: "4px",
            },
          })}
        >
          <FavouriteLink
            isActive={activeWindow === "Events"}
            handleOnClick={() => setActiveWindow("Events")}
          >
            Events
          </FavouriteLink>
          <FavouriteLink
            isActive={activeWindow === "Teams"}
            handleOnClick={() => setActiveWindow("Teams")}
          >
            Teams
          </FavouriteLink>
          <FavouriteLink
            isActive={activeWindow === "Tournaments"}
            handleOnClick={() => setActiveWindow("Tournaments")}
          >
            Tournaments
          </FavouriteLink>
          <FavouriteLink
            isActive={activeWindow === "Players"}
            handleOnClick={() => setActiveWindow("Players")}
          >
            Players
          </FavouriteLink>
        </Flex>
      </Flex>
      <Box>{children}</Box>
    </Box>
  );
}
