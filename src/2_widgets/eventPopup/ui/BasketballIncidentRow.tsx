import React from "react";
import { Box, Flex } from "../../../../styled-system/jsx";
import { IncidentsInterface } from "@/4_entities/event";
import Image from "next/image";

interface EventIncidentRowProps {
  incident: IncidentsInterface;
  type: "home" | "away";
}

export function BasketballIncicentRow({
  incident,
  type,
}: EventIncidentRowProps) {
  return (
    <Flex
      key={incident.id}
      justifyContent={type === "home" ? "start" : "end"}
      gap={"0.5rem"}
      alignItems={"center"}
      fontSize={{ base: "xs", lg: "sm" }}
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
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              p={"0.5rem"}
              pb={"0.6rem"}
              bg={"surface.s1"}
              w={"28px"}
              h={"28px"}
              borderRadius={"100%"}
              border={"2px solid transparent"}
              borderColor={"primaryClr"}
              color={"primaryClr"}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              {incident.goalType === "onepoint"
                ? "1"
                : incident.goalType === "twopoint"
                  ? "2"
                  : "3"}
            </Flex>
          )}

          <Box>{incident?.player?.name || "Nema"}</Box>
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
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              p={"0.5rem"}
              pb={"0.6rem"}
              bg={"surface.s1"}
              w={"28px"}
              h={"28px"}
              borderRadius={"100%"}
              border={"2px solid transparent"}
              borderColor={"primaryClr"}
              color={"primaryClr"}
              fontSize={"md"}
              fontWeight={"bold"}
            >
              {incident.goalType === "onepoint"
                ? "1"
                : incident.goalType === "twopoint"
                  ? "2"
                  : "3"}
            </Flex>
          )}
          <Box>{incident.time + "'"}</Box>
        </>
      )}
    </Flex>
  );
}
