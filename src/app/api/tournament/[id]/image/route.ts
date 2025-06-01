import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const tournomentId = await resolvedParams.id;

  if (!tournomentId) {
    return NextResponse.json(
      {
        error: "Team ID is required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/tournament/${tournomentId}/image`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching team image with ID: ${tournomentId}.\n` +
          errorData.message
      );
    }

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.startsWith("image/")) {
      return new NextResponse("Vanjski resurs nije valjana slika.", {
        status: 502,
      });
    }

    const imageBody = response.body;

    if (!imageBody) {
      return new NextResponse("Nema podataka slike s vanjskog izvora.", {
        status: 502,
      });
    }

    return new NextResponse(imageBody, {
      status: 200,
      headers: response.headers,
    });
  } catch (error) {
    console.log("Proxy API error", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      { error: "Failed to fetch team image via proxy", details: errorMessage },
      { status: 500 }
    );
  }
}
