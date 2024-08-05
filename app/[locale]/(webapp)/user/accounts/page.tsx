import { Accounts } from "./Accounts";
import { auth } from "@/auth";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  if (!session?.user) return null;

  const data = { t: Date.now(), wxId: session.user.id };
  const state = Buffer.from(JSON.stringify(data)).toString("base64");

  return <Accounts state={state} />;
}
