import { TopTornaments } from "@/2_widgets/topTournoments";
import FootballPageClient from "./footballPageClient";
import { Flex } from "@styled-system/jsx";
import { css } from "@styled-system/css";
import React from "react";
import BasketballPageClient from "./basketballPageClient";
import RugbyPageClient from "./rugbyPageClient";

export type AvailableSportsType =
  | "football"
  | "basketball"
  | "american-football";

interface PageProps {
  params: Promise<{ sportSlug: AvailableSportsType }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const sportSlug = resolvedParams.sportSlug;

  return (
    <Flex
      gap={"1rem"}
      p={"0"}
      w={"100%"}
      border={"1px solid transparent"}
      color={"text.normal"}
      overflow={"auto"}
      _focus={{
        outline: "none",
        border: "1px solid transparent",
        borderRadius: "md",
      }}
      className={css({
        "&::-webkit-scrollbar": {
          width: "0px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "table.scrollBar",
          borderRadius: "4px",
        },
      })}
    >
      {sportSlug === "football" ? (
        <FootballPageClient></FootballPageClient>
      ) : sportSlug === "basketball" ? (
        <BasketballPageClient></BasketballPageClient>
      ) : (
        <RugbyPageClient></RugbyPageClient>
      )}

      <TopTornaments sportSlug={sportSlug} />
    </Flex>
  );
}
