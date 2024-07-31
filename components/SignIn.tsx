"use client";

import { LoaderCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCountDown, useRequest } from "ahooks";
import { useState } from "react";

export function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
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
        <SignInContent onOpenChange={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}

interface SignInContentProps {
  onOpenChange(open: boolean): void;
}
function SignInContent({ onOpenChange }: SignInContentProps) {
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
        setTargetDate(Date.now() + 9 * 1000);
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
        // 登录成功
        cancel();
        onOpenChange(false);
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
