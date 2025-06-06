import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ query: string }> }
) {
  const query = (await context.params).query;

  if (!query) {
    return NextResponse.json(
      {
        error: "Query required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://academy-backend.sofascore.dev/search/player/${query}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Error fetching team with a query: ${query} from external API` +
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
        error: "Failed to fetch team (query) data via proxy",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
