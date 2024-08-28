"use client";

import { useUser } from "@/hooks/useUser";
import { SelectDatabases } from "@/components/SelectDatabases";
import { NotionGuide } from "@/components/NotionGuide";

export default function Page() {
  const [user] = useUser();

  if (!user) {
    return <SelectDatabases.Skeleton />;
  }
  return <NotionGuide rebind={!!user.notion?.access_token} />;
}

export const runtime = "edge";
