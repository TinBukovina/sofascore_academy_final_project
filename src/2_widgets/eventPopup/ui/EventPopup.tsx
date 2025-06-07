import React, { useState } from "react";
import { Box, Flex } from "../../../../styled-system/jsx";

import {
  Button,
  closeSecondType400SvgInfo,
  closeSvgInfo,
  Icon,
} from "@/5_shared";
import { FavouriteToggleBtn } from "@/3_features/favourites/ui/FavouriteToggleBtn";
import { EventInterface } from "@/4_entities/event";
import { Hero } from "./Hero";
import { EventIncidents } from "./EventIncidents";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { AvailableSportsType } from "@/app/[locale]/home/[sportSlug]/page";

interface EventPopupProps {
  event: EventInterface;
  sportSlug: AvailableSportsType;
  colsePopup: () => void;
}

export function EventPopup({ event, colsePopup, sportSlug }: EventPopupProps) {
  const router = useRouter();

  const tEventPopup = useTranslations("event_popup");

  const [isShrinked, setIsShrinked] = useState<boolean>(false);

  console.log(sportSlug);
  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      position={"fixed"}
      right={"0"}
      bottom={"0"}
      direction={"column"}
      gap={"1rem"}
      p={"0.5rem"}
      w={"400px"}
      bg={"surface.s1"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderTopRadius={"md"}
      color={"text.normal"}
      fill={"text.normal"}
    >
      <Flex justifyContent={"space-between"}>
        <Flex gap={"0.5rem"}>
          <Box
            onClick={() => colsePopup()}
            cursor={"pointer"}
            _hover={{ fill: "primaryClr" }}
          >
            <Icon width="24px" height="24px" svgInfo={closeSvgInfo()} />
          </Box>
          <Box
            cursor={"pointer"}
            rotate={isShrinked ? "-90deg" : "90deg"}
            _hover={{ fill: "primaryClr" }}
            onClick={() => {
              setIsShrinked((prev) => !prev);
            }}
          >
            <Icon
              width="24px"
              height="24px"
              svgInfo={closeSecondType400SvgInfo()}
            />
          </Box>
        </Flex>
        <FavouriteToggleBtn whatToAdd="event" item={event} />
      </Flex>
      {!isShrinked ? (
        <>
          <Hero
            homeTeam={event.homeTeam}
            homeScore={event.homeScore}
            awayTeam={event.awayTeam}
            awayScore={event.awayScore}
          />
          <EventIncidents
            sportSlug={sportSlug}
            event={event}
            styles={{ maxHeight: "250px" }}
          />
          <Button
            handleOnClick={() => {
              console.log(
                "going to the page: " + `/home/${sportSlug}/event/${event.id}`
              );
              router.push(`/home/${sportSlug}/event/${event.id}`);
            }}
          >
            {tEventPopup("button")}
          </Button>
        </>
      ) : (
        <Box display={"none"} />
      )}
    </Flex>
  );
}
