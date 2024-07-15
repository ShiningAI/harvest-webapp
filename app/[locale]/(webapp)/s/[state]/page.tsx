import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import NotionPage from "./NotionPage";

export default async function Page({ params }: { params: { state: string } }) {
  const t = await getTranslations();
  const recordMap: any = await fetch("https://harvest.prius.ai/api/get-page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pageId: "ee4242f76b7744478bdc87b955b89250" }),
  }).then((res) => res.json());

  return (
    <div>
      <div className="mx-auto max-w-2xl space-y-6 py-2">
        <Link href={`/s/redirect/${params.state}`}>
          <Button>{t("Database.Authorize.goto")}</Button>
        </Link>
      </div>
      {recordMap && <NotionPage recordMap={recordMap} />}
      <div className="mx-auto max-w-2xl space-y-6 py-2">
        <Link href={`/s/redirect/${params.state}`}>
          <Button>{t("Database.Authorize.goto")}</Button>
        </Link>
      </div>
    </div>
  );
}

export const runtime = "edge";
