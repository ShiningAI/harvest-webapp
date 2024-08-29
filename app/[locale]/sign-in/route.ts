import { auth, signIn } from "@/auth";
import { clientId, redirectUrl } from "@/lib/constant";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const session = await auth();
  if (session?.user?.type === "wechat") {

    const data = { d: Date.now(), unionid: session.user.id };
    const state = Buffer.from(JSON.stringify(data)).toString("base64");

    const url = new URL("https://api.notion.com/v1/oauth/authorize");

    url.searchParams.append("owner", "user");
    url.searchParams.append("response_type", "code");
    url.searchParams.append("redirect_uri", redirectUrl);
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("state", state);
    return NextResponse.redirect(url.toString());

  }
  return await signIn("notion", { redirectTo: "/databases/select" });
}

