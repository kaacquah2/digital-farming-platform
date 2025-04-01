import type { Metadata } from "next"
import DemoPageClient from "./DemoPageClient"

export const metadata: Metadata = {
  title: "Demo | TerraBit",
  description: "Experience the full capabilities of TerraBit's digital farming platform",
}

export default function DemoPage() {
  return <DemoPageClient />
}

