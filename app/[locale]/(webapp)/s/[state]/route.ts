import { clientId, redirectUri } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: { state: string } }
) {
  if (!params.state) {
    return NextResponse.json({ error: "Missing state" }, { status: 400 });
  }
  try {
    const s = decodeURIComponent(params.state);
    const decode = JSON.parse(Buffer.from(s, "base64").toString("utf8"));

    if (decode.type === "select") {
      if (decode.wxId) {
        const wx_user_id = decode.wxId;
        const user_resp = await fetch(
          "https://harvest-api.prius.ai/v1/get_user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ wx_user_id }),
          }
        );

        if (!user_resp.ok) {
          return NextResponse.json({ error: "Invalid wx_id" }, { status: 400 });
        }
        const user = await user_resp.json<any>();

        if (!user.access_token) {
          return NextResponse.json({ error: "Invalid user" }, { status: 400 });
        }

        const response = NextResponse.redirect("/dashboard/select");

        response.cookies.set("access_token", user.access_token);
        response.cookies.set("wx_id", wx_user_id);

        return response;
      }

      return NextResponse.json({ error: "Invalid wx_id" }, { status: 400 });
    }

    if (decode.t) {
      // notion oauth authorize
      const url = new URL("https://api.notion.com/v1/oauth/authorize");

      url.searchParams.append("owner", "user");
      url.searchParams.append("response_type", "code");
      url.searchParams.append("redirect_uri", redirectUri);
      url.searchParams.append("client_id", clientId);
      url.searchParams.append("state", params.state);
      return NextResponse.redirect(url.toString());
    }

    return NextResponse.json({ error: "Invalid state" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid state" }, { status: 400 });
  }
}
