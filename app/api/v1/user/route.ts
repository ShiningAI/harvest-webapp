
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    const data = { t: Date.now(), unionid: session.user.id };
    const state = Buffer.from(JSON.stringify(data)).toString("base64");

    const response = await fetch(`http://api.notion-nice.com/mp/user?unionid=${data.unionid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        return NextResponse.json({ ok: false, error: "Notion auth failed" });
    }

    const respJson = await response.json<any>();

    const user = {
        ...respJson.data,
        id: session.user.id,
        name: respJson.data.name || session.user.name,
        state
    };

    if (user.avatar) {
        user.avatar = user.avatar.replace("http://", "https://");
    }

    return NextResponse.json({ ok: true, data: user });
}

export const runtime = 'edge';