import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers | EngineeRD",
  description: "Join our team of problem solvers at EngineeRD",
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

