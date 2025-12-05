import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { BuyButton } from "../BuyButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "续费会员 - Harvest 收藏助手",
  description:
    "续费您的会员资格，继续享受每日30条消息、AI摘要、保存微信文章与聊天记录等完整功能。",
};

export const runtime = "edge";

export default function RenewPage() {
  return (
    <section id="renew" className="container py-24 sm:py-32">
      <h2 className="text-2xl font-bold text-center">续费会员</h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        续费后，您的会员有效期将延长一年
      </h3>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-sm drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              年度会员
              <Badge variant="secondary" className="text-sm text-primary">
                续费优惠
              </Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">¥59.9</span>
              <span className="text-muted-foreground"> /年</span>
            </div>
            <CardDescription>续费后有效期延长一年</CardDescription>
          </CardHeader>

          <CardContent>
            <BuyButton price={59.9} isRenew>
              立即续费
            </BuyButton>
          </CardContent>

          <hr className="w-4/5 m-auto mb-4" />

          <CardFooter className="flex">
            <div className="space-y-4">
              {[
                "每日可发送30条消息",
                "支持保存微信文章、网页、普通文本",
                "支持保存聊天记录、图片、视频、文档",
                "收藏信息的AI摘要功能",
                "可通过微信小助手进行消息发送",
              ].map((benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

