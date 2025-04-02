import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Industries | EngineeRD",
  description: "Explore EngineeRD's expertise across various industries",
}

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

