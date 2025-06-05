import { TopTornaments } from "@/2_widgets/topTournoments";
import FootballPageClient from "./footballPageClient";
import { Flex } from "@styled-system/jsx";
import { css } from "@styled-system/css";

export default function Page() {
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
      <FootballPageClient></FootballPageClient>
      <TopTornaments />
    </Flex>
  );
}
