"use client";

import { useRouter } from "next/navigation";
import { SignInContent } from "@/components/SignIn";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex flex-1 h-full p-0 w-auto flex-col overflow-hidden md:flex-row">
      <SignInContent onLogin={() => router.replace("/user/accounts")} />
    </div>
  );
}
