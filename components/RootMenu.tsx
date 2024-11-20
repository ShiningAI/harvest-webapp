"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export const RootMenu = () => {
  const t = useTranslations("RootMenu");
  return (
    <>
      <Link
        href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzU4NzQwNzQzNg==&action=getalbum&album_id=3733392827078918148#wechat_redirect"
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
