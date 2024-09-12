"use client";

import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";

interface UserBoxProps {
  title: string;
}

export function UserBox({ title, children }: PropsWithChildren<UserBoxProps>) {
  const t = useTranslations("UserMenu");
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{t(title)}</h3>
      <div className="shrink-0 bg-border h-[1px] w-full"></div>
      <div className="mb-8">{children}</div>
    </div>
  );
}
