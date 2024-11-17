import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-12 py-12 md:py-24">
      <CircleCheckIcon className="size-12 text-green-500" />
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">支付成功</h2>
        <p className="text-muted-foreground">
          您的支付已经成功完成。感谢您的支持!
        </p>
      </div>
      <div className="space-x-4">
        <Link href="/">
          <Button variant="secondary">返回首页</Button>
        </Link>
        <Link
          href="https://mp.weixin.qq.com/s/TyRMsprIZskL46zYnK7rEA"
          target="_blank"
        >
          <Button>查看入门教程</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
