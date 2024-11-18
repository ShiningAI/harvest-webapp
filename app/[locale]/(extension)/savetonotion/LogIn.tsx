"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { closeModal } from "../utility";

export const LogIn = () => {
  const t = useTranslations("SaveToNotion.LogIn");

  return (
    <div className="flex-1 flex flex-col p-3 items-center justify-center text-sm">
      <h2 className="block text-center mt-auto mb-4">{t("title")}</h2>

      <Link
        href={`/sign-in`}
        target="_blank"
        prefetch={false}
        onClick={closeModal}
      >
        <Button>{t("button")}</Button>
      </Link>

      <h3 className="mt-1 text-xs text-primary text-center">
        {t.rich("description", {
          terms: (chunks) => (
            <Link
              href="https://harvest.superai42.com/terms-of-use"
              target="_blank"
              className="text-blue-500 hover:underline"
              prefetch={false}
            >
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link
              href="https://harvest.superai42.com/privacy-policy"
              target="_blank"
              className="text-blue-500 hover:underline"
              prefetch={false}
            >
              {chunks}
            </Link>
          ),
        })}
      </h3>
      <h3 className="text-lg font-bold mt-6 self-start">{t("FQA.title")}</h3>
      <p className="text-sm">
        {t.rich("FQA.description", {
          a: (chunks) => (
            <Link
              href="https://copyto.notion.site/Enable-cookies-for-Copy-To-Notion-5f71e23f1a23495e94e68d3034d47f5e"
              target="_blank"
              className="text-blue-500 hover:underline"
              prefetch={false}
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
      <div className="w-full text-center text-sm text-[12px] text-primary mt-4">
        Powered by
        <Link
          href="https://harvest.superai42.com"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          &copy;Harvest.
        </Link>
      </div>
    </div>
  );
};
