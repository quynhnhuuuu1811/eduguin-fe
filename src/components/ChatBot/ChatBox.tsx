"use client";

import { getTokenFromLocalStorage } from "@/utils/storage";
import { FormEvent, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Message = {
  id: number;
  role: "user" | "bot";
  content: string;
};

const SOCKET_URL = "https://api.eduguin.mtri.online/chatbot";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "bot",
      content: "Xin chào! Mình là trợ lý ảo, bạn cần hỗ trợ gì? 😊",
    },
  ]);
  const [input, setInput] = useState("");

  // NEW: trạng thái bot đang suy nghĩ
  const [isBotThinking, setIsBotThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // NEW: lưu các timeout của hiệu ứng typewriter để clear khi unmount
  const typingTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    console.log("🚀 Đang khởi tạo socket...");

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token: `${token}` },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected successfully:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
      setIsBotThinking(false);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
      setIsBotThinking(false);
    });

    socket.on("msgToClient", (data: { reply: string }) => {
      console.log("📩 Tin nhắn từ server:", data);
      setIsBotThinking(false);

      const fullText = data.reply || "";
      const messageId = Date.now();

      setMessages((prev) => [
        ...prev,
        {
          id: messageId,
          role: "bot",
          content: "",
        },
      ]);

      // 2. Hiệu ứng gõ chữ dần dần
      const typeWriter = (index: number) => {
        if (index > fullText.length) return;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, content: fullText.slice(0, index) } : m
          )
        );

        const timeoutId = window.setTimeout(() => {
          typeWriter(index + 1);
        }, 20); // tốc độ gõ (ms / ký tự)

        typingTimeoutsRef.current.push(timeoutId);
      };

      typeWriter(1);
    });

    // Cleanup khi component unmount
    return () => {
      if (socket.connected) {
        console.log("🔌 Ngắt kết nối socket...");
        socket.disconnect();
      }
      // clear tất cả timeout của typewriter
      typingTimeoutsRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Gửi tin nhắn
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (socketRef.current?.connected) {
      // Hiển thị trạng thái "đang suy nghĩ"
      setIsBotThinking(true);

      socketRef.current.emit("send", {
        content: trimmed,
      });
    } else {
      console.error("Socket chưa kết nối, không thể gửi.");
      setIsBotThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          content: "Đang mất kết nối tới máy chủ...",
        },
      ]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-400/40 hover:bg-blue-700 active:scale-95 transition">
        {isOpen ? (
          <span className="text-xl font-bold">×</span>
        ) : (
          <span className="text-2xl">💬</span>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2 bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-semibold">
                🤖
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-slate-800">
                  Trợ lý ảo
                </div>
                <div className="text-[11px] text-slate-500">
                  Luôn sẵn sàng hỗ trợ bạn
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition">
              <span className="text-lg leading-none">×</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-2 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs shadow-sm
                  ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-sm"
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* NEW: hiệu ứng "bot đang suy nghĩ..." */}
            {isBotThinking && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 max-w-[80%] rounded-2xl px-3 py-2 text-xs shadow-sm bg-white text-slate-500 border border-slate-200 rounded-bl-sm">
                  <span>Đang suy nghĩ</span>
                  <span className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce [animation-delay:0.15s]">
                      .
                    </span>
                    <span className="animate-bounce [animation-delay:0.3s]">
                      .
                    </span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-200 bg-white px-2 py-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-xl px-3 py-2 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition disabled:opacity-50">
                Gửi
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
