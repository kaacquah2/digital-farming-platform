import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
}

export const metadata: Metadata = {
  title: "Login | Digital Farming Platform",
  description: "Sign in to your Digital Farming Platform account",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 