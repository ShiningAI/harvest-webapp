"use client";

import { useTranslations } from "next-intl";
import { useSession, signIn, signOut } from "next-auth/react";
import { LoaderCircle, LogOutIcon, RotateCcw } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCountDown, useRequest } from "ahooks";
import { useState } from "react";
import { useUserMenu } from "@/hooks/useUserMenu";
import Link from "next/link";

export function SignInButton() {
  const session = useSession();
  const t = useTranslations("UserMenu");

  const [userMenuItems] = useUserMenu();
  const [isOpen, setIsOpen] = useState(false);

  if (session.status === "loading") {
    return null;
  }

  if (session.status === "authenticated") {
    const username = session.data.user?.name || "";
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">{username}</span>
            <Avatar>
              <AvatarImage src="/images/avatar/default.png" />
              <AvatarFallback>{username.slice(-4)}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userMenuItems.map((item) => (
            <DropdownMenuItem key={item.key} asChild>
              <Link href={item.href}>{item.label}</Link>
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>微信扫码登录注册</DialogDescription>
        </DialogHeader>
        <SignInContent onLogin={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

interface SignInContentProps {
  onLogin?: () => void;
}
export function SignInContent({ onLogin }: SignInContentProps) {
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({ targetDate, onEnd: () => cancel() });
  const {
    loading,
    data: ticket,
    refresh,
  } = useRequest(
    async () => {
      setTargetDate(undefined);
      return fetch("/api/mp/get-qrcode")
        .then((res) => res.json())
        .then((data: any) => data.ticket);
    },
    {
      onSuccess: () => {
        setTargetDate(Date.now() + 59 * 1000);
        run();
      },
    }
  );
  const { run, cancel } = useRequest(
    async () => {
      const response = await fetch(`/api/mp/get-scan-result?ticket=${ticket}`);
      if (response.status !== 200) {
        throw new Error("Failed to get scan result");
      }
      const data: any = await response.json();
      if (data.ok) {
        console.log("Scan result", data);
        if (!data.data.unionid) {
          console.error("Invalid scan result", data);
          return;
        }
        await signIn("credentials", {
          redirect: false,
          wx_id: data.data.unionid,
        });
        cancel();
        onLogin?.();
      }
    },
    {
      manual: true,
      pollingInterval: 1200,
      pollingErrorRetryCount: 3,
    }
  );
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div>微信扫码登录注册</div>
      </div>
      <div className="border rounded-lg relative flex flex-col justify-center items-center w-40 h-40">
        {!!ticket && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`}
            alt=""
            className="w-40 h-40 rounded-lg"
          />
        )}
        {countdown === 0 && targetDate && (
          <div
            className="rounded-lg flex flex-col justify-center items-center gap-2 absolute inset-0 cursor-pointer text-white bg-black/70"
            onClick={refresh}
          >
            <RotateCcw size={32} />
            <div>二维码已失效</div>
            <div>请点击刷新</div>
          </div>
        )}
        {loading && (
          <div className="rounded-lg absolute inset-0 flex items-center justify-center text-white bg-black/60">
            <LoaderCircle size={36} className="animate-spin" />
          </div>
        )}
      </div>
      <div className="text-muted-foreground">
        微信扫一扫关注公众号，极速注册登录
      </div>
    </div>
  );
}
