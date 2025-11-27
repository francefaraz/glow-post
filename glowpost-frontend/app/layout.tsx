import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { Toaster } from "@/components/ui/sonner"

const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GlowPost - AI Content Creator",
  description: "Create, schedule, and manage your social media content with AI",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Navbar />
        <main className="pt-20 pb-20 md:pb-0 min-h-screen">{children}</main>
        <MobileBottomNav />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
