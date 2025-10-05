import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { AuthProvider } from "@/components/AuthContext"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main className="pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
