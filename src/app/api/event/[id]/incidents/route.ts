import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const eventId = resolvedParams.id;

  if (!eventId) {
    return NextResponse.json(
      {
        error: "Event ID is required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/event/${eventId}/incidents`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching event incidnets with id: ${eventId} from external API` +
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
      { error: "Failed to fetch event data via proxy", details: errorMessage },
      { status: 500 }
    );
  }
}
