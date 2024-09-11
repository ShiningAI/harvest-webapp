import Link from "next/link";
import Image from "next/image";
import { RootHeader } from "@/components/RootHeader";
import {
  AudioWaveform,
  FolderSync,
  MessageSquareHeart,
  MonitorUpIcon,
  ShieldCheckIcon,
  SmileIcon,
  SparklesIcon,
} from "lucide-react";

function Home() {
  return (
    <>
      <RootHeader className="bg-cyan-100/20 dark:bg-cyan-900/10" />
      <section className="w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16 bg-cyan-100/20 dark:bg-cyan-900/10">
        <div className="w-full p-6 flex-col gap-8 relative max-w-full xl:max-w-6xl grid lg:grid-cols-2 items-start">
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-4xl lg:text-5xl lg:leading-14 font-semibold md:max-w-xl">
              轻松收藏，随时随地
            </h1>
            <p className="md:text-lg md:max-w-lg">
              使用 Harvest，您可以快速将社交软件中的信息保存到 Notion
              和飞书，提升工作效率。
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-start">
              <Link
                className="font-inter rounded-lg lg:hover:text-gray-800"
                href="/login"
              >
                <button className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cyan-300/70 text-secondary-foreground hover:bg-cyan-300/90 dark:bg-cyan-700 dark:hover:bg-cyan-700/90 h-12 rounded-md px-6 text-md">
                  立刻开始
                </button>
              </Link>
              <Link
                className="font-inter rounded-lg lg:hover:text-gray-800"
                href="#readmore"
              >
                <button className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-secondary-300 dark:border-secondary-900 hover:bg-cyan-100/50 dark:hover:bg-cyan-900 h-12 rounded-md px-6 text-md">
                  了解更多
                </button>
              </Link>
            </div>
          </div>
          <Image
            alt="轻松收藏，随时随地"
            width={425}
            height={425}
            className="w-full mx-auto rounded-md relative z-10 hard-shadow my-4"
            src="/imgs/hero/1.jpeg"
          />
        </div>
      </section>
      <section
        id="readmore"
        className="w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16"
      >
        <div
          rel="nofollow noopener noreferrer"
          className="w-full min-h-[350px] p-6 flex-col items-center relative max-w-full xl:max-w-7xl grid lg:grid-cols-2"
        >
          <div className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1 items-start">
            <h2 className="text-4xl font-semibold">什么是 Harvest</h2>
            <p>
              Harvest
              是一个收藏助手，帮助您将社交软件中的信息轻松保存到笔记软件。
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-500 lg:max-w-md">
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-check h-5 w-5 inline -mt-0.5 text-primary-500"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  社交软件集成.
                </dt>
                <dd className="inline">
                  支持微信、Line等主流社交软件，方便快捷。
                </dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-check h-5 w-5 inline -mt-0.5 text-primary-500"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  多平台同步.
                </dt>
                <dd className="inline">
                  将信息保存到 Notion、飞书等笔记软件，随时随地访问。
                </dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-check h-5 w-5 inline -mt-0.5 text-primary-500"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  用户友好界面.
                </dt>
                <dd className="inline">简单易用的界面，让您轻松上手。</dd>
              </div>
            </dl>
            <div className="flex flex-row gap-4"></div>
            <p className="text-sm"></p>
          </div>
          <Image
            alt="什么是 Harvest"
            width={425}
            height={425}
            className="relative w-full rounded-md lg:scale-90 hover:scale-100 transition-all hard-shadow lg:-left-6 my-4"
            src="/imgs/sections/1.jpeg"
          />
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16 bg-cyan-100/20 dark:bg-cyan-900/10">
        <div
          rel="nofollow noopener noreferrer"
          className="w-full min-h-[350px] p-6 flex-col items-center relative max-w-full xl:max-w-7xl grid lg:grid-cols-2"
        >
          <div className="flex flex-col gap-4 items-start">
            <h2 className="text-4xl font-semibold">为什么选择 Harvest</h2>
            <p>Harvest 让信息收藏变得简单高效，适合各种用户需求。</p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-500 lg:max-w-md">
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-check h-5 w-5 inline -mt-0.5 text-primary-500"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  高效.
                </dt>
                <dd className="inline">快速保存信息，节省时间。</dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-check h-5 w-5 inline -mt-0.5 text-primary-500"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  安全.
                </dt>
                <dd className="inline">确保您的数据安全，隐私保护。</dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-check h-5 w-5 inline -mt-0.5 text-primary-500"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  灵活.
                </dt>
                <dd className="inline">支持多种社交软件，满足不同需求。</dd>
              </div>
            </dl>
            <div className="flex flex-row gap-4"></div>
            <p className="text-sm"></p>
          </div>
          <Image
            alt="为什么选择 Harvest"
            width="425"
            height="425"
            className="relative w-full rounded-md lg:scale-90 hover:scale-100 transition-all hard-shadow lg:-right-6 my-4"
            src="/imgs/sections/2.jpeg"
          />
        </div>
      </section>
      <section className="w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16">
        <div
          rel="nofollow noopener noreferrer"
          className="w-full p-6 min-h-[350px] flex-col items-center relative max-w-full xl:max-w-7xl grid lg:grid-cols-2"
        >
          <div className="flex flex-col gap-4 lg:col-start-2 lg:row-start-1 items-start">
            <h2 className="text-4xl font-semibold">如何使用 Harvest</h2>
            <p>按照以下步骤使用 Harvest，轻松收藏信息。</p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-500 lg:max-w-md">
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-check h-5 w-5 inline -mt-0.5 text-primary-500"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  1. 连接社交软件.
                </dt>
                <dd className="inline">将 Harvest 与您的社交软件账户连接。</dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-check h-5 w-5 inline -mt-0.5 text-primary-500"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  2. 选择要保存的信息.
                </dt>
                <dd className="inline">在社交软件中选择链接或聊天记录。</dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-check h-5 w-5 inline -mt-0.5 text-primary-500"
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  3. 保存到笔记软件.
                </dt>
                <dd className="inline">一键保存到 Notion 或飞书。</dd>
              </div>
            </dl>
            <div className="flex flex-row gap-4"></div>
            <p className="text-sm"></p>
          </div>
          <Image
            alt="如何使用 Harvest"
            width="425"
            height="425"
            className="relative w-full rounded-md lg:scale-90 hover:scale-100 transition-all hard-shadow lg:-left-6 my-4"
            src="/imgs/sections/3.jpeg"
          />
        </div>
      </section>
      <section className="relative w-full flex justify-center items-center gap-8 py-12 lg:py-16 flex-col bg-cyan-100/20 dark:bg-cyan-900/10 overflow-hidden">
        <div className="hidden lg:flex justify-center w-full h-full absolute -bottom-1/2">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="w-full lg:w-2/3 h-auto absolute -z-10"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#gradient-secondary)"
              fillOpacity="0.7"
            ></circle>
            <defs>
              <radialGradient
                id="gradient-secondary"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                <stop
                  stopColor="var(--secondary-lighter-hex)"
                  stopOpacity="0.5"
                ></stop>
                <stop
                  offset="1"
                  stopColor="var(--secondary-dark-hex)"
                  stopOpacity="0"
                ></stop>
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="w-full p-6 max-w-full xl:max-w-6xl relative z-10">
          <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
            Harvest 的关键特性
          </h2>
          <div className="mt-12 flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            <div className="flex flex-col gap-4 py-4">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-md bg-cyan-100/30 border border-secondary-100/70 dark:border-secondary-900 dark:bg-cyan-900/70 text-secondary-500"
                aria-describedby="icon"
              >
                <MessageSquareHeart />
              </div>
              <h3 className="text-lg font-semibold">社交软件集成</h3>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                支持微信、Line等多种社交软件，方便用户使用。
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-md bg-cyan-100/30 border border-secondary-100/70 dark:border-secondary-900 dark:bg-cyan-900/70 text-secondary-500"
                aria-describedby="icon"
              >
                <MonitorUpIcon />
              </div>
              <h3 className="text-lg font-semibold">多平台同步</h3>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                将信息无缝保存到 Notion、飞书等笔记软件。
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-md bg-cyan-100/30 border border-secondary-100/70 dark:border-secondary-900 dark:bg-cyan-900/70 text-secondary-500"
                aria-describedby="icon"
              >
                <SmileIcon />
              </div>
              <h3 className="text-lg font-semibold">用户友好界面</h3>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                简单直观的操作界面，适合所有用户。
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-md bg-cyan-100/30 border border-secondary-100/70 dark:border-secondary-900 dark:bg-cyan-900/70 text-secondary-500"
                aria-describedby="icon"
              >
                <ShieldCheckIcon />
              </div>
              <h3 className="text-lg font-semibold">安全性</h3>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                确保用户数据的安全和隐私。
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-md bg-cyan-100/30 border border-secondary-100/70 dark:border-secondary-900 dark:bg-cyan-900/70 text-secondary-500"
                aria-describedby="icon"
              >
                <SparklesIcon />
              </div>
              <h3 className="text-lg font-semibold">高效收藏</h3>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                快速保存信息，提升工作效率。
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-md bg-cyan-100/30 border border-secondary-100/70 dark:border-secondary-900 dark:bg-cyan-900/70 text-secondary-500"
                aria-describedby="icon"
              >
                <AudioWaveform />
              </div>
              <h3 className="text-lg font-semibold">灵活性</h3>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                支持多种信息类型的保存，满足不同需求。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16 bg-amber-100/20 dark:bg-amber-900/10">
        <div className="w-full p-6 container-narrow">
          <h2 className="text-3xl font-semibold leading-tight max-w-xs sm:max-w-none md:text-4xl lg:text-5xl fancyHeading">
            迫不及待想使用 Harvest？
          </h2>
          <p className="mt-6 md:text-xl">立即开始您的收藏之旅</p>
          <div className="mt-6 flex flex-wrap gap-4 w-full items-center">
            <Link
              rel="nofollow"
              className="font-inter rounded-lg lg:hover:text-gray-800"
              href="/login"
            >
              <button className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-300/70 hover:bg-amber-300/90 dark:bg-amber-700 dark:hover:bg-amber-700/90 h-12 rounded-md px-6 text-md shrink-0">
                立刻开始
              </button>
            </Link>
          </div>
        </div>
      </section>

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
                    href="https://harvest.prius.ai/"
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
                    href="https://harvest.prius.ai/privacy-policy"
                    target="_blank"
                    className="hover:underline"
                    prefetch={false}
                  >
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://harvest.prius.ai/terms-of-use"
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

export default Home;

export const runtime = "edge";
