"use client";

import useSWR from "swr";
import { User } from "next-auth";

type UserInfo = User & {
  current_db?: string;
  weixin: null | {
    unionid: string;
    name: string;
    avatar: string;
  };
  notion: null | {
    name: string;
    email: string;
    avatar?: string;
    access_token?: string;
  };
  database: null | {
    database_id: string;
    database_url: string;
    database_title: string;
  };
};

export const useUser = () => {
  const { data, isLoading } = useSWR("/user", async () => {
    const response = await fetch("/api/v1/user", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const respJson = await response.json<any>();

    if (!respJson.ok) {
      return null;
    }

    return respJson.data as UserInfo;
  });

  return [data, isLoading] as const;
};
