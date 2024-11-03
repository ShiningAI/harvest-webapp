import { auth } from "@/auth";
import { API_NICE_URL } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { current, pageSize } = (await req.json()) as {
    current: number;
    pageSize: number;
  };
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = await fetch(`${API_NICE_URL}/pay/orders`, {
    method: "POST",
    body: JSON.stringify({ user: session.user, current, pageSize }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const respJson = await response.json<any>();

  if (respJson.ok) {
    return NextResponse.json(respJson.data);
  }

  return NextResponse.json(respJson, { status: 500 });
}
