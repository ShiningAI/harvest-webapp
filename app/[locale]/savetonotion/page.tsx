import { cookies } from "next/headers";
import { SaveToNotion } from "./SaveToNotion";
import { LogIn } from "./LogIn";

export const runtime = "edge";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (token?.value) {
    return <SaveToNotion token={token.value} />;
  }

  const data = { t: Date.now() };
  const state = Buffer.from(JSON.stringify(data)).toString("base64");

  return <LogIn state={state} />;
}
