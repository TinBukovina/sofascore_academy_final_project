import React from "react";
import { Box, Center, Flex } from "../../../../styled-system/jsx";
import { useTeamPlayers } from "@/4_entities/team/hooks/useTeamPlayers";
import LoadingPage from "@/app/_ui/LoadingPage";
import { PlayerCard } from "@/4_entities/player";

interface PlayersProps {
  teamId: number;
}

export function Players({ teamId }: PlayersProps) {
  const { teamPlayers, isLoading, isError, error } = useTeamPlayers(teamId);

  if (isLoading) return <LoadingPage />;

  if (isError) {
    console.log(error);
    return <Center>Error</Center>;
  }

  if (!teamPlayers || teamPlayers.length <= 0) {
    return <Center>There is no players for this team.</Center>;
  }

  console.log(teamPlayers);

  return (
    <Flex
      direction={"column"}
      gap={"1rem"}
      w={"100%"}
      border={"1px solid transparent"}
      borderColor={"border"}
      borderRadius={"md"}
      overflow={"hidden"}
    >
      <Box p={"1rem"} bg={"surface.s1"} color={"primaryClr"} fontSize={"h6"}>
        Players
      </Box>
      <Flex direction={"column"} gap={"1rem"} p={"1rem"} pt={"0"}>
        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "C").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box>Coach</Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "C")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard key={player.id} player={player} />
                </Box>
              ))}
          </Flex>
        </Flex>

        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "F").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box>Forward</Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "F")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard key={player.id} player={player} />
                </Box>
              ))}
          </Flex>
        </Flex>

        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "M").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box>Midfilder</Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "M")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard key={player.id} player={player} />
                </Box>
              ))}
          </Flex>
        </Flex>

        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "D").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box>Defender</Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "D")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard player={player} />
                </Box>
              ))}
          </Flex>
        </Flex>

        <Flex
          direction={"column"}
          gap={"0.5rem"}
          display={
            teamPlayers.filter((player) => player.position === "G").length <= 0
              ? "none"
              : "flex"
          }
        >
          <Box>Goalkeeper</Box>
          <Flex wrap={"wrap"} gap={"1rem"} justifyContent={"center"}>
            {teamPlayers
              .filter((player) => player.position === "G")
              .map((player) => (
                <Box key={player.id}>
                  <PlayerCard key={player.id} player={player} />
                </Box>
              ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
