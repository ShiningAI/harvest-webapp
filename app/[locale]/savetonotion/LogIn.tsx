"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { closeModal } from "./utility";

interface Props {
  state: string;
}

export const LogIn = ({ state }: Props) => {
  return (
    <div className="w-full p-4 flex flex-col items-center">
      <p>To save this page to Notion, </p>
      <p className="mb-3">please log in first.</p>

      <Link href={`/s/redirect/${state}`} target="_blank" onClick={closeModal}>
        <Button>Log In</Button>
      </Link>
    </div>
  );
};
