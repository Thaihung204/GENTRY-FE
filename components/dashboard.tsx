"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shirt, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import api from "@/app/config/api"

interface User {
  userID: string
  fullName: string
  role: string
  isActive: boolean
  isPremium: boolean
  createdAt?: string
}

interface Item {
  id: string
  categoryName: string
  name: string
}

interface Category {
  categoryId: number
  name: string
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, itemsRes, categoriesRes] = await Promise.all([
          api.get("/users"),
          api.get("/items/all"),
          api.get("/categories"),
        ])
        setUsers(usersRes.data.data || [])
        setItems(itemsRes.data.data || [])
        setCategories(categoriesRes.data || [])
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading)
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Đang tải dữ liệu thống kê...
      </p>
    )

  // 🧮 Tính toán dữ liệu thống kê
  const totalUsers = users.length
  const totalPremium = users.filter((u) => u.isPremium).length
  const totalItems = items.length

  // ✅ Gom nhóm items theo categoryName
  const categoryStats = categories.map((c) => {
    const count = items.filter((i) => i.categoryName === c.name).length
    return {
      name: c.name,
      count,
      percentage:
        totalItems > 0 ? Math.round((count / totalItems) * 100) : 0,
    }
  })

  // 🏆 Lấy top danh mục (sắp theo số item)
  const topCategories = categoryStats
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // ✅ Lấy 5 user mới nhất làm hoạt động gần đây
  const recentActivities = users
    .sort((a, b) => {
      const dateA = new Date(a.createdAt ?? 0).getTime()
      const dateB = new Date(b.createdAt ?? 0).getTime()
      return dateB - dateA
    })
    .slice(0, 5)
    .map((u) => ({
      user: u.fullName,
      action: u.isPremium
        ? "đã đăng ký gói Premium"
        : "đã tạo tài khoản mới",
      time: formatDate(u.createdAt),
      type: u.isPremium ? "premium" : "user",
    }))

  const stats = [
    {
      title: "Tổng người dùng",
      value: totalUsers.toString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Người dùng Premium",
      value: totalPremium.toString(),
      change: "+8%",
      changeType: "positive" as const,
      icon: CrownIcon,
    },
    {
      title: "Số lượng Item",
      value: totalItems.toString(),
      change: "+23%",
      changeType: "positive" as const,
      icon: Shirt,
    },
    {
      title: "Danh mục hoạt động",
      value: categories.length.toString(),
      change: "+2%",
      changeType: "positive" as const,
      icon: ShoppingBag,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Tổng quan hệ thống AI Phối đồ thời trang GENTRY
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {stat.change} so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hoạt động gần đây + Danh mục phổ biến */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Hoạt động gần đây</CardTitle>
            <CardDescription className="text-muted-foreground">
              Các hoạt động mới nhất của người dùng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "premium"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  Chưa có hoạt động người dùng.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Danh mục phổ biến</CardTitle>
            <CardDescription className="text-muted-foreground">
              Top 5 danh mục có nhiều sản phẩm nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.length > 0 ? (
                topCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {category.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {category.count}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  Chưa có dữ liệu danh mục.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// 🟡 Icon Premium user
function CrownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M5 16l-1-8 5 3 3-5 3 5 5-3-1 8H5zm0 2h14v2H5v-2z" />
    </svg>
  )
}

// 🕒 Format ngày
function formatDate(date?: string) {
  if (!date) return "Không rõ thời gian"
  const d = new Date(date)
  return d.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}
