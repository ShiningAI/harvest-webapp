"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export const RootMenu = () => {
  const t = useTranslations("RootMenu");
  return (
    <>
      <Link href="/pricing" className="ml-8 hover:underline">
        {t("pricing")}
      </Link>
    </>
  );
};
