import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { BuyButton } from "./BuyButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FREE_GUIDE_URL } from "@/lib/constant";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price?: number;
  nowPrice: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Free",
    popular: 0,
    nowPrice: 0,
    description: "受限制的基本功能",
    buttonText: "立刻开始",
    benefitList: [
      "每日可发送5条消息",
      "仅支持文本消息和文本链接",
      "只能通过公众号进行消息发送",
    ],
  },
  {
    title: "年度会员",
    popular: 1,
    nowPrice: 59.9,
    description: "包含全部免费版功能",
    buttonText: "立刻购买",
    benefitList: [
      "每日可发送30条消息",
      "支持保存微信文章、网页、普通文本",
      "支持保存聊天记录、图片、视频、文档",
      "收藏信息的AI摘要功能",
      "可通过微信小助手进行消息发送",
    ],
  },
];

export const runtime = "edge";
export default function Home() {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-2xl font-bold text-center">Harvest 收藏助手</h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        轻松收藏，随时随地
      </h3>
      <div className="flex items-center justify-center flex-col md:flex-row md:items-start gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={cn(
              "w-full max-w-sm flex-1",
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            )}
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant="secondary" className="text-sm text-primary">
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              {pricing.nowPrice ? (
                <div className="flex items-center space-x-2">
                  {pricing.price && (
                    <span className="text-xl text-muted-foreground line-through">
                      ¥{pricing.price}
                    </span>
                  )}
                  <span className="text-3xl font-bold">
                    ¥{pricing.nowPrice}
                  </span>
                  <span className="text-muted-foreground"> /年</span>
                </div>
              ) : (
                <div className="text-3xl font-bold">免费版</div>
              )}

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              {pricing.nowPrice ? (
                <BuyButton price={pricing.nowPrice}>
                  {pricing.buttonText}
                </BuyButton>
              ) : (
                <Link href={FREE_GUIDE_URL} prefetch={false} target="_blank">
                  <Button className="w-full" variant="outline">
                    {pricing.buttonText}
                  </Button>
                </Link>
              )}
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
        <div></div>
      </div>
    </section>
  );
}
