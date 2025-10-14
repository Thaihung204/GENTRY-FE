"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Mail as Magic,
  Play,
  Check,
  Clock,
  Percent as Percentage,
  TrendingUp,
  Rocket,
  Filter,
  Star,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2">
                <Sparkles className="w-4 h-4" />
                Phối đồ dễ dàng
              </Badge>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Trang phục mỗi ngày,{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    đơn giản hơn
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-lg">
                  Gợi ý outfit hợp tâm trạng, phong cách, dịp đặc biệt - nhờ AI học sở thích của bạn.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="btn-gentry">
                  <Magic className="w-5 h-5 mr-2" />
                  Dùng thử
                </Button>
                <Link href="/tutorials">
                  <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    <Play className="w-5 h-5 mr-2" />
                    Cách hoạt động
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Mix & match thông minh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Gợi ý phong cách</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/fashion-ai-interface-mockup.jpg"
                  alt="GENTRY AI Fashion Interface"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Nhiều đồ nhưng không biết mặc gì?</h2>
            <p className="text-xl text-muted-foreground">Chúng tôi giải quyết việc đau đầu tìm outfit mỗi ngày.</p>

            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/messy-wardrobe-closet-with-too-many-clothes.jpg"
                alt="Tủ đồ và lựa chọn trang phục"
                width={800}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white space-y-2">
                  <h4 className="text-2xl font-bold">Cuộc đấu tranh hàng ngày</h4>
                  <p className="text-lg">Chu kỳ vô tận của các quyết định phong cách</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-600">21 phút</div>
                <div className="text-muted-foreground">Thời gian chọn đồ mỗi ngày</div>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                  <Percentage className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-4xl font-bold text-purple-600">72%</div>
                <div className="text-muted-foreground">Khó chọn dù nhiều đồ</div>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-green-600">60%</div>
                <div className="text-muted-foreground">Đồ bị bỏ quên trong tủ</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100/50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-8">
              <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2">
                <Magic className="w-4 h-4" />
                AI phối đồ
              </Badge>

              <h2 className="text-4xl font-bold leading-tight">
                Outfit hoàn chỉnh
                <br />
                chỉ trong vài giây
              </h2>

              <p className="text-xl text-muted-foreground">
                AI phân tích dáng, phong cách và thời tiết để gợi ý outfit hoàn hảo:
              </p>

              <ul className="space-y-4">
                {["Tủ đồ số hóa", "AI gợi ý outfit", "Mix màu thông minh", "Phù hợp phong cách & dịp"].map(
                  (item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ),
                )}
              </ul>

              <Button
                size="lg"
                className="btn-gentry"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Bắt đầu ngay
              </Button>

            </div>

            {/* AI Outfit Preview */}
            <div className="relative">
              <Card className="p-6 shadow-xl rounded-2xl bg-white dark:bg-navy-900 border border-gray-200/20">
                <CardContent className="space-y-6">
                  <h4 className="text-xl font-bold text-center">Trang phục thông minh của bạn</h4>

                  <div className="space-y-4">
                    {/* Main outfit suggestion image */}
                    <div className="relative rounded-xl overflow-hidden shadow-md">
                      <Image
                        src="/complete-outfit-suggestion.jpg"
                        alt="Gợi ý outfit"
                        width={500}
                        height={350}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-sm rounded-md px-3 py-1 text-sm font-medium text-center">
                        Hoàn hảo cho thời tiết mát mẻ hôm nay 🌤️
                      </div>
                    </div>

                    {/* Individual outfit items */}
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { name: "Áo blazer", image: "/aoblazer.png" },
                        { name: "Áo sơ mi", image: "/aosomi.png" },
                        { name: "Quần tây", image: "/quantay.png" },
                        { name: "Giày da", image: "/giayda.png" },
                      ].map((item, index) => (
                        <div key={index} className="text-center space-y-2">
                          <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={120}
                              height={120}
                              className="w-full h-full object-contain scale-105 transition-transform duration-500 hover:scale-110"
                            />

                          </div>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Filters Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2">
                <Filter className="w-4 h-4" />
                Bộ lọc
              </Badge>

              <h2 className="text-4xl font-bold">Chọn nhanh, chuẩn gu</h2>
              <p className="text-xl text-muted-foreground">Chọn style và dịp - AI lọc outfit hợp nhất.</p>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h6 className="font-semibold">Phong cách</h6>
                  <div className="flex flex-wrap gap-2">
                    {["Thường ngày", "Trang trọng", "Tối giản", "Đường phố"].map((style, index) => (
                      <Badge key={index} variant={index === 0 ? "default" : "outline"}>
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h6 className="font-semibold">Kích cỡ</h6>
                  <div className="flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL"].map((size, index) => (
                      <Badge key={index} variant={index === 2 ? "default" : "outline"}>
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <h5 className="font-bold">Kết quả Lọc</h5>
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <Image
                          src={`/stylish-urban-outfit.png?height=60&width=60&query=outfit ${item}`}
                          alt={`Trang phục ${item}`}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <div>
                          <h6 className="font-medium">Trang phục {item}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
  <section className="py-20 bg-[var(--muted)]/40">
    <div className="container mx-auto px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold text-foreground">Được tin dùng</h2>
        <p className="text-xl text-muted-foreground">
          Cộng đồng chia sẻ trải nghiệm phối đồ thực tế cùng GENTRY.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {[
          {
            name: "Sarah Chen",
            role: "Quản lý Marketing",
            text: "Điều này đã hoàn toàn thay đổi thói quen buổi sáng của tôi. Tôi tiết kiệm được rất nhiều thời gian và luôn cảm thấy tự tin với những gì mình mặc.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
          },
          {
            name: "David Kim",
            role: "Lập trình viên",
            text: "Tôi yêu thích các gợi ý từ AI. Giống như có một stylist cá nhân thực sự hiểu phong cách của tôi.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Maria Rodriguez",
            role: "Giám đốc Sáng tạo",
            text: "Tôi không bao giờ phải vội vàng chọn trang phục nữa. Ứng dụng này thực sự giúp tôi tận dụng tối đa tủ quần áo của mình.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          },
        ].map((testimonial, index) => (
          <Card
            key={index}
            className="p-6 border border-[var(--border)] shadow-md hover:shadow-lg transition-all bg-card/80 backdrop-blur-sm"
          >
            <CardContent className="space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground italic">
                “{testimonial.text}”
              </p>

              <div className="flex items-center gap-3 mt-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-[var(--border)]"
                />
                <div>
                  <h6 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h6>
                  <span className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="flex items-center justify-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-muted-foreground">
          4.8/5 từ <span className="font-semibold text-foreground">2,847</span> đánh giá
        </span>
      </div>
    </div>
  </section>


      {/* Footer */}
      <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)] border-t border-[var(--footer-border)] py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold">GENTRY</span>
              </div>
              <p className="text-[var(--footer-text)]/80 max-w-md">Biến tủ đồ của bạn thành thông minh, hợp gu.</p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h6 className="font-semibold">Sản phẩm</h6>
              <ul className="space-y-2 text-sm text-[var(--footer-text)]/80">
                <li>
                  <Link href="/ai-styling" className="hover:text-foreground">
                    AI Styling
                  </Link>
                </li>
                <li>
                  <Link href="/wardrobe" className="hover:text-foreground">
                    Trang phục Thông minh
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Phân tích Xu hướng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Thử đồ Ảo
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h6 className="font-semibold">Công ty</h6>
              <ul className="space-y-2 text-sm text-[var(--footer-text)]/80">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Tuyển dụng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Báo chí
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h6 className="font-semibold">Hỗ trợ</h6>
              <ul className="space-y-2 text-sm text-[var(--footer-text)]/80">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Trung tâm Hỗ trợ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Tài liệu API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Trạng thái
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--footer-text)]/80">© 2025 GENTRY. Tất cả quyền được bảo lưu.</p>
            <p className="text-sm text-[var(--footer-text)]/80 flex items-center gap-1">
              Được tạo với <Heart className="w-4 h-4 text-red-500 fill-current" /> cho Thời trang
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
