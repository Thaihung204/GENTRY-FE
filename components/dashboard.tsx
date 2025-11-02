"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shirt, MessageSquare, TrendingUp, ShoppingBag, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Tổng người dùng",
    value: "12,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Items thời trang",
    value: "3,421",
    change: "+8%",
    changeType: "positive" as const,
    icon: Shirt,
  },
  {
    title: "Outfits được tạo",
    value: "8,932",
    change: "+23%",
    changeType: "positive" as const,
    icon: ShoppingBag,
  },
  {
    title: "Báo cáo chờ xử lý",
    value: "23",
    change: "-5%",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
]

const recentActivities = [
  {
    user: "Nguyễn Văn A",
    action: "đã tạo outfit mới",
    time: "2 phút trước",
    type: "outfit",
  },
  {
    user: "Trần Thị B",
    action: "đã báo cáo nội dung không phù hợp",
    time: "15 phút trước",
    type: "report",
  },
  {
    user: "Lê Văn C",
    action: "đã đăng ký tài khoản mới",
    time: "1 giờ trước",
    type: "user",
  },
  {
    user: "Phạm Thị D",
    action: "đã thích 5 outfits",
    time: "2 giờ trước",
    type: "like",
  },
]

const topCategories = [
  { name: "Áo sơ mi", count: 1247, percentage: 85 },
  { name: "Quần jeans", count: 892, percentage: 72 },
  { name: "Váy", count: 634, percentage: 58 },
  { name: "Áo khoác", count: 521, percentage: 45 },
  { name: "Giày sneaker", count: 387, percentage: 32 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Tổng quan hệ thống AI Phối đồ thời trang GENTRY</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === "positive" ? "text-green-400" : "text-red-400"}`}>
                {stat.change} so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Hoạt động gần đây</CardTitle>
            <CardDescription className="text-muted-foreground">Các hoạt động mới nhất trên hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "outfit"
                        ? "bg-blue-400"
                        : activity.type === "report"
                          ? "bg-red-400"
                          : activity.type === "user"
                            ? "bg-green-400"
                            : "bg-pink-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Danh mục phổ biến</CardTitle>
            <CardDescription className="text-muted-foreground">Top 5 danh mục được sử dụng nhiều nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.count}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Thao tác nhanh</CardTitle>
          <CardDescription className="text-muted-foreground">Các chức năng thường sử dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-secondary hover:bg-accent rounded-lg transition-colors text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <span className="text-sm text-foreground">Thêm người dùng</span>
            </button>
            <button className="p-4 bg-secondary hover:bg-accent rounded-lg transition-colors text-center">
              <Shirt className="h-6 w-6 mx-auto mb-2 text-primary" />
              <span className="text-sm text-foreground">Thêm item mới</span>
            </button>
            <button className="p-4 bg-secondary hover:bg-accent rounded-lg transition-colors text-center">
              <MessageSquare className="h-6 w-6 mx-auto mb-2 text-primary" />
              <span className="text-sm text-foreground">Xem báo cáo</span>
            </button>
            <button className="p-4 bg-secondary hover:bg-accent rounded-lg transition-colors text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
              <span className="text-sm text-foreground">Xem thống kê</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
