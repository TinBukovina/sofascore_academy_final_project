import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tournomentId = params.id;

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
      `https://academy-backend.sofascore.dev/tournament/${tournomentId}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching tournoment ${tournomentId} from external API` +
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
        error: "Failed to fetch tournoment data via proxy",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
