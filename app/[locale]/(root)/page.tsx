import Link from "next/link";
import {
  AudioWaveform,
  CheckIcon,
  MessageSquareHeart,
  MonitorUpIcon,
  ShieldCheckIcon,
  SmileIcon,
  SparklesIcon,
} from "lucide-react";
import { Hero } from "./Hero";
import { Section1, Section2, Section3 } from "./Sections";

function Home() {
  return (
    <>
      <section className="w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16 bg-cyan-100/20 dark:bg-cyan-900/10">
        <div className="w-full p-6 flex-col gap-8 relative max-w-full xl:max-w-6xl grid lg:grid-cols-2 items-start">
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-4xl lg:text-5xl lg:leading-14 font-semibold md:max-w-xl">
              轻松收藏，随时随地
            </h1>
            <p className="md:text-lg md:max-w-lg">
              使用 Harvest，您可以快速将社交软件中的信息保存到 Notion
              等平台，提升工作效率。
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-start">
              <Link
                className="font-inter rounded-lg lg:hover:text-gray-800"
                href="/pricing"
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
          <Hero className="w-full lg:w-4/5 mx-auto rounded-md relative z-10 hard-shadow my-4 bg-gray-800" />
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
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 dark:text-gray-500">
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  社交软件集成.
                </dt>
                <dd className="inline">
                  支持微信、Line等主流社交软件，方便快捷。
                </dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  多平台同步.
                </dt>
                <dd className="inline">
                  将信息保存到 Notion 等笔记软件，随时随地访问。
                </dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  用户友好界面.
                </dt>
                <dd className="inline">简单易用的界面，让您轻松上手。</dd>
              </div>
            </dl>
            <div className="flex flex-row gap-4"></div>
            <p className="text-sm"></p>
          </div>
          <Section1 className="relative w-full lg:w-4/5 rounded-md lg:scale-90 hover:scale-100 transition-all hard-shadow lg:-left-6 my-4 bg-gray-800" />
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
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  高效.
                </dt>
                <dd className="inline">快速保存信息，节省时间。</dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  安全.
                </dt>
                <dd className="inline">确保您的数据安全，隐私保护。</dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  灵活.
                </dt>
                <dd className="inline">支持多种社交软件，满足不同需求。</dd>
              </div>
            </dl>
            <div className="flex flex-row gap-4"></div>
            <p className="text-sm"></p>
          </div>
          <Section2 className="relative w-full lg:w-4/5 rounded-md lg:scale-90 hover:scale-100 transition-all hard-shadow lg:-right-6 my-4 bg-gray-800" />
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
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  1. 连接社交软件.
                </dt>
                <dd className="inline">将 Harvest 与您的社交软件账户连接。</dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  2. 连接笔记软件.
                </dt>
                <dd className="inline">将 Harvest 与您的笔记软件账户连接。</dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  3. 选择要保存的信息.
                </dt>
                <dd className="inline">在社交软件中选择链接或聊天记录。</dd>
              </div>
              <div className="">
                <dt className="inline font-semibold text-gray-900 dark:text-gray-100">
                  <CheckIcon
                    size={20}
                    className="inline -mt-0.5 text-primary-500"
                  />
                  4. 保存到笔记软件.
                </dt>
                <dd className="inline">一键发送到 Harvest 收藏助手。</dd>
              </div>
            </dl>
            <div className="flex flex-row gap-4"></div>
            <p className="text-sm"></p>
          </div>
          <Section3 className="relative w-full lg:w-4/5 rounded-md lg:scale-90 hover:scale-100 transition-all hard-shadow lg:-left-6 my-4 bg-gray-800" />
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
              href="/pricing"
            >
              <button className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-amber-300/70 hover:bg-amber-300/90 dark:bg-amber-700 dark:hover:bg-amber-700/90 h-12 rounded-md px-6 text-md shrink-0">
                立刻开始
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

export const runtime = "edge";
