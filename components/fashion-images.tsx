"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Upload, Download, Trash2, MoreHorizontal, ImageIcon, Database } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const imageDatasets = [
  {
    id: 1,
    name: "Summer Collection 2024",
    description: "Bộ sưu tập hè 2024 với các items nhẹ nhàng, thoáng mát",
    imageCount: 1247,
    size: "2.3 GB",
    status: "active",
    category: "Seasonal",
    uploadDate: "2024-01-15",
    lastUpdated: "2024-03-10",
    tags: ["summer", "casual", "light"],
    thumbnail: "/summer-fashion-collection.png",
  },
  {
    id: 2,
    name: "Business Attire Dataset",
    description: "Trang phục công sở chuyên nghiệp cho nam và nữ",
    imageCount: 892,
    size: "1.8 GB",
    status: "active",
    category: "Professional",
    uploadDate: "2024-01-20",
    lastUpdated: "2024-03-08",
    tags: ["business", "formal", "professional"],
    thumbnail: "/professional-business-attire.png",
  },
  {
    id: 3,
    name: "Street Style Collection",
    description: "Phong cách đường phố hiện đại và năng động",
    imageCount: 634,
    size: "1.2 GB",
    status: "processing",
    category: "Street",
    uploadDate: "2024-02-05",
    lastUpdated: "2024-03-12",
    tags: ["street", "urban", "trendy"],
    thumbnail: "/street-style-fashion.jpg",
  },
  {
    id: 4,
    name: "Evening Wear Dataset",
    description: "Trang phục dạ tiệc và sự kiện trang trọng",
    imageCount: 521,
    size: "1.5 GB",
    status: "active",
    category: "Formal",
    uploadDate: "2024-02-10",
    lastUpdated: "2024-03-05",
    tags: ["evening", "formal", "elegant"],
    thumbnail: "/evening-wear.jpg",
  },
  {
    id: 5,
    name: "Accessories Collection",
    description: "Phụ kiện thời trang: túi, giày, trang sức",
    imageCount: 387,
    size: "0.9 GB",
    status: "inactive",
    category: "Accessories",
    uploadDate: "2024-02-15",
    lastUpdated: "2024-02-28",
    tags: ["accessories", "bags", "shoes", "jewelry"],
    thumbnail: "/fashion-accessories-collection.png",
  },
  {
    id: 6,
    name: "Vintage Fashion Archive",
    description: "Bộ sưu tập thời trang vintage và retro",
    imageCount: 756,
    size: "1.7 GB",
    status: "active",
    category: "Vintage",
    uploadDate: "2024-02-20",
    lastUpdated: "2024-03-01",
    tags: ["vintage", "retro", "classic"],
    thumbnail: "/vintage-fashion.png",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
  inactive: "bg-red-100 text-red-800 border-red-200",
}

export default function FashionImages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredDatasets = imageDatasets.filter((dataset) => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || dataset.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || dataset.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalImages = imageDatasets.reduce((sum, dataset) => sum + dataset.imageCount, 0)
  const totalSize = imageDatasets.reduce((sum, dataset) => sum + Number.parseFloat(dataset.size), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Dataset ảnh</h1>
          <p className="text-muted-foreground mt-2">Quản lý bộ dữ liệu hình ảnh cho AI phối đồ</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Dataset
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Tạo Dataset mới
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng datasets</p>
                <p className="text-2xl font-bold text-foreground">{imageDatasets.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng hình ảnh</p>
                <p className="text-2xl font-bold text-green-600">{totalImages.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dung lượng</p>
                <p className="text-2xl font-bold text-purple-600">{totalSize.toFixed(1)} GB</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Đang xử lý</p>
                <p className="text-2xl font-bold text-orange-600">
                  {imageDatasets.filter((d) => d.status === "processing").length}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Danh sách datasets</CardTitle>
          <CardDescription className="text-muted-foreground">
            Quản lý các bộ dữ liệu hình ảnh thời trang
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm dataset..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="Seasonal">Theo mùa</option>
              <option value="Professional">Chuyên nghiệp</option>
              <option value="Street">Đường phố</option>
              <option value="Formal">Trang trọng</option>
              <option value="Accessories">Phụ kiện</option>
              <option value="Vintage">Vintage</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="processing">Đang xử lý</option>
              <option value="inactive">Không hoạt động</option>
            </select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          {/* Datasets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDatasets.map((dataset) => (
              <Card key={dataset.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={dataset.thumbnail || "/placeholder.svg"}
                      alt={dataset.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-foreground text-lg line-clamp-1">{dataset.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Tải xuống
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Upload className="h-4 w-4 mr-2" />
                            Cập nhật
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{dataset.description}</p>

                    <div className="flex items-center justify-between">
                      <Badge className={statusColors[dataset.status as keyof typeof statusColors]}>
                        {dataset.status === "active"
                          ? "Hoạt động"
                          : dataset.status === "processing"
                            ? "Đang xử lý"
                            : "Không hoạt động"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{dataset.category}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Hình ảnh</p>
                        <p className="font-medium text-foreground">{dataset.imageCount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Dung lượng</p>
                        <p className="font-medium text-foreground">{dataset.size}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {dataset.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                      <p>Tạo: {dataset.uploadDate}</p>
                      <p>Cập nhật: {dataset.lastUpdated}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
