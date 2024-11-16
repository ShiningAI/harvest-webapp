import { RootHeader } from "@/components/RootHeader";
import { SignInPage } from "./SignInPage";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <RootHeader />
      <div className="flex flex-1 mx-auto w-full h-full max-w-container p-0 flex-col overflow-hidden md:flex-row">
        <SignInPage />
      </div>
    </div>
  );
}

export const runtime = "edge";
