import { PropsWithChildren } from 'react'
import './globals.css'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Harvest",
  description: "Save the Web to Notion",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return children
}
