"use client";

import { useTranslations } from "next-intl";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("GlobalError");
  return (
    <html>
      <body>
        <h2>{t("title")}</h2>
        <button onClick={() => reset()}>{t("reset")}</button>
      </body>
    </html>
  );
}
