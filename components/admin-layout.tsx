"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Users, Shirt, MessageSquare, BarChart3, Settings, Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Quản lý người dùng",
    icon: Users,
    children: [
      { name: "Danh sách người dùng", href: "/users" },
      { name: "Chi tiết/Chỉnh sửa", href: "/users/edit" },
    ],
  },
  {
    name: "Quản lý dữ liệu thời trang",
    icon: Shirt,
    children: [
      { name: "Items", href: "/fashion/items" },
      { name: "Danh mục", href: "/fashion/categories" },
      { name: "Dataset ảnh", href: "/fashion/images" },
    ],
  },
  {
    name: "Quản lý cộng đồng",
    icon: MessageSquare,
    children: [
      { name: "Outfit", href: "/community/outfits" },
      { name: "Bình luận", href: "/community/comments" },
      { name: "Báo cáo", href: "/community/reports" },
    ],
  },
  {
    name: "Báo cáo & Thống kê",
    icon: BarChart3,
    children: [
      { name: "Dashboard", href: "/analytics" },
      { name: "Báo cáo chi tiết", href: "/analytics/reports" },
    ],
  },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"])
  const pathname = usePathname()

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((name) => name !== itemName) : [...prev, itemName],
    )
  }

  const isCurrentPath = (href: string) => {
    return pathname === href
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">GENTRY Admin</h1>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.href ? (
                <Link href={item.href}>
                  <Button
                    variant={isCurrentPath(item.href) ? "secondary" : "ghost"}
                    className="w-full justify-start text-left"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left"
                  onClick={() => toggleExpanded(item.name)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                  <span className="ml-auto">{expandedItems.includes(item.name) ? "−" : "+"}</span>
                </Button>
              )}

              {item.children && expandedItems.includes(item.name) && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Link key={child.name} href={child.href}>
                      <Button
                        variant={isCurrentPath(child.href) ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-start text-muted-foreground hover:text-foreground"
                      >
                        {child.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-3 h-5 w-5" />
            Cài đặt
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">Xin chào, Admin</div>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
