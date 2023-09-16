import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Number line task tool',
  description: 'Tool to apply the number line task',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <nav>
            <Link href="/">
              Home
            </Link>
            <Link href="/run-test">
              Run test
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
