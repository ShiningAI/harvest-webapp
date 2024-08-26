
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { NOTION_OAUTH_HOST } from "@/lib/constant";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    const cookieStore = cookies();
    const current_db = cookieStore.get("current_db");

    if (!session?.user) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    const response = await fetch(`${NOTION_OAUTH_HOST}/v1/user`, {
        method: "POST",
        body: JSON.stringify(session.user),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const respJson = await response.json<any>();

    if (!respJson.ok) {
        return NextResponse.json({ ok: false, error: respJson.message || "Notion auth failed" });
    }

    const user = {
        ...respJson.data,
        id: session.user.id,
        name: respJson.data.name || session.user.name,
        // extension 临时选择的数据库
        current_db: current_db?.value,
    };

    if (user.avatar) {
        user.avatar = user.avatar.replace("http://", "https://");
    }

    return NextResponse.json({ ok: true, data: user });
}

export const runtime = 'edge';