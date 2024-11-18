import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface Props {
  rebind?: boolean;
}

export const NotionGuide = ({ rebind }: Props) => {
  const t = useTranslations("Database");
  return (
    <div className="mx-auto w-full space-y-6 py-6">
      <Link href="/sign-in" prefetch={false}>
        <Button>{rebind ? t("Authorize.rebind") : t("Authorize.goto")}</Button>
      </Link>
      <p>👉 {t("guide")}</p>
      <div className="w-full flex flex-col sm:flex-row gap-3 py-3">
        <div className="flex-1">
          <Image
            src="/images/guide-01.png"
            alt=""
            width={2000}
            height={2692}
          ></Image>
        </div>
        <div className="flex-1">
          <Image
            src="/images/guide-02.png"
            alt=""
            width={2000}
            height={2702}
          ></Image>
        </div>
      </div>
      <Link href="/sign-in" prefetch={false}>
        <Button>{rebind ? t("Authorize.rebind") : t("Authorize.goto")}</Button>
      </Link>
    </div>
  );
};
