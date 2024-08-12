
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ ok: false });
    }

    const data = { t: Date.now(), wxId: session.user.id };
    const state = Buffer.from(JSON.stringify(data)).toString("base64");

    return NextResponse.json({ ok: true, data: state });
}

export const runtime = 'edge';