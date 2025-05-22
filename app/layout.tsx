import { PropsWithChildren } from "react";
import type { Metadata } from "next";

import "./globals.css";
import { getTranslations } from "next-intl/server";


export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: {
      template: `%s | ${t('Metadata.title')}`,
      default: `${t('Metadata.slogan')} | ${t('Metadata.title')}`
    },
    description: t('Metadata.description') || '',
    keywords: t('Metadata.keywords') || '',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false
      }
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: "https://harvest.superai42.com/",
      siteName: t("Metadata.title"),
      title: `${t("Metadata.slogan")} | ${t("Metadata.title")}`,
      description: t("Metadata.description") || "",
      images: [
        {
          url: 'https://notiontimeline.com/images/timeline-visual.png',
          width: 833,
          height: 2480,
          alt: t('Metadata.title')
        }
      ],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title: `${t("Metadata.slogan")} | ${t("Metadata.title")}`,
    //   description: t("Metadata.description") || "",
    //   images: ["https://notiontimeline.com/images/database-diagram-banner.png"],
    //   creator: "@notion_timeline",
    //   site: '@notion_timeline'
    // }
  }
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
