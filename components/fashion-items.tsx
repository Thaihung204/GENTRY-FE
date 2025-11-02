"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Edit, Trash2, Eye, MoreHorizontal, Tag, DollarSign } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const fashionItems = [
  {
    id: 1,
    name: "Áo sơ mi trắng basic",
    category: "Áo sơ mi",
    brand: "ZARA",
    price: "599,000",
    color: "Trắng",
    size: ["S", "M", "L", "XL"],
    status: "active",
    stock: 45,
    sold: 123,
    rating: 4.5,
    image: "/white-shirt.png",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Quần jeans skinny đen",
    category: "Quần jeans",
    brand: "H&M",
    price: "799,000",
    color: "Đen",
    size: ["28", "29", "30", "31", "32"],
    status: "active",
    stock: 32,
    sold: 89,
    rating: 4.2,
    image: "/black-jeans.png",
    createdDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Váy midi hoa nhí",
    category: "Váy",
    brand: "MANGO",
    price: "1,299,000",
    color: "Hoa văn",
    size: ["S", "M", "L"],
    status: "inactive",
    stock: 0,
    sold: 67,
    rating: 4.8,
    image: "/floral-midi-dress.png",
    createdDate: "2024-02-05",
  },
  {
    id: 4,
    name: "Áo khoác blazer navy",
    category: "Áo khoác",
    brand: "UNIQLO",
    price: "1,599,000",
    color: "Navy",
    size: ["S", "M", "L", "XL"],
    status: "active",
    stock: 18,
    sold: 45,
    rating: 4.6,
    image: "/navy-blazer.png",
    createdDate: "2024-02-10",
  },
  {
    id: 5,
    name: "Giày sneaker trắng",
    category: "Giày",
    brand: "ADIDAS",
    price: "2,199,000",
    color: "Trắng",
    size: ["36", "37", "38", "39", "40", "41", "42"],
    status: "active",
    stock: 25,
    sold: 156,
    rating: 4.7,
    image: "/white-sneakers.png",
    createdDate: "2024-02-15",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-red-100 text-red-800 border-red-200",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
}

export default function FashionItems() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredItems = fashionItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Items thời trang</h1>
          <p className="text-muted-foreground mt-2">Quản lý sản phẩm thời trang trong hệ thống</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Thêm item mới
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng items</p>
                <p className="text-2xl font-bold text-foreground">3,421</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Tag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Đang bán</p>
                <p className="text-2xl font-bold text-green-600">2,847</p>
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
                <p className="text-sm text-muted-foreground">Hết hàng</p>
                <p className="text-2xl font-bold text-red-600">234</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Doanh thu tháng</p>
                <p className="text-2xl font-bold text-purple-600">₫2.4M</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Danh sách items</CardTitle>
          <CardDescription className="text-muted-foreground">
            Tìm kiếm và quản lý các sản phẩm thời trang
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tên hoặc thương hiệu..."
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
              <option value="Áo sơ mi">Áo sơ mi</option>
              <option value="Quần jeans">Quần jeans</option>
              <option value="Váy">Váy</option>
              <option value="Áo khoác">Áo khoác</option>
              <option value="Giày">Giày</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
              <option value="draft">Bản nháp</option>
            </select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-foreground text-sm line-clamp-2">{item.name}</h3>
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
                            <Edit className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.brand}</span>
                      <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                        {item.status === "active" ? "Đang bán" : item.status === "inactive" ? "Ngừng bán" : "Bản nháp"}
                      </Badge>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p>Danh mục: {item.category}</p>
                      <p>Màu: {item.color}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">₫{item.price}</span>
                      <div className="text-xs text-muted-foreground">
                        <span>Kho: {item.stock}</span>
                        <span className="ml-2">Đã bán: {item.sold}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-foreground">{item.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.createdDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Hiển thị {filteredItems.length} trong tổng số {fashionItems.length} items
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
