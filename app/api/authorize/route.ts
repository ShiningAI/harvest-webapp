import { signIn } from "@/auth";
import { API_NICE_URL } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string; state: string } }
) {
  try {
    if (!params.code) {
      return NextResponse.json({ ok: false, error: "Invalid code" });
    }

    const url = new URL(`${API_NICE_URL}/lifedev/authorize`);
    url.searchParams.set("code", params.code);
    if (params.state) url.searchParams.set("state", params.state);
    const response = await fetch(url);

    const respJson = await response.json<any>();

    if (!respJson.ok) {
      return NextResponse.json({
        ok: false,
        error: respJson.message || "Notion auth failed",
      });
    }

    const { user, state } = respJson.data || {};

    await signIn("wechat", {
      redirect: false,
      wx_id: user.weixin.id,
    });

    const nextUrl = request.nextUrl.clone();
    nextUrl.pathname = state;
    return NextResponse.redirect(nextUrl);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ ok: false, error: error?.message });
  }
}

export const runtime = "edge";
