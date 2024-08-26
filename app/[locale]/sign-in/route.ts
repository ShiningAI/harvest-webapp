import { auth, signIn } from "@/auth";

export const runtime = "edge";

export async function GET() {
  return await signIn("notion", { redirectTo: "/databases/select" });
}

