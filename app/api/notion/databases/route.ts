import { auth } from "@/auth";
import { API_NICE_URL } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const { noCache } = (await request.json()) as {
      noCache: boolean;
    };

    if (!session?.user) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const response = await fetch(`${API_NICE_URL}/v1/notion/databases`, {
      method: "POST",
      body: JSON.stringify({ user: session.user, noCache }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const respJson = await response.json<Databases.APIResponse>();

    if (!respJson.ok) {
      return NextResponse.json({
        ok: false,
        error: respJson.message || "Notion auth failed",
      });
    }

    // 对 database_id 去重
    const uniqueDatabases = respJson.data.filter((database, index, self) => 
      index === self.findIndex(d => d.database_id === database.database_id)
    );

    return NextResponse.json({ ok: true, data: uniqueDatabases });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ ok: false, error: error?.message });
  }
}

export const runtime = "edge";
