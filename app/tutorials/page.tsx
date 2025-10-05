"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Play,
  Clock,
  Eye,
  User,
  ThumbsUp,
  Bookmark,
  Search,
  Bot as Robot,
  Palette,
  GraduationCap,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Ruler,
  Star,
  RotateCcw,
  Heart,
} from "lucide-react"
import Image from "next/image"

interface Tutorial {
  id: number
  title: string
  description: string
  duration: string
  views: string
  author: string
  category: string
  thumbnail: string
  tags: string[]
  difficulty: "Cơ bản" | "Trung bình" | "Nâng cao"
}

interface QuickTip {
  icon: any
  title: string
  description: string
}

export default function TutorialsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedVideo, setSelectedVideo] = useState<Tutorial | null>(null)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const categories = [
    { id: "all", label: "Tất cả", icon: Layers },
    { id: "ai-guide", label: "Hướng dẫn AI", icon: Robot },
    { id: "styling-tips", label: "Mẹo phối đồ", icon: Palette },
    { id: "wardrobe-management", label: "Quản lý tủ đồ", icon: Layers },
    { id: "fashion-basics", label: "Cơ bản thời trang", icon: GraduationCap },
    { id: "seasonal-style", label: "Phong cách theo mùa", icon: Calendar },
  ]

  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: "Cách sử dụng AI để tạo outfit hoàn hảo",
      description:
        "Hướng dẫn chi tiết cách sử dụng tính năng AI Mix & Match để tạo ra những outfit phù hợp với phong cách và dịp của bạn.",
      duration: "15:30",
      views: "12.5K",
      author: "Fashion Expert",
      category: "ai-guide",
      thumbnail: "AI fashion styling tutorial interface",
      tags: ["AI Styling", "Cơ bản", "Phối đồ"],
      difficulty: "Cơ bản",
    },
    {
      id: 2,
      title: "Phối màu cơ bản cho người mới bắt đầu",
      description: "Học cách phối màu hài hòa với quy tắc 60-30-10 và bánh xe màu sắc cơ bản.",
      duration: "12:45",
      views: "8.2K",
      author: "Color Specialist",
      category: "styling-tips",
      thumbnail: "color wheel and fashion coordination",
      tags: ["Màu sắc", "Cơ bản", "Lý thuyết"],
      difficulty: "Cơ bản",
    },
    {
      id: 3,
      title: "Tổ chức tủ đồ thông minh với AI",
      description: "Cách sắp xếp và quản lý tủ đồ hiệu quả bằng công nghệ AI để tối ưu hóa việc chọn trang phục.",
      duration: "18:20",
      views: "15.7K",
      author: "Organization Pro",
      category: "wardrobe-management",
      thumbnail: "organized smart wardrobe with AI technology",
      tags: ["Tủ đồ", "AI", "Tổ chức"],
      difficulty: "Trung bình",
    },
    {
      id: 4,
      title: "Phong cách minimalist hiện đại",
      description: "Khám phá cách tạo ra phong cách tối giản nhưng vẫn thời trang và thanh lịch.",
      duration: "14:15",
      views: "9.8K",
      author: "Style Guru",
      category: "fashion-basics",
      thumbnail: "minimalist fashion style examples",
      tags: ["Minimalist", "Phong cách", "Hiện đại"],
      difficulty: "Trung bình",
    },
    {
      id: 5,
      title: "Outfit mùa đông ấm áp và thời trang",
      description: "Gợi ý cách phối đồ mùa đông vừa giữ ấm vừa thể hiện phong cách cá nhân.",
      duration: "16:40",
      views: "11.3K",
      author: "Seasonal Expert",
      category: "seasonal-style",
      thumbnail: "winter fashion outfit coordination",
      tags: ["Mùa đông", "Thời trang", "Ấm áp"],
      difficulty: "Cơ bản",
    },
    {
      id: 6,
      title: "Mix & Match nâng cao với AI",
      description: "Kỹ thuật phối đồ nâng cao sử dụng AI để tạo ra những outfit độc đáo và sáng tạo.",
      duration: "22:10",
      views: "6.9K",
      author: "AI Fashion Pro",
      category: "ai-guide",
      thumbnail: "advanced AI fashion mixing interface",
      tags: ["AI", "Nâng cao", "Sáng tạo"],
      difficulty: "Nâng cao",
    },
  ]

  const quickTips: QuickTip[] = [
    {
      icon: Palette,
      title: "Phối màu cơ bản",
      description: "Học cách phối màu hài hòa với quy tắc 60-30-10 và bánh xe màu sắc.",
    },
    {
      icon: Ruler,
      title: "Chọn size phù hợp",
      description: "Hướng dẫn đo size chính xác và chọn trang phục vừa vặn với cơ thể.",
    },
    {
      icon: Star,
      title: "Tạo điểm nhấn",
      description: "Cách sử dụng phụ kiện và chi tiết để tạo điểm nhấn cho outfit.",
    },
    {
      icon: RotateCcw,
      title: "Mix & Match thông minh",
      description: "Tối đa hóa tủ đồ bằng cách phối đồ đa dạng từ ít món đồ.",
    },
    {
      icon: Calendar,
      title: "Phong cách theo dịp",
      description: "Chọn outfit phù hợp cho từng dịp: công sở, dạo phố, tiệc tùng.",
    },
    {
      icon: Heart,
      title: "Tự tin với phong cách",
      description: "Bí quyết để tự tin và thoải mái với phong cách thời trang của bạn.",
    },
  ]

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesCategory = activeCategory === "all" || tutorial.category === activeCategory
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedTutorials = [...filteredTutorials].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return Number.parseFloat(b.views) - Number.parseFloat(a.views)
      case "duration-short":
        return Number.parseFloat(a.duration) - Number.parseFloat(b.duration)
      case "duration-long":
        return Number.parseFloat(b.duration) - Number.parseFloat(a.duration)
      default:
        return b.id - a.id // newest first
    }
  })

  const handleVideoPlay = (tutorial: Tutorial) => {
    setSelectedVideo(tutorial)
    setVideoModalOpen(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Cơ bản":
        return "bg-green-100 text-green-800"
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800"
      case "Nâng cao":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-4">Hướng dẫn & Mẹo hay</h1>
              <p className="text-xl text-muted-foreground">
                Học cách sử dụng AI và khám phá những bí quyết thời trang từ các chuyên gia
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-lg p-6">
                <h4 className="text-2xl font-bold text-primary mb-1">50+</h4>
                <p className="text-muted-foreground">Video hướng dẫn</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setActiveCategory(category.id)}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorial */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Video nổi bật</h2>
            <p className="text-muted-foreground">Hướng dẫn được xem nhiều nhất tuần này</p>
          </div>

          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative group cursor-pointer" onClick={() => handleVideoPlay(tutorials[0])}>
                <Image
                  src={`/.jpg?height=400&width=600&query=${tutorials[0].thumbnail}`}
                  alt={tutorials[0].title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {tutorials[0].duration}
                </div>
              </div>

              <CardContent className="p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{tutorials[0].title}</h3>
                  <p className="text-muted-foreground">{tutorials[0].description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {tutorials[0].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tutorials[0].duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {tutorials[0].views} lượt xem
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tutorials[0].tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button onClick={() => handleVideoPlay(tutorials[0])}>
                    <Play className="w-4 h-4 mr-2" />
                    Xem ngay
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* All Tutorials */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold">Tất cả hướng dẫn</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm hướng dẫn..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="popular">Phổ biến</SelectItem>
                  <SelectItem value="duration-short">Ngắn nhất</SelectItem>
                  <SelectItem value="duration-long">Dài nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {sortedTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative group cursor-pointer" onClick={() => handleVideoPlay(tutorial)}>
                  <Image
                    src={`/.jpg?height=200&width=300&query=${tutorial.thumbnail}`}
                    alt={tutorial.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {tutorial.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <h3 className="font-bold line-clamp-2">{tutorial.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{tutorial.description}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {tutorial.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {tutorial.views}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {tutorial.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Trước
              </Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Sau</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mẹo nhanh hàng ngày</h2>
            <p className="text-muted-foreground">Những bí quyết thời trang đơn giản nhưng hiệu quả</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {quickTips.map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <tip.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h5 className="font-bold">{tip.title}</h5>
                  <p className="text-muted-foreground text-sm">{tip.description}</p>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Xem chi tiết <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              {selectedVideo?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <p>Đang tải video...</p>
              </div>
            </div>

            {selectedVideo && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h6 className="font-bold">{selectedVideo.title}</h6>
                  <p className="text-muted-foreground text-sm">{selectedVideo.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedVideo.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedVideo.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedVideo.views} lượt xem
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Thích
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Lưu
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
