import { Metadata } from "next";
import { PricingCards } from "./PricingCards";

export const metadata: Metadata = {
  title: "会员方案与定价 - Harvest 收藏助手",
  description:
    "解锁完整功能，每日30条消息、AI摘要、保存微信文章与聊天记录，轻松收藏，随时随地。年度会员仅需59.9元。",
};

export const runtime = "edge";

export default function PricingPage() {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-2xl font-bold text-center">Harvest 收藏助手</h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        轻松收藏，随时随地
      </h3>
      <PricingCards />
    </section>
  );
}
