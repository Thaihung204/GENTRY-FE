"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Tag,
  DollarSign,
} from "lucide-react"
import { useRouter } from "next/navigation"
import api from "@/app/config/api"

interface Item {
  id: string
  name: string
  brand: string
  categoryId: number
  categoryName: string
  fileId: number
  fileUrl: string
  colorName: string
  colorHex: string
  tags: string
  price: string | null
  createdDate: string
}

export default function FashionItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items")
        if (res.data.success && res.data.data) {
          setItems(res.data.data)
        }
      } catch (err) {
        console.error("Lỗi khi tải items:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || item.categoryName === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-muted-foreground">
        Đang tải dữ liệu...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground mt-2">
            Danh sách sản phẩm được đồng bộ từ hệ thống
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => router.push("/items/add")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng sản phẩm</p>
                <p className="text-2xl font-bold text-foreground">{items.length}</p>
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
                <p className="text-sm text-muted-foreground">Danh mục</p>
                <p className="text-2xl font-bold text-green-600">
                  {new Set(items.map((i) => i.categoryName)).size}
                </p>
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
                <p className="text-sm text-muted-foreground">Màu sắc</p>
                <p className="text-2xl font-bold text-red-600">
                  {new Set(items.map((i) => i.colorName)).size}
                </p>
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
                <p className="text-sm text-muted-foreground">Doanh thu (giả lập)</p>
                <p className="text-2xl font-bold text-purple-600">₫2.4M</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <CardDescription>
            Tìm kiếm và quản lý các sản phẩm thời trang
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Bộ lọc */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo tên hoặc thương hiệu..."
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
              {[...new Set(items.map((i) => i.categoryName))].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-card border-border hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                      <img
                        src={item.fileUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{item.brand}</span>
                        <Badge
                          className="border border-gray-200"
                          style={{
                            backgroundColor: item.colorHex,
                            color: "#000",
                          }}
                        >
                          {item.colorName}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Danh mục: {item.categoryName}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground">
                          ₫{item.price || "—"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.createdDate).toLocaleDateString("vi-VN")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/items/${item.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Xem
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/items/edit/${item.id}`)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Sửa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center text-muted-foreground col-span-full py-10">
                Không tìm thấy sản phẩm nào.
              </div>
            )}
          </div>

          {/* Pagination giả */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Hiển thị {filteredItems.length}/{items.length} sản phẩm
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
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
