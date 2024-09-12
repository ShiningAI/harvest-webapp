"use client";

import { Button } from "@/components/ui/button";
import { useRequest } from "ahooks";

function Page() {
  const { run } = useRequest(
    async () => {
      const resp = await fetch("/api/v1/pay", {
        method: "POST",
        body: JSON.stringify({ type: "native" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp_json: any = await resp.json();
      console.log(resp_json);
    },
    {
      manual: true,
    }
  );
  return (
    <div className="mt-20">
      <Button onClick={run}>Click me</Button>
    </div>
  );
}

export default Page;

export const runtime = "edge";
