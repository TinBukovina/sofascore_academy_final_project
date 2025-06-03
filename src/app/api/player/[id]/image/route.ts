import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const playerId = resolvedParams.id;

  if (!playerId) {
    return NextResponse.json(
      {
        error: "Player ID is required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/player/${playerId}/image`
    );

    if (response.status === 404) {
      return new NextResponse(null, {
        status: 404,
      });
    }

    if (!response.ok) {
      let errorDetails = `Upstream status: ${response.status}`;
      try {
        // Pokušajte pročitati tijelo odgovora za više detalja o grešci
        const errorText = await response.text();
        errorDetails += `, Body: ${errorText.substring(0, 200)}`; // Ograničite duljinu
      } catch (e) {
        console.log(e);
      }

      return new NextResponse(
        `Failed to fetch image from upstream: ${errorDetails}`,
        { status: 502 }
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
      {
        error: "Failed to fetch player image via proxy",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
