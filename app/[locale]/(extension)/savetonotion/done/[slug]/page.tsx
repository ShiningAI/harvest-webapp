"use client";

import { CircleCheckIcon } from "lucide-react";
import { closeModal } from "../../utility";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const runtime = "edge";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full px-4 py-12 flex flex-col items-center">
      <p className="my-3">
        <CircleCheckIcon className="text-green-500 w-11 h-11" />
      </p>
      <Link
        href={`https://www.notion.so/${params.slug}`}
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
