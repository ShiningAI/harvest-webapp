import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Notion Auth",
  description: "Notion Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <main className="flex min-h-screen flex-col items-center p-6">
        <h1 className="text-3xl">Notion Auth</h1>
        <div className="mt-6 flex-1 w-full flex flex-col items-center">
          {children}
        </div>
      </main>
    </Suspense>
  );
}
