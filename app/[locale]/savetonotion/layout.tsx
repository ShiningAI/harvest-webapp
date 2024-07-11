"use client";

import { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { closeModal } from "./utility";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col w-full h-full rounded-xl">
      <div className="flex items-center justify-between p-2 rounded-t-xl">
        <div className="pl-2 font-medium leading-none">Notion Harvest</div>
        <Button size="icon" variant="ghost" onClick={closeModal}>
          <XIcon />
        </Button>
      </div>
      {children}
    </div>
  );
}
