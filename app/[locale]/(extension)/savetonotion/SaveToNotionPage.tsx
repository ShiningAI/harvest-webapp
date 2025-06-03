"use client";

import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
import { useRequest, useLocalStorageState } from "ahooks";
import { SaveToNotion } from "./SaveToNotion";
import { LoaderCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { closeModal } from "../utility";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SaveToNotionPageProps {
  access_token: string;
  current_db?: string;
}

export const SaveToNotionPage = ({
  access_token,
  current_db,
}: SaveToNotionPageProps) => {
  const t = useTranslations("Database");
  const [savePageId, setSavePageId] = useState<string | null>(null);
  const [currentDb, setCurrentDb] = useLocalStorageState<string | undefined>(
    "use-notion-db",
    {
      defaultValue: current_db,
    }
  );

  const {
    loading,
    data: databases,
    error,
    run,
  } = useRequest(async (noCache = false) => {
    const response = await fetch("/api/notion/databases", {
      method: "POST",
      body: JSON.stringify({ noCache }),
    }).then((res) => res.json<Databases.APIResponse>());

    if (response.ok === false) {
      throw new Error(response.message || "Notion auth failed");
    }
    const databases = response.data;

    let selected_database_id: string | undefined;

    if (current_db && databases.find((db) => db.database_id === current_db)) {
      selected_database_id = current_db;
    } else if (databases.length === 1) {
      selected_database_id = databases[0].database_id;
      await fetch(`/api/notion/db/${selected_database_id}`, { method: "POST" });
    }

    if (selected_database_id) {
      setCurrentDb(selected_database_id);
    }

    return databases;
  }, {});

  const dbName = useMemo(() => {
    if (databases) {
      const db = databases.find((db) => db.database_id === currentDb);
      if (db) {
        return db.database_title || t("title");
      }
    }
    return t("title");
  }, [databases, currentDb, t]);

  const reauthorization = async () => {
    await signOut();
    window.open("/sign-in", "_blank");
    closeModal();
  };

  const handleSelectChange = async (value: string) => {
    setCurrentDb(value);
    await fetch(`/api/notion/db/${value}`, { method: "POST" });
  };

  if (error) {
    return (
      <div className="flex flex-col p-3 h-80">{`${t("error")}: ${
        error.message
      }`}</div>
    );
  }

  if (databases === undefined) {
    return (
      <div className="flex flex-col p-3 h-80">
        <div className="flex gap-1 items-center justify-center">
          <LoaderCircleIcon size={24} className="animate-spin" />
          <span>{t("loading")}</span>
        </div>
      </div>
    );
  }

  if (databases.length === 0) {
    return (
      <div className="flex flex-col p-3 h-80">
        {t("error")}: {t("noDatabasesFound")}
      </div>
    );
  }

  if (savePageId) {
    return (
      <div className="w-full h-80 px-4 flex flex-col items-center justify-center">
        <p className="my-3">
          <CircleCheckIcon className="text-green-500 w-11 h-11" />
        </p>
        <Link
          href={`https://www.notion.so/${savePageId}`}
          target="_blank"
          prefetch={false}
        >
          <Button>{t("openPageInNotion")}</Button>
        </Link>

        <Button className="mt-2" variant="link" onClick={closeModal}>
          {t("closePopup")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-3 h-80">
      <div className="flex flex-col gap-4 p-0 mb-3">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium flex-1">
            {t("MultipleDatabases.title")}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => run(true)}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircleIcon size={16} className="animate-spin mr-1" />
            ) : null}
            {t("refresh")}
          </Button>
          <Button variant="outline" size="sm" onClick={reauthorization}>
            {t("reauthorization")}
          </Button>
        </div>

        <Select value={currentDb} onValueChange={handleSelectChange}>
          <SelectTrigger disabled={loading} className="w-full">
            <SelectValue placeholder={t("SelectedDatabase.title")} />
          </SelectTrigger>
          <SelectContent>
            {databases.map((database) => (
              <SelectItem
                key={database.database_id}
                value={database.database_id}
              >
                {database.database_title || t("title")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentDb && (
        <div className="flex-1 flex flex-col border-t pt-3">
          <SaveToNotion
            token={access_token}
            db_name={dbName}
            current_db={currentDb}
            onSuccess={(pageId) => {
              setSavePageId(pageId);
            }}
          />
        </div>
      )}
    </div>
  );
};
