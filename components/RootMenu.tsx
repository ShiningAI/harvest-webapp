"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export const RootMenu = () => {
  const t = useTranslations("RootMenu");
  return (
    <>
      <Link
        href="https://mp.weixin.qq.com/mp/homepage?__biz=MzU4NzQwNzQzNg==&hid=1&sn=41d075bd7a174a8b1f34bd7677f3bc70"
        target="_blank"
        className="ml-8 hover:underline"
      >
        {t("help")}
      </Link>
      <Link href="/pricing" className="ml-8 hover:underline">
        {t("pricing")}
      </Link>
    </>
  );
};
