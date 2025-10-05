"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default function AIStylingPage() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen w-full">
      <Card className="w-full h-full min-h-screen rounded-none border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <Sparkles className="w-6 h-6" />
            Gợi Ý AI
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center text-center py-12">
          <div className="space-y-6 w-full max-w-4xl">
            <Sparkles className="w-16 h-16 mx-auto text-primary/50" />
            <h3 className="text-2xl font-semibold">Gợi Ý Thông Minh</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI sẽ phân tích tủ đồ của bạn và đưa ra những gợi ý thông minh về:
            </p>

            {/* Grid hiển thị các tính năng */}
            <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
              <div className="p-6 border rounded-lg bg-white/40">
                <h4 className="font-semibold mb-2">🎯 Tối ưu hóa tủ đồ</h4>
                <p className="text-sm text-muted-foreground">
                  Phát hiện những món đồ ít sử dụng và gợi ý cách phối đồ mới
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-white/40">
                <h4 className="font-semibold mb-2">🛍️ Mua sắm thông minh</h4>
                <p className="text-sm text-muted-foreground">
                  Đề xuất những món đồ cần thiết để hoàn thiện phong cách
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-white/40">
                <h4 className="font-semibold mb-2">📅 Lên lịch outfit</h4>
                <p className="text-sm text-muted-foreground">
                  Gợi ý trang phục phù hợp cho từng dịp và thời tiết
                </p>
              </div>
              <div className="p-6 border rounded-lg bg-white/40">
                <h4 className="font-semibold mb-2">♻️ Tái sử dụng</h4>
                <p className="text-sm text-muted-foreground">
                  Khuyến khích sử dụng những món đồ ít mặc
                </p>
              </div>
            </div>

            {/* Button */}
            <Button className="mt-8" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? "Đang xử lý..." : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Nhận Gợi Ý AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
