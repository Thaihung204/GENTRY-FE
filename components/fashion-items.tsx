"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, Eye, Tag } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 🔍 Popup chi tiết
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items/all")
        if (res.data.success && Array.isArray(res.data.data)) {
          setItems(res.data.data)
        }
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách items:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const filteredItems = items.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === "all" || item.categoryName === selectedCategory
    return matchSearch && matchCategory
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
            Quản lý danh sách sản phẩm thời trang được đồng bộ từ hệ thống
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Thêm sản phẩm
        </Button>
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Tổng sản phẩm</p>
              <p className="text-2xl font-bold">{items.length}</p>
            </div>
            <Tag className="h-8 w-8 text-blue-600" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Số danh mục</p>
              <p className="text-2xl font-bold text-green-600">
                {new Set(items.map((i) => i.categoryName)).size}
              </p>
            </div>
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Số màu sắc</p>
              <p className="text-2xl font-bold text-red-600">
                {new Set(items.map((i) => i.colorName)).size}
              </p>
            </div>
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          </CardContent>
        </Card>
      </div>

      {/* Danh sách sản phẩm */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <CardDescription>Tìm kiếm, lọc và xem chi tiết sản phẩm</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Bộ lọc */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm theo tên hoặc thương hiệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-md px-3 py-2 bg-background"
            >
              <option value="all">Tất cả danh mục</option>
              {[...new Set(items.map((i) => i.categoryName))].map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> Lọc
            </Button>
          </div>

          {/* Cards sản phẩm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-lg transition-all border border-border bg-card cursor-pointer"
                  onClick={() => {
                    setSelectedItem(item)
                    setDetailOpen(true)
                  }}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                      <img
                        src={item.fileUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 border"
                        style={{ backgroundColor: item.colorHex }}
                      >
                        {item.colorName}
                      </Badge>
                      <span className="italic text-muted-foreground">{item.tags}</span>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Danh mục: {item.categoryName}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      {/* <span className="text-foreground font-bold">
                        {item.price ? `₫${item.price}` : "—"}
                      </span> */}
                      <span className="text-muted-foreground">
                        {new Date(item.createdDate).toLocaleDateString("vi-VN")}
                      </span>
                    </div>

                    {/* <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedItem(item)
                        setDetailOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" /> Xem
                    </Button> */}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-10">
                Không tìm thấy sản phẩm nào.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 🔍 Popup xem chi tiết sản phẩm */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" /> {selectedItem.name}
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedItem.fileUrl || "/placeholder.svg"}
                  alt={selectedItem.name}
                  className="w-64 h-64 object-cover rounded"
                />
                <div className="space-y-3 text-sm">
                  <p><strong>Thương hiệu:</strong> {selectedItem.brand || "—"}</p>
                  <p><strong>Danh mục:</strong> {selectedItem.categoryName || "—"}</p>
                  <p><strong>Màu sắc:</strong> {selectedItem.colorName || "—"}</p>
                  <p><strong>Tags:</strong> {selectedItem.tags || "—"}</p>
                  {/* <p><strong>Giá:</strong> {selectedItem.price ? `₫${selectedItem.price}` : "—"}</p> */}
                  <p><strong>Ngày tạo:</strong> {new Date(selectedItem.createdDate).toLocaleDateString("vi-VN")}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
