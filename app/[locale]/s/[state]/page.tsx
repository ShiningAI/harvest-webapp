import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NotionPage from "./NotionPage";

export default async function Page({ params }: { params: { state: string } }) {
  const recordMap: any = await fetch("https://harvest.prius.ai/api/get-page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pageId: "ee4242f76b7744478bdc87b955b89250" }),
  }).then((res) => res.json());

  return (
    <div>
      {recordMap && <NotionPage recordMap={recordMap} />}
      <div className="mx-auto max-w-2xl space-y-6 py-2">
        <Link href={`/s/${params.state}/redirect`}>
          <Button>Go to Notion to Authorize</Button>
        </Link>
      </div>
    </div>
  );
}

export const runtime = "edge";
