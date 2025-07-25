import React, { useState } from "react";
import { PlayerInterface } from "../types";
import { Box, Flex } from "../../../../styled-system/jsx";
import Image from "next/image";
import { getCountryISO2 } from "../lib/utils";
import { useRouter } from "next/navigation";
import { FavouriteToggleBtn } from "@/3_features/favourites";
import { AvailableSportsType } from "@/app/[locale]/home/[sportSlug]/page";

interface PlayerCardProps {
  player: PlayerInterface;
  sportSlug: AvailableSportsType;
}

export function PlayerCard({ player, sportSlug }: PlayerCardProps) {
  const router = useRouter();

  const inistialPlayerSrc = `/api/player/${player.id}/image`;
  const fallbackAvatarSrc = `/images/avatar.png`;

  const initialCountrySrc = `https://flagcdn.com/w80/${getCountryISO2(player.country.name)}.png`;
  const fallbackCountrySrc = "/images/imageFallback.svg";

  const [playerImgSrc, setPlayerImgSrc] = useState(inistialPlayerSrc);
  const [countryImgSrc, setCountryImgSrc] = useState(initialCountrySrc);

  const handlePlayerImageError = () => {
    if (playerImgSrc !== fallbackAvatarSrc) {
      setPlayerImgSrc(fallbackAvatarSrc);
    }
  };

  const handleCountryImageError = () => {
    if (countryImgSrc !== fallbackCountrySrc) {
      setCountryImgSrc(fallbackCountrySrc);
    }
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      w={"155px"}
      h={"fit-content"}
      bg={"surface.s0"}
      border={"2px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      overflow={"hidden"}
      _hover={{
        bg: "surface.s1",
        cursor: "pointer",
      }}
      onClick={() => {
        router.push(`/home/${sportSlug}/player/${player.id}`);
      }}
    >
      {/*TOP PART*/}
      <Flex
        position={"relative"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"0.75rem"}
        p={"0.5rem 1rem"}
        w={"100%"}
        h={"150px"}
        bg={"transparent"}
      >
        <Box position={"relative"}>
          <Box
            position={"relative"}
            w={"64px"}
            h={"64px"}
            borderRadius={"100%"}
            border={"2px solid transparent"}
            borderColor={"primaryClr"}
            overflow={"hidden"}
          >
            <Image
              key={player.id}
              fill
              src={playerImgSrc}
              alt="player image"
              onError={handlePlayerImageError}
              sizes="64px"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Flex
            position={"absolute"}
            bottom={"0"}
            right={"0"}
            justifyContent={"center"}
            align={"center"}
            w={"24px"}
            h={"24px"}
            bg={"surface.s1"}
            border={"2px solid transparent"}
            borderColor={"primaryClr"}
            borderRadius={"100%"}
            color={"primaryClr"}
            fontSize={"md"}
            fontWeight={"bold"}
            zIndex={10}
          >
            7
          </Flex>
        </Box>

        <Box position={"absolute"} top={"0.75rem"} right={"0.5rem"}>
          <FavouriteToggleBtn whatToAdd="player" item={player} />
        </Box>

        <Box textAlign={"center"} fontSize={"sm"}>
          {player.name}
        </Box>
      </Flex>
      {/*BOTTOM PART*/}
      <Flex
        p={"0.5rem 0.75rem"}
        w={"100%"}
        bg={"surface.s1"}
        borderTop={"1px solid transparent"}
        borderColor={"primaryClr"}
        justifyContent={"space-between"}
      >
        {/*PLAYER POSITION*/}
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          p={"0.25rem 0.5rem"}
          w={"24px"}
          bg={"border"}
          borderRadius={"sm"}
          fontSize={"xs"}
          fontWeight={"bold"}
        >
          {player.position}
        </Flex>
        {/*PLAYER COUNTRY*/}
        <Flex alignItems={"center"} gap={"0.5rem"}>
          <Box
            position={"relative"}
            w={"24px"}
            h={"24px"}
            borderRadius={"100%"}
            overflow={"hidden"}
          >
            <Image
              fill
              src={countryImgSrc}
              alt="player image"
              onError={handleCountryImageError}
              sizes="24px"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Box>{getCountryISO2(player.country.name, true)?.toUpperCase()}</Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
