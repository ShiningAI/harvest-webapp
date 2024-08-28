"use client";

import Link from "next/link";
import { useRequest } from "ahooks";
import { request } from "@/lib/request";
import { useRouter } from "next/navigation";
import { LoaderCircleIcon, LinkIcon, RotateCwIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Wrap } from "./Wrap";
import { useUser } from "@/hooks/useUser";
import { NotionGuide } from "./NotionGuide";

interface Props {
  isAuth?: boolean;
  access_token: string;
  defaultDatabase?: string;
}

const SelectDatabasesSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-md space-y-6 py-6">
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
};

const SelectDatabases = () => {
  const [user, isLoading] = useUser();

  if (isLoading || !user) {
    return <SelectDatabasesSkeleton />;
  }

  if (!user.notion?.access_token) {
    return <NotionGuide />;
  }

  return (
    <InlineSelectDatabases
      access_token={user.notion.access_token}
      defaultDatabase={user.database?.database_id}
    />
  );
};

const InlineSelectDatabases = ({
  access_token,
  defaultDatabase,
  isAuth,
}: Props) => {
  const { toast } = useToast();
  const { replace } = useRouter();
  const t = useTranslations("Database");
  const [selectedDatabase, setSelectedDatabase] = useState<string>(
    defaultDatabase || ""
  );
  const { loading, data, error, refresh } = useRequest(async () => {
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
      const database = resp.databases[0];
      setSelectedDatabase(database.database_id);
      // TODO 需要重新创建 sync_notion_databases 判断是否保存而不是每次都保存
      fetch("/api/v1/connect_to_notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          database: {
            id: database.database_id,
            name: database.database_title,
            url: database.database_url,
          },
        }),
      }).catch(console.error);
    }
    return { access_token, databases: resp.databases };
  }, {});

  const saveReq = useRequest(
    async (selected_database: string) => {
      if (!selected_database) {
        toast({
          title: t("SelectedDatabase.title"),
          description: t("SelectedDatabase.description"),
        });
        return;
      }

      const database = data?.databases.find(
        (d) => d.database_id === selected_database
      );

      if (!database) {
        toast({
          title: t("SelectedDatabase.title"),
          description: t("SelectedDatabase.description"),
        });
        return;
      }

      const resp = await fetch("/api/v1/connect_to_notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          database: {
            id: database.database_id,
            name: database.database_title,
            url: database.database_url,
          },
        }),
      });

      if (!resp.ok) {
        throw new Error("Connect to Notion failed");
      }
      return resp.json();
    },
    {
      manual: true,
      onSuccess() {
        replace(`/user/accounts`);
      },
    }
  );

  const renderList = (databases: Databases.Info[]) => {
    return (
      <RadioGroup
        value={selectedDatabase}
        onValueChange={(value) => setSelectedDatabase(value)}
      >
        {databases.map((database) => (
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
    );
  };

  const render = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!data) {
      return <SelectDatabasesSkeleton />;
    }

    if (data.databases.length === 0) {
      return (
        <Wrap
          hideTitle
          title={t("NoDatabase.title")}
          description={t("NoDatabase.description")}
        >
          <div className="py-6 flex flex-col items-center">
            <Link href="/sign-in">
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
        >
          <Card>
            <CardContent className="space-y-4 pt-6 py-4 max-h-[calc(100vh-320px)] overflow-auto">
              {renderList(data.databases)}
            </CardContent>
            <CardFooter className="flex justify-end mt-4 gap-2">
              <Link href="/sign-in">
                <Button>{t("reauthorization")}</Button>
              </Link>
            </CardFooter>
          </Card>
        </Wrap>
      );
    }

    return (
      <Wrap
        hideTitle
        title={t("MultipleDatabases.title")}
        description={t("MultipleDatabases.description")}
      >
        <Card>
          <CardTitle className="px-4 py-3 flex items-center justify-between">
            <div>{t("MultipleDatabases.title")}</div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={loading}
                    onClick={refresh}
                  >
                    {loading ? (
                      <LoaderCircleIcon size={16} className="animate-spin" />
                    ) : (
                      <RotateCwIcon size={16} />
                    )}
                    <span className="ml-1">{t("refresh")}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("tips")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardContent className="space-y-4 pt-6 py-4 max-h-[calc(100vh-320px)] overflow-auto">
            {renderList(data.databases)}
          </CardContent>
          <CardFooter className="flex justify-end mt-4 gap-2">
            {/* <Button variant="outline">取消</Button> */}
            <Button
              disabled={saveReq.loading}
              onClick={() => saveReq.run(selectedDatabase)}
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
        <div className="mx-auto w-full max-w-md pt-6">
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

SelectDatabases.Skeleton = SelectDatabasesSkeleton;

export { SelectDatabases };
