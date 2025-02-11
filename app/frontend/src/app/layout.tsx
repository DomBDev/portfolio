import { Inter, Space_Grotesk } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E2DED7' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1D' }
  ]
}

export const metadata = {
  metadataBase: new URL('https://bonannidominic.me'),
  title: {
    default: 'Dominic Bonanni',
    template: '%s | Dominic Bonanni'
  },
  description: 'My personal portfolio website showcasing my work, skills, and experiences as a software engineer.',
  keywords: ['portfolio', 'software engineer', 'full stack developer', 'web development'],
  authors: [{ name: 'Dominic Bonanni' }],
  creator: 'Dominic Bonanni',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32' },
      { url: '/logo.svg', sizes: 'any', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bonannidominic.me',
    title: 'Dominic Bonanni',
    description: 'My personal portfolio website showcasing my work, skills, and experiences as a software engineer.',
    siteName: 'Dominic Bonanni'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dominic Bonanni',
    description: 'My personal portfolio website showcasing my work, skills, and experiences as a software engineer.',
    images: '/logo.svg',
  },
  robots: {
    index: true,
    follow: true
  },
  manifest: '/manifest.json'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans min-h-screen bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 