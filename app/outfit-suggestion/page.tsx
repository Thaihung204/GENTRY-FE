
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Filter, Sparkles, Sun, CloudRain, Snowflake, Bot } from "lucide-react"
import Image from "next/image"

export default function OutfitSuggestionPage() {
  const [selectedStyle, setSelectedStyle] = useState("all")
  const [selectedOccasion, setSelectedOccasion] = useState("all")
  const [selectedWeather, setSelectedWeather] = useState("all")
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedOutfits, setGeneratedOutfits] = useState<any[]>([])

  const weatherOptions = [
    { id: "all", icon: Sun, label: "Tất cả" },
    { id: "sunny", icon: Sun, label: "Nắng" },
    { id: "rainy", icon: CloudRain, label: "Mưa" },
    { id: "cold", icon: Snowflake, label: "Lạnh" },
  ]

  const colors = [
    { id: "black", color: "#000000", label: "Đen" },
    { id: "white", color: "#ffffff", label: "Trắng" },
    { id: "red", color: "#dc3545", label: "Đỏ" },
    { id: "blue", color: "#0d6efd", label: "Xanh dương" },
    { id: "green", color: "#198754", label: "Xanh lá" },
    { id: "yellow", color: "#ffc107", label: "Vàng" },
    { id: "pink", color: "#d63384", label: "Hồng" },
  ]

  const generateOutfit = async () => {
    setIsGenerating(true)
    // Giả lập gọi API AI
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setGeneratedOutfits([
      {
        id: 1,
        name: "Outfit Công sở",
        items: [
          { name: "Áo blazer", image: "business blazer" },
          { name: "Áo sơ mi", image: "white dress shirt" },
          { name: "Quần tây", image: "dress pants" },
          { name: "Giày oxford", image: "oxford shoes" },
        ],
        confidence: 95,
        occasion: "Công sở",
      },
    ])
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">AI Mix & Match</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chọn thông tin bên dưới và để AI tự phối outfit từ tủ đồ của bạn
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-10">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-6">
          {/* Bộ lọc */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Bộ lọc Outfit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Phong cách */}
              <div className="space-y-2">
                <label className="font-semibold">Phong cách</label>
                <Select onValueChange={(val) => setSelectedStyle(val)} defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phong cách" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="street">Street</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dịp */}
              <div className="space-y-2">
                <label className="font-semibold">Dịp sử dụng</label>
                <Select onValueChange={(val) => setSelectedOccasion(val)} defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dịp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="work">Đi làm</SelectItem>
                    <SelectItem value="date">Hẹn hò</SelectItem>
                    <SelectItem value="party">Tiệc</SelectItem>
                    <SelectItem value="casual">Hàng ngày</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Thời tiết */}
              <div className="space-y-2">
                <label className="font-semibold">Thời tiết</label>
                <div className="grid grid-cols-2 gap-2">
                  {weatherOptions.map((weather) => (
                    <Button
                      key={weather.id}
                      variant={selectedWeather === weather.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedWeather(weather.id)}
                    >
                      <weather.icon className="w-4 h-4 mr-1" />
                      {weather.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Màu sắc */}
              <div className="space-y-2">
                <label className="font-semibold">Màu sắc ưa thích</label>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <Button
                      key={color.id}
                      variant="outline"
                      size="sm"
                      className="w-10 h-10 rounded-full border-2"
                      style={{
                        background: color.color,
                        borderColor: selectedColors.includes(color.id) ? "#0d6efd" : "#e5e7eb",
                      }}
                      onClick={() => {
                        setSelectedColors((prev) =>
                          prev.includes(color.id)
                            ? prev.filter((c) => c !== color.id)
                            : [...prev, color.id],
                        )
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Nút tạo */}
              <Button className="w-full" size="lg" onClick={generateOutfit} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Bot className="w-5 h-5 mr-2 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Tạo Outfit
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Kết quả */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Gợi ý từ AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedOutfits.length === 0 ? (
                <div className="text-center py-12">
                  <Bot className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Chọn filter và bấm "Tạo Outfit" để AI phối cho bạn</p>
                </div>
              ) : (
                generatedOutfits.map((outfit) => (
                  <Card key={outfit.id} className="border-2 mb-4">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold">{outfit.name}</h6>
                        <Badge variant="secondary">{outfit.confidence}% phù hợp</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {outfit.items.map((item: any, idx: number) => (
                          <div key={idx} className="text-center space-y-1">
                            <Image
                              src={`/.jpg?height=80&width=80&query=${item.image}`}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full aspect-square rounded-lg object-cover"
                            />
                            <p className="text-xs">{item.name}</p>
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">Phù hợp cho: {outfit.occasion}</span>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
