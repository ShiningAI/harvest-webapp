import { cookies } from "next/headers";
import { notifyException } from "@/lib/notify";
import { SelectDatabases } from "@/components/SelectDatabases";
import { LogIn } from "@/components/LogIn";

export const runtime = "edge";

export default async function Page() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token");
    const wxId = cookieStore.get("wx_id");

    const data: any = { t: Date.now() };
    if (wxId?.value) {
      data.wxId = wxId.value;
    }

    const state = Buffer.from(JSON.stringify(data)).toString("base64");

    if (!token?.value) {
      return <LogIn state={state} />;
    }

    return <SelectDatabases state={state} access_token={token.value} />;
  } catch (error: any) {
    notifyException(error);
    return (
      <div className="max-w-md mx-auto w-full space-y-4 text-center">
        Error: {error.message}
      </div>
    ); // Display the error message to the user
  }
}
