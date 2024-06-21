import React from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { BaseProps, CollectionInfo } from "./types";
import { Button } from "@/components/ui/button";
import { useRequest } from "ahooks";
import { Collection } from "./Collection";
import {
  getCollectionId,
  getCollections,
  setCollectionId,
  useStorageState,
} from "./utils";
import { Skeleton } from "@/components/ui/skeleton";
import { SELECTD_FORMS } from "@/lib/constant";

type Props = BaseProps & { first?: boolean };

export const SelectForm = ({ first, ...props }: Props) => {
  const { loading } = useRequest(async () => {
    if (!first) return "";
    const collections = await getCollections();
    const collectionId = await getCollectionId();
    const c = collections?.find((c) => c.id === collectionId);
    if (c) {
      props.switchRoute("savePage", {});
      return collectionId;
    }
    return "";
  });

  if (loading) return <SkeletonForm />;

  return <SelectCollections {...props} />;
};

const SkeletonForm = () => (
  <div className="w-full flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  </div>
);

const SelectCollections = ({ switchRoute }: BaseProps) => {
  const [loading, collections, setCollections] = useStorageState(
    SELECTD_FORMS,
    [] as CollectionInfo[]
  );

  if (loading) return <SkeletonForm />;

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
          onRemove={async () => {
            await setCollections(
              collections.filter((c) => c.id !== collection.id)
            );
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
