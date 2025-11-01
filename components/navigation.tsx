"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { useAuth } from "./AuthContext"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, loading } = useAuth()

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/wardrobe", label: "Tủ đồ thông minh" },
    { href: "/outfit-suggestion", label: "Gợi ý trang phục" },
    { href: "/community", label: "Cộng đồng" },
    { href: "/contact", label: "Liên hệ" },
  ]

  // ✅ Nếu đang loading, hiển thị tạm logo hoặc skeleton
  if (loading) {
    return (
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-[9998]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <img
                src="/gentry.png"
                alt="GENTRY Logo"
                className="w-25 h-25 object-contain"
              />
            </Link>
            <div className="animate-pulse text-gray-400">Đang tải...</div>
          </div>
        </div>
      </nav>
    )
  }

  // ✅ Khi loading xong -> render như bình thường
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img
              src="/gentry.png"
              alt="GENTRY Logo"
              className="w-25 h-25 object-contain"
            />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" className="flex items-center gap-2">
                  <Link href="/profile">
                    👤 <span className="text-sm">{user.fullName}</span>
                  </Link>
                </Button>
              </div>
            ) : (
              <Button asChild className="btn-gentry">
                <Link href="/login">Đăng nhập</Link>
              </Button>
            )}
          </div>

          {/* Mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {user ? (
                  <Button asChild variant="ghost" onClick={() => setIsOpen(false)}>
                    <Link href="/profile">👤 {user.fullName}</Link>
                  </Button>
                ) : (
                  <Button asChild className="btn-gentry">
                    <Link href="/login">Đăng nhập</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
