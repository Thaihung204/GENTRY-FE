"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Folder,
  Tag,
  Save,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Category {
  categoryId: number
  name: string
  description: string
  parentId: number
  imageFileId: number
  isActive: boolean
  sortOrder: number
}

export default function FashionCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: 0,
    imageFileId: 0,
    isActive: true,
    sortOrder: 0,
  })

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://localhost:5001/api/categories")
        const data = await res.json()
        if (Array.isArray(data)) setCategories(data)
        else if (data.data) setCategories(data.data)
      } catch (err) {
        console.error("Error fetching categories:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  // ✅ Filter
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" ? cat.isActive : !cat.isActive)
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
  }

  // ✅ Mở popup chỉnh sửa
  const handleEdit = (cat: Category) => {
    setSelectedCategory(cat)
    setFormData({
      name: cat.name,
      description: cat.description,
      parentId: cat.parentId,
      imageFileId: cat.imageFileId,
      isActive: cat.isActive,
      sortOrder: cat.sortOrder,
    })
    setIsDialogOpen(true)
  }

  // ✅ Cập nhật dữ liệu form
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // ✅ PUT update category
  const handleSave = async () => {
    if (!selectedCategory) return
    try {
      const res = await fetch(
        `https://localhost:5001/api/categories/${selectedCategory.categoryId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )

      if (res.ok) {
        alert("✅ Cập nhật danh mục thành công!")
        setCategories((prev) =>
          prev.map((c) =>
            c.categoryId === selectedCategory.categoryId
              ? { ...c, ...formData }
              : c
          )
        )
        setIsDialogOpen(false)
      } else {
        alert("❌ Lỗi khi cập nhật danh mục!")
      }
    } catch (err) {
      console.error("PUT error:", err)
    }
  }

  // ✅ DELETE category
  const handleDelete = async () => {
    if (!selectedCategory) return
    if (!confirm(`Bạn có chắc muốn xóa "${selectedCategory.name}" không?`)) return
    try {
      const res = await fetch(
        `https://localhost:5001/api/categories/${selectedCategory.categoryId}`,
        { method: "DELETE" }
      )
      if (res.ok) {
        alert("🗑️ Xóa danh mục thành công!")
        setCategories((prev) =>
          prev.filter((c) => c.categoryId !== selectedCategory.categoryId)
        )
        setIsDialogOpen(false)
      } else {
        alert("❌ Xóa thất bại!")
      }
    } catch (err) {
      console.error("DELETE error:", err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý danh mục</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý danh mục sản phẩm thời trang
          </p>
        </div>
        <Button className="bg-primary text-white hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Thêm danh mục
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Tổng danh mục</p>
              <p className="text-2xl font-bold">{categories.length}</p>
            </div>
            <Folder className="h-6 w-6 text-blue-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Đang hoạt động</p>
              <p className="text-2xl font-bold text-green-600">
                {categories.filter((c) => c.isActive).length}
              </p>
            </div>
            <Tag className="h-6 w-6 text-green-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Không hoạt động</p>
              <p className="text-2xl font-bold text-red-600">
                {categories.filter((c) => !c.isActive).length}
              </p>
            </div>
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục</CardTitle>
          <CardDescription>Quản lý cấu trúc danh mục sản phẩm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Tìm kiếm danh mục..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground py-8">
              Đang tải dữ liệu...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Tên danh mục</th>
                    <th className="text-left py-3 px-4">Mô tả</th>
                    <th className="text-left py-3 px-4">Trạng thái</th>
                    <th className="text-left py-3 px-4">Sắp xếp</th>
                    <th className="text-right py-3 px-4">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((cat) => (
                    <tr
                      key={cat.categoryId}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="py-4 px-4 font-medium">{cat.name}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {cat.description}
                      </td>
                      <td className="py-4 px-4">
                        <Badge
                          className={
                            cat.isActive ? statusColors.active : statusColors.inactive
                          }
                        >
                          {cat.isActive ? "Hoạt động" : "Không hoạt động"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">{cat.sortOrder}</td>
                      <td className="py-4 px-4 text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Popup chỉnh sửa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          </DialogHeader>

          {selectedCategory && (
            <div className="space-y-4">
              <div>
                <Label>Tên danh mục</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label>Mô tả</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
              <div>
                <Label>Thứ tự sắp xếp</Label>
                <Input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) =>
                    handleChange("sortOrder", Number(e.target.value))
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
                />
                <Label>Kích hoạt danh mục</Label>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-1" /> Xóa
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    <X className="h-4 w-4 mr-1" /> Hủy
                  </Button>
                  <Button onClick={handleSave} className="bg-primary text-white">
                    <Save className="h-4 w-4 mr-1" /> Lưu thay đổi
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
