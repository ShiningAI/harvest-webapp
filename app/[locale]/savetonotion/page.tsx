import { cookies } from "next/headers";
import { SaveToNotion } from "./SaveToNotion";
import { LogIn } from "./LogIn";

export const runtime = "edge";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (token) {
    return <SaveToNotion />;
  }

  const data = { t: Date.now() };
  const state = Buffer.from(JSON.stringify(data)).toString("base64");

  return <LogIn state={state} />;
}
