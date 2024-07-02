import React from "react";
import Link from "next/link";
// import { NotionAPI } from "notion-client";
import { Button } from "@/components/ui/button";

// import NotionPage from "./NotionPage";

// const notion = new NotionAPI();

export default async function Page({ params }: { params: { state: string } }) {
  // const recordMap = await notion.getPage("ee4242f76b7744478bdc87b955b89250");

  return (
    <div>
      {/* <NotionPage recordMap={recordMap} /> */}
      <div className="mx-auto max-w-md space-y-6 py-12">
        <Link href={`/s/${params.state}/redirect`}>
          <Button>Go to Notion to Authorize</Button>
        </Link>
      </div>
    </div>
  );
}

export const runtime = 'edge';
