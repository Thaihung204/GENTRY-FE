"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, User, Mail, Phone, Calendar, Heart, ShoppingBag, MessageSquare } from "lucide-react"

const userData = {
  id: 1,
  name: "Nguyễn Văn An",
  email: "nguyenvanan@email.com",
  phone: "0901234567",
  status: "active",
  role: "premium",
  joinDate: "2024-01-15",
  lastLogin: "2024-03-20 14:30",
  outfits: 23,
  likes: 145,
  comments: 67,
  followers: 89,
  following: 156,
  bio: "Yêu thích thời trang và phong cách cá nhân. Luôn tìm kiếm những outfit độc đáo và phù hợp.",
  avatar: null,
}

const userStats = [
  { label: "Outfits đã tạo", value: userData.outfits, icon: ShoppingBag, color: "text-blue-600" },
  { label: "Lượt thích", value: userData.likes, icon: Heart, color: "text-red-600" },
  { label: "Bình luận", value: userData.comments, icon: MessageSquare, color: "text-green-600" },
  { label: "Người theo dõi", value: userData.followers, icon: User, color: "text-purple-600" },
]

export default function UserEdit() {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    status: userData.status,
    role: userData.role,
    bio: userData.bio,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Saving user data:", formData)
    // Implement save logic here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chi tiết người dùng</h1>
            <p className="text-muted-foreground mt-2">Xem và chỉnh sửa thông tin người dùng</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <div className="mx-auto h-24 w-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4">
                {userData.name.charAt(0)}
              </div>
              <CardTitle className="text-foreground">{userData.name}</CardTitle>
              <CardDescription className="text-muted-foreground">ID: {userData.id}</CardDescription>
              <div className="flex justify-center space-x-2 mt-4">
                <Badge
                  className={
                    userData.status === "active"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : userData.status === "inactive"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                  }
                >
                  {userData.status === "active"
                    ? "Hoạt động"
                    : userData.status === "inactive"
                      ? "Không hoạt động"
                      : "Bị cấm"}
                </Badge>
                <Badge
                  className={
                    userData.role === "premium"
                      ? "bg-purple-100 text-purple-800 border-purple-200"
                      : "bg-blue-100 text-blue-800 border-blue-200"
                  }
                >
                  {userData.role === "premium" ? "Premium" : "Người dùng"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{userData.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{userData.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Tham gia: {userData.joinDate}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Đăng nhập cuối: {userData.lastLogin}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Stats */}
          <Card className="bg-card border-border mt-6">
            <CardHeader>
              <CardTitle className="text-foreground">Thống kê hoạt động</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {userStats.map((stat, index) => (
                  <div key={index} className="text-center p-3 bg-secondary rounded-lg">
                    <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Thông tin cá nhân</CardTitle>
              <CardDescription className="text-muted-foreground">Chỉnh sửa thông tin người dùng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Họ và tên
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-foreground">
                    Trạng thái
                  </Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                    <option value="banned">Bị cấm</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-foreground">
                  Vai trò
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="user">Người dùng</option>
                  <option value="premium">Premium</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-foreground">
                  Tiểu sử
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={4}
                  className="bg-background border-border"
                  placeholder="Mô tả về người dùng..."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                <Button variant="outline">Hủy bỏ</Button>
                <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
