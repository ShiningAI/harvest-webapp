"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderCircle, RotateCcw } from "lucide-react";
import { useCountDown, useMount, useRequest } from "ahooks";
import { useCallback, useState } from "react";
import { genAuthUrl, isWechat } from "@/lib/wx";
import { Section1, Section2, Section3 } from "@/components/Sections";

export function SignInPage() {
  const router = useRouter();
  const [section, setSection] = useState(-1);
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({ targetDate, onEnd: () => cancel() });

  useMount(() => {
    setSection(Math.floor(Math.random() * 3));
  });

  const renderSection = useCallback(() => {
    if (section === -1) return null;
    const Section = [Section1, Section2, Section3][section];
    return (
      <Section className="relative w-full rounded-md lg:scale-90 hover:scale-100 transition-all hard-shadow" />
    );
  }, [section]);

  const {
    loading,
    data: ticket,
    refresh,
  } = useRequest(
    async () => {
      setTargetDate(undefined);
      if (isWechat()) {
        window.open(genAuthUrl("/"));
        return;
      }
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
      if (!ticket) return;
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
        await signIn("wechat", {
          redirect: false,
          wx_id: data.data.unionid,
        });
        cancel();
        router.replace("/user/accounts");
      }
    },
    {
      manual: true,
      pollingInterval: 1200,
      pollingErrorRetryCount: 3,
    }
  );
  return (
    <>
      <div className="hidden md:flex w-1/2 flex-none flex-col items-center justify-center bg-[#181818] py-6 pt-8 text-center">
        {renderSection()}
      </div>
      <div className="flex flex-1 flex-col gap-3 items-center justify-center bg-gray-50 p-4 md:px-10 md:py-8">
        <div>
          <div>微信扫码登录注册</div>
        </div>
        <div className="text-sm text-muted-foreground text-nowrap">
          微信扫一扫关注公众号，极速注册登录
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
          {(!ticket || loading) && (
            <div className="rounded-lg absolute inset-0 flex items-center justify-center text-white bg-black/60">
              <LoaderCircle size={36} className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
