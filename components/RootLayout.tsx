import { PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function RootLayout({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-4 shadow">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icon.png" alt="logo" width={24} height={24} />
          <span className="text-lg font-medium">Harvest</span>
        </Link>
        <div className="flex items-center gap-2"></div>
      </header>
      <main className={cn("flex-1 px-3 py-6 sm:px-6", className)}>
        {children}
      </main>
      <footer className="flex items-center justify-between border-t px-6 py-4 text-muted-foreground">
        <p className="flex flex-col sm:flex-row sm:items-center">
          <span>&copy; 2024 Harvest.</span>
          <span>All rights reserved.</span>
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://harvest.prius.ai/privacy-policy"
            target="_blank"
            className="hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
          <Link
            href="https://harvest.prius.ai/terms-of-use"
            target="_blank"
            className="hover:underline"
            prefetch={false}
          >
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}
