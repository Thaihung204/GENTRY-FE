"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shirt, Zap, Filter, Sparkles, CloudUpload, Sun, CloudRain, Snowflake, Bot } from "lucide-react"
import Image from "next/image"

export default function AIStylingPage() {
  const [selectedCategory, setSelectedCategory] = useState("tops")
  const [selectedWeather, setSelectedWeather] = useState("all")
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedOutfits, setGeneratedOutfits] = useState<any[]>([])

  const categories = [
    { id: "tops", icon: Shirt, label: "Áo" },
    { id: "bottoms", icon: Shirt, label: "Quần" },
    { id: "dresses", icon: Shirt, label: "Váy" },
    { id: "shoes", icon: Shirt, label: "Giày" },
    { id: "accessories", icon: Sparkles, label: "Phụ kiện" },
    { id: "bags", icon: Shirt, label: "Túi" },
  ]

  const weatherOptions = [
    { id: "all", icon: Sun, label: "Tất cả" },
    { id: "sunny", icon: Sun, label: "Nắng" },
    { id: "rainy", icon: CloudRain, label: "Mưa" },
    { id: "cold", icon: Snowflake, label: "Lạnh" },
  ]

  const colors = [
    { id: "all", color: "linear-gradient(45deg, #ff0000, #00ff00, #0000ff)", label: "Tất cả" },
    { id: "black", color: "#000000", label: "Đen" },
    { id: "white", color: "#ffffff", label: "Trắng" },
    { id: "red", color: "#dc3545", label: "Đỏ" },
    { id: "blue", color: "#0d6efd", label: "Xanh dương" },
    { id: "green", color: "#198754", label: "Xanh lá" },
    { id: "yellow", color: "#ffc107", label: "Vàng" },
    { id: "pink", color: "#d63384", label: "Hồng" },
  ]

  const sampleItems = [
    { id: 1, name: "Áo sơ mi trắng", category: "tops", image: "white dress shirt" },
    { id: 2, name: "Quần jeans xanh", category: "bottoms", image: "blue jeans" },
    { id: 3, name: "Váy đen", category: "dresses", image: "black dress" },
    { id: 4, name: "Giày sneaker", category: "shoes", image: "white sneakers" },
    { id: 5, name: "Túi xách", category: "bags", image: "leather handbag" },
    { id: 6, name: "Đồng hồ", category: "accessories", image: "wrist watch" },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateOutfit = async () => {
    setIsGenerating(true)
    // Simulate AI processing
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
      {
        id: 2,
        name: "Outfit Casual",
        items: [
          { name: "Áo thun", image: "casual t-shirt" },
          { name: "Quần jeans", image: "blue jeans" },
          { name: "Giày sneaker", image: "white sneakers" },
          { name: "Túi đeo chéo", image: "crossbody bag" },
        ],
        confidence: 88,
        occasion: "Hàng ngày",
      },
    ])
    setIsGenerating(false)
  }

  const filteredItems = sampleItems.filter((item) => selectedCategory === "all" || item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">AI Mix & Match</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chọn một món đồ và để AI gợi ý outfit hoàn hảo cho bạn
            </p>
          </div>
        </div>
      </section>

      {/* Main Interface */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Panel - Item Selection */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-primary" />
                  Chọn món đồ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Section */}
                <div className="space-y-4">
                  <h6 className="font-semibold">Tải ảnh lên</h6>
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    {uploadedImage ? (
                      <div className="space-y-3">
                        <Image
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded item"
                          width={120}
                          height={120}
                          className="mx-auto rounded-lg object-cover"
                        />
                        <p className="text-sm text-muted-foreground">Click để thay đổi</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <CloudUpload className="w-12 h-12 mx-auto text-muted-foreground" />
                        <div>
                          <h6 className="font-semibold mb-1">Tải ảnh lên</h6>
                          <p className="text-sm text-muted-foreground mb-3">Kéo thả hoặc click để chọn ảnh</p>
                          <Button variant="outline" size="sm">
                            Chọn ảnh
                          </Button>
                        </div>
                      </div>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  <h6 className="font-semibold">Hoặc chọn từ danh mục</h6>
                  <div className="grid grid-cols-3 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className="flex flex-col gap-1 h-auto py-3"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <category.icon className="w-4 h-4" />
                        <span className="text-xs">{category.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sample Items */}
                <div className="space-y-4">
                  <h6 className="font-semibold">Mẫu có sẵn</h6>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-3 hover:border-primary cursor-pointer transition-colors"
                      >
                        <Image
                          src={`/.jpg?height=80&width=80&query=${item.image}`}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full aspect-square object-cover rounded mb-2"
                        />
                        <p className="text-xs font-medium text-center">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Center Panel - Filters */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Bộ lọc
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Style Filter */}
                <div className="space-y-3">
                  <label className="font-semibold">Phong cách</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả phong cách" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả phong cách</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="street">Street Style</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="bohemian">Bohemian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Context Filter */}
                <div className="space-y-3">
                  <label className="font-semibold">Dịp sử dụng</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả dịp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả dịp</SelectItem>
                      <SelectItem value="work">Đi làm</SelectItem>
                      <SelectItem value="date">Hẹn hò</SelectItem>
                      <SelectItem value="party">Tiệc tùng</SelectItem>
                      <SelectItem value="casual">Hàng ngày</SelectItem>
                      <SelectItem value="travel">Du lịch</SelectItem>
                      <SelectItem value="sport">Thể thao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Weather Filter */}
                <div className="space-y-3">
                  <label className="font-semibold">Thời tiết</label>
                  <div className="grid grid-cols-2 gap-2">
                    {weatherOptions.map((weather) => (
                      <Button
                        key={weather.id}
                        variant={selectedWeather === weather.id ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => setSelectedWeather(weather.id)}
                      >
                        <weather.icon className="w-4 h-4" />
                        <span>{weather.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Color Preference */}
                <div className="space-y-3">
                  <label className="font-semibold">Màu sắc ưa thích</label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <Button
                        key={color.id}
                        variant="outline"
                        size="sm"
                        className="w-12 h-12 p-0 border-2 bg-transparent"
                        style={{
                          background: color.color,
                          borderColor: selectedColors.includes(color.id) ? "#0d6efd" : "#e5e7eb",
                        }}
                        onClick={() => {
                          if (color.id === "all") {
                            setSelectedColors(["all"])
                          } else {
                            setSelectedColors((prev) =>
                              prev.includes(color.id)
                                ? prev.filter((c) => c !== color.id)
                                : [...prev.filter((c) => c !== "all"), color.id],
                            )
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <Button className="w-full" size="lg" onClick={generateOutfit} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Bot className="w-5 h-5 mr-2 animate-spin" />
                      Đang tạo...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Tạo outfit
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Right Panel - Results */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Gợi ý outfit
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedOutfits.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <Bot className="w-16 h-16 mx-auto text-muted-foreground" />
                    <div className="space-y-2">
                      <h6 className="font-semibold text-muted-foreground">
                        Chọn món đồ và click "Tạo outfit" để nhận gợi ý từ AI
                      </h6>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {generatedOutfits.map((outfit) => (
                      <Card key={outfit.id} className="border-2">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h6 className="font-semibold">{outfit.name}</h6>
                            <Badge variant="secondary">{outfit.confidence}% phù hợp</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {outfit.items.map((item: any, index: number) => (
                              <div key={index} className="text-center space-y-2">
                                <Image
                                  src={`/.jpg?height=80&width=80&query=${item.image}`}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="w-full aspect-square object-cover rounded-lg"
                                />
                                <p className="text-xs font-medium">{item.name}</p>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="text-sm text-muted-foreground">Phù hợp cho: {outfit.occasion}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Lưu
                              </Button>
                              <Button size="sm">Thử ngay</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
