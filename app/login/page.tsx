"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthContext"
import api from "@/app/config/api"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState<string | null>(null)
  const { setUser } = useAuth()

  interface LoginResponse {
    success: boolean
    message: string
    email: string
    fullName: string
    role: string
    accessToken: string
    refreshToken: string
    tokenExpiry?: string
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      // ✅ 1️⃣ Nếu email chứa "admin" → gọi API login admin
      const isAdminLogin = formData.email.toLowerCase().includes("admin")
      const loginUrl = isAdminLogin ? "/auth/admin/login" : "/auth/login"

      const res = await api.post<LoginResponse>(loginUrl, formData, { withCredentials: true })

      if (res.data.success) {
        const data = res.data

        // Lưu token vào localStorage
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)

        // ✅ 2️⃣ Lấy profile tương ứng (admin hoặc user)
        const profileUrl = isAdminLogin ? "/auth/current-admin" : "/users/profile"
        const profileRes = await api.get(profileUrl, {
          headers: { Authorization: `Bearer ${data.accessToken}` },
        })

        const userData = profileRes.data.data

        // Lưu thông tin cơ bản
        localStorage.setItem("userId", userData.id)
        localStorage.setItem("role", userData.role)
        localStorage.setItem("email", userData.email)
        localStorage.setItem("fullName", userData.fullName)

        // ✅ 3️⃣ Cập nhật AuthContext
        setUser({
          email: userData.email,
          fullName: userData.fullName,
          role: userData.role,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })

        // ✅ 4️⃣ Chuyển hướng đúng nơi
        if (userData.role === "Admin" || isAdminLogin) {
          router.push("/admin")
        } else {
          router.push("/")
        }
      } else {
        setError(res.data.message)
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError("Đăng nhập thất bại, vui lòng thử lại.")
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">GENTRY</span>
          </div>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <p className="text-muted-foreground">Chào mừng bạn trở lại với GENTRY AI Fashion</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, rememberMe: checked as boolean })
                  }
                />
                <Label htmlFor="remember" className="text-sm">
                  Ghi nhớ đăng nhập
                </Label>
              </div>
              <Link href="#" className="text-sm text-primary hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" variant="gentry">
              Đăng nhập
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
