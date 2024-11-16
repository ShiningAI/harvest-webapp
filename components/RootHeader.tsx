import Link from "next/link";
import Image from "next/image";
import { SignInButton } from "./SignIn";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  shouldShowSignInButton?: boolean;
}

export const RootHeader = ({ className, shouldShowSignInButton }: Props) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex h-14 items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden md:flex">
          <Link className="text-lg font-medium mr-16" href="/">
            <div className="flex items-center gap-x-2 cursor-pointer">
              <Image
                width={128}
                height={128}
                src="/icon.png"
                alt="Harvest"
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold">Harvest</h1>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <div className="md:hidden w-full flex items-center gap-x-2">
            <Link className="text-lg font-medium mr-16" href="/">
              <div className="flex items-center gap-x-2 cursor-pointer">
                <Image
                  width={128}
                  height={128}
                  src="/icon.png"
                  alt="人生发展体系"
                  className="w-8 h-8"
                />
                <h1 className="text-xl font-bold">人生发展体系</h1>
              </div>
            </Link>
            <div className="flex-1"></div>
          </div>
        </div>

        <Link href="/pricing" className="ml-8 hover:underline">
          价格
        </Link>
        {shouldShowSignInButton && (
          <div className="ml-3 lg:ml-8 flex items-center lg:border-l lg:border-slate-900/15 lg:pl-8">
            <SignInButton />
          </div>
        )}
      </div>
    </header>
  );
};
