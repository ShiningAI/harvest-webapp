"use client";

import { useRequest } from "ahooks";
import { useRouter, useSearchParams } from "next/navigation";

export const runtime = "edge";

export default function Page() {
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
  const { replace } = useRouter();
  useRequest(
    async () => {
      return fetch("/api/notion", {
        method: "POST",
        body: JSON.stringify({ code, state }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json() as any);
    },
    {
      onSuccess: (data) => {
        if (data.ok) {
          replace("/auth/notion/success");
        } else {
          replace("/auth/notion/failed");
        }
      },
    }
  );
  return (
    <div className="mx-auto max-w-md space-y-6 py-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold w-1/3 h-9 bg-muted animate-pulse"></h1>
        <p className="text-muted-foreground w-4/5 h-6 bg-muted animate-pulse"></p>
      </div>
    </div>
  );
}
