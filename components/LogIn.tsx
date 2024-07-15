"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Wrap } from "./Wrap";
import { Button } from "./ui/button";

interface Props {
  state: string;
  isAuth?: boolean;
}

export const LogIn = ({ state, isAuth }: Props) => {
  const t = useTranslations("Database");
  return (
    <Wrap
      hideTitle
      title={isAuth ? t("Auth.Fail.title") :t("LogIn.title")}
      description={isAuth ? t("Auth.Fail.description") : t("LogIn.description")}
    >
      <div className="py-6 flex flex-col items-center">
        <Link replace href={`/s/${state}`}>
          <Button>{t("reauthorization")}</Button>
        </Link>
      </div>
    </Wrap>
  );
};
