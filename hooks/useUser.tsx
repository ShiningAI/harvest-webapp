"use client";

import useSWR from "swr";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { request } from "@/lib/request";

type UserInfo = User & {
  access_token?: string;
};

export const useUser = () => {
  const session = useSession();
  const { data, mutate } = useSWR("/user", async () => {
    if (session.status === "authenticated") {
      if (session.data.user?.id) {
        const user_resp = await request
          .post("/get_user", { wx_user_id: session.data.user.id })
          .then((res) => res.data);

        if (!user_resp.ok) {
          return session.data.user as UserInfo;
        }

        return { ...session.data.user, ...user_resp.data } as UserInfo;
      }
    }
    return null;
  });

  useEffect(() => {
    mutate();
  }, [mutate, session.status]);

  return [data] as const;
};
