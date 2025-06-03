export const getPlayerImage = async (playerId: number): Promise<string> => {
  if (!playerId) {
    throw new Error("Passed player ID has nullish value.");
  }

  const response = await fetch(`/api/player/${playerId}/image`);

  if (!response.ok) {
    throw new Error(
      `There was a error while fetcing player image with ID: ${playerId}.`
    );
  }

  return response.json();
};
