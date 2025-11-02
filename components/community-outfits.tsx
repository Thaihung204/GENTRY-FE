"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Trash2, MoreHorizontal, Heart, MessageSquare, Share, Flag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const outfits = [
  {
    id: 1,
    title: "Outfit công sở thanh lịch",
    description: "Phối đồ công sở với áo sơ mi trắng và quần âu đen, kết hợp blazer navy",
    user: {
      name: "Nguyễn Thị Lan",
      avatar: "L",
      id: 123,
    },
    images: ["/white-shirt.png", "/black-jeans.png", "/navy-blazer.png"],
    likes: 245,
    comments: 32,
    shares: 18,
    views: 1247,
    status: "approved",
    category: "Công sở",
    createdDate: "2024-03-15",
    tags: ["công sở", "thanh lịch", "chuyên nghiệp"],
  },
  {
    id: 2,
    title: "Street style năng động",
    description: "Phong cách đường phố với jeans rách và áo thun oversized",
    user: {
      name: "Trần Văn Minh",
      avatar: "M",
      id: 456,
    },
    images: ["/black-jeans.png", "/white-sneakers.png"],
    likes: 189,
    comments: 24,
    shares: 12,
    views: 892,
    status: "approved",
    category: "Đường phố",
    createdDate: "2024-03-14",
    tags: ["street style", "năng động", "trẻ trung"],
  },
  {
    id: 3,
    title: "Váy hoa dạo phố",
    description: "Váy midi hoa nhí kết hợp với giày sneaker trắng cho look nữ tính nhưng thoải mái",
    user: {
      name: "Lê Thị Hương",
      avatar: "H",
      id: 789,
    },
    images: ["/floral-midi-dress.png", "/white-sneakers.png"],
    likes: 312,
    comments: 45,
    shares: 28,
    views: 1567,
    status: "pending",
    category: "Dạo phố",
    createdDate: "2024-03-13",
    tags: ["nữ tính", "hoa văn", "thoải mái"],
  },
  {
    id: 4,
    title: "Outfit dự tiệc sang trọng",
    description: "Trang phục dự tiệc với váy đen và phụ kiện vàng",
    user: {
      name: "Phạm Thị Mai",
      avatar: "M",
      id: 321,
    },
    images: ["/navy-blazer.png"],
    likes: 156,
    comments: 19,
    shares: 8,
    views: 634,
    status: "rejected",
    category: "Dự tiệc",
    createdDate: "2024-03-12",
    tags: ["sang trọng", "dự tiệc", "trang trọng"],
  },
  {
    id: 5,
    title: "Casual weekend look",
    description: "Phối đồ cuối tuần thoải mái với jeans và áo thun",
    user: {
      name: "Hoàng Văn Đức",
      avatar: "D",
      id: 654,
    },
    images: ["/black-jeans.png", "/white-sneakers.png"],
    likes: 98,
    comments: 15,
    shares: 6,
    views: 423,
    status: "approved",
    category: "Casual",
    createdDate: "2024-03-11",
    tags: ["casual", "cuối tuần", "thoải mái"],
  },
]

const statusColors = {
  approved: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
}

export default function CommunityOutfits() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredOutfits = outfits.filter((outfit) => {
    const matchesSearch =
      outfit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outfit.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || outfit.status === selectedStatus
    const matchesCategory = selectedCategory === "all" || outfit.category === selectedCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Outfits</h1>
          <p className="text-muted-foreground mt-2">Quản lý các outfit được chia sẻ bởi cộng đồng</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng outfits</p>
                <p className="text-2xl font-bold text-foreground">8,932</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Đã duyệt</p>
                <p className="text-2xl font-bold text-green-600">7,234</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Chờ duyệt</p>
                <p className="text-2xl font-bold text-yellow-600">1,456</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bị từ chối</p>
                <p className="text-2xl font-bold text-red-600">242</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Danh sách outfits</CardTitle>
          <CardDescription className="text-muted-foreground">Xem và quản lý các outfit được chia sẻ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tiêu đề hoặc tác giả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="approved">Đã duyệt</option>
              <option value="pending">Chờ duyệt</option>
              <option value="rejected">Bị từ chối</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="Công sở">Công sở</option>
              <option value="Đường phố">Đường phố</option>
              <option value="Dạo phố">Dạo phố</option>
              <option value="Dự tiệc">Dự tiệc</option>
              <option value="Casual">Casual</option>
            </select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          {/* Outfits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOutfits.map((outfit) => (
              <Card key={outfit.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  {/* Images */}
                  <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden relative">
                    <div className="grid grid-cols-2 gap-1 h-full">
                      {outfit.images.slice(0, 4).map((image, index) => (
                        <div
                          key={index}
                          className={`${outfit.images.length === 1 ? "col-span-2" : ""} ${outfit.images.length === 3 && index === 0 ? "col-span-2" : ""}`}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Outfit ${outfit.id} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {outfit.images.length > 4 && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          +{outfit.images.length - 4}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-foreground line-clamp-1">{outfit.title}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Flag className="h-4 w-4 mr-2" />
                            Báo cáo
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{outfit.description}</p>

                    {/* User Info */}
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {outfit.user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{outfit.user.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {outfit.user.id}</p>
                      </div>
                    </div>

                    {/* Status and Category */}
                    <div className="flex items-center justify-between">
                      <Badge className={statusColors[outfit.status as keyof typeof statusColors]}>
                        {outfit.status === "approved"
                          ? "Đã duyệt"
                          : outfit.status === "pending"
                            ? "Chờ duyệt"
                            : "Bị từ chối"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{outfit.category}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{outfit.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{outfit.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share className="h-4 w-4" />
                          <span>{outfit.shares}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{outfit.views}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {outfit.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                      {outfit.createdDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Hiển thị {filteredOutfits.length} trong tổng số {outfits.length} outfits
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Trước
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
