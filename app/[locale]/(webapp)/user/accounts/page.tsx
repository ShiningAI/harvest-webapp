"use client";

import { useTranslations } from "next-intl";
import { IconBrandNotion, IconBrandWechat } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export const runtime = "edge";

function Box({ children }: PropsWithChildren) {
  const t = useTranslations("Accounts");
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">{t("title")}</h3>
      <div className="shrink-0 bg-border h-[1px] w-full"></div>
      <div className="mb-8">{children}</div>
    </div>
  );
}

export default function Page() {
  const [user] = useUser();
  const t = useTranslations("Accounts");

  if (!user) {
    return (
      <Box>
        <Item
          title="微信"
          desc={t("load")}
          icon={<IconBrandWechat size={24} />}
        ></Item>
        <Item
          title="Notion"
          desc={t("load")}
          icon={<IconBrandNotion size={24} />}
        ></Item>
      </Box>
    );
  }

  return (
    <Box>
      <Item
        title="微信"
        desc={user.id || t("load")}
        icon={<IconBrandWechat size={24} />}
      ></Item>
      <Item
        title="Notion"
        desc={user.access_token ? user.access_token : t("desc")}
        icon={<IconBrandNotion size={24} />}
      >
        {user.state &&
          (user.access_token ? (
            <Link href={`/s/${user.state}`}>
              <Button>{t("rebind")}</Button>
            </Link>
          ) : (
            <Link href={`/s/${user.state}`}>
              <Button>{t("bind")}</Button>
            </Link>
          ))}
      </Item>
    </Box>
  );
}

type ItemProps = PropsWithChildren<{
  icon: React.ReactNode;
  title: string;
  desc: string;
}>;

function Item({ icon, title, desc, children }: ItemProps) {
  return (
    <div className="mb-2 flex items-center rounded-lg border-[0.5px] border-gray-200 bg-gray-50 px-3 py-2">
      <div className="mr-3 h-8 w-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium leading-[21px] text-gray-800">
          {title}
        </div>
        <div className="text-xs font-normal leading-[18px] text-gray-500">
          {desc}
        </div>
      </div>
      {children}
    </div>
  );
}
