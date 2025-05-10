"use client";

import { useTranslations } from "next-intl";
import { IconBrandNotion, IconBrandWechat } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { PropsWithChildren, useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { UserBox } from "@/components/UserBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QRCode } from "./QRCode";

export const runtime = "edge";

function Box({ children }: PropsWithChildren) {
  return <UserBox title="Accounts">{children}</UserBox>;
}

export default function Page() {
  const [user] = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Accounts");
  const searchParams = useSearchParams();
  const firstSelected = searchParams.get("firstSelected") === "true";
  const [showQRCodeDialog, setShowQRCodeDialog] = useState(false);

  // 检查是否是首次选择数据库并显示二维码对话框
  useEffect(() => {
    if (firstSelected) {
      setShowQRCodeDialog(true);
    }
  }, [firstSelected]);

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
    <>
      <Box>
        <Item
          title="微信"
          desc={user.weixin?.name ? user.weixin.name : t("desc")}
          icon={<IconBrandWechat size={24} />}
        ></Item>
        <Item
          title="Notion"
          desc={
            user.bindedNotion?.access_token ? (
              <>
                <div>
                  {user.bindedNotion.email ||
                    user.bindedNotion.name ||
                    t("bound")}
                </div>
                {!!user.database?.database_id ? (
                  <span>
                    {t("selected")}
                    <Link
                      className="ml-1 text-primary underline"
                      href={user.database.database_url}
                    >
                      {user.database.database_title}
                    </Link>
                    <Link
                      className="ml-1 text-blue-500"
                      href="/databases/select"
                    >
                      {t("change")}
                    </Link>
                  </span>
                ) : (
                  <span>
                    {/* {t("unselected")}
                    <Link className="ml-1 text-blue-500" href="/databases/select">
                      {t("gotoselect")}
                    </Link> */}
                  </span>
                )}
              </>
            ) : (
              t("desc")
            )
          }
          icon={<IconBrandNotion size={24} />}
        >
          {user.bindedNotion?.access_token ? (
            <Link href="/sign-in" prefetch={false}>
              <Button>{t("rebind")}</Button>
            </Link>
          ) : (
            <Link href="/sign-in" prefetch={false}>
              <Button>{t("bind")}</Button>
            </Link>
          )}
        </Item>
      </Box>

      {/* 首次选择数据库时显示客服二维码对话框 */}
      <Dialog
        open={showQRCodeDialog}
        onOpenChange={(open) => {
          setShowQRCodeDialog(open);
          if (!open) {
            router.replace(pathname);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <QRCode />
        </DialogContent>
      </Dialog>
    </>
  );
}

type ItemProps = PropsWithChildren<{
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}>;

function Item({ icon, title, desc, children }: ItemProps) {
  return (
    <div className="mb-2 flex flex-col md:flex-row md:items-center gap-2 rounded-lg border-[0.5px] border-gray-200 bg-gray-50 px-3 py-2">
      <div className="flex-1 flex items-center">
        <div className="mr-3 h-8 w-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium leading-[21px] text-gray-800">
            {title}
          </div>
          <div className="flex flex-col text-xs font-normal leading-[18px] text-gray-500">
            {desc}
          </div>
        </div>
      </div>
      <div className="flex justify-end">{children}</div>
    </div>
  );
}
