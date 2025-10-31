"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, MessageCircle } from "lucide-react"

export default function WardrobePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Xin chào! 👋 Mình là GENTRY Stylist AI. Hôm nay bạn muốn phối đồ cho dịp gì?" }
  ])
  const [input, setInput] = useState("")

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessage = { sender: "user", text: input }
    setMessages((prev) => [...prev, newMessage])
    setInput("")

    try {
      // 💬 Gọi API AI Outfit
      const res = await fetch("https://localhost:7167/api/outfitai/chat/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()
      const aiReply = data?.reply || "Xin lỗi, mình chưa hiểu rõ yêu cầu của bạn 😅"
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }])
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "ai", text: "Lỗi kết nối đến AI server 😢" }])
    }
  }

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* --- Wardrobe content --- */}
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">👕 Tủ đồ của bạn</h1>
        <p className="text-neutral-500 dark:text-neutral-300">
          Đây là nơi bạn lưu trữ và quản lý các món đồ yêu thích của mình.
        </p>
      </div>

      {/* 💬 Floating button */}
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:scale-105 transition-transform"
      >
        <MessageCircle className="mr-2 w-5 h-5" />
        GENTRY AI Stylist
      </Button>

      {/* --- Chat panel --- */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-neutral-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
              <h2 className="font-semibold text-lg">💬 GENTRY AI Stylist</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                        : "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="border-t dark:border-neutral-700 p-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Nhập tin nhắn..."
                className="flex-1 rounded-xl border dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700 px-3 py-2 text-sm focus:outline-none"
              />
              <Button
                onClick={sendMessage}
                className="bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:scale-105 transition-transform"
              >
                Gửi
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
