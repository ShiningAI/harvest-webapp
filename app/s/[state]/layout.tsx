import { PropsWithChildren } from "react";
import Link from "next/link";
import { CropIcon, NotebookIcon } from "lucide-react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-4 shadow">
        <div className="flex items-center gap-2">
          <CropIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-medium">Harvest</span>
        </div>
        <div className="flex items-center gap-2">
          <NotebookIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-medium">Notion</span>
        </div>
      </header>
      <main className="flex-1 px-6 py-12">{children}</main>
      <footer className="flex items-center justify-between border-t px-6 py-4 text-muted-foreground">
        <p>&copy; 2024 Harvest. All rights reserved.</p>
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
