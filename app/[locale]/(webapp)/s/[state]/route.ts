import { signIn } from "@/auth";
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

    // TODO: 老版本的功能兼容，后续个微停服后删除
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
        const user_resp_json = await user_resp.json<any>();
        const user = user_resp_json.data;

        if (!user.access_token) {
          return NextResponse.json({ error: "Invalid user" }, { status: 400 });
        }
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard/select";

        const response = NextResponse.redirect(url);

        response.cookies.set("access_token", user.access_token);
        response.cookies.set("wx_id", wx_user_id);

        return response;
      }

      return NextResponse.json({ error: "Invalid wx_id" }, { status: 400 });
    }

    if (decode.type && decode.unionid) {
      if (!decode.t) {
        return NextResponse.json({ error: "Invalid state" }, { status: 400 });
      }
      // TODO: 需要根据 decode.t 判断链接是否过期，过期链接提示用户已过期

      switch (decode.type) {
        case 'database': {
          await signIn("credentials", {
            redirect: false,
            wx_id: decode.unionid,
          })
          const url = request.nextUrl.clone();
          url.pathname = "/databases/select";
          return NextResponse.redirect(url)
        }
        case 'status': {
          await signIn("credentials", {
            redirect: false,
            wx_id: decode.unionid,
          })
          const url = request.nextUrl.clone();
          url.pathname = "/user/accounts";
          return NextResponse.redirect(url)
        }
        case 'bind': {
          await signIn("credentials", {
            redirect: false,
            wx_id: decode.unionid,
          })
          const url = request.nextUrl.clone();
          url.pathname = "/databases/connect";
          return NextResponse.redirect(url)

        }
        default:
          return NextResponse.json(decode, { status: 200 });
      }
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
