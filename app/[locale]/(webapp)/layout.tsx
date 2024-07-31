import { PropsWithChildren } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignIn } from "@/components/SignIn";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="relative z-50 w-full flex-none text-sm font-semibold leading-6 text-slate-900">
        <nav className="mx-auto max-w-container border-b px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center py-8">
            <Link
              href="/"
              className="flex items-center gap-2 flex-none text-slate-900"
            >
              <Image src="/icon.png" alt="logo" width={24} height={24} />
              <span className="text-lg font-medium">Harvest</span>
            </Link>

            <div className="ml-auto hidden lg:flex lg:items-center">
              <Link href="/next" className="hover:underline">
                {`What's next`}
              </Link>
              <Link href="/pricing" className="ml-8 hover:underline">
                Pricing
              </Link>
              <Link href="/docs" className="ml-8 hover:underline">
                Docs
              </Link>
            </div>

            <div className="hidden lg:ml-8 lg:flex lg:items-center lg:border-l lg:border-slate-900/15 lg:pl-8">
              <SignIn />
            </div>
          </div>
        </nav>
      </header>
      <main className="relative mx-auto w-full max-w-container flex-1 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="mx-auto w-full max-w-container px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between border-t text-muted-foreground">
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

export default RootLayout;
