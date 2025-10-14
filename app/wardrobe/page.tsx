"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  CloudUpload,
  Calendar,
  TrendingUp,
  BarChart3,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import api from "@/app/config/api"

interface Category {
  categoryId: number
  name: string
  description: string
  parentId: number
  imageFileId: number
  isActive: boolean
  sortOrder: number
}

interface Color {
  id: number
  name: string
  hexCode: string
  rgbValues: string
  colorFamily: string
  isActive: boolean
}

interface ItemDTO {
  id: string
  name: string
  brand?: string
  categoryId: number
  categoryName?: string
  fileId?: number
  fileUrl?: string
  sourceUrl?: string
  description?: string
  colorId?: number
  colorName?: string
  colorHex?: string
  size?: string
  tags?: string
  price?: number
  purchaseDate?: string
  createdDate: string
  modifiedDate?: string
}

interface Style {
  styleId: number
  name: string
  description: string
  imageFileId: number
  tags: string
  isActive: boolean
}

export default function WardrobePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [addItemModalOpen, setAddItemModalOpen] = useState(false)
  const [itemName, setItemName] = useState("")
  const [itemCategory, setItemCategory] = useState("")
  const [itemColor, setItemColor] = useState("")
  const [itemBrand, setItemBrand] = useState("")
  const [itemTags, setItemTags] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [wardrobeItems, setWardrobeItems] = useState<ItemDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [styles, setStyles] = useState<Style[]>([])

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories", { withCredentials: true })
      setCategories(res.data)
    } catch (err) {
      console.error("Lỗi khi lấy categories:", err)
    }
  }

  const fetchColor = async () => {
    try {
      const res = await api.get("/colors", { withCredentials: true })
      if (res.data.success) setColors(res.data.data)
    } catch (err) {
      console.error("Lỗi khi lấy màu sắc:", err)
    }
  }

  const fetchItems = async () => {
    try {
      const userId = localStorage.getItem("userId")
      const res = await api.get(`/items/user/${userId}`, { withCredentials: true })
      if (res.data.success) setWardrobeItems(res.data.data)
    } catch (err) {
      console.error("❌ Lỗi khi fetch items:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStyles = async () => {
    try {
      const res = await api.get("/styles", { withCredentials: true }) 
      setStyles(res.data)
    } catch (err) {
      console.error("Error fetching styles:", err)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchColor()
    fetchItems()
    fetchStyles()
  }, [])

  const filteredItems = wardrobeItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.categoryName === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalItems: wardrobeItems.length,
    mostWorn: wardrobeItems[0] || null,
    leastWorn: wardrobeItems.length > 1 ? wardrobeItems[wardrobeItems.length - 1] : null,
    categories: categories.map((cat) => ({
      name: cat.name,
      count: wardrobeItems.filter((item) => item.categoryId === cat.categoryId).length,
    })),
  }

  const handleAddItem = async () => {
    try {
      const formData = new FormData()
      formData.append("Name", itemName)
      formData.append("CategoryId", itemCategory)
      formData.append("ColorId", itemColor)
      formData.append("Brand", itemBrand)
      formData.append("Tags", itemTags)
      if (file) formData.append("ImageFile", file)

      const res = await api.post("/items", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })

      console.log("✅ Thêm thành công:", res.data)
      setAddItemModalOpen(false)
      setItemName("")
      setItemCategory("")
      setItemColor("")
      setItemBrand("")
      setItemTags("")
      setFile(null)
      setPreview(null)
      fetchItems()
      setLoading(false)
    } catch (err: any) {
      console.error("❌ Lỗi khi thêm item:", err.response?.data || err.message)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="py-10 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Sparkles className="w-9 h-9 text-primary" />
            Tủ Đồ & Phân Tích
          </h1>
          <p className="text-lg text-muted-foreground">
            Quản lý, phân tích và tối ưu hóa tủ đồ của bạn.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-10">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm trang phục..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.categoryId} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "gentry" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "gentry" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Add Item Dialog */}
            <Dialog open={addItemModalOpen} onOpenChange={setAddItemModalOpen}>
              <DialogTrigger asChild>
                <Button variant="gentry">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm Trang Phục
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Thêm Trang Phục Mới</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <CloudUpload className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-sm mb-3">Tải ảnh trang phục</p>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button variant="gentry" size="sm" onClick={() => fileInputRef.current?.click()}>
                      Chọn ảnh
                    </Button>
                    {preview && (
                      <div className="mt-3">
                        <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label>Tên trang phục</Label>
                      <Input value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </div>
                    <div>
                      <Label>Danh mục</Label>
                      <Select onValueChange={setItemCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.categoryId} value={cat.categoryId.toString()}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Màu sắc</Label>
                      <Select onValueChange={setItemColor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn màu" />
                        </SelectTrigger>
                        <SelectContent>
                          {colors.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: c.hexCode }}
                                />
                                {c.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Thương hiệu</Label>
                      <Input value={itemBrand} onChange={(e) => setItemBrand(e.target.value)} />
                    </div>
                    <div>
                      <Label>Tags</Label>
                      <Select onValueChange={setItemTags}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phong cách" />
                        </SelectTrigger>
                        <SelectContent>
                          {styles.map((style) => (
                            <SelectItem key={style.styleId} value={style.name}>
                              {style.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setAddItemModalOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddItem} variant="gentry">Thêm</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Wardrobe Items */}
        <div
          className={viewMode === "grid" ? "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6" : "space-y-4"}
        >
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {viewMode === "grid" ? (
                <>
                  <Image
                    src={item.fileUrl || "/placeholder.jpg"}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.split(",").slice(0, 2).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="p-4 flex gap-4 items-center">
                  <Image
                    src={item.fileUrl || "/placeholder.jpg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.brand} • {item.colorName}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Tổng quan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{stats.totalItems}</div>
                <p className="text-muted-foreground">Tổng số trang phục</p>
              </div>
              {stats.categories.map((c, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="font-medium">{c.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Mặc nhiều nhất
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.mostWorn ? (
                <div className="flex items-center gap-3">
                  <Image
                    src={stats.mostWorn.fileUrl || "/placeholder.jpg"}
                    alt={stats.mostWorn.name}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{stats.mostWorn.name}</h4>
                    <p className="text-sm text-muted-foreground">{stats.mostWorn.brand}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Chưa có dữ liệu</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Ít mặc nhất
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.leastWorn ? (
                <div className="flex items-center gap-3">
                  <Image
                    src={stats.leastWorn.fileUrl || "/placeholder.jpg"}
                    alt={stats.leastWorn.name}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{stats.leastWorn.name}</h4>
                    <p className="text-sm text-muted-foreground">{stats.leastWorn.brand}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Chưa có dữ liệu</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
