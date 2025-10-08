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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      if (!token) {
        setUser(null)
        return
      }

      const res = await api.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.data.success && res.data.data) {
        setUser({
          ...res.data.data,
          accessToken: token,
          refreshToken: localStorage.getItem("refreshToken") || "",
        })
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }

  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true })
    } catch (err) {
      console.error("Lỗi logout", err)
    } finally {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userId")
      localStorage.removeItem("role")
      setUser(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth phải được dùng trong AuthProvider")
  return context
}
