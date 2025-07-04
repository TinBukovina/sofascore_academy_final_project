import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const teamId = resolvedParams.id;

  if (!teamId) {
    return NextResponse.json(
      {
        error: "Team ID is required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/team/${teamId}/image`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching team image with ID: ${teamId}.\n` + errorData.message
      );
    }

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.startsWith("image/")) {
      return new NextResponse("Outside resource is not valid image.", {
        status: 502,
      });
    }

    const imageBody = response.body;

    if (!imageBody) {
      return new NextResponse("There is no image data.", {
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
