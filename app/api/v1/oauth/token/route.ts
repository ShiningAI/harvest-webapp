
import { auth } from "@/auth";
import { API_NICE_URL } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const notion_auth_form = await req.formData();
    const authorization = req.headers.get('authorization');

    const session = await auth();
    console.log(`[${req.method}]/v1/oauth/token`, authorization);

    if (session?.user?.type === "wechat") {
        notion_auth_form.append("unionid", session.user.id!);
    }

    const data: any = {}
    for (const [key, value] of notion_auth_form.entries()) {
        data[key] = value;
    }

    console.log(`[${req.method}]/v1/oauth/token`, JSON.stringify(data, null, 2));
    const notion_auth_resp = await fetch(
        `${API_NICE_URL}/v1/oauth/token`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: authorization!,
                "Content-Type": "application/json"
            },
        }
    );

    const notion_auth_resp_json: any = await notion_auth_resp.json();

    if (!notion_auth_resp_json.access_token) {
        return NextResponse.json({ ok: false, error: "Notion auth failed" }, { status: 401 });
    }

    return NextResponse.json(notion_auth_resp_json);
}