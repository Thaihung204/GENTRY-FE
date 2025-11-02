"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/AuthContext"
import api from "../config/api"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sparkles,
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Save,
  X,
  LogOut,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface Profile {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  fullName: string
  avatarFileId: number | null
  gender: string | null
  birthDate: string | null
  height: number | null
  weight: number | null
  skinTone: string | null
  bodyType: string | null
  stylePreferences: string | null
  sizePreferences: string | null
  createdDate: string
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<Profile>>({})
  const router = useRouter()

  // 🔹 Lấy thông tin người dùng
  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        if (res.data.success && res.data.data) {
          setProfile(res.data.data)
          setFormData(res.data.data)
        }
      } catch (err) {
        console.error("Lỗi khi tải profile:", err)
      }
    }
    fetchProfile()
  }, [user])

  // 🔹 Cập nhật formData khi nhập
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 🔹 Gửi yêu cầu cập nhật profile
  const handleUpdate = async () => {
    try {
      const payload = {
        phone: formData.phone || "",
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        avatarFileId: formData.avatarFileId || 0,
        gender: formData.gender || "",
        birthDate: formData.birthDate || null,
        height: formData.height ? Number(formData.height) : 0,
        weight: formData.weight ? Number(formData.weight) : 0,
        skinTone: formData.skinTone || "",
        bodyType: formData.bodyType || "",
        stylePreferences: formData.stylePreferences || "",
        sizePreferences: formData.sizePreferences || "",
      }

      const res = await api.put("/users/profile", payload, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })

      if (res.data.success) {
        setProfile(res.data.data)
        setIsEditing(false)
        toast({ title: "✅ Cập nhật thành công!" })
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật profile:", err)
      toast({ title: "❌ Lỗi khi cập nhật", variant: "destructive" })
    }
  }

  // 🔹 Xóa tài khoản
  const handleDelete = async () => {
    const userId = localStorage.getItem("userId")

    if (!confirm("Bạn có chắc muốn xóa tài khoản này không?")) return
    try {
      await api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })
      logout()
      router.push("/")
      toast({ title: "🗑️ Tài khoản đã bị xóa" })
    } catch (err) {
      console.error("Lỗi khi xóa profile:", err)
      toast({ title: "❌ Không thể xóa tài khoản", variant: "destructive" })
    }
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Đang tải thông tin người dùng...
      </div>
    )
  }

  const createdDate =
    profile.createdDate && !isNaN(Date.parse(profile.createdDate))
      ? new Date(profile.createdDate).toLocaleDateString("vi-VN")
      : "Chưa cập nhật"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="py-10 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center space-y-3">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Sparkles className="w-9 h-9 text-primary" />
            Hồ Sơ Cá Nhân
          </h1>
          <p className="text-lg text-muted-foreground">
            Quản lý và cập nhật thông tin cá nhân của bạn.
          </p>
        </div>
      </section>

      {/* Nội dung */}
      <div className="container mx-auto px-4 py-12 space-y-8">
        

        <Card className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md shadow-md border border-gray-200 rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <User className="w-5 h-5" /> {profile.fullName || "Người dùng"}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {!isEditing ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-500" />
                    <span><strong>Email:</strong> {profile.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-500" />
                    <span><strong>Điện thoại:</strong> {profile.phone || "Chưa cập nhật"}</span>
                  </p>
                  <p><strong>Giới tính:</strong> <Badge variant="secondary">{profile.gender || "Chưa cập nhật"}</Badge></p>
                  <p><strong>Chiều cao:</strong> {profile.height || "Chưa cập nhật"} cm</p>
                  <p><strong>Cân nặng:</strong> {profile.weight || "Chưa cập nhật"} kg</p>
                  <p><strong>Ngày sinh:</strong> {profile.birthDate ? new Date(profile.birthDate).toLocaleDateString("vi-VN") : "Chưa cập nhật"}</p>
                  <p><strong>Kiểu da:</strong> {profile.skinTone || "Chưa cập nhật"}</p>
                  <p><strong>Dáng người:</strong> {profile.bodyType || "Chưa cập nhật"}</p>
                  <p><strong>Phong cách:</strong> {profile.stylePreferences || "Chưa cập nhật"}</p>
                  <p><strong>Kích cỡ ưa thích:</strong> {profile.sizePreferences || "Chưa cập nhật"}</p>
                  <p><strong>Ngày tạo:</strong> {createdDate}</p>
                </div>

                <div className="flex gap-3 pt-6">
                  <Button variant="gentry" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" /> Chỉnh sửa
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Xóa tài khoản
                  </Button>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Họ</Label>
                  <Input name="firstName" value={formData.firstName || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Tên</Label>
                  <Input name="lastName" value={formData.lastName || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input name="email" value={formData.email || ""} disabled />
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  <Input name="phone" value={formData.phone || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Giới tính</Label>
                  <Input name="gender" value={formData.gender || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Ngày sinh</Label>
                  <Input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate ? formData.birthDate.split("T")[0] : ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Chiều cao (cm)</Label>
                  <Input name="height" value={formData.height || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Cân nặng (kg)</Label>
                  <Input name="weight" value={formData.weight || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Màu da</Label>
                  <Input name="skinTone" value={formData.skinTone || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Dáng người</Label>
                  <Input name="bodyType" value={formData.bodyType || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Phong cách</Label>
                  <Input name="stylePreferences" value={formData.stylePreferences || ""} onChange={handleChange} />
                </div>
                <div>
                  <Label>Kích cỡ ưa thích</Label>
                  <Input name="sizePreferences" value={formData.sizePreferences || ""} onChange={handleChange} />
                </div>

                <div className="flex gap-3 pt-4 col-span-2">
                  <Button variant="gentry" onClick={handleUpdate}>
                    <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="w-4 h-4 mr-2" /> Hủy
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={logout}
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  )
}
