"use client";

import useSWR from "swr";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getUserInfo } from "@/lib/api";

type UserInfo = User & {
  access_token?: string;
  state: string;
};

export const useUser = () => {
  const session = useSession();
  const { data, mutate } = useSWR("/user", async () => {
    if (session.status === "authenticated") {
      if (session.data.user?.id) {
        const user = await getUserInfo(session.data.user.id);

        const state_resp = await fetch("/api/notion/state", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wx_id: session.data.user.id }),
        });

        if (!state_resp.ok) {
          return session.data.user as UserInfo;
        }

        const state_json: any = await state_resp.json();

        if (!state_json.ok) {
          return session.data.user as UserInfo;
        }

        if (!user) {
          return {
            ...session.data.user,
            id: session.data.user.id,
            state: state_json.data,
          } as UserInfo;
        }

        return {
          ...session.data.user,
          ...user,
          id: session.data.user.id,
          state: state_json.data,
        } as UserInfo;
      }
    }
    return null;
  });

  useEffect(() => {
    mutate();
  }, [mutate, session.status]);

  return [data, session.status] as const;
};
