"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sparkles, Menu } from "lucide-react"
import { useState } from "react"
import { useAuth } from "./AuthContext"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/wardrobe", label: "Tủ đồ thông minh" },
    { href: "/outfit-suggestion", label: "Gợi ý trang phục"},
    { href: "/ai-styling", label: "Gợi ý AI" },
    { href: "/community", label: "Cộng đồng" },
    { href: "/contact", label: "Liên hệ" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="w-6 h-6 text-primary" />
            GENTRY
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary">
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Xin chào, {user.fullName}</span>
                <Button onClick={logout}>Đăng xuất</Button>
              </div>
            ) : (
              <Button asChild>
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
                  <>
                    <span className="text-sm">Xin chào, {user.fullName}</span>
                    <Button onClick={logout} className="mt-4">
                      Đăng xuất
                    </Button>
                  </>
                ) : (
                  <Button asChild className="mt-4">
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
