import { signIn } from "@/auth";
import { redirectUri, clientId, clientSecret } from "@/lib/constant";
import { ExceptionError, notifyException } from "@/lib/notify";
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
    await notifyException(new Error("Invalid Request")).catch();
    return NextResponse.json({ ok: false });
  }

  if (code === 'test') {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve(void 0);
      }, 20 * 1000);
    })
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

    const notion_auth_resp_json = await notion_auth_resp.json<any>();

    if (!notion_auth_resp_json.access_token) {
      const err = new Error("Notion auth failed") as ExceptionError;
      err.data = JSON.stringify(notion_auth_resp_json, null, 2);
      await notifyException(err).catch();
      return NextResponse.json({ ok: false, error: err.message, });
    }

    if (decode.wxId) {
      // TODO: 老版本的功能兼容，后续个微停服后删除
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
    }
    else if (decode.unionid) {
      let notion_user: any = {}
      if (notion_auth_resp_json.owner?.user) {
        notion_user = {
          id: notion_auth_resp_json.owner.user.id,
          name: notion_auth_resp_json.owner.user.name,
          avatar: notion_auth_resp_json.owner.user.avatar_url,
        }
        notion_user.name = notion_user.name.replace(/[\u0000-\u001F]+/g, "");
        if (notion_auth_resp_json.owner.user?.person?.email) {
          notion_user.email = notion_auth_resp_json.owner.user.person.email
        }
      }

      const resp = await fetch(`http://api.notion-nice.com/mp/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: notion_auth_resp_json.access_token,
          unionid: decode.unionid,
          notion_user: notion_user,
        }),
      });

      const respJson = await resp.json<any>();

      if (!respJson.ok) {
        const err = new Error("Notion auth failed") as ExceptionError;
        err.data = JSON.stringify(respJson, null, 2);
        await notifyException(err).catch();
        return NextResponse.json({ ok: false, error: err.message });
      }

      await signIn("credentials", {
        redirect: false,
        wx_id: decode.unionid,
      })

      const response = NextResponse.json({ ok: true, data: respJson });
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
    await notifyException(error).catch();
    return NextResponse.json({ ok: false, error: error.message });
  }
}
