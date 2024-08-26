"use client";

import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { LinkIcon, StepForwardIcon, LoaderCircleIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useRequest } from "ahooks";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { closeModal } from "../utility";

interface SelectDatabasesProps {
  selected: string;
  onSelected: (value: string) => void;
  databases: Databases.Info[];
  onSuccess?: () => void;
}

export const SelectDatabases = ({
  selected,
  databases,
  onSuccess,
  onSelected,
}: SelectDatabasesProps) => {
  const { toast } = useToast();
  const t = useTranslations("Database");
  const saveReq = useRequest(
    async () => {
      if (!selected) {
        toast({
          title: t("SelectedDatabase.title"),
          description: t("SelectedDatabase.description"),
        });
        return;
      }

      await fetch(`/api/notion/db/${selected}`, { method: "POST" });
    },
    {
      manual: true,
      onSuccess,
    }
  );
  return (
    <div className="py-3 flex flex-col gap-3 h-80">
      <div className="overflow-auto px-3 pb-3 flex-1">
        <RadioGroup
          value={selected}
          onValueChange={(value) => onSelected(value)}
        >
          {databases.map((database) => (
            <Label
              key={database.database_id}
              htmlFor={database.database_id}
              className={cn(
                "flex items-center space-x-2 px-2 font-medium rounded-md hover:bg-gray-50 transition-colors duration-200 ease-in-out cursor-pointer",
                selected === database.database_id && "bg-gray-100"
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
      </div>

      <div className="px-3 pt-3 flex items-center justify-between border-t">
        <Link href="/sign-in" target="_blank" onClick={closeModal}>
          <Button variant="outline">{t("reauthorization")}</Button>
        </Link>
        <Button disabled={saveReq.loading} onClick={saveReq.run}>
          {saveReq.loading ? (
            <LoaderCircleIcon size={16} className="animate-spin" />
          ) : (
            <StepForwardIcon size={16} />
          )}
          <span className="ml-1">{t("next")}</span>
        </Button>
      </div>
    </div>
  );
};
