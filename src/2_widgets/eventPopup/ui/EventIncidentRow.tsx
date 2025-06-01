import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { IncidentsInterface } from "@/4_entities/event";
import Image from "next/image";
import { football300SvgInfo, Icon } from "@/5_shared";

interface EventIncidentRowProps {
  incident: IncidentsInterface;
  type: "home" | "away";
}

export function EventIncidentRow({ incident, type }: EventIncidentRowProps) {
  return (
    <Flex
      key={incident.id}
      justifyContent={type === "home" ? "start" : "end"}
      gap={"0.5rem"}
      alignItems={"center"}
    >
      {type === "home" ? (
        <>
          <Box>{incident.time + "'"}</Box>
          {incident.teamSide ? (
            incident.color === "red" ? (
              <Box>
                <Image
                  src={"/images/red_card.png"}
                  width={16}
                  height={16}
                  alt="red cart"
                />
              </Box>
            ) : (
              <Box>
                <Image
                  src={"/images/yellow_card.png"}
                  width={16}
                  height={16}
                  alt="red cart"
                />
              </Box>
            )
          ) : (
            <Box>
              <Icon width="24px" height="24px" svgInfo={football300SvgInfo()} />
            </Box>
          )}

          <Box>{incident.player.name}</Box>
        </>
      ) : (
        <>
          <Box>{incident.player.name}</Box>
          {incident.teamSide ? (
            incident.color === "red" ? (
              <Box>
                <Image
                  src={"/images/red_card.png"}
                  width={16}
                  height={16}
                  alt="red cart" // Originalni alt tekst ostavljen kako jest
                />
              </Box>
            ) : (
              <Box>
                <Image
                  src={"/images/yellow_card.png"}
                  width={16}
                  height={16}
                  alt="red cart" // Originalni alt tekst ostavljen kako jest
                />
              </Box>
            )
          ) : (
            <Box>
              <Icon width="24px" height="24px" svgInfo={football300SvgInfo()} />
            </Box>
          )}
          <Box>{incident.time + "'"}</Box>
        </>
      )}
    </Flex>
  );
}
