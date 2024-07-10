import * as React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface PageError {
  message?: string
  statusCode: number
}

interface PageProps {
  error?: PageError
}

export const NotFoundPage: React.FC<PageProps> = ({ error }) => {
  const t = useTranslations('NotFoundPage')
  return (
    <div className="text-foreground bg-background absolute inset-0 flex items-center justify-center p-3 text-base">
      <main className="flex flex-col items-center justify-center">
        <h1>{t('title')}</h1>

        {error && <p>{error.message}</p>}

        <Image src="/404.png" alt="404 Not Found" width={1216} height={912} className="w-[640px] max-w-full" />
      </main>
    </div>
  )
}
