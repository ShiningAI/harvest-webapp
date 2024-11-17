"use client";

import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { CrownIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserMenu, getMenuIcon } from "@/hooks/useUserMenu";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";
import { genAuthUrl, isWechat } from "@/lib/wx";
import dayjs from "dayjs";

export function SignInButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, isLoading] = useUser();
  const t = useTranslations("UserMenu");

  const [userMenuItems] = useUserMenu();

  const onLogin = () => {
    if (isWechat()) {
      window.open(genAuthUrl(pathname));
      return;
    }
    router.push("/login");
  };

  if (isLoading) {
    return (
      <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted animate-pulse"></span>
    );
  }

  if (user) {
    const avatar =
      user.notion?.avatar ||
      user.weixin?.avatar ||
      "/images/avatar/default.png";
    const username =
      user.notion?.name || user.weixin?.name || user.email || user.name || "-";
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">{username}</span>
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>{username.slice(-4)}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <span>{username}</span>
            {user.harvest && (
              <div className="text-sm  text-gray-500">
                <div className="flex items-center space-x-1">
                  <CrownIcon size={16} className="text-orange-200" />
                  <span>{t("Member")}</span>
                </div>
                <span>
                  {t("ValidUntil")}:{" "}
                  {dayjs(user.harvest.endDate).format("YYYY-MM-DD")}
                </span>
              </div>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userMenuItems.map((item) => (
            <DropdownMenuItem key={item.key} asChild>
              <Link href={item.href}>
                {getMenuIcon(item.key, "mr-2 h-4 w-4")}
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>{t("LogOut")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <div
      className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full cursor-pointer hover:bg-muted"
      onClick={onLogin}
    >
      <CircleUserRound size={40} />
    </div>
  );
}
