"use client";

import Image from "next/image";
import { useMount, useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { PropsWithChildren, useEffect, useState, useRef } from "react";
import { useUser } from "@/hooks/useUser";
import { isMemberActive } from "@/lib/membership";
import { Button } from "@/components/ui/button";
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
import { genAuthUrl, isWechat } from "@/lib/wx";
import { useToast } from "@/components/ui/use-toast";

interface BuyButtonProps {
  price: number;
  isRenew?: boolean;
}

// 二维码图片组件 - 将 canvas 转换为 img，支持微信长按识别
const QRCodeImage = ({ value, size }: { value: string; size: number }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    if (!value || !canvasRef.current) return;
    
    // 等待 canvas 渲染完成后转换为图片
    const timer = setTimeout(() => {
      const canvas = canvasRef.current?.querySelector("canvas");
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        setImgSrc(dataUrl);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* 隐藏的 canvas 用于生成图片 */}
      <div ref={canvasRef} className={imgSrc ? "hidden" : ""}>
        <QRCodeCanvas value={value} size={size} />
      </div>
      {/* 显示转换后的图片，支持长按识别 */}
      {imgSrc && (
        <img
          src={imgSrc}
          alt="微信支付二维码"
          width={size}
          height={size}
          className="block"
          style={{ width: size, height: size }}
        />
      )}
    </div>
  );
};

const paysuccessUrl = "/payment/success";

export const BuyButton = ({
  price,
  children,
  isRenew = false,
}: PropsWithChildren<BuyButtonProps>) => {
  const router = useRouter();
  const { toast } = useToast();
  const [user, isLoading] = useUser();
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useMount(() => {
    if (isWechat()) {
      import("weixin-js-sdk");
    }
  });

  const { loading, data, run } = useRequest(
    async () => {
      if (!user) {
        toast({
          title: "提示",
          description: "请先登录",
          variant: "destructive",
        });
        router.push("/login");
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
        if (data?.code_url) setOpen(true);
        if (data?.trade_no) req.run();
      },
    }
  );
  const wxPayReq = useRequest(
    async () => {
      if (!user) {
        toast({
          title: "提示",
          description: "请先登录",
          variant: "destructive",
        });

        window.open(genAuthUrl("/pricing"));
        return;
      }
      const response = await fetch("/api/v1/pay", {
        method: "POST",
        body: JSON.stringify({ type: "jsapi", url: window.location.href }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = response.status;
      const resp_json: any = await response.json();
      if (resp_json.ok === false) {
        // 当后端判定缺少 openid（通常返回 401 且 message 含 openid）
        if (
          status === 401 &&
          typeof resp_json.message === "string" &&
          /openid/i.test(resp_json.message)
        ) {
          // 触发微信授权，完成后回填 openid
          window.location.href = genAuthUrl("/pricing");
          return;
        }
        toast({
          title: "错误",
          description: resp_json.message,
          variant: "destructive",
        });
        return;
      }
      const data = resp_json.data;

      const wx = (await import("weixin-js-sdk")).default;
      const payResult = await new Promise<boolean>((resolve, reject) => {
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timeStamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ["chooseWXPay"],
        });
        wx.ready(function () {
          wx.chooseWXPay({
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success: function (res) {
              if (res.errMsg === "chooseWXPay:ok") {
                resolve(true);
              } else {
                reject(res);
              }
            },
            fail: function (res) {
              reject(res);
            },
            cancel: function () {
              const error = new Error("取消支付");
              reject(error);
            },
          });
        });
      });
      if (payResult) {
        router.push(paysuccessUrl);
      }
    },
    {
      manual: true,
      onError: (error) => {
        toast({
          title: "错误",
          description: error.message || "支付失败",
          variant: "destructive",
        });
      },
    }
  );
  const req = useRequest(
    async () => {
      if (!data?.trade_no) return;
      const response = await fetch(
        `/api/pay/get-pay-result?trade_no=${data.trade_no}`
      );
      const resp_json: any = await response.json();
      if (resp_json.ok && resp_json.data.trade_state == "SUCCESS") {
        setOpen(false);
        setAlertOpen(false);
        router.push(paysuccessUrl);
      }
    },
    {
      manual: true,
      pollingInterval: 1200,
      pollingErrorRetryCount: 3,
    }
  );

  const handleBuy = () => {
    // 只有当会员真正有效（未过期）时才弹出提示
    if (isMemberActive(user?.harvest)) {
      setAlertOpen(true);
      return;
    }
    onBuy();
  };

  const onBuy = () => {
    setAlertOpen(false);
    // if (isWechat()) {
    //   wxPayReq.run();
    //   return;
    // }
    run();
  };

  useEffect(() => {
    if (!open) {
      req.cancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (isLoading) {
    const onClick = () => {
      toast({
        title: "提示",
        description: "正在加载，请稍等",
      });
    };
    return (
      <Button className="w-full" onClick={onClick}>
        {children}
      </Button>
    );
  }
  return (
    <>
      <Button
        className="w-full"
        loading={loading || wxPayReq.loading}
        onClick={handleBuy}
      >
        {children}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col items-center">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle>微信扫码支付</DialogTitle>
            <DialogDescription>
              <span className="text-4xl font-semibold text-foreground">
                {price}
              </span>
              <span className="text-xs">元</span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            {data?.code_url && <QRCodeImage value={data.code_url} size={200} />}
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
            <AlertDialogTitle>您已经是会员，是否继续购买？</AlertDialogTitle>
            <AlertDialogDescription>
              继续购买后，您的会员有效期将延长
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={onBuy}>继续购买</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
