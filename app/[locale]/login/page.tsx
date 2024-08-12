"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignInContent } from "@/components/SignIn";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="relative z-50 w-full flex-none text-sm font-semibold leading-6 text-slate-900">
        <nav className="mx-auto max-w-container border-b px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center py-8">
            <Link
              href="/"
              className="flex items-center gap-2 flex-none text-slate-900"
            >
              <Image src="/icon.png" alt="logo" width={24} height={24} />
              <span className="text-lg font-medium">Harvest</span>
            </Link>
          </div>
        </nav>
      </header>
      <div className="flex flex-1 mx-auto w-full h-full max-w-container p-0 flex-col overflow-hidden md:flex-row">
        <SignInContent onLogin={() => router.replace("/user/accounts")} />
      </div>
    </div>
  );
}

export const runtime = "edge";
