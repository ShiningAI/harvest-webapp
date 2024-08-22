"use client";

import { Wrap } from "@/components/Wrap";
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
    <Wrap
      title="⌛️正在授权中"
      description="请你耐心等待，不要刷新页面。如果等待时间过长或者授权失败，请重新尝试。"
    >
      <p className="text-muted-foreground w-3/5 h-6 bg-muted animate-pulse"></p>
      <p className="text-muted-foreground w-4/5 h-6 bg-muted animate-pulse"></p>
    </Wrap>
  );
}
