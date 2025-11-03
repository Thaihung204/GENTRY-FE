"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/AuthContext"
import api from "../config/api"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  User,
  Mail,
  Phone,
  Calendar,
  Save,
  LogOut,
  Trash2,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
  const [formData, setFormData] = useState<Partial<Profile>>({})
  const router = useRouter()

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
        toast({ title: "✅ Cập nhật thành công!" })
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật profile:", err)
      toast({ title: "❌ Lỗi khi cập nhật", variant: "destructive" })
    }
  }

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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Hồ sơ cá nhân</h1>
            <p className="text-muted-foreground">Xem và chỉnh sửa thông tin của bạn</p>
          </div>
        </div>
        <Button
          onClick={handleUpdate}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thông tin bên trái */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <div className="mx-auto h-24 w-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4">
                {profile.fullName?.charAt(0)}
              </div>
              <CardTitle>{profile.fullName || "Người dùng"}</CardTitle>
              {/* <CardDescription className="text-muted-foreground">
                ID: {profile.id}
              </CardDescription> */}
              <div className="flex justify-center space-x-2 mt-4">
                <Badge variant="secondary">
                  {profile.gender || "Chưa cập nhật"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone || "Chưa cập nhật"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Ngày tạo: {createdDate}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Xóa tài khoản
                </Button>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form chỉnh sửa */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>Cập nhật chi tiết hồ sơ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Input
                    name="stylePreferences"
                    value={formData.stylePreferences || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Kích cỡ ưa thích</Label>
                  <Input
                    name="sizePreferences"
                    value={formData.sizePreferences || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label>Giới thiệu</Label>
                <Textarea
                  name="bio"
                  value={formData.stylePreferences || ""}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mô tả ngắn về bản thân..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
