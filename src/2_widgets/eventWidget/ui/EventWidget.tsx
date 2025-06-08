"use client";

import {
  IconButton,
  leftShortArrow400SvgInfo,
  rightShortArrow400SvgInfo,
} from "@/5_shared";
import { Box, Flex } from "../../../../styled-system/jsx";
import { EventWidgetLink } from "./EventWidgetLink";
import { MyDateInput } from "./DateInput";
import { useTranslations } from "next-intl";

interface EventWidgetProps {
  children: React.ReactNode;
  currentDate: string;
  handleDateChange: (date: string) => void;
  handleNextDay: () => void;
  handlePrevDay: () => void;
  activeWindow: "all" | "favourites";
  setActiveWindow: React.Dispatch<React.SetStateAction<"all" | "favourites">>;
}

export function EventWidget({
  children,
  currentDate,
  handleDateChange,
  handleNextDay,
  handlePrevDay,
  activeWindow,
  setActiveWindow,
}: EventWidgetProps) {
  const tEventWidget = useTranslations("event_widget");

  return (
    <Box
      border={"1px solid token(colors.border)"}
      borderRadius={"md"}
      overflow={"hidden"}
      w={"100%"}
      h={"fit-content"}
    >
      <Flex
        direction={"column"}
        bg={"surface.s1"}
        borderBottom={"1px solid token(colors.border)"}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          p={{ base: "0.5rem", md: "1rem" }}
          fill={"text.normal"}
        >
          <IconButton
            handleOnClick={handlePrevDay}
            svgInfo={leftShortArrow400SvgInfo()}
            svgW="24px"
            svgH="24px"
            aria-label="Previous day"
          />
          <MyDateInput
            initialDate={currentDate}
            onDateChange={handleDateChange}
            fontSize={"h5"}
          />
          <IconButton
            handleOnClick={handleNextDay}
            svgInfo={rightShortArrow400SvgInfo()}
            svgW="24px"
            svgH="24px"
            aria-label="Next day"
          />
        </Flex>
        <Flex p={"0rem 1rem"} gap={"2rem"} pb={"0.75rem"}>
          <EventWidgetLink
            isActive={activeWindow === "all"}
            handleOnClick={() => setActiveWindow("all")}
          >
            {tEventWidget("all")}
          </EventWidgetLink>
          <EventWidgetLink
            isActive={activeWindow === "favourites"}
            handleOnClick={() => setActiveWindow("favourites")}
          >
            {tEventWidget("favourite")}
          </EventWidgetLink>
        </Flex>
      </Flex>
      <Box overflowY="auto">{children}</Box>
    </Box>
  );
}
