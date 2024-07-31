"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRequest } from "ahooks";

export function SignIn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>微信扫码登录注册</DialogDescription>
        </DialogHeader>
        <SignInContent />
      </DialogContent>
    </Dialog>
  );
}

function SignInContent() {
  const { data: ticket } = useRequest(() =>
    fetch("/api/mp/get-qrcode")
      .then((res) => res.json())
      .then((data: any) => data.ticket)
  );
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div>微信扫码登录注册</div>
      </div>
      <div className="border rounded-lg flex flex-col justify-center items-center w-40 h-40">
        {!!ticket && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`}
            alt=""
            width={150}
            height={150}
          />
        )}
      </div>
      <div className="text-muted-foreground">
        微信扫一扫关注公众号，极速注册登录
      </div>
    </div>
  );
}
