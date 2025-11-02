"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Trash2, MoreHorizontal, MessageSquare, Flag, ThumbsUp, ThumbsDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const comments = [
  {
    id: 1,
    content: "Outfit này rất đẹp! Tôi thích cách bạn phối màu, rất hài hòa và thanh lịch.",
    user: {
      name: "Nguyễn Thị Lan",
      avatar: "L",
      id: 123,
    },
    outfit: {
      id: 1,
      title: "Outfit công sở thanh lịch",
      author: "Trần Thị Mai",
    },
    likes: 12,
    dislikes: 0,
    replies: 3,
    status: "approved",
    createdDate: "2024-03-15 14:30",
    reportCount: 0,
  },
  {
    id: 2,
    content: "Có thể thử thay giày khác không? Tôi nghĩ giày cao gót sẽ phù hợp hơn với set đồ này.",
    user: {
      name: "Lê Văn Minh",
      avatar: "M",
      id: 456,
    },
    outfit: {
      id: 1,
      title: "Outfit công sở thanh lịch",
      author: "Trần Thị Mai",
    },
    likes: 8,
    dislikes: 1,
    replies: 1,
    status: "approved",
    createdDate: "2024-03-15 15:45",
    reportCount: 0,
  },
  {
    id: 3,
    content: "Không thích style này lắm, quá nhàm chán và không có gì đặc biệt.",
    user: {
      name: "Phạm Văn Đức",
      avatar: "D",
      id: 789,
    },
    outfit: {
      id: 2,
      title: "Street style năng động",
      author: "Hoàng Thị Hoa",
    },
    likes: 2,
    dislikes: 15,
    replies: 0,
    status: "flagged",
    createdDate: "2024-03-14 16:20",
    reportCount: 3,
  },
  {
    id: 4,
    content: "Tuyệt vời! Bạn có thể chia sẻ thông tin về những items này không? Tôi muốn mua tương tự.",
    user: {
      name: "Trần Thị Hương",
      avatar: "H",
      id: 321,
    },
    outfit: {
      id: 3,
      title: "Váy hoa dạo phố",
      author: "Nguyễn Văn An",
    },
    likes: 25,
    dislikes: 0,
    replies: 5,
    status: "approved",
    createdDate: "2024-03-13 10:15",
    reportCount: 0,
  },
  {
    id: 5,
    content: "Spam content here - buy cheap products at...",
    user: {
      name: "Fake User",
      avatar: "F",
      id: 999,
    },
    outfit: {
      id: 4,
      title: "Casual weekend look",
      author: "Lê Thị Bình",
    },
    likes: 0,
    dislikes: 8,
    replies: 0,
    status: "hidden",
    createdDate: "2024-03-12 09:30",
    reportCount: 12,
  },
]

const statusColors = {
  approved: "bg-green-100 text-green-800 border-green-200",
  flagged: "bg-yellow-100 text-yellow-800 border-yellow-200",
  hidden: "bg-red-100 text-red-800 border-red-200",
  pending: "bg-blue-100 text-blue-800 border-blue-200",
}

export default function CommunityComments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.outfit.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || comment.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý bình luận</h1>
          <p className="text-muted-foreground mt-2">Quản lý bình luận và tương tác của cộng đồng</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tổng bình luận</p>
                <p className="text-2xl font-bold text-foreground">15,432</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Đã duyệt</p>
                <p className="text-2xl font-bold text-green-600">13,245</p>
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
                <p className="text-sm text-muted-foreground">Bị báo cáo</p>
                <p className="text-2xl font-bold text-yellow-600">156</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Flag className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Đã ẩn</p>
                <p className="text-2xl font-bold text-red-600">89</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Danh sách bình luận</CardTitle>
          <CardDescription className="text-muted-foreground">Xem và kiểm duyệt bình luận từ cộng đồng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm bình luận, người dùng hoặc outfit..."
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
              <option value="approved">Đã duyệt</option>
              <option value="flagged">Bị báo cáo</option>
              <option value="hidden">Đã ẩn</option>
              <option value="pending">Chờ duyệt</option>
            </select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <Card key={comment.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* User Avatar */}
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium flex-shrink-0">
                      {comment.user.avatar}
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{comment.user.name}</span>
                          <span className="text-sm text-muted-foreground">ID: {comment.user.id}</span>
                          <Badge className={statusColors[comment.status as keyof typeof statusColors]}>
                            {comment.status === "approved"
                              ? "Đã duyệt"
                              : comment.status === "flagged"
                                ? "Bị báo cáo"
                                : comment.status === "hidden"
                                  ? "Đã ẩn"
                                  : "Chờ duyệt"}
                          </Badge>
                          {comment.reportCount > 0 && (
                            <Badge variant="outline" className="text-red-600 border-red-200">
                              {comment.reportCount} báo cáo
                            </Badge>
                          )}
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
                              <Flag className="h-4 w-4 mr-2" />
                              Báo cáo
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-foreground mb-3">{comment.content}</p>

                      {/* Outfit Reference */}
                      <div className="bg-muted p-3 rounded-lg mb-3">
                        <p className="text-sm text-muted-foreground">Bình luận trên outfit:</p>
                        <p className="font-medium text-foreground">{comment.outfit.title}</p>
                        <p className="text-sm text-muted-foreground">bởi {comment.outfit.author}</p>
                      </div>

                      {/* Comment Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{comment.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsDown className="h-4 w-4" />
                            <span>{comment.dislikes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{comment.replies} phản hồi</span>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{comment.createdDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Hiển thị {filteredComments.length} trong tổng số {comments.length} bình luận
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
