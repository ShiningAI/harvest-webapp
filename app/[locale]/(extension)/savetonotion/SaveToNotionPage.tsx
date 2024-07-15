"use client";

import { request } from "@/lib/request";
import { useRequest } from "ahooks";
import { SaveToNotion } from "./SaveToNotion";
import { SelectDatabases } from "./SelectDatabases";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";

interface SaveToNotionPageProps {
  access_token: string;
}

export const SaveToNotionPage = ({ access_token }: SaveToNotionPageProps) => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string>("");
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

    if (resp.selected_database_id) {
      setSelected(resp.selected_database_id);
    } else if (resp.databases.length === 1) {
      setSelected(resp.databases[0].database_id);
    }

    return resp;
  }, {});

  const databases = data?.databases;

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
    return <SaveToNotion token={access_token} />;
  }

  return (
    <SelectDatabases
      selected={selected}
      token={access_token}
      databases={databases}
      onSuccess={() => setStep(2)}
      onSelected={(value) => setSelected(value)}
    />
  );
};
