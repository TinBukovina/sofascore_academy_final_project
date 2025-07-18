import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const tournomentId = resolvedParams.id;

  if (!tournomentId) {
    return NextResponse.json(
      {
        error: "Tournoment ID is required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/tournament/${tournomentId}/standings`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching tournoment standings with id: ${tournomentId} from external API` +
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
        error: "Failed to fetch tournoment standings data via proxy",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
