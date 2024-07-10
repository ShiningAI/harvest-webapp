"use client";

import Link from "next/link";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import { useRouter } from "next/navigation";
import { LoaderCircle, CheckCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  contactId: string;
}

interface Database {
  database_id: string;
  database_url: string;
  database_title: string;
}

interface DatabasesResponse {
  num_of_databases: number;
  databases: Database[];
}

export const SelectDatabases = ({ contactId }: Props) => {
  const { toast } = useToast();
  const { replace } = useRouter();
  const t = useTranslations("Database");
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const { loading, data, error } = useRequest(async () => {
    const access_token = await getAccessToken(contactId);
    const resp = await request
      .post<DatabasesResponse>(
        "/sync_notion_databases",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data);
    if (resp.databases.length === 1) {
      setSelectedDatabase(resp.databases[0].database_id);
    }
    return { access_token, databases: resp.databases };
  }, {});

  const saveReq = useRequest(
    async () => {
      if (!selectedDatabase) {
        toast({
          title: "Please select a database",
          description: "Please select a database to save data to Notion",
        });
        return;
      }

      const access_token = await getAccessToken(contactId);
      const resp = await request
        .post(
          "/connect_to_notion",
          {
            database_id: selectedDatabase,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((res) => res.data);
      return resp;
    },
    {
      manual: true,
      onSuccess() {
        replace(`/s/success`);
      },
    }
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading || !data) {
    return (
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold w-1/3 h-9 bg-muted animate-pulse"></h1>
          <p className="text-muted-foreground w-1/2 h-6 bg-muted animate-pulse"></p>
        </div>
        <div>loading...</div>
      </div>
    );
  }

  if (data.databases.length === 0) {
    return (
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{t("NoDatabase.title")}</h1>
          <p className="text-muted-foreground">{t("NoDatabase.description")}</p>
        </div>
      </div>
    );
  }

  if (data.databases.length === 1) {
    return (
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">{t("SingleDatabase.title")}</h1>
          <p className="text-muted-foreground">
            {t("SingleDatabase.description")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{t("MultipleDatabases.title")}</h1>
        <p className="text-muted-foreground">
          {t("MultipleDatabases.description")}
        </p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="grid gap-4 pt-4 box-content">
            {data.databases.map((database) => (
              <div
                key={database.database_id}
                className={cn(
                  "w-full p-2 flex items-center justify-between rounded-md cursor-pointer overflow-hidden transition-colors",
                  database.database_id === selectedDatabase
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => setSelectedDatabase(database.database_id)}
              >
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-medium">{database.database_title}</h3>
                  <Link
                    href={database.database_url}
                    target="_blank"
                    className="text-sm text-muted-foreground hover:underline"
                    prefetch={false}
                  >
                    <span className="truncate block">
                      {database.database_url}
                    </span>
                  </Link>
                </div>

                {database.database_id === selectedDatabase && (
                  <CheckCheckIcon size={20} className="w-6 h-6" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {/* <Button variant="outline">取消</Button> */}
          <Button onClick={saveReq.run} className="space-x-1">
            {saveReq.loading && (
              <LoaderCircle size={16} className="w-4 h-4 animate-spin" />
            )}
            <span>{t("save")}</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export async function getAccessToken(wx_user_id: string) {
  const user_resp = await request
    .post("/get_user", { wx_user_id })
    .then((res) => res.data);

  if (!user_resp.ok) {
    return null;
  }
  return user_resp.data.access_token as string;
}
