import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AuthProvider } from "@/components/AuthContext"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "GENTRY - AI phối đồ thời trang",
  description: "Gợi ý outfit hợp tâm trạng, phong cách, dịp đặc biệt - nhờ AI học sở thích của bạn.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <AuthProvider>
          <Navigation />
          <main className="pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
