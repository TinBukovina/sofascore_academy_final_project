import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string; page: string }> }
) {
  const resolvedParams = await context.params;
  const tournamentId = resolvedParams.id;
  const dataPage = resolvedParams.page;

  if (!tournamentId || !dataPage) {
    return NextResponse.json(
      {
        error: "Tournoment ID or page is not valid.",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/tournament/${tournamentId}/events/next/${dataPage}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching tournament events (next) on page ${dataPage} with tournament ID: ${tournamentId} from external API` +
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
        error: "Failed to fetch tournament events (next) data via proxy",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
