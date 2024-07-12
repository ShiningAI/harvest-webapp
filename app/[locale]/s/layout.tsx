import { RootLayout } from "@/components/RootLayout";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RootLayout className="w-full flex flex-col items-center">
      {children}
    </RootLayout>
  );
}
