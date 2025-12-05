import { auth } from "@/auth";
import { API_NICE_URL } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { type, url } = (await req.json()) as { type: string; url: string };
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = await fetch(`${API_NICE_URL}/pay/transactions`, {
    method: "POST",
    body: JSON.stringify({ user: session.user, type, url, productIds: [1] }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const respJson = await response.json<any>();

  console.log(respJson);
  if (!respJson.ok) {
    // 转发后端的实际状态码，而不是统一返回 500
    return NextResponse.json(respJson, { status: response.status });
  }

  return NextResponse.json(respJson);
}
