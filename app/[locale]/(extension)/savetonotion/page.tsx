import { cookies } from "next/headers";
import { LogIn } from "./LogIn";
import { SaveToNotionPage } from "./SaveToNotionPage";

export const runtime = "edge";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  const current_db = cookieStore.get("current_db");

  const data = { t: Date.now() };
  const state = Buffer.from(JSON.stringify(data)).toString("base64");

  if (token?.value) {
    return (
      <SaveToNotionPage
        state={state}
        access_token={token.value}
        current_db={current_db?.value}
      />
    );
  }

  return <LogIn state={state} />;
}
