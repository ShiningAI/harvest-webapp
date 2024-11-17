"use client";

import { Clock3Icon, UnplugIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const getMenuIcon = (key: string, className?: string) => {
  switch (key) {
    case "Accounts":
      return <UnplugIcon size={16} className={className} />;
    case "Orders":
      return <Clock3Icon size={16} className={className} />;
    default:
      return null;
  }
};

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
