import { getTranslations } from "next-intl/server";

export const runtime = "edge";

export default async function Page() {
  const t = await getTranslations();
  return (
    <div className="max-w-md mx-auto py-6 whitespace-pre-line w-full space-y-4 text-center">
      {t("Database.success")}
    </div>
  );
}
