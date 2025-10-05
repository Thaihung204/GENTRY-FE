"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

interface User {
  email: string
  fullName: string
  role: string
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
      const res = await axios.get("https://localhost:5001/api/auth/current-user", {
        withCredentials: true,
      })
      if (res.data.success && res.data.data) {
        setUser(res.data.data)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }

  const logout = async () => {
    try {
      await axios.post("https://localhost:5001/api/auth/logout", {}, { withCredentials: true })
      setUser(null)
    } catch (err) {
      console.error("Lỗi logout", err)
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
  if (!context) {
    throw new Error("useAuth phải được dùng trong AuthProvider")
  }
  return context
}
