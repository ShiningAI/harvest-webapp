import { SelectDatabases } from "./SelectDatabases";

export default async function Page({ params }: { params: { state: string } }) {
  try {
    const decode = JSON.parse(
      Buffer.from(params.state, "base64").toString("utf8")
    );
    if (decode.contactId) {
    return (
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Select Saved Database</h1>
        <p className="text-muted-foreground">
          You have multiple databases available, please select the database to save the data.
        </p>
        </div>
        <SelectDatabases contactId={decode.contactId} />
      </div>
    );
    }
    return (
      <div className="max-w-md mx-auto w-full space-y-4 text-center">
        Invalid parameters
      </div>
    );
  } catch (error: any) {
    console.error(error);
    return (
      <div className="max-w-md mx-auto w-full space-y-4 text-center">
        Error: {error.message}
      </div>
    ); // Display the error message to the user
  }
}
