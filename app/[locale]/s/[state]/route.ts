import { signIn } from "@/auth";
import { clientId, redirectUri } from "@/lib/constant";
import { notifyException } from "@/lib/notify";
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

    console.log(`[${request.method}]/s/${params.state}`, JSON.stringify(decode, null, 2));

    if (decode.type && decode.unionid) {
      if (!decode.t) {
        return NextResponse.json({ error: "Invalid state" }, { status: 400 });
      }
      // TODO: 需要根据 decode.t 判断链接是否过期，过期链接提示用户已过期

      const url = request.nextUrl.clone();
      await signIn("wechat", {
        redirect: false,
        wx_id: decode.unionid,
      })
      switch (decode.type) {
        case 'database': {
          url.pathname = "/databases/select";
          break;
        }
        case 'bind': {
          url.pathname = "/databases/connect";
          break;
        }
        case 'status':
        default: {
          url.pathname = "/user/accounts";
          break;
        }
      }

      url.searchParams.delete("state");
      return NextResponse.redirect(url);
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
  } catch (error: any) {
    await notifyException(error).catch(console.error);
    return NextResponse.json({ error: "Invalid state" }, { status: 400 });
  }
}
