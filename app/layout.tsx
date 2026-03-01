import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Geist_Mono, Gaegu } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-kr',
})

const gaegu = Gaegu({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-gaegu',
})

const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '\uB9D0\uBAA8\uC774 (Mal-Moi) - AI \uC18C\uD1B5 \uB3C4\uC6B0\uBBF8',
  description:
    'A warm, senior-friendly communication bridge that helps grandparents connect with younger family members through AI-powered language translation.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F9F9F7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} ${gaegu.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
