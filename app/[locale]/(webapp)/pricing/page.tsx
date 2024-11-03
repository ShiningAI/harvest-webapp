"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useRequest } from "ahooks";
import { QRCodeCanvas } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";

function Page() {
  const { toast } = useToast();
  const [user, isLoading] = useUser();
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { loading, data, run } = useRequest(
    async () => {
      if (!user) {
        toast({
          title: "错误",
          description: "请先登录",
          variant: "destructive",
        });
        return;
      }
      const resp = await fetch("/api/v1/pay", {
        method: "POST",
        body: JSON.stringify({ type: "native" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp_json: any = await resp.json();
      if (resp_json.ok === false) {
        toast({
          title: "错误",
          description: resp_json.message,
          variant: "destructive",
        });
        return;
      }
      return resp_json.data;
    },
    {
      manual: true,
      onSuccess: (data) => {
        if (data) setOpen(true);
      },
    }
  );

  const handleBuy = () => {
    if (user?.harvest?.id) {
      setAlertOpen(true);
      return;
    }
    run();
  };
  if (isLoading) {
    return null;
  }
  return (
    <>
      <div className="container w-full py-24 lg:py-32">
        <div className="max-w-2xl mx-auto w-full text-center mb-10 lg:mb-14">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            价格
          </h2>
          <p className="mt-1 text-muted-foreground">选择适合您的计划</p>
        </div>
        <div className="mt-12 flex gap-6 items-center justify-center">
          <Card className="flex-1 max-w-xs">
            <CardHeader className="text-center pb-2">
              <CardTitle>Free</CardTitle>
              <span className="font-bold text-5xl">免费版</span>
            </CardHeader>
            <CardDescription className="text-center">
              受限制的基本功能
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    每日可发送5条消息
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    仅支持文本消息和文本链接
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={"outline"}>
                立刻开始
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-primary flex-1 max-w-xs">
            <CardHeader className="text-center pb-2">
              <Badge className="w-max self-center mb-3">Most popular</Badge>
              <CardTitle className="!mb-7">1年会员</CardTitle>
              <span className="font-bold text-5xl">¥ 39.9</span>
            </CardHeader>
            <CardDescription className="text-center w-11/12 mx-auto">
              包含全部高级功能
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    每日可发送30条消息
                  </span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">
                    支持多种消息格式
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" loading={loading} onClick={handleBuy}>
                立刻购买
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col items-center">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle>微信扫码支付</DialogTitle>
            <DialogDescription>
              <span className="text-4xl font-semibold text-foreground">
                39.9
              </span>
              <span className="text-xs">元</span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <QRCodeCanvas value={data?.code_url} size={200} />
          </div>
          <Image
            width={184}
            height={45}
            src="/images/wechat-payment.png"
            alt="微信支付"
            className="mt-6 w-1/4"
          ></Image>
        </DialogContent>
      </Dialog>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>再次购买</AlertDialogTitle>
            <AlertDialogDescription>
              您已经是会员，是否继续购买？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={run}>继续购买</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Page;

export const runtime = "edge";
