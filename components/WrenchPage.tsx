"use client";

import { WrenchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export const WrenchPage = () => {
  const t = useTranslations("Maintain");
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-6">
      <div className="mx-auto max-w-md text-center">
        <WrenchIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="mt-4 text-muted-foreground">{t("description")}</p>
      </div>
    </div>
  );
};
