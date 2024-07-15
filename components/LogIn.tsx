"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Wrap } from "./Wrap";
import { Button } from "./ui/button";

interface Props {
  state: string;
}

export const LogIn = ({ state }: Props) => {
  const t = useTranslations("Database");
  return (
    <Wrap
      title={t("LogIn.title")}
      description={t("LogIn.description")}
    >
      <div className="py-6 flex flex-col items-center">
        <Link replace href={`/s/${state}`}>
          <Button>{t("reauthorization")}</Button>
        </Link>
      </div>
    </Wrap>
  );
};
