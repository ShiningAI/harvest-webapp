"use client";

import { useRouter } from "next/navigation";
import { SignInContent } from "@/components/SignIn";
import { RootHeader } from "@/components/RootHeader";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <RootHeader />
      <div className="flex flex-1 mx-auto w-full h-full max-w-container p-0 flex-col overflow-hidden md:flex-row">
        <SignInContent onLogin={() => router.replace("/user/accounts")} />
      </div>
    </div>
  );
}

export const runtime = "edge";
