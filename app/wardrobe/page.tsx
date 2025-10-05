"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import axios from "axios"
import api from "@/app/config/api"

interface WardrobeItem {
  id: number
  name: string
  category: string
  color: string
  season: string
  brand: string
  image: string
  tags: string[]
  lastWorn: string
  wearCount: number
}

interface Category {

  categoryId: number,
  name: string,
  description: string,
  parentId: number,
  imageFileId: number,
  isActive: boolean,
  sortOrder: number
  
}

interface Color {
  id: number;
  name: string;
  hexCode: string;
  rgbValues: string;
  colorFamily: string;
  isActive: boolean;
}

interface ItemDTO {
  id: string;
  name: string;
  brand?: string;
  categoryId: number;
  categoryName?: string;
  fileId?: number;
  fileUrl?: string;
  sourceUrl?: string;
  description?: string;
  colorId?: number;
  colorName?: string;
  colorHex?: string;
  size?: string;
  tags?: string;
  price?: number;
  purchaseDate?: string;
  createdDate: string;
  modifiedDate?: string;
}

export default function WardrobePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [addItemModalOpen, setAddItemModalOpen] = useState(false)
  const [itemName, setItemName] = useState("")
  const [itemCategory, setItemCategory] = useState("")
  const [itemColor, setItemColor] = useState("")
  const [itemBrand, setItemBrand] = useState("")
  const [itemTags, setItemTags] = useState("")
  const [itemImage, setItemImage] = useState<File | null>(null)
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categories, setCategories] = useState<Category[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [wardrobeItems, setWardrobeItems] = useState<ItemDTO[]>([])
  const [loading, setLoading] = useState(true)


  // const wardrobeItems: WardrobeItem[] = [
  //   {
  //     id: 1,
  //     name: "Áo sơ mi trắng",
  //     category: "tops",
  //     color: "Trắng",
  //     season: "all",
  //     brand: "Zara",
  //     image: "white dress shirt",
  //     tags: ["Công sở", "Formal", "Cơ bản"],
  //     lastWorn: "3 ngày trước",
  //     wearCount: 15,
  //   },
  //   {
  //     id: 2,
  //     name: "Quần jeans xanh",
  //     category: "bottoms",
  //     color: "Xanh",
  //     season: "all",
  //     brand: "Levi's",
  //     image: "blue jeans",
  //     tags: ["Casual", "Hàng ngày", "Denim"],
  //     lastWorn: "1 tuần trước",
  //     wearCount: 22,
  //   },
  //   {
  //     id: 3,
  //     name: "Váy đen dự tiệc",
  //     category: "dresses",
  //     color: "Đen",
  //     season: "all",
  //     brand: "H&M",
  //     image: "black party dress",
  //     tags: ["Tiệc tùng", "Elegant", "Đặc biệt"],
  //     lastWorn: "2 tuần trước",
  //     wearCount: 5,
  //   },
  //   {
  //     id: 4,
  //     name: "Áo len mùa đông",
  //     category: "tops",
  //     color: "Xám",
  //     season: "winter",
  //     brand: "Uniqlo",
  //     image: "gray winter sweater",
  //     tags: ["Mùa đông", "Ấm áp", "Casual"],
  //     lastWorn: "1 tháng trước",
  //     wearCount: 8,
  //   },
  // ]

  const fetchCategories = async () => {
    try {
      const res = await api.get(
        "/categories", {
          withCredentials: true
        }
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy categories:", err);
    }
  };

  const fetchColor = async () => {
    try {
      const res = await api.get(
        "/colors", {
          withCredentials: true
        }
      );
      if (res.data.success) {
        setColors(res.data.data); 
      }
    } catch (err) {
      console.error("loi khi lay color", err);
    }
  }

  const fetchItems = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log(userId)
      const res = await api.get(`/items/user/${userId}`, {
        withCredentials: true
      })

      if (res.data.success) {
        setWardrobeItems(res.data.data)
      }
    } catch(err) {
      console.error("❌ Lỗi khi fetch items:", err)
    } finally { 
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchColor()
    fetchItems()
  }, [])

  // const categories = [
  //   { value: "all", label: "Tất cả" },
  //   { value: "tops", label: "Áo" },
  //   { value: "bottoms", label: "Quần" },
  //   { value: "dresses", label: "Váy" },
  //   { value: "shoes", label: "Giày" },
  //   { value: "accessories", label: "Phụ kiện" },
  // ]

  const filteredItems = wardrobeItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.categoryName === selectedCategory
    const matchesColor = !selectedColor || item.colorName === selectedColor
    return matchesSearch && matchesCategory && matchesColor
  })

  const stats = {
    totalItems: wardrobeItems.length,
    mostWorn: wardrobeItems.length > 0 ? wardrobeItems[0] : null,
    leastWorn: wardrobeItems.length > 0 ? wardrobeItems[wardrobeItems.length - 1] : null,
    categories: categories.map((cat) => ({
      name: cat.name,
      count: wardrobeItems.filter((item) => item.categoryId === cat.categoryId).length,
    })),
  }

  const handleAddItem = async () => {
  try {
    const formData = new FormData();
    formData.append("Name", itemName);
    formData.append("CategoryId", itemCategory);  // categoryId dạng string
    formData.append("ColorId", itemColor);        // colorId dạng string
    formData.append("Brand", itemBrand);
    formData.append("Tags", itemTags);

    if (file) {
      formData.append("ImageFile", file); // key phải trùng với IFormFile
    }

    const res = await api.post(
      "/items",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ Thêm thành công:", res.data);
    setAddItemModalOpen(false);

    // reset input
    setItemName("");
    setItemCategory("");
    setItemColor("");
    setItemBrand("");
    setItemTags("");
    setFile(null);
    setPreview(null);
  } catch (err: any) {
    console.error("❌ Lỗi khi thêm item:", err.response?.data || err.message);
  }
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // preview ảnh
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Chưa chọn ảnh");

    const formData = new FormData();
    formData.append("file", file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <section className="py-12 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10 text-primary" />
              Tủ Đồ Thông Minh
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quản lý và tối ưu hóa tủ đồ của bạn với công nghệ AI
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="wardrobe" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="wardrobe">Tủ Đồ</TabsTrigger>
            <TabsTrigger value="analytics">Phân Tích</TabsTrigger>
            <TabsTrigger value="suggestions">Gợi Ý AI</TabsTrigger>
          </TabsList>

          <TabsContent value="wardrobe" className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm trang phục..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.categoryId} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                <Dialog open={addItemModalOpen} onOpenChange={setAddItemModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm trang phục
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Thêm Trang Phục Mới</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <CloudUpload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                          <p className="text-muted-foreground mb-3">Tải ảnh trang phục</p>

                          {/* Ẩn input file */}
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                          />

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Chọn ảnh
                          </Button>

                          {preview && (
                            <div className="mt-4">
                              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
                              <Button onClick={handleUpload} className="mt-3">
                                Upload
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Tên trang phục</Label>
                          <Input 
                            placeholder="VD: Áo sơ mi trắng" 
                            value={itemName} 
                            onChange={(e) => setItemName(e.target.value)} 
                          />
                        </div>
                        <div>
                          <Label>Danh mục</Label>
                          <Select onValueChange={setItemCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.categoryId}
                                  value={category.categoryId.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Màu sắc</Label>
                          <Select onValueChange={setItemColor}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn màu sắc" />
                            </SelectTrigger>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem key={color.id} value={color.id.toString()}>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-4 h-4 rounded-full border"
                                      style={{ backgroundColor: color.hexCode }}
                                    />
                                    {color.name}
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
                          <Input value={itemTags} onChange={(e) => setItemTags(e.target.value)} />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <Button variant="outline" onClick={() => setAddItemModalOpen(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleAddItem}>Thêm vào tủ đồ</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Items Grid/List */}
            <div
              className={viewMode === "grid" ? "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6" : "space-y-4"}
            >
              {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {viewMode === "grid" ? (
                  <>
                    <div className="relative">
                      <Image
                        src={item.fileUrl || "/placeholder.jpg"}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">{item.categoryName}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.split(",").slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Thêm ngày: {new Date(item.createdDate).toLocaleDateString("vi-VN")}
                      </p>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.fileUrl || "/placeholder.jpg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge variant="secondary">{item.categoryName}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.brand} • {item.colorName}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.tags?.split(",").map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Ngày thêm: {new Date(item.createdDate).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
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
                  <div className="space-y-2">
                    {stats.categories.map((category, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{category.name}</span>
                        <span className="text-sm font-medium">{category.count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Mặc nhiều nhất
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.mostWorn ? (
                    <div className="flex items-center gap-3">
                      <Image
                        src={stats.mostWorn.fileUrl || "/placeholder.jpg"}
                        alt={stats.mostWorn.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold">{stats.mostWorn.name}</h4>
                        <p className="text-sm text-muted-foreground">{stats.mostWorn.brand}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Chưa có dữ liệu</p>
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
                <CardContent className="space-y-4">
                  {stats.mostWorn ? (
                    <div className="flex items-center gap-3">
                      <Image
                        src={stats.mostWorn.fileUrl || "/placeholder.jpg"}
                        alt={stats.mostWorn.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold">{stats.mostWorn.name}</h4>
                        <p className="text-sm text-muted-foreground">{stats.mostWorn.brand}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Chưa có dữ liệu</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Gợi Ý AI
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="space-y-4">
                  <Sparkles className="w-16 h-16 mx-auto text-primary/50" />
                  <h3 className="text-xl font-semibold">Gợi Ý Thông Minh</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    AI sẽ phân tích tủ đồ của bạn và đưa ra những gợi ý thông minh về:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6 text-left">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🎯 Tối ưu hóa tủ đồ</h4>
                      <p className="text-sm text-muted-foreground">
                        Phát hiện những món đồ ít sử dụng và gợi ý cách phối đồ mới
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🛍️ Mua sắm thông minh</h4>
                      <p className="text-sm text-muted-foreground">
                        Đề xuất những món đồ cần thiết để hoàn thiện phong cách
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📅 Lên lịch outfit</h4>
                      <p className="text-sm text-muted-foreground">
                        Gợi ý trang phục phù hợp cho từng dịp và thời tiết
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">♻️ Tái sử dụng</h4>
                      <p className="text-sm text-muted-foreground">Khuyến khích sử dụng những món đồ ít mặc</p>
                    </div>
                  </div>
                  <Button className="mt-6">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Nhận Gợi Ý AI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
