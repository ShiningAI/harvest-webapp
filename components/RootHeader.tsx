import Link from "next/link";
import Image from "next/image";
import { SignInButton } from "./SignIn";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const RootHeader = ({ className }: Props) => {
  return (
    <header
      className={cn(
        "relative z-50 w-full flex-none text-sm font-semibold leading-6 text-slate-900",
        className
      )}
    >
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
            <Link
              href="https://priusai.notion.site/Harvest-Home-2ec5486ba6fa42a799e05ebc03c4cc1c"
              target="_blank"
              className="hover:underline"
            >
              博客
            </Link>
            {/* <Link href="/pricing" className="ml-8 hover:underline">
              Pricing
            </Link> */}
          </div>

          <div className="hidden lg:ml-8 lg:flex lg:items-center lg:border-l lg:border-slate-900/15 lg:pl-8">
            <SignInButton />
          </div>
        </div>
      </nav>
    </header>
  );
};
