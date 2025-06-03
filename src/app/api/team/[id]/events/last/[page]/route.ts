import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string; page: string }> }
) {
  const resolvedParams = await context.params;
  const teamId = resolvedParams.id;
  const dataPage = resolvedParams.page;

  if (!teamId || !dataPage) {
    return NextResponse.json(
      {
        error: "Team ID or page is not valid.",
      },
      { status: 400 }
    );
  }

  console.log(teamId);
  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/team/${teamId}/events/last/${dataPage}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching team events on page ${dataPage} with tournament ID: ${teamId} from external API` +
          errorData.message
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("Proxy API error", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        error: "Failed to fetch team events data via proxy",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
