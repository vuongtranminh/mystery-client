import './globals.css'
import { Open_Sans } from 'next/font/google'
// import { ClerkProvider } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import RouterProvider from '@/components/providers/router-provider'
import LogProvider from '@/components/providers/log-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Mystery',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          font.className,
          "bg-white dark:bg-[#d0d8ec]"
        )}>
          <LogProvider>
            <RouterProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                storageKey="discord-theme"
              >
                <ModalProvider />
                <QueryProvider>
                  {children}
                </QueryProvider>
              </ThemeProvider>
            </RouterProvider>
          </LogProvider>
        </body>
      </html>
  )
}
