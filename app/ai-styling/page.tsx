"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Send } from "lucide-react"
import api from "@/app/config/api"
import axios from "axios"

export default function AIStylingPage() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<
    {
      sender: "user" | "ai"
      text: string
      imageUrl?: string
      outfitItems?: any[]
    }[]
  >([])

  const handleSend = async () => {
    if (!message.trim()) return
    setIsLoading(true)

    // 🧍‍♂️ Thêm tin nhắn người dùng vào UI
    setChatHistory(prev => [...prev, { sender: "user", text: message }])

    try {
      const response = await api.post("/outfitai/chat/gemini", {
        userId: "e787cd23-ca09-452b-81e7-b6a256e793d9",
        userMessage: message,
        occasion: "holiday",
        weatherCondition: "sunny",
        season: "spring",
        additionalPreferences: "cloudy",
      })

      const data = response.data

      if (data.success) {
        setChatHistory(prev => [
          ...prev,
          {
            sender: "ai",
            text: `${data.message}\n\n${data.recommendationReason || ""}`,
            imageUrl: data.imageUrl,
            outfitItems: Array.isArray(data.outfitItems) ? data.outfitItems : [],
          },
        ])
      } else {
        setChatHistory(prev => [
          ...prev,
          { sender: "ai", text: data.message || "AI không thể tạo outfit ngay lúc này." },
        ])
      }
    } catch (error: any) {
      console.error("❌ Lỗi khi gọi API:", error)

      // Nếu server trả về lỗi HTTP
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const msg =
          error.response?.data?.message ||
          (status ? `Lỗi máy chủ (${status})` : "Không thể kết nối đến máy chủ.")
        setChatHistory(prev => [...prev, { sender: "ai", text: msg }])
      } else {
        setChatHistory(prev => [
          ...prev,
          { sender: "ai", text: "Đã xảy ra lỗi không xác định khi kết nối đến AI." },
        ])
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10">
      <Card className="w-full max-w-3xl shadow-lg border border-border">
        <CardHeader className="flex flex-col items-center text-center">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="w-6 h-6 text-primary" />
            GENTRY AI Stylist
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Chat với AI để nhận gợi ý outfit thông minh ✨
          </p>
        </CardHeader>

        <CardContent>
          {/* 💬 Khu vực chat */}
          <div className="h-[480px] overflow-y-auto p-4 border rounded-md bg-muted/20 space-y-4">
            {chatHistory.length === 0 && (
              <p className="text-center text-muted-foreground text-sm">
                Hãy bắt đầu bằng cách nói chuyện với GENTRY AI 👋
              </p>
            )}

            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <Avatar className="mr-2">
                    <AvatarImage src="/ai-avatar.png" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-sm whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* 🖼️ Hiển thị hình outfit tổng */}
                  {msg.imageUrl && (
                    <div className="mt-3">
                      <img
                        src={msg.imageUrl}
                        alt="Generated Outfit"
                        className="w-full rounded-lg border object-cover"
                      />
                    </div>
                  )}

                  {/* 👕 Danh sách outfit items */}
                  {msg.outfitItems && msg.outfitItems.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {msg.outfitItems.map((item: any) => (
                        <div
                          key={item.itemId || Math.random()}
                          className="flex flex-col items-center border rounded-lg p-2 bg-background shadow-sm"
                        >
                          <img
                            src={item.itemImageUrl}
                            alt={item.itemName}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <p className="text-xs font-semibold mt-1 text-center">{item.itemName}</p>
                          <p className="text-[11px] text-muted-foreground text-center">
                            {item.brand} - {item.colorName}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ✍️ Input */}
          <div className="flex items-center gap-2 mt-4">
            <Input
              placeholder="Nhập tin nhắn cho AI (ví dụ: 'Tôi muốn mặc thanh lịch khi trời mưa')"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "..." : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
