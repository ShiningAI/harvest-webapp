"use client";

import { useTranslations } from "next-intl";
import { Wrap } from "@/components/Wrap";

export const runtime = "edge";

export default function Page() {
  const t = useTranslations("Database");
  return (
    <Wrap
      hideTitle
      title={t("Auth.Fail.title")}
      description={t("Auth.Fail.description")}
    ></Wrap>
  );
}
