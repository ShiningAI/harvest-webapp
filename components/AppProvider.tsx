"use client";

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/toaster";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
};

export { AppProvider };
