import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { dmSans } from "./fonts"

export const metadata: Metadata = {
  title: "EngineeRD",
  description: "EngineeRD - Eliminating Burnout",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}



import './globals.css'