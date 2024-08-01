import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
    const { wx_id } = (await request.json()) as {
        wx_id: string;
    };
    if (!wx_id) {
        return NextResponse.json({ ok: false, error: "wx_id is required" });
    }
    const response = NextResponse.json({ ok: true, data: { wx_id } });

    response.cookies.set("wx_id", wx_id);

    return response;
}