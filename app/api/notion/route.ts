import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const clientId = process.env.NOTION_OAUTH_CLIENT_ID;
const clientSecret = process.env.NOTION_OAUTH_CLIENT_SECRET;
const redirectUri = process.env.NOTION_OAUTH_REDIRECT_URI;

// encode in base 64
const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

export async function POST(request: NextRequest) {
  const { code, state } = (await request.json()) as {
    code: string;
    state: string;
  };

  if (!code || !state || !clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ ok: false });
  }

  try {
    const s = decodeURIComponent(state);
    const decode = JSON.parse(Buffer.from(s, "base64").toString("utf8"));

    const notion_auth_form = new FormData();
    notion_auth_form.append("grant_type", "authorization_code");
    notion_auth_form.append("code", code);
    notion_auth_form.append("redirect_uri", redirectUri);

    const notion_auth_resp = await fetch(
      `${process.env.API_BASE_URL}/v1/oauth/token`,
      {
        method: "POST",
        body: notion_auth_form,
        headers: { Authorization: `Basic ${encoded}` },
      }
    ).then((res) => res.json() as any);

    if (notion_auth_resp.detail) {
      return NextResponse.json({ ok: false, error: notion_auth_resp.detail });
    }

    const resp = await fetch(`${process.env.API_BASE_URL}/v1/oauth/wx_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: notion_auth_resp.access_token,
        user_id: decode.contactId,
      }),
    }).then((res) => res.json() as any);
    return NextResponse.json(resp);
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
