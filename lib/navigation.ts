import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const localePrefix = 'as-needed'
export const defaultLocale = 'en'
export const localeItems = [
  { name: 'English', code: 'en', iso: 'en-US', dir: 'ltr' },
//   { name: 'español', code: 'es', iso: 'es-ES', dir: 'ltr' },
  { name: '中文', code: 'zh-cn', iso: 'zh-CN', dir: 'ltr' },
//   { name: 'Deutsch', code: 'de', iso: 'de-DE', dir: 'ltr' },
//   { name: 'Italiano', code: 'it', iso: 'it-IT', dir: 'ltr' },
//   { name: '日本語', code: 'ja', iso: 'ja-JP', dir: 'ltr' },
//   { name: '한국인', code: 'ko', iso: 'ko-KR', dir: 'ltr' },
//   { name: 'Português', code: 'pt', iso: 'pt-PT', dir: 'ltr' },
]
export const locales = localeItems.map(({ code }) => code)

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, localePrefix })
