"use client";

import { useRequest } from "ahooks";
import { getWebContent } from "../utility";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, LoaderCircleIcon, SendIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { request } from "@/lib/request";

interface SaveToNotionProps {
  token: string;
  db_name?: string;
  current_db?: string;
  onBack?: () => void;
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
  onBack,
  onSuccess,
}: SaveToNotionProps) => {
  const req = useRequest(getWebContent);
  const saveReq = useRequest(
    async () => {
      if (!req.data?.content) return;
      let html = req.data.content.replace(/<noscript[^>]*>([\s\S]*?)<\/noscript>/gi, "")
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

  const render = () => {
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
      return <div className="text-red-500">Error: {req.error.message}</div>;
    }

    return (
      <>
        <div className="mb-4">
          <Input
            disabled
            type="text"
            value={req.data?.title}
            placeholder="Search Databases"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={saveReq.loading} onClick={saveReq.run}>
            {saveReq.loading ? (
              <LoaderCircleIcon size={16} className="animate-spin" />
            ) : (
              <SendIcon size={16} />
            )}
            <span className="ml-1">Save Page</span>
          </Button>
        </div>

        {!saveReq.loading && saveReq.error && (
          <div className="text-red-500 mt-2">
            Error: {saveReq.error.message}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col p-3 h-80">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full text-foreground mr-2"
            onClick={onBack}
          >
            <ChevronLeftIcon size={16} />
          </Button>
          <span>form</span>
        </div>
        {db_name && (
          <div className="pl-2 font-medium leading-none">{db_name}</div>
        )}
      </div>

      <div className="w-full flex-1">{render()}</div>
    </div>
  );
};
