"use client";

import { useUser } from "@/hooks/useUser";
import { LogIn } from "./LogIn";
import { SaveToNotionPage } from "./SaveToNotionPage";
import { LoaderCircleIcon } from "lucide-react";

export const runtime = "edge";

export default function Page() {
  const [user, isLoading] = useUser();

  if (isLoading) {
    return (
      <div className="flex flex-col p-3 h-80">
        <div className="flex gap-1 items-center justify-center">
          <LoaderCircleIcon size={24} className="animate-spin" />
          <span>loading...</span>
        </div>
      </div>
    );
  }

  if (user?.notion?.access_token) {
    return (
      <SaveToNotionPage
        access_token={user.notion.access_token}
        current_db={user.current_db}
      />
    );
  }

  return <LogIn />;
}
