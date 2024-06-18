import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'

export function GET(request: NextRequest, { params }: { params: { state: string } }) {
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
