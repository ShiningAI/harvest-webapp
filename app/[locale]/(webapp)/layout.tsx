import { PropsWithChildren } from "react";
import Link from "next/link";
import { RootHeader } from "@/components/RootHeader";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <RootHeader shouldShowSignInButton />
      <main className="relative mx-auto w-full max-w-container flex-1 flex flex-col px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="mx-auto w-full max-w-container px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between border-t text-muted-foreground">
        <p className="flex flex-col sm:flex-row sm:items-center">
          <span>&copy; 2024 Harvest.</span>
          <span>All rights reserved.</span>
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://harvest.superai42.com/privacy-policy"
            target="_blank"
            className="hover:underline"
            prefetch={false}
          >
            Privacy
          </Link>
          <Link
            href="https://harvest.superai42.com/terms-of-use"
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

export default RootLayout;
