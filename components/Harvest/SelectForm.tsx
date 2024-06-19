import React from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { BaseProps } from "./types";
import { Button } from "@/components/ui/button";
import { useRequest } from "ahooks";
import { Collection } from "./Collection";
import { getCollectionId, getCollections, setCollectionId } from "./utils";
import { Skeleton } from "@/components/ui/skeleton";

export const SelectForm = ({
  first,
  switchRoute,
}: BaseProps & { first?: boolean }) => {
  const { loading, data: collections } = useRequest(async () => {
    const collectionId = await getCollectionId();
    if (collectionId && first) {
      switchRoute("savePage", {});
      return [];
    }

    const collections = await getCollections();
    return collections;
  });

  if (loading) {
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

  return (
    <div className="p-6 pt-3 grid gap-1">
      {collections?.map((collection) => (
        <Collection
          key={collection.id}
          collection={collection}
          onClick={async () => {
            await setCollectionId(collection.id);
            switchRoute("savePage", { collection });
          }}
        />
      ))}

      <Button onClick={() => switchRoute("addForm")}>
        <PlusCircledIcon />
        <span className="ml-1">Add New Form</span>
      </Button>
    </div>
  );
};
