"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Send } from "lucide-react"

export default function AIStylingPage() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "ai"; text: string; outfit?: any }[]
  >([])

  const handleSend = async () => {
    if (!message.trim()) return
    setIsLoading(true)

    // Thêm tin nhắn người dùng vào UI
    setChatHistory(prev => [...prev, { sender: "user", text: message }])

    try {
      const response = await fetch("https://localhost:7167/api/ai/outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "fd929ff5-0b2c-4ff2-b372-caee3974196a",
          userMessage: message,
          occasion: "casual",
          weatherCondition: "rain",
          season: "spring",
          additionalPreferences: "cloudy",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setChatHistory(prev => [
          ...prev,
          {
            sender: "ai",
            text: `${data.message}\n\n${data.recommendationReason}`,
            outfit: data.outfitItems,
          },
        ])
      } else {
        setChatHistory(prev => [
          ...prev,
          { sender: "ai", text: "Xin lỗi, AI không thể tạo outfit ngay lúc này." },
        ])
      }
    } catch (error) {
      console.error(error)
      setChatHistory(prev => [
        ...prev,
        { sender: "ai", text: "Đã xảy ra lỗi khi kết nối đến máy chủ AI." },
      ])
    } finally {
      setIsLoading(false)
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10">
      <Card className="w-full max-w-3xl shadow-lg border border-border">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="w-6 h-6 text-primary" />
            GENTRY AI Stylist
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Chat với AI để nhận gợi ý outfit thông minh ✨
          </p>
        </CardHeader>

        <CardContent>
          {/* Chat Area */}
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
                  className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Hiển thị outfit */}
                  {msg.outfit && (
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {msg.outfit.map((item: any) => (
                        <div
                          key={item.itemId}
                          className="flex flex-col items-center border rounded-lg p-2 bg-background"
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

          {/* Input area */}
          <div className="flex items-center gap-2 mt-4">
            <Input
              placeholder="Nhập tin nhắn cho AI (ví dụ: 'Tôi muốn mặc thanh lịch khi trời mưa')"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
