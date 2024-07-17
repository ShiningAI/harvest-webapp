import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const response = NextResponse.json({ ok: true });

  response.cookies.set("current_db", params.id);

  return response;
}
