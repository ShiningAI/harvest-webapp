// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

import "../globals.css";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
  } as Metadata;
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren<{ params: { locale: string } }>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
