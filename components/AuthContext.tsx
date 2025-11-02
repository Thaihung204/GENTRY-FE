"use client"

import { createContext, useContext, useEffect, useState } from "react"
import api from "@/app/config/api"

interface User {
  email: string
  fullName: string
  role: string
  accessToken: string
  refreshToken: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  fetchUser: () => Promise<void>
  logout: () => Promise<void>
  loading: boolean // ✅ thêm
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) // ✅ state chờ user load xong

  const fetchUser = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("accessToken")
      if (!token) {
        setUser(null)
        return
      }

      const res = await api.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.data.success && res.data.data) {
        const userData: User = {
          ...res.data.data,
          accessToken: token,
          refreshToken: localStorage.getItem("refreshToken") || "",
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
      } else {
        setUser(null)
        localStorage.removeItem("user")
      }
    } catch (err) {
      console.error("Lỗi fetchUser:", err)
      setUser(null)
      localStorage.removeItem("user")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setLoading(false)
    } else {
      fetchUser().finally(() => setLoading(false))
    }
  }, [])

  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true })
    } catch (err) {
      console.error("Lỗi logout:", err)
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userId")
      localStorage.removeItem("role")
      localStorage.removeItem("user")
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth phải được dùng trong AuthProvider")
  return context
}
