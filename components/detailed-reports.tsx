"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Calendar, Eye, Search, FileText, BarChart3 } from "lucide-react"

const reportTemplates = [
  {
    id: 1,
    name: "Báo cáo người dùng hàng tháng",
    description: "Thống kê chi tiết về người dùng, tăng trưởng và hoạt động",
    category: "Người dùng",
    frequency: "Hàng tháng",
    lastGenerated: "2024-03-15",
    status: "active",
    metrics: ["Tổng người dùng", "Người dùng mới", "Tỷ lệ giữ chân", "Hoạt động"],
  },
  {
    id: 2,
    name: "Phân tích outfit và tương tác",
    description: "Báo cáo về hiệu suất outfit, tương tác và xu hướng",
    category: "Nội dung",
    frequency: "Hàng tuần",
    lastGenerated: "2024-03-14",
    status: "active",
    metrics: ["Số outfit", "Likes", "Comments", "Shares", "Engagement rate"],
  },
  {
    id: 3,
    name: "Báo cáo doanh thu và premium",
    description: "Thống kê doanh thu, chuyển đổi premium và ROI",
    category: "Tài chính",
    frequency: "Hàng tháng",
    lastGenerated: "2024-03-01",
    status: "active",
    metrics: ["Doanh thu", "Premium conversion", "ARPU", "LTV"],
  },
  {
    id: 4,
    name: "Phân tích danh mục thời trang",
    description: "Báo cáo về hiệu suất các danh mục và xu hướng thời trang",
    category: "Sản phẩm",
    frequency: "Hàng tháng",
    lastGenerated: "2024-03-10",
    status: "active",
    metrics: ["Phân bố danh mục", "Xu hướng", "Tăng trưởng", "Phổ biến"],
  },
  {
    id: 5,
    name: "Báo cáo kiểm duyệt và an toàn",
    description: "Thống kê về báo cáo, vi phạm và hoạt động kiểm duyệt",
    category: "An toàn",
    frequency: "Hàng tuần",
    lastGenerated: "2024-03-13",
    status: "active",
    metrics: ["Báo cáo", "Vi phạm", "Kiểm duyệt", "Tỷ lệ an toàn"],
  },
  {
    id: 6,
    name: "Phân tích AI và gợi ý",
    description: "Hiệu suất của hệ thống AI phối đồ và độ chính xác gợi ý",
    category: "AI/ML",
    frequency: "Hàng tháng",
    lastGenerated: "2024-03-05",
    status: "draft",
    metrics: ["Độ chính xác AI", "Tỷ lệ chấp nhận gợi ý", "Feedback", "Performance"],
  },
]

const recentReports = [
  {
    id: 1,
    name: "Báo cáo tháng 3/2024 - Tổng quan người dùng",
    type: "Người dùng",
    generatedDate: "2024-03-15 09:30",
    size: "2.3 MB",
    format: "PDF",
    status: "completed",
  },
  {
    id: 2,
    name: "Phân tích outfit tuần 11/2024",
    type: "Nội dung",
    generatedDate: "2024-03-14 14:15",
    size: "1.8 MB",
    format: "Excel",
    status: "completed",
  },
  {
    id: 3,
    name: "Báo cáo doanh thu Q1/2024",
    type: "Tài chính",
    generatedDate: "2024-03-01 16:45",
    size: "3.1 MB",
    format: "PDF",
    status: "completed",
  },
  {
    id: 4,
    name: "Xu hướng thời trang tháng 2/2024",
    type: "Sản phẩm",
    generatedDate: "2024-03-10 11:20",
    size: "4.2 MB",
    format: "PowerPoint",
    status: "completed",
  },
  {
    id: 5,
    name: "Báo cáo an toàn tuần 10/2024",
    type: "An toàn",
    generatedDate: "2024-03-13 08:00",
    size: "1.2 MB",
    format: "PDF",
    status: "processing",
  },
]

const categoryColors = {
  "Người dùng": "bg-blue-100 text-blue-800 border-blue-200",
  "Nội dung": "bg-green-100 text-green-800 border-green-200",
  "Tài chính": "bg-purple-100 text-purple-800 border-purple-200",
  "Sản phẩm": "bg-orange-100 text-orange-800 border-orange-200",
  "An toàn": "bg-red-100 text-red-800 border-red-200",
  "AI/ML": "bg-cyan-100 text-cyan-800 border-cyan-200",
}

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
}

export default function DetailedReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredTemplates = reportTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || template.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Báo cáo chi tiết</h1>
          <p className="text-muted-foreground mt-2">Tạo và quản lý các báo cáo chuyên sâu</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <FileText className="h-4 w-4 mr-2" />
          Tạo báo cáo mới
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng báo cáo</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tháng này</p>
                <p className="text-2xl font-bold text-foreground">23</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Đang xử lý</p>
                <p className="text-2xl font-bold text-foreground">3</p>
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
                <p className="text-sm text-muted-foreground">Tự động</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Templates */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Mẫu báo cáo</CardTitle>
            <CardDescription className="text-muted-foreground">Các mẫu báo cáo có sẵn và tùy chỉnh</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm mẫu báo cáo..."
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
                <option value="Người dùng">Người dùng</option>
                <option value="Nội dung">Nội dung</option>
                <option value="Tài chính">Tài chính</option>
                <option value="Sản phẩm">Sản phẩm</option>
                <option value="An toàn">An toàn</option>
                <option value="AI/ML">AI/ML</option>
              </select>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{template.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={categoryColors[template.category as keyof typeof categoryColors]}>
                        {template.category}
                      </Badge>
                      <Badge className={statusColors[template.status as keyof typeof statusColors]}>
                        {template.status === "active" ? "Hoạt động" : "Bản nháp"}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-muted-foreground">Tần suất: {template.frequency}</span>
                      <span className="text-muted-foreground">Cập nhật: {template.lastGenerated}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Tạo
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {template.metrics.map((metric, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Báo cáo gần đây</CardTitle>
            <CardDescription className="text-muted-foreground">Các báo cáo đã tạo và tải xuống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground line-clamp-1">{report.name}</h3>
                    <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                      {report.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{report.type}</span>
                    <span>{report.generatedDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{report.size}</span>
                      <span>{report.format}</span>
                    </div>
                    {report.status === "completed" && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Tải xuống
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Report Builder */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Tạo báo cáo tùy chỉnh</CardTitle>
          <CardDescription className="text-muted-foreground">Xây dựng báo cáo theo yêu cầu cụ thể</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Chọn dữ liệu</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Người dùng</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Outfits</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Tương tác</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Doanh thu</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-foreground">Danh mục</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Khoảng thời gian</h4>
              <div className="space-y-2">
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                  <option>7 ngày qua</option>
                  <option>30 ngày qua</option>
                  <option>90 ngày qua</option>
                  <option>1 năm qua</option>
                  <option>Tùy chỉnh</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" placeholder="Từ ngày" />
                  <Input type="date" placeholder="Đến ngày" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Định dạng xuất</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="format" value="pdf" className="rounded" />
                  <span className="text-sm text-foreground">PDF</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="format" value="excel" className="rounded" />
                  <span className="text-sm text-foreground">Excel</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="format" value="csv" className="rounded" />
                  <span className="text-sm text-foreground">CSV</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="format" value="ppt" className="rounded" />
                  <span className="text-sm text-foreground">PowerPoint</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-border">
            <div className="flex space-x-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Xem trước
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="h-4 w-4 mr-2" />
                Tạo báo cáo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
