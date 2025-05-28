import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string; date: string } }
) {
  const { slug: sportSlug, date } = params;

  if (!sportSlug || !date) {
    return NextResponse.json(
      {
        error: "Sport slug is invalid or date",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/sport/${sportSlug}/events/${date}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching events from sport ${sportSlug} on date ${date}` +
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
