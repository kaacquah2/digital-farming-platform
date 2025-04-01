import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
}

export const metadata: Metadata = {
  title: "Sign Up | Digital Farming Platform",
  description: "Create your Digital Farming Platform account",
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 