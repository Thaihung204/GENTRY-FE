"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Check, X, MoreHorizontal, Flag, AlertTriangle, Shield } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const reports = [
  {
    id: 1,
    type: "outfit",
    reason: "Nội dung không phù hợp",
    description: "Outfit này có nội dung không phù hợp với cộng đồng, quá hở hang",
    reporter: {
      name: "Nguyễn Thị Lan",
      avatar: "L",
      id: 123,
    },
    reported: {
      type: "outfit",
      id: 456,
      title: "Summer beach outfit",
      author: "Trần Thị Mai",
      content: "Outfit đi biển với bikini và áo khoác mỏng",
    },
    status: "pending",
    priority: "medium",
    createdDate: "2024-03-15 14:30",
    reviewedBy: null,
    reviewedDate: null,
  },
  {
    id: 2,
    type: "comment",
    reason: "Ngôn từ thù địch",
    description: "Bình luận có ngôn từ xúc phạm và thù địch với người khác",
    reporter: {
      name: "Lê Văn Minh",
      avatar: "M",
      id: 456,
    },
    reported: {
      type: "comment",
      id: 789,
      title: "Bình luận trên outfit công sở",
      author: "Phạm Văn Đức",
      content: "Không thích style này lắm, quá nhàm chán và không có gì đặc biệt.",
    },
    status: "resolved",
    priority: "high",
    createdDate: "2024-03-14 16:20",
    reviewedBy: "Admin",
    reviewedDate: "2024-03-15 09:00",
  },
  {
    id: 3,
    type: "user",
    reason: "Spam",
    description: "Người dùng này liên tục đăng nội dung spam và quảng cáo",
    reporter: {
      name: "Trần Thị Hương",
      avatar: "H",
      id: 321,
    },
    reported: {
      type: "user",
      id: 999,
      title: "Fake User",
      author: "Fake User",
      content: "Tài khoản spam với nhiều bài đăng quảng cáo",
    },
    status: "resolved",
    priority: "high",
    createdDate: "2024-03-13 10:15",
    reviewedBy: "Admin",
    reviewedDate: "2024-03-13 15:30",
  },
  {
    id: 4,
    type: "outfit",
    reason: "Vi phạm bản quyền",
    description: "Outfit này sử dụng hình ảnh không có bản quyền từ trang web khác",
    reporter: {
      name: "Hoàng Văn An",
      avatar: "A",
      id: 654,
    },
    reported: {
      type: "outfit",
      id: 321,
      title: "Designer inspired look",
      author: "Nguyễn Thị Bình",
      content: "Outfit lấy cảm hứng từ nhà thiết kế nổi tiếng",
    },
    status: "pending",
    priority: "low",
    createdDate: "2024-03-12 09:30",
    reviewedBy: null,
    reviewedDate: null,
  },
  {
    id: 5,
    type: "comment",
    reason: "Thông tin sai lệch",
    description: "Bình luận chứa thông tin sai lệch về sản phẩm và thương hiệu",
    reporter: {
      name: "Phạm Thị Mai",
      avatar: "M",
      id: 987,
    },
    reported: {
      type: "comment",
      id: 654,
      title: "Bình luận về thương hiệu",
      author: "Lê Văn Cường",
      content: "Thương hiệu này rất tệ, tôi đã mua và bị lừa",
    },
    status: "investigating",
    priority: "medium",
    createdDate: "2024-03-11 11:45",
    reviewedBy: "Moderator",
    reviewedDate: "2024-03-12 08:00",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  investigating: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
  dismissed: "bg-gray-100 text-gray-800 border-gray-200",
}

const priorityColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
}

const typeIcons = {
  outfit: Shield,
  comment: Flag,
  user: AlertTriangle,
}

export default function CommunityReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reported.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus
    const matchesType = selectedType === "all" || report.type === selectedType
    const matchesPriority = selectedPriority === "all" || report.priority === selectedPriority

    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý báo cáo</h1>
          <p className="text-muted-foreground mt-2">Xử lý các báo cáo vi phạm từ cộng đồng</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng báo cáo</p>
                <p className="text-2xl font-bold text-foreground">1,234</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Flag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Chờ xử lý</p>
                <p className="text-2xl font-bold text-yellow-600">89</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Đã giải quyết</p>
                <p className="text-2xl font-bold text-green-600">1,067</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ưu tiên cao</p>
                <p className="text-2xl font-bold text-red-600">23</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Danh sách báo cáo</CardTitle>
          <CardDescription className="text-muted-foreground">Xem và xử lý các báo cáo vi phạm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm báo cáo..."
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
              <option value="pending">Chờ xử lý</option>
              <option value="investigating">Đang điều tra</option>
              <option value="resolved">Đã giải quyết</option>
              <option value="dismissed">Đã bỏ qua</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Tất cả loại</option>
              <option value="outfit">Outfit</option>
              <option value="comment">Bình luận</option>
              <option value="user">Người dùng</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="high">Cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Thấp</option>
            </select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => {
              const TypeIcon = typeIcons[report.type as keyof typeof typeIcons]
              return (
                <Card key={report.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Type Icon */}
                      <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <TypeIcon className="h-5 w-5 text-muted-foreground" />
                      </div>

                      {/* Report Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-foreground">{report.reason}</h3>
                            <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                              {report.status === "pending"
                                ? "Chờ xử lý"
                                : report.status === "investigating"
                                  ? "Đang điều tra"
                                  : report.status === "resolved"
                                    ? "Đã giải quyết"
                                    : "Đã bỏ qua"}
                            </Badge>
                            <Badge className={priorityColors[report.priority as keyof typeof priorityColors]}>
                              {report.priority === "high"
                                ? "Cao"
                                : report.priority === "medium"
                                  ? "Trung bình"
                                  : "Thấp"}
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Xem chi tiết
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Check className="h-4 w-4 mr-2" />
                                Đánh dấu đã giải quyết
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <X className="h-4 w-4 mr-2" />
                                Bỏ qua
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-muted-foreground mb-3">{report.description}</p>

                        {/* Reporter Info */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-sm text-muted-foreground">Báo cáo bởi:</span>
                          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
                            {report.reporter.avatar}
                          </div>
                          <span className="text-sm font-medium text-foreground">{report.reporter.name}</span>
                          <span className="text-sm text-muted-foreground">ID: {report.reporter.id}</span>
                        </div>

                        {/* Reported Content */}
                        <div className="bg-muted p-4 rounded-lg mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-foreground">
                              {report.type === "outfit"
                                ? "Outfit được báo cáo:"
                                : report.type === "comment"
                                  ? "Bình luận được báo cáo:"
                                  : "Người dùng được báo cáo:"}
                            </span>
                            <Badge variant="outline">
                              {report.type === "outfit"
                                ? "Outfit"
                                : report.type === "comment"
                                  ? "Bình luận"
                                  : "Người dùng"}
                            </Badge>
                          </div>
                          <p className="font-medium text-foreground mb-1">{report.reported.title}</p>
                          <p className="text-sm text-muted-foreground mb-2">bởi {report.reported.author}</p>
                          <p className="text-sm text-foreground">{report.reported.content}</p>
                        </div>

                        {/* Review Info */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div>
                            <span>Báo cáo lúc: {report.createdDate}</span>
                            {report.reviewedBy && (
                              <span className="ml-4">
                                Xử lý bởi {report.reviewedBy} lúc {report.reviewedDate}
                              </span>
                            )}
                          </div>
                          <span>ID: {report.id}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Hiển thị {filteredReports.length} trong tổng số {reports.length} báo cáo
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
