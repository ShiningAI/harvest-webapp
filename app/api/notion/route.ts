import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

if (
  !process.env.NOTION_OAUTH_CLIENT_ID ||
  !process.env.NOTION_OAUTH_CLIENT_SECRET ||
  !process.env.NOTION_OAUTH_REDIRECT_URI
) {
  console.log(
    'The .env file is not configured. Follow the instructions in the readme to configure the .env file. https://github.com/stripe-samples/subscription-use-cases'
  )
  console.log('')
  process.env.NOTION_OAUTH_CLIENT_ID
    ? ''
    : console.log('Add NOTION_OAUTH_CLIENT_ID to your .env file.')

  process.env.NOTION_OAUTH_CLIENT_SECRET
    ? ''
    : console.log('Add NOTION_OAUTH_CLIENT_SECRET to your .env file.')

  process.env.NOTION_OAUTH_REDIRECT_URI
    ? ''
    : console.log('Add NOTION_OAUTH_REDIRECT_URI to your .env file.')
  process.exit()
}

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

  if (!code || !state) {
    return NextResponse.json({ ok: false });
  }

  const decode = JSON.parse(Buffer.from(state, "base64").toString("utf8"));

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
}
