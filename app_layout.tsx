import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GoogleAdsTag } from '@/components/google-ads-tag'
import { SITE_URL, staticSeoMetadata } from '@/lib/seo'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: staticSeoMetadata.title,
  description: staticSeoMetadata.description,
  keywords: staticSeoMetadata.keywords,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: SITE_URL,
    siteName: staticSeoMetadata.title.split('|')[0].trim(),
    title: staticSeoMetadata.title,
    description: staticSeoMetadata.description,
    images: [
      {
        url: '/images/chaveiro-hero.png',
        width: 720,
        height: 820,
        alt: 'Chaveiro profissional 24 horas — abertura de porta urgente',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: staticSeoMetadata.title,
    description: staticSeoMetadata.description,
    images: ['/images/chaveiro-hero.png'],
  },
  category: 'business',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
    apple: [{ url: '/apple-touch-icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1f2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${geistSans.variable} ${geistMono.variable} dark bg-background`}
    >
      <body className="font-sans antialiased">
        <GoogleAdsTag />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
