"use client";

import { useRequest } from "ahooks";
import { getWebContent } from "../utility";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { request } from "@/lib/request";
import { useTranslations } from "next-intl";

interface SaveToNotionProps {
  token: string;
  db_name?: string;
  current_db?: string;
  onSuccess?: (notion_page_id: string) => void;
}
interface NotionDataProgram {
  page_url?: string;
  page_html?: string;
  page_content?: string;
  current_db?: {
    database_id: string;
  };
  page_properties?: {
    title?: string;
    authors?: string;
    published_time?: string;
    url?: string;
    rating?: string;
    keywords?: string[];
    abstract?: string;
  };
  async_save?: boolean;
}

export const SaveToNotion = ({
  token,
  db_name,
  current_db,
  onSuccess,
}: SaveToNotionProps) => {
  const t = useTranslations("SaveToNotion");
  const req = useRequest(getWebContent);
  const saveReq = useRequest(
    async () => {
      if (!req.data?.content) return;
      let html = req.data.content.replace(
        /<noscript[^>]*>([\s\S]*?)<\/noscript>/gi,
        ""
      );
      html = `<html><head><title>${req.data.title}</title></head><body>${html}</body></html>`;
      const data: NotionDataProgram = {
        async_save: true,
        page_html: html,
        page_url: req.data.url,
        page_properties: {
          title: req.data.title,
        },
      };
      if (current_db) {
        data.current_db = { database_id: current_db };
      }
      try {
        const resp = await request
          .post("/save_page", data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => res.data);
        return (resp.notion_page_id as string).replace(/-/g, "");
      } catch (error) {
        const errorData = { ...data };
        if (data.page_html) errorData.page_html = data.page_html.slice(0, 120);

        (error as any).data = JSON.stringify(errorData, null, 2);
        throw error;
      }
    },
    {
      manual: true,
      onSuccess: (ret) => {
        if (ret) {
          onSuccess?.(ret);
        } else {
          // TODO: Add error message
        }
      },
      onError: (error: any) => {
        fetch("/api/notify/exception", {
          method: "POST",
          body: JSON.stringify({
            error: {
              name: error.name,
              data: error.data,
              message: error.message,
              stack: error.stack,
            },
          }),
        });
      },
    }
  );

  if (req.loading) {
    return (
      <div className="w-full flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  if (req.error) {
    return (
      <div className="text-red-500">
        <details>
          <summary>{t("getPageInfoFailed")}</summary>
          <span>{t("error")}: {req.error.message}</span>
        </details>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-sm font-medium mb-2">{t("pageTitle")}</div>
        <Input
          disabled
          type="text"
          value={req.data?.title}
          placeholder={t("pageTitlePlaceholder")}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          disabled={saveReq.loading}
          onClick={saveReq.run}
          className="w-full"
        >
          {saveReq.loading ? (
            <LoaderCircleIcon size={16} className="animate-spin mr-2" />
          ) : (
            <SendIcon size={16} className="mr-2" />
          )}
          <span>{t("saveTo", { dbName: db_name })}</span>
        </Button>
      </div>

      {!saveReq.loading && saveReq.error && (
        <div className="text-red-500 mt-2">
          <details>
            <summary>{t("saveFailed")}</summary>
            <span>{t("error")}: {saveReq.error.message}</span>
          </details>
        </div>
      )}
    </div>
  );
};
