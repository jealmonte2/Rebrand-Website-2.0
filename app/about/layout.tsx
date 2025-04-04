import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | EngineeRD",
  description: "Learn about EngineeRD's approach to eliminating burnout in the workplace",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

