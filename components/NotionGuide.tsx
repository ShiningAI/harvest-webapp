
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface Props {
    state: string;
}

export const NotionGuide = ({ state }: Props) => {
    const t = useTranslations("Database");
    return (
        <div className="mx-auto w-full max-w-md space-y-6 py-6">
            <Link href={`/s/${state}`}>
                <Button>{t("Authorize.goto")}</Button>
            </Link>
        </div>
    );
}