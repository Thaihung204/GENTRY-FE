"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Folder, Tag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  {
    id: 1,
    name: "Áo sơ mi",
    description: "Các loại áo sơ mi nam và nữ",
    parentCategory: null,
    itemCount: 1247,
    status: "active",
    createdDate: "2024-01-10",
    image: "/shirt-category.jpg",
  },
  {
    id: 2,
    name: "Quần jeans",
    description: "Quần jeans các kiểu dáng",
    parentCategory: null,
    itemCount: 892,
    status: "active",
    createdDate: "2024-01-12",
    image: "/jeans-category.jpg",
  },
  {
    id: 3,
    name: "Váy",
    description: "Váy các loại cho nữ",
    parentCategory: null,
    itemCount: 634,
    status: "active",
    createdDate: "2024-01-15",
    image: "/dress-category.jpg",
  },
  {
    id: 4,
    name: "Áo khoác",
    description: "Áo khoác, blazer, cardigan",
    parentCategory: null,
    itemCount: 521,
    status: "active",
    createdDate: "2024-01-18",
    image: "/jacket-category.jpg",
  },
  {
    id: 5,
    name: "Giày",
    description: "Giày dép các loại",
    parentCategory: null,
    itemCount: 387,
    status: "active",
    createdDate: "2024-01-20",
    image: "/shoes-category.png",
  },
  {
    id: 6,
    name: "Áo sơ mi nam",
    description: "Áo sơ mi dành cho nam",
    parentCategory: "Áo sơ mi",
    itemCount: 678,
    status: "active",
    createdDate: "2024-01-25",
    image: "/mens-casual-shirt.png",
  },
  {
    id: 7,
    name: "Áo sơ mi nữ",
    description: "Áo sơ mi dành cho nữ",
    parentCategory: "Áo sơ mi",
    itemCount: 569,
    status: "active",
    createdDate: "2024-01-25",
    image: "/women-shirt.png",
  },
  {
    id: 8,
    name: "Phụ kiện",
    description: "Túi xách, thắt lưng, mũ",
    parentCategory: null,
    itemCount: 234,
    status: "inactive",
    createdDate: "2024-02-01",
    image: "/fashion-accessories-flatlay.png",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-red-100 text-red-800 border-red-200",
}

export default function FashionCategories() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || category.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const parentCategories = filteredCategories.filter((cat) => !cat.parentCategory)
  const childCategories = filteredCategories.filter((cat) => cat.parentCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý danh mục</h1>
          <p className="text-muted-foreground mt-2">Quản lý danh mục sản phẩm thời trang</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Thêm danh mục
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng danh mục</p>
                <p className="text-2xl font-bold text-foreground">{categories.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Folder className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Danh mục chính</p>
                <p className="text-2xl font-bold text-green-600">{parentCategories.length}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Tag className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Danh mục con</p>
                <p className="text-2xl font-bold text-purple-600">{childCategories.length}</p>
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
                <p className="text-sm text-muted-foreground">Tổng items</p>
                <p className="text-2xl font-bold text-orange-600">
                  {categories.reduce((sum, cat) => sum + cat.itemCount, 0).toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Danh sách danh mục</CardTitle>
          <CardDescription className="text-muted-foreground">Quản lý cấu trúc danh mục sản phẩm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm danh mục..."
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
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>

          {/* Categories Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Danh mục</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Mô tả</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Danh mục cha</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Số items</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ngày tạo</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="h-12 w-12 rounded-lg object-cover bg-muted"
                        />
                        <div>
                          <p className="font-medium text-foreground">{category.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {category.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-foreground max-w-xs truncate">{category.description}</p>
                    </td>
                    <td className="py-4 px-4">
                      {category.parentCategory ? (
                        <Badge variant="outline" className="text-xs">
                          {category.parentCategory}
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-foreground">{category.itemCount.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={statusColors[category.status as keyof typeof statusColors]}>
                        {category.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">{category.createdDate}</td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Plus className="h-4 w-4 mr-2" />
                            Thêm danh mục con
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
