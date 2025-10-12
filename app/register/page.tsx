"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, User, Shield } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import api from "@/app/config/api"

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  })

  interface RegisterRequest {
    email: string
    password: string
    confirmPassword: string
    fullName: string
  }

  interface RegisterResponse {
    success: boolean
    message: string
  }

  async function register(data: RegisterRequest): Promise<RegisterResponse> {
    const res = await api.post<RegisterResponse>(
      "/auth/register",
      data, {
        headers: { "Content-Type": "application/json" }
      }
    )
    return res.data
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    register(formData)
      .then((res) => {
        if (res.success) {
          alert("Đăng ký thành công!")
          router.push("/login")
        } else {
          alert("Đăng ký thất bại: " + res.message)
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold">GENTRY</span>
          </div>
          <CardTitle className="text-2xl">Đăng ký</CardTitle>
          <p className="text-muted-foreground">Tạo tài khoản mới để tham gia GENTRY AI Fashion</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fullname */}
            <div className="space-y-2">
              <Label htmlFor="fullname">Họ và tên</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="password">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="xác nhận mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Đăng ký
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
