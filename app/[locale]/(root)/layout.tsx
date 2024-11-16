import { PropsWithChildren } from "react";
import Link from "next/link";
import { RootHeader } from "@/components/RootHeader";
import Image from "next/image";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <RootHeader shouldShowSignInButton />
      {children}
      <footer className="w-full bg-gradient-to-r from-white/5 via-white/60 to-white/5 backdrop-blur-sm dark:from-slate-700/5 dark:via-slate-700/60 dark:to-slate-700/5">
        <div className="flex flex-col gap-4 justify-between items-center w-full md:py-10 p-6">
          <div className="w-full flex flex-col md:flex-row justify-start gap-24 mt-12 xl:max-w-7xl">
            <div className="w-full flex flex-col gap-4 md:max-w-xs lg:max-w-[310px]">
              <Link aria-label="" href="/">
                <div className="flex items-center gap-3">
                  <Image src="/icon.png" alt="logo" width={24} height={24} />
                  <div className="text-2xl font-semibold h-full">Harvest</div>
                </div>
              </Link>
              <p className="text-md opacity-70">
                Harvest
                是一个收藏助手，支持在微信、Line等社交软件上直接把链接、聊天记录等信息保存到Notion、飞书等笔记软件。
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-start mt-4 md:mt-4 lg:grid-cols-4">
              <ul className="flex flex-col flex-wrap gap-4 justify-center w-full text-sm">
                <li>
                  <p className="text-slate-900 dark:text-slate-100 font-light text-base">
                    产品
                  </p>
                </li>
                <li>
                  <Link
                    href="https://harvest.superai42.com/"
                    target="_blank"
                    className="hover:underline"
                    prefetch={false}
                  >
                    Harvest 收藏助手
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://notion-nice.com/"
                    target="_blank"
                    className="hover:underline"
                    prefetch={false}
                  >
                    Notion Nice
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col flex-wrap gap-4 justify-center w-full text-sm">
                <li>
                  <p className="text-slate-900 dark:text-slate-100 font-light text-base">
                    相关
                  </p>
                </li>
                <li>
                  <Link
                    href="https://weixin.qq.com/"
                    target="_blank"
                    className="hover:underline"
                    prefetch={false}
                  >
                    微信
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://line.me/"
                    target="_blank"
                    className="hover:underline"
                    prefetch={false}
                  >
                    Line
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.notion.so"
                    target="_blank"
                    className="hover:underline"
                    prefetch={false}
                  >
                    Notion
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col flex-wrap gap-4 justify-center w-full text-sm">
                <li>
                  <p className="text-slate-900 dark:text-slate-100 font-light text-base">
                    服务
                  </p>
                </li>
                <li>
                  <Link
                    href="https://harvest.superai42.com/privacy-policy"
                    target="_blank"
                    className="hover:underline"
                    prefetch={false}
                  >
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://harvest.superai42.com/terms-of-use"
                    target="_blank"
                    className="hover:underline"
                    prefetch={false}
                  >
                    服务条款
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <hr className="w-full my-4 border-0 bg-gradient-to-r from-white/5 via-black/10 to-white/5 dark:from-black/5 dark:via-white/30 darK:to-black/5" />
          <div className="py-8 px-2 flex flex-col items-center text-sm">
            <div className="mt-4 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
              © 2024 • Harvest All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
