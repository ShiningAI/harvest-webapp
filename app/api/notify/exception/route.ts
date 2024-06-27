import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { error } = (await request.json()) as {
    error: Error;
  };

  try {
    const content = `<font color="warning">NotionNice 异常通知</font>
<font color="info">Name:</font> ${error.name}
<font color="info">Message:</font> ${error.message}

\`\`\`
${error.stack}
\`\`\`
`;
    const params = {
      msgtype: "markdown",
      markdown: { content },
    };
    const resp = await fetch(process.env.WECOM_BOT_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await resp.json();
    return NextResponse.json({ ok: true, data });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message });
  }
}
