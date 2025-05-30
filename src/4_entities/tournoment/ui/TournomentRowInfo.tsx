import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import Image from "next/image";
import { css } from "../../../../styled-system/css";
import { TournomentInterface } from "@/4_entities/event";

interface TournomentRowInfoInterface {
  tournoment: TournomentInterface;
  favouriteBtn: React.ReactNode;
}

export function TournomentRowInfo({
  tournoment,
  favouriteBtn,
}: TournomentRowInfoInterface) {
  return (
    <Flex
      p={"1rem 1rem"}
      gap={"1rem"}
      borderBottom={"1px solid token(colors.border)"}
    >
      <Image
        src={`/api/tournoment/${tournoment.id}/image`}
        width={32}
        height={32}
        style={{
          maxWidth: "32px",
          maxHeight: "32px",
        }}
        alt="tournoment logo"
      />
      <Flex direction={"column"} gap={"0.25rem"} w={"100%"} lineHeight={"1"}>
        <p>{tournoment.name}</p>
        <p className={css({ fontSize: "sm", color: "text.secondary" })}>
          {tournoment.country.name}
        </p>
      </Flex>
      {favouriteBtn && <Box>{favouriteBtn}</Box>}
    </Flex>
  );
}
