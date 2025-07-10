import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"

export const metadata: Metadata = {
  title: "LexiFlow",
  description: "Accessible spelling practice for users with dyslexia.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* OpenDyslexic font */}
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=opendyslexic@400,700&display=swap" />
      </head>
      <body className={cn("font-sans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
