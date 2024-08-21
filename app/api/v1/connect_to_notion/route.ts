
import { auth } from "@/auth";
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


    const response = await fetch(`http://api.notion-nice.com/mp/connect_to_notion`, {
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

    if (!response.ok) {
        return NextResponse.json({ ok: false, error: "Notion auth failed" });
    }

    const respJson = await response.json<any>();

    return NextResponse.json({ ok: true, data: respJson });
}

export const runtime = 'edge';