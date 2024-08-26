
import { auth } from "@/auth";
import { NOTION_OAUTH_HOST } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }
    const { database } = await req.json() as { database: any; };
    if (!database?.id) {
        return NextResponse.json({ ok: false, error: "Invalid database_id" });
    }


    const resp = await fetch(`${NOTION_OAUTH_HOST}/v1/connect_to_notion`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            unionid: session.user.id,
            database_id: database.id,
            database_title: database.name,
            database_url: database.url
        }),
    })

    if (!resp.ok) {
        return NextResponse.json({ ok: false, error: "Notion auth failed" });
    }

    const respJson = await resp.json<any>();

    const response =  NextResponse.json({ ok: true, data: respJson });
    response.cookies.set("current_db", database.id);

    return response;
}

export const runtime = 'edge';