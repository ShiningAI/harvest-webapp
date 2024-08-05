"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";

const userMenuItems = [
  { label: "Accounts", href: "/user/accounts" },
  { label: "Orders", href: "/user/orders" },
];

export const useUserMenu = () => {
  const t = useTranslations("UserMenu");
  const items = useMemo(() => {
    return userMenuItems.map((item) => ({
      ...item,
      key: item.label,
      label: t(item.label),
    }));
  }, [t]);
  return [items] as const;
};
