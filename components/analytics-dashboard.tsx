"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, TrendingUp, Eye, Heart, ShoppingBag, Download } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const userGrowthData = [
  { month: "T1", users: 2400, newUsers: 400 },
  { month: "T2", users: 3200, newUsers: 800 },
  { month: "T3", users: 4100, newUsers: 900 },
  { month: "T4", users: 5200, newUsers: 1100 },
  { month: "T5", users: 6800, newUsers: 1600 },
  { month: "T6", users: 8200, newUsers: 1400 },
  { month: "T7", users: 9500, newUsers: 1300 },
  { month: "T8", users: 11200, newUsers: 1700 },
  { month: "T9", users: 12100, newUsers: 900 },
  { month: "T10", users: 12800, newUsers: 700 },
  { month: "T11", users: 13400, newUsers: 600 },
  { month: "T12", users: 14200, newUsers: 800 },
]

const outfitEngagementData = [
  { day: "T2", outfits: 45, likes: 320, comments: 89, shares: 23 },
  { day: "T3", outfits: 52, likes: 410, comments: 112, shares: 31 },
  { day: "T4", outfits: 48, likes: 380, comments: 95, shares: 28 },
  { day: "T5", outfits: 61, likes: 520, comments: 134, shares: 42 },
  { day: "T6", outfits: 55, likes: 450, comments: 118, shares: 35 },
  { day: "T7", outfits: 67, likes: 580, comments: 156, shares: 48 },
  { day: "CN", outfits: 72, likes: 640, comments: 178, shares: 52 },
]

const categoryDistribution = [
  { name: "Áo sơ mi", value: 1247, color: "#3b82f6" },
  { name: "Quần jeans", value: 892, color: "#10b981" },
  { name: "Váy", value: 634, color: "#f59e0b" },
  { name: "Áo khoác", value: 521, color: "#ef4444" },
  { name: "Giày", value: 387, color: "#8b5cf6" },
  { name: "Phụ kiện", value: 234, color: "#06b6d4" },
]

const topPerformingOutfits = [
  {
    id: 1,
    title: "Outfit công sở thanh lịch",
    author: "Nguyễn Thị Lan",
    likes: 1247,
    comments: 89,
    shares: 45,
    views: 5632,
    engagement: 24.8,
  },
  {
    id: 2,
    title: "Street style năng động",
    author: "Trần Văn Minh",
    likes: 892,
    comments: 67,
    shares: 32,
    views: 4123,
    engagement: 24.0,
  },
  {
    id: 3,
    title: "Váy hoa dạo phố",
    author: "Lê Thị Hương",
    likes: 1156,
    comments: 78,
    shares: 41,
    views: 5234,
    engagement: 24.4,
  },
  {
    id: 4,
    title: "Casual weekend look",
    author: "Hoàng Văn Đức",
    likes: 634,
    comments: 45,
    shares: 23,
    views: 2987,
    engagement: 23.5,
  },
  {
    id: 5,
    title: "Business attire modern",
    author: "Phạm Thị Mai",
    likes: 789,
    comments: 56,
    shares: 28,
    views: 3654,
    engagement: 23.9,
  },
]

const revenueData = [
  { month: "T1", revenue: 45000, premium: 12000 },
  { month: "T2", revenue: 52000, premium: 15000 },
  { month: "T3", revenue: 48000, premium: 14000 },
  { month: "T4", revenue: 61000, premium: 18000 },
  { month: "T5", revenue: 55000, premium: 16000 },
  { month: "T6", revenue: 67000, premium: 20000 },
  { month: "T7", revenue: 72000, premium: 22000 },
  { month: "T8", revenue: 68000, premium: 21000 },
  { month: "T9", revenue: 75000, premium: 24000 },
  { month: "T10", revenue: 82000, premium: 26000 },
  { month: "T11", revenue: 78000, premium: 25000 },
  { month: "T12", revenue: 89000, premium: 28000 },
]

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")

  const totalUsers = 14200
  const totalOutfits = 8932
  const totalEngagement = 156789
  const monthlyRevenue = 89000

  const userGrowthRate = 12.5
  const outfitGrowthRate = 8.3
  const engagementRate = 15.7
  const revenueGrowthRate = 14.1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Báo cáo & Thống kê</h1>
          <p className="text-muted-foreground mt-2">Tổng quan hiệu suất và phân tích dữ liệu hệ thống</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">90 ngày qua</option>
            <option value="1y">1 năm qua</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng người dùng</p>
                <p className="text-2xl font-bold text-foreground">{totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{userGrowthRate}%</span>
                  <span className="text-sm text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng outfits</p>
                <p className="text-2xl font-bold text-foreground">{totalOutfits.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{outfitGrowthRate}%</span>
                  <span className="text-sm text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tương tác</p>
                <p className="text-2xl font-bold text-foreground">{totalEngagement.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{engagementRate}%</span>
                  <span className="text-sm text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Doanh thu tháng</p>
                <p className="text-2xl font-bold text-foreground">₫{monthlyRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{revenueGrowthRate}%</span>
                  <span className="text-sm text-muted-foreground ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Tăng trưởng người dùng</CardTitle>
            <CardDescription className="text-muted-foreground">Số lượng người dùng theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="newUsers" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Phân bố danh mục</CardTitle>
            <CardDescription className="text-muted-foreground">Số lượng items theo danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Tương tác hàng ngày</CardTitle>
            <CardDescription className="text-muted-foreground">Likes, comments, shares theo ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={outfitEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="likes" stroke="#ef4444" strokeWidth={2} name="Likes" />
                <Line type="monotone" dataKey="comments" stroke="#3b82f6" strokeWidth={2} name="Comments" />
                <Line type="monotone" dataKey="shares" stroke="#10b981" strokeWidth={2} name="Shares" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Doanh thu</CardTitle>
            <CardDescription className="text-muted-foreground">Doanh thu tổng và từ premium</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#f9fafb",
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#8b5cf6" name="Tổng doanh thu" />
                <Bar dataKey="premium" fill="#f59e0b" name="Premium" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Outfits */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Top outfits hiệu suất cao</CardTitle>
          <CardDescription className="text-muted-foreground">Những outfit có tương tác cao nhất</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Outfit</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tác giả</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Likes</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Comments</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Shares</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Views</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingOutfits.map((outfit, index) => (
                  <tr key={outfit.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium text-foreground">{outfit.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-foreground">{outfit.author}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-foreground">{outfit.likes.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span className="text-foreground">{outfit.comments}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-foreground">{outfit.shares}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-500" />
                        <span className="text-foreground">{outfit.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-800 border-green-200">{outfit.engagement}%</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
