import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ on: true });

  response.cookies.delete("wx_id");
  response.cookies.delete("access_token");
  return response;
}
