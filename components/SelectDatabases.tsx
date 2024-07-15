"use client";

import Link from "next/link";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon, LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Wrap } from "./Wrap";

interface Props {
  isAuth: boolean;
  access_token: string;
  state: string;
}

export const SelectDatabases = ({ state, access_token, isAuth }: Props) => {
  const { toast } = useToast();
  const { replace } = useRouter();
  const t = useTranslations("Database");
  const [selectedDatabase, setSelectedDatabase] = useState<string>("");
  const { loading, data, error } = useRequest(async () => {
    const resp = await request
      .post<Databases.Response>(
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
          title: t("SelectedDatabase.title"),
          description: t("SelectedDatabase.description"),
        });
        return;
      }

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
        replace(`/dashboard/select/success`);
      },
    }
  );

  const render = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (loading || !data) {
      return (
        <div className="mx-auto max-w-md space-y-6 py-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold w-1/3 hidden h-9 bg-muted animate-pulse"></h1>
            <p className="text-muted-foreground w-4/5 h-6 bg-muted animate-pulse"></p>
          </div>
          <Card>
            <CardContent className="space-y-4 pt-6 py-4 max-h-[calc(100vh-320px)] overflow-auto">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center h-8 font-medium rounded-md bg-muted animate-pulse"
                ></div>
              ))}
            </CardContent>

            <CardFooter className="flex justify-end mt-4 gap-2">
              <div className="w-16 h-9 rounded-md bg-muted animate-pulse"></div>
            </CardFooter>
          </Card>
        </div>
      );
    }

    if (data.databases.length === 0) {
      return (
        <Wrap
          hideTitle
          title={t("NoDatabase.title")}
          description={t("NoDatabase.description")}
        >
          <div className="py-6 flex flex-col items-center">
            <Link replace href={`/s/${state}`}>
              <Button>{t("reauthorization")}</Button>
            </Link>
          </div>
        </Wrap>
      );
    }

    if (data.databases.length === 1) {
      return (
        <Wrap
          hideTitle
          title={t("SingleDatabase.title")}
          description={t("SingleDatabase.description")}
        ></Wrap>
      );
    }

    return (
      <Wrap
        hideTitle
        title={t("MultipleDatabases.title")}
        description={t("MultipleDatabases.description")}
      >
        <Card>
          <CardContent className="space-y-4 pt-6 py-4 max-h-[calc(100vh-320px)] overflow-auto">
            <RadioGroup
              value={selectedDatabase}
              onValueChange={(value) => setSelectedDatabase(value)}
            >
              {data.databases.map((database) => (
                <Label
                  key={database.database_id}
                  htmlFor={database.database_id}
                  className={cn(
                    "flex items-center space-x-2 px-2 font-medium rounded-md hover:bg-gray-50 transition-colors duration-200 ease-in-out cursor-pointer",
                    selectedDatabase === database.database_id && "bg-gray-100"
                  )}
                >
                  <RadioGroupItem
                    value={database.database_id}
                    id={database.database_id}
                  />
                  <div className="py-2 flex-1">{database.database_title}</div>
                  <Link
                    href={database.database_url}
                    target="_blank"
                    className="text-base w-5 h-5 flex items-center justify-center text-muted-foreground rounded-sm cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    prefetch={false}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <LinkIcon size={12} />
                  </Link>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-end mt-4 gap-2">
            {/* <Button variant="outline">取消</Button> */}
            <Button
              disabled={saveReq.loading}
              onClick={saveReq.run}
              className="space-x-1"
            >
              {saveReq.loading && (
                <LoaderCircleIcon size={16} className="w-4 h-4 animate-spin" />
              )}
              <span>{t("save")}</span>
            </Button>
          </CardFooter>
        </Card>
      </Wrap>
    );
  };

  if (isAuth) {
    return (
      <>
        <div className="mx-auto max-w-md pt-6">
          <div className="space-y-2 px-3 text-center">
            <h1 className="text-3xl font-bol">{t("Auth.Success.title")}</h1>
            {loading && (
              <p className="text-muted-foreground">
                {t("Auth.Success.description")}
              </p>
            )}
          </div>
        </div>
        {render()}
      </>
    );
  }

  return render();
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
