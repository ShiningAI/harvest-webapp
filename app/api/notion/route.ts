import { redirectUri, clientId, clientSecret } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

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
    );

    if (notion_auth_resp.status !== 200) {
      return NextResponse.json({
        ok: false,
        error: "Notion auth failed",
        message: await notion_auth_resp.text(),
      });
    }

    const notion_auth_resp_json = await notion_auth_resp.json<any>();

    if (!notion_auth_resp_json.access_token) {
      return NextResponse.json({
        ok: false,
        error: "Notion auth failed",
        message: JSON.stringify(notion_auth_resp_json, null, 2),
      });
    }

    if (decode.wxId) {
      const resp = await fetch(`${process.env.API_BASE_URL}/v1/oauth/wx_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: notion_auth_resp_json.access_token,
          user_id: decode.wxId,
        }),
      });

      if (resp.status !== 200) {
        return NextResponse.json({ ok: false, error: "Notion auth failed" });
      }

      const respJson = await resp.json<any>();

      const response = NextResponse.json({ ok: true, data: respJson });

      response.cookies.set("access_token", notion_auth_resp_json.access_token);
      response.cookies.set("wx_id", decode.wxId);

      return response;
    } else {
      const response = NextResponse.json({
        ok: true,
        data: notion_auth_resp_json,
      });
      response.cookies.set("access_token", notion_auth_resp_json.access_token);
      return response;
    }
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
