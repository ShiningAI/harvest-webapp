

const clientId = process.env.NOTION_OAUTH_CLIENT_ID!
const clientSecret = process.env.NOTION_OAUTH_CLIENT_SECRET!
const redirectUri = process.env.NOTION_OAUTH_REDIRECT_URI!

// encode in base 64
const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

interface PageProps {
    params: {
        code: string;
        state: string;
    };
    
}

export default async function Home({ params }: PageProps) {
    const { code, state } = params;
    if (!code || !state || !redirectUri) {
        return <div>Invalid Request</div>;
    }
    const decode = JSON.parse(Buffer.from(state, "base64").toString("utf8"))

  const notion_auth_form = new FormData()
  notion_auth_form.append("grant_type", "authorization_code")
  notion_auth_form.append("code", code)
  notion_auth_form.append("redirect_uri", redirectUri)

  const notion_auth_resp = await fetch(
    `${process.env.API_BASE_URL}/v1/oauth/token`,
    {
      method: "POST",
      body: notion_auth_form,
      headers: { Authorization: `Basic ${encoded}` }
    }
  ).then((res) => res.json() as any)

  const resp = await fetch(`${process.env.API_BASE_URL}/v1/oauth/wx_user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      access_token: notion_auth_resp.access_token,
      user_id: decode.contactId
    })
  }).then((res) => res.json() as any)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-3xl">Notion Auth</h1>
        <p>{`Code: ${code}. ${resp.ok ? "授权成功" : "授权失败"}`}</p>
    </main>
  );
}
