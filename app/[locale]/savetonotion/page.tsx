import { cookies } from "next/headers";
import { LogIn } from "./LogIn";
import { SaveToNotionPage } from "./SaveToNotionPage";

export const runtime = "edge";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (token?.value) {
    return <SaveToNotionPage access_token={token.value} />;
  }

  const data = { t: Date.now() };
  const state = Buffer.from(JSON.stringify(data)).toString("base64");

  return <LogIn state={state} />;
}
