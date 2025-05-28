export const getTeamImageWithTeamId = async (
  teamId: number
): Promise<string | null> => {
  if (!teamId) {
    console.log("Passed team ID was null.");
    return null;
  }

  const response = await fetch(`/api/team/${teamId}/image`);

  if (!response.ok) {
    throw new Error(
      `There was a error while fetcing team image with ID: ${teamId}.`
    );
  }

  return response.json();
};
