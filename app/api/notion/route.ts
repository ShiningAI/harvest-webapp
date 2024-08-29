import { redirectUri, clientId, clientSecret, API_NICE_URL } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// encode in base 64
const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

export async function POST(req: NextRequest) {
    const { code, state } = (await req.json()) as {
        code: string;
        state: string;
    };

    if (!code || !state || !clientId || !clientSecret || !redirectUri) {
        return NextResponse.json({ ok: false });
    }

    try {
        const s = decodeURIComponent(state);
        const decode = JSON.parse(Buffer.from(s, "base64").toString("utf8"));

        const data: any = {
            code,
            'redirect_uri': redirectUri,
            grant_type: 'authorization_code'
        }

        if (decode.unionid) {
            data.unionid = decode.unionid;
        }

        console.log(`[${req.method}]/v1/oauth/token`, JSON.stringify(data, null, 2));
        const notion_auth_resp = await fetch(
            `${API_NICE_URL}/v1/oauth/token`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Basic ${encoded}`,
                    "Content-Type": "application/json"
                },
            }
        );

        const notion_auth_resp_json: any = await notion_auth_resp.json();

        if (!notion_auth_resp_json.access_token) {
            return NextResponse.json({ ok: false, error: "Notion auth failed" }, { status: 401 });
        }

        const url = req.nextUrl.clone();
        url.pathname = "/databases/connect";
        return NextResponse.redirect(url)
    } catch (error) {

    }
}