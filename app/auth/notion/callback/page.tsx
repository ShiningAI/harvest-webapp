"use client";

import { useRequest } from "ahooks";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const params = useSearchParams();
  const code = params.get("code") as string;
  const state = params.get("state") as string;

  if (!code || !state) {
    return <div>Invalid Request</div>;
  }
  return <Auth code={code} state={state} />;
}

interface AuthProps {
  code: string;
  state: string;
}

function Auth({ code, state }: AuthProps) {
  const { loading, data } = useRequest(() => {
    return fetch("/api/notion", {
      method: "POST",
      body: JSON.stringify({ code, state }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json() as any);
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl">Notion Auth</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{`Code: ${code}. ${data.ok ? "授权成功" : "授权失败"}`}</p>
      )}
    </main>
  );
}
