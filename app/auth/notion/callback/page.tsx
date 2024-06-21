"use client";

import { useRequest } from "ahooks";
import { useRouter, useSearchParams } from "next/navigation";

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
          replace("/auth/notion/callback/success")
        } else {
          replace("/auth/notion/callback/failed")
        }
      },
    }
  );
  return <p>Loading...</p>;
}
