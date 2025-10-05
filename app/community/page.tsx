"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Filter,
  Eye,
  Plus,
  CloudUpload,
  TrendingUp,
  Clock,
  UserPlus,
} from "lucide-react"
import Image from "next/image"

interface Post {
  id: number
  user: {
    name: string
    avatar: string
    isFollowing: boolean
  }
  timeAgo: string
  image: string
  description: string
  tags: string[]
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isSaved: boolean
}

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: {
        name: "Minh Anh",
        avatar: "young woman with stylish outfit",
        isFollowing: false,
      },
      timeAgo: "2 giờ trước",
      image: "casual street style outfit",
      description:
        "Outfit hôm nay với phong cách street casual 🌟 Mix áo thun trắng với quần jeans và sneakers yêu thích!",
      tags: ["Casual", "Street Style", "Hàng Ngày"],
      likes: 247,
      comments: 18,
      shares: 12,
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      user: {
        name: "Thu Hà",
        avatar: "professional woman in business attire",
        isFollowing: true,
      },
      timeAgo: "5 giờ trước",
      image: "business formal outfit",
      description: "Look công sở thanh lịch với blazer và quần âu. Perfect cho những cuộc họp quan trọng! 💼",
      tags: ["Formal", "Công Sở", "Thanh Lịch"],
      likes: 389,
      comments: 25,
      shares: 8,
      isLiked: true,
      isSaved: true,
    },
    {
      id: 3,
      user: {
        name: "Đức Minh",
        avatar: "young man in vintage style",
        isFollowing: false,
      },
      timeAgo: "1 ngày trước",
      image: "vintage retro outfit",
      description: "Thử nghiệm phong cách vintage với áo sơ mi kẻ và quần suspender. Retro vibes! ✨",
      tags: ["Vintage", "Retro", "Độc Đáo"],
      likes: 156,
      comments: 12,
      shares: 5,
      isLiked: false,
      isSaved: false,
    },
  ])

  const [shareModalOpen, setShareModalOpen] = useState(false)

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleSave = (postId: number) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)))
  }

  const handleFollow = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              user: { ...post.user, isFollowing: !post.user.isFollowing },
            }
          : post,
      ),
    )
  }

  const filterOptions = [
    { value: "all", label: "Tất Cả", icon: Users },
    { value: "trending", label: "Thịnh Hành", icon: TrendingUp },
    { value: "new", label: "Mới Nhất", icon: Clock },
    { value: "following", label: "Đang Theo Dõi", icon: UserPlus },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
              <Users className="w-10 h-10 text-primary" />
              Cộng đồng thời trang
              <Heart className="w-10 h-10 text-red-500" />
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chia sẻ phong cách, kết nối đam mê và khám phá cảm hứng thời trang từ cộng đồng GENTRY
            </p>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-primary">12,847</h3>
              <p className="text-sm text-muted-foreground">Thành Viên</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-primary">3,256</h3>
              <p className="text-sm text-muted-foreground">Outfit Chia Sẻ</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-primary">18,492</h3>
              <p className="text-sm text-muted-foreground">Lượt Thích</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-primary">7,834</h3>
              <p className="text-sm text-muted-foreground">Bình Luận</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={activeFilter === option.value ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setActiveFilter(option.value)}
                >
                  <option.icon className="w-4 h-4" />
                  {option.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tất cả phong cách" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phong cách</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="street">Street Style</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>

              <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Chia sẻ outfit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Chia Sẻ Outfit Của Bạn</DialogTitle>
                  </DialogHeader>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <CloudUpload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground mb-3">Kéo thả hoặc click để tải ảnh outfit</p>
                        <Button variant="outline" size="sm">
                          Chọn ảnh
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Mô tả outfit</Label>
                        <Textarea placeholder="Chia sẻ về outfit của bạn..." rows={4} />
                      </div>
                      <div>
                        <Label>Phong cách</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phong cách" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="street">Street Style</SelectItem>
                            <SelectItem value="vintage">Vintage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Tags</Label>
                        <Input placeholder="Thêm tags (cách nhau bằng dấu phẩy)" />
                      </div>
                      <div>
                        <Label>Dịp sử dụng</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn dịp" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Hàng ngày</SelectItem>
                            <SelectItem value="work">Công sở</SelectItem>
                            <SelectItem value="party">Tiệc tùng</SelectItem>
                            <SelectItem value="date">Hẹn hò</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={() => setShareModalOpen(false)}>
                      Hủy
                    </Button>
                    <Button onClick={() => setShareModalOpen(false)}>Chia Sẻ Outfit</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Post Header */}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400">
                        <Image
                          src={`/.jpg?height=40&width=40&query=${post.user.avatar}`}
                          alt={post.user.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h6 className="font-semibold text-sm">{post.user.name}</h6>
                        <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                      </div>
                    </div>
                    <Button
                      variant={post.user.isFollowing ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFollow(post.id)}
                    >
                      {post.user.isFollowing ? "Đang theo dõi" : "Theo dõi"}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {/* Post Image */}
                  <div className="relative group">
                    <Image
                      src={`/.jpg?height=300&width=300&query=${post.image}`}
                      alt="Outfit"
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Xem Chi Tiết
                      </Button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-sm">{post.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1 p-0 h-auto"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`w-4 h-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                          <span className="text-sm">{post.likes}</span>
                        </Button>

                        <Button variant="ghost" size="sm" className="flex items-center gap-1 p-0 h-auto">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.comments}</span>
                        </Button>

                        <Button variant="ghost" size="sm" className="flex items-center gap-1 p-0 h-auto">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">{post.shares}</span>
                        </Button>
                      </div>

                      <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={() => handleSave(post.id)}>
                        <Bookmark className={`w-4 h-4 ${post.isSaved ? "fill-yellow-500 text-yellow-500" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Tải Thêm Bài Viết
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
