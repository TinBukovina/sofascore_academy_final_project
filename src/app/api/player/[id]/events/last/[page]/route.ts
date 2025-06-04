import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string; page: string }> }
) {
  const resolvedParams = await context.params;
  const playerId = resolvedParams.id;
  const dataPage = resolvedParams.page;

  if (!playerId || !dataPage) {
    return NextResponse.json(
      {
        error: "Player ID or page is not valid.",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/player/${playerId}/events/last/${dataPage}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching player events on page ${dataPage} with player ID: ${playerId} from external API` +
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
        error: "Failed to fetch player events data via proxy",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
