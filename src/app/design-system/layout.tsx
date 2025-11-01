import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Design System | Audiophile",
  description: "Audiophile Design System - Built with shadcn/ui, React Hook Form, and Zod",
}

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

