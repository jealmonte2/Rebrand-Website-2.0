import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | EngineeRD",
  description: "Explore EngineeRD's innovative products and solutions",
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

