"use client";

import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import { SaveToNotion } from "./SaveToNotion";
import { SelectDatabases } from "./SelectDatabases";
import { LoaderCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { closeModal } from "../utility";

interface SaveToNotionPageProps {
  state: string;
  access_token: string;
  current_db?: string;
}

export const SaveToNotionPage = ({
  state,
  access_token,
  current_db,
}: SaveToNotionPageProps) => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string>("");
  const [savePageId, setSavePageId] = useState<string | null>(null);
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

    let selected_database_id: string | undefined;

    if (
      current_db &&
      resp.databases.find((db) => db.database_id === current_db)
    ) {
      selected_database_id = current_db;
    } else if (resp.databases.length === 1) {
      selected_database_id = resp.databases[0].database_id;
      await fetch(`/api/notion/db/${selected_database_id}`, { method: "POST" });
    }

    if (selected_database_id) {
      setSelected(selected_database_id);
      setStep(2);
    }

    return resp;
  }, {});

  const databases = data?.databases;

  const dbName = useMemo(() => {
    if (databases) {
      return databases.find((db) => db.database_id === selected)
        ?.database_title;
    }
    return "";
  }, [databases, selected]);

  if (error) {
    return (
      <div className="flex flex-col p-3 h-80">{`Error: ${error.message}`}</div>
    );
  }

  if (loading || databases === undefined) {
    return (
      <div className="flex flex-col p-3 h-80">
        <div className="flex gap-1 items-center justify-center">
          <LoaderCircleIcon size={24} className="animate-spin" />
          <span>loading...</span>
        </div>
      </div>
    );
  }

  if (databases.length === 0) {
    return (
      <div className="flex flex-col p-3 h-80">Error: No databases found</div>
    );
  }

  if (step === 2) {
    return (
      <SaveToNotion
        token={access_token}
        db_name={dbName}
        current_db={selected}
        onBack={() => {
          setStep(1);
        }}
        onSuccess={(pageId) => {
          setSavePageId(pageId);
          setStep(3);
        }}
      />
    );
  }

  if (step === 3) {
    if (!savePageId) {
      return <div className="flex flex-col p-3 h-80">Error: No page found</div>;
    }
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
          <Button>Open Page in Notion</Button>
        </Link>

        <Button className="mt-2" variant="link" onClick={closeModal}>
          Close Popup
        </Button>
      </div>
    );
  }

  return (
    <SelectDatabases
      state={state}
      selected={selected}
      databases={databases}
      onSuccess={() => {
        setStep(2);
      }}
      onSelected={(value) => setSelected(value)}
    />
  );
};
