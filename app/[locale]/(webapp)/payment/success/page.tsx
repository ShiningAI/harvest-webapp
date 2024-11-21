import { Button } from "@/components/ui/button";
import { CheckCircleIcon, CircleCheckIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { QRCode } from "./QRCode";
import { Metadata } from "next";
import { GUIDE_URL } from "@/lib/constant";

export const metadata: Metadata = {
  title: "支付成功 - Harvest",
};

export const runtime = "edge";
const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 md:py-36">
      <CheckCircleIcon className="size-9 text-green-500" />
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">支付成功</h2>
        <p className="text-muted-foreground">
          您的支付已经成功完成。感谢您的支持!
        </p>
      </div>
      <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="secondary">返回首页</Button>
          </Link>
          <Link href="/user/accounts">
            <Button variant="outline">绑定账号</Button>
          </Link>
        </div>
        <Link href={GUIDE_URL} target="_blank">
          <Button>查看入门教程</Button>
        </Link>
      </div>
      <Separator className="max-w-sm" />
      <QRCode />
    </div>
  );
};

export default PaymentSuccess;
