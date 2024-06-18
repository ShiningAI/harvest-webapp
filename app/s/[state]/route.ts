import { NextRequest, NextResponse } from "next/server";

if (
  !process.env.NOTION_OAUTH_REDIRECT_URI ||
  !process.env.NOTION_OAUTH_CLIENT_ID
) {
  console.log(
    "The .env file is not configured. Follow the instructions in the readme to configure the .env file."
  );
  console.log("");
  process.env.NOTION_OAUTH_REDIRECT_URI
    ? ""
    : console.log("Add STRIPE_SECRET_KEY to your .env file.");

  process.env.NOTION_OAUTH_CLIENT_ID
    ? ""
    : console.log("Add STRIPE_PUBLISHABLE_KEY to your .env file.");

  process.exit();
}

export function GET(request: NextRequest, params: { state: string }) {
  if (!params.state) {
    return NextResponse.json({ error: "Missing state" }, { status: 400 });
  }
  const redirectUri = process.env.NOTION_OAUTH_REDIRECT_URI!;
  const url = new URL("https://api.notion.com/v1/oauth/authorize");

  url.searchParams.append("owner", "user");
  url.searchParams.append("response_type", "code");
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("client_id", process.env.NOTION_OAUTH_CLIENT_ID!);
  url.searchParams.append("state", params.state);
  return NextResponse.redirect(url.toString());
}
