import { notifyException } from "@/lib/notify";
import { SelectDatabases } from "./SelectDatabases";

export const runtime = "edge";
export default async function Page({ params }: { params: { state: string } }) {
  try {
    const state = decodeURIComponent(params.state);
    const decode = JSON.parse(Buffer.from(state, "base64").toString("utf8"));
    if (decode.contactId) {
      return (
        <SelectDatabases state={params.state} contactId={decode.contactId} />
      );
    }
    return (
      <div className="max-w-md mx-auto w-full space-y-4 text-center">
        Invalid parameters
      </div>
    );
  } catch (error: any) {
    notifyException(error);
    return (
      <div className="max-w-md mx-auto w-full space-y-4 text-center">
        Error: {error.message}
      </div>
    ); // Display the error message to the user
  }
}
