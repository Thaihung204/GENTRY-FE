"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, Save, X, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface User {
  userID: string
  email: string
  fullName: string
  role: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  phone?: string
  gender?: string
  birthDate?: string
  isPremium?: boolean
}

const roleColors: Record<string, string> = {
  NormalUser: "bg-blue-100 text-blue-800 border-blue-200",
  Premium: "bg-yellow-100 text-yellow-800 border-yellow-200",
}

const statusColors = {
  true: "bg-green-100 text-green-800 border-green-200",
  false: "bg-red-100 text-red-800 border-red-200",
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    isPremium: false,
  })

  // ✅ Gọi API lấy danh sách user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://localhost:5001/api/users")
        const json = await res.json()
        if (json.success && Array.isArray(json.data)) {
          setUsers(json.data)
        }
      } catch (err) {
        console.error("❌ Lỗi khi fetch user:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // ✅ Lọc theo từ khóa
  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ✅ Mở popup và nạp dữ liệu
  const handleEdit = (user: User) => {
    setSelectedUser(user)
    const [firstName = "", lastName = ""] = user.fullName.split(" ")
    setFormData({
      email: user.email,
      phone: user.phone || "",
      firstName,
      lastName,
      gender: user.gender || "",
      birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
      isPremium: user.isPremium || false,
    })
    setIsDialogOpen(true)
  }

  // ✅ Cập nhật form
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // ✅ Gọi API PUT cập nhật người dùng
  const handleSave = async () => {
    if (!selectedUser) return
    try {
      const res = await fetch(`https://localhost:5001/api/users/${selectedUser.userID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        alert("✅ Cập nhật thành công!")
        setIsDialogOpen(false)
      } else {
        alert("❌ Lỗi khi cập nhật người dùng!")
      }
    } catch (error) {
      console.error("Lỗi PUT:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý người dùng</h1>
          <p className="text-muted-foreground mt-2">Quản lý tài khoản và thông tin người dùng hệ thống</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Tổng người dùng</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Đang hoạt động</p>
            <p className="text-2xl font-bold text-green-600">
              {users.filter((u) => u.isActive).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Normal User</p>
            <p className="text-2xl font-bold text-blue-600">
              {users.filter((u) => u.role === "NormalUser").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Premium User</p>
            <p className="text-2xl font-bold text-blue-600">
              {users.filter((u) => u.isPremium).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>Tìm kiếm và quản lý người dùng trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          {/* Loading */}
          {loading ? (
            <p className="text-center text-muted-foreground py-10">Đang tải dữ liệu...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Họ tên</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Vai trò</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ngày tạo</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.userID} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4 font-medium">{u.fullName}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{u.email}</td>
                      <td className="py-4 px-4">
                        <Badge className={u.isActive ? statusColors.true : statusColors.false}>
                          {u.isActive ? "Hoạt động" : "Không hoạt động"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={u.isPremium ? roleColors.Premium : roleColors.NormalUser}>
                          {u.isPremium ? "Premium" : "Thường"}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(u.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(u)}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Popup chỉnh sửa người dùng */}
      {/* ✅ Popup chỉnh sửa người dùng */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              {/* --- Form fields --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Họ</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Tên</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Giới tính</Label>
                  <select
                    className="w-full border rounded-md p-2 bg-background"
                    value={formData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                  >
                    <option value="">Chọn</option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>
                <div>
                  <Label>Ngày sinh</Label>
                  <Input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isPremium}
                  onChange={(e) => handleInputChange("isPremium", e.target.checked)}
                />
                <Label>Người dùng Premium</Label>
              </div>

              {/* --- Action buttons --- */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (!selectedUser) return
                    if (!confirm(`Bạn có chắc muốn xóa người dùng "${selectedUser.fullName}"?`)) return

                    try {
                      const res = await fetch(
                        `https://localhost:5001/api/users/${selectedUser.userID}`,
                        { method: "DELETE" }
                      )
                      if (res.ok) {
                        alert("🗑️ Đã xóa người dùng thành công!")
                        setUsers((prev) =>
                          prev.filter((u) => u.userID !== selectedUser.userID)
                        )
                        setIsDialogOpen(false)
                      } else {
                        alert("❌ Xóa thất bại! Vui lòng thử lại.")
                      }
                    } catch (err) {
                      console.error("Lỗi khi DELETE:", err)
                      alert("❌ Có lỗi xảy ra khi xóa người dùng.")
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Xóa người dùng
                </Button>

                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    <X className="h-4 w-4 mr-1" /> Hủy
                  </Button>
                  <Button onClick={handleSave} className="bg-primary text-white hover:bg-primary/90">
                    <Save className="h-4 w-4 mr-1" /> Lưu thay đổi
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
