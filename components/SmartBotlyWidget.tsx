"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface SmartBotlyWidgetProps {
  apiKey: string
  chatbotName?: string
  greeting?: string
  primaryColor?: string
  secondaryColor?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  theme?: "light" | "dark" | "auto"
  chatbotAvatar?: string
  userAvatar?: string
  mood?: "friendly" | "professional" | "casual" | "formal"
  autoOpen?: boolean
  showBranding?: boolean
  soundEnabled?: boolean
  width?: number
  height?: number
  borderRadius?: number
  zIndex?: number
  className?: string
  realApiKey?: string
  isDemo?: boolean
}

export default function SmartBotlyWidget({
  apiKey,
  chatbotName = "SmartBot",
  greeting = "Hi! How can I help you today?",
  primaryColor = "#8B5CF6",
  secondaryColor = "#3B82F6",
  position = "bottom-right",
  theme = "dark",
  chatbotAvatar = "🤖",
  userAvatar = "👤",
  mood = "friendly",
  autoOpen = false,
  showBranding = true,
  soundEnabled = true,
  width = 380,
  height = 600,
  borderRadius = 16,
  zIndex = 10000,
  className = "",
  realApiKey,
  isDemo = false,
}: SmartBotlyWidgetProps) {
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial greeting message
      setMessages([
        {
          id: "greeting",
          text: greeting,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, greeting, messages.length])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-6 left-6"
      case "top-right":
        return "top-6 right-6"
      case "top-left":
        return "top-6 left-6"
      default:
        return "bottom-6 right-6"
    }
  }

  const getThemeClasses = () => {
    if (theme === "light") {
      return {
        background: "bg-white",
        text: "text-gray-900",
        border: "border-gray-200",
        input: "bg-gray-50 border-gray-200",
        userMessage: "bg-blue-500 text-white",
        botMessage: "bg-gray-100 text-gray-900",
      }
    }
    return {
      background: "bg-gray-900",
      text: "text-white",
      border: "border-gray-700",
      input: "bg-gray-800 border-gray-600 text-white",
      userMessage: "bg-blue-500 text-white",
      botMessage: "bg-gray-700 text-white",
    }
  }

  const themeClasses = getThemeClasses()

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(realApiKey && realApiKey !== "demo-key" ? {} : {}),
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          chatbotId: isDemo ? "demo" : "default",
          apiKey: realApiKey || apiKey,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Failed to get response")
      }

      let botResponse = ""

      // Check if it's a streaming response or plain text
      const contentType = response.headers.get("content-type")

      if (contentType?.includes("text/plain")) {
        // Handle demo mode plain text response
        botResponse = await response.text()

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botMessage])
      } else {
        // Handle streaming response from AI
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (reader) {
          // Create bot message immediately for streaming
          const botMessageId = (Date.now() + 1).toString()
          const botMessage: Message = {
            id: botMessageId,
            text: "",
            sender: "bot",
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, botMessage])

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split("\n")

            for (const line of lines) {
              if (line.startsWith("0:")) {
                try {
                  const jsonStr = line.slice(2)
                  const data = JSON.parse(jsonStr)
                  if (data && typeof data === "string") {
                    botResponse += data

                    // Update the bot message in real-time
                    setMessages((prev) =>
                      prev.map((msg) => (msg.id === botMessageId ? { ...msg, text: botResponse } : msg)),
                    )
                  }
                } catch (e) {
                  // Ignore parsing errors for streaming
                }
              }
            }
          }
        }
      }

      if (soundEnabled) {
        // Play notification sound (you would implement this)ay notification sound (you would implement this)
        // playNotificationSound()
      }
    } catch (error: any) {
      console.error("Error sending message:", error)

      let errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again later."

      if (error.message?.includes("401")) {
        errorMessage = "Authentication failed. Please check your API key."
      } else if (error.message?.includes("429")) {
        errorMessage = "I'm receiving too many requests right now. Please wait a moment and try again."
      } else if (error.message?.includes("402")) {
        errorMessage = "API quota exceeded. Please check your OpenAI billing."
      }

      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorBotMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={`fixed ${getPositionClasses()} ${className}`} style={{ zIndex }}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`${themeClasses.background} ${themeClasses.border} border rounded-2xl shadow-2xl overflow-hidden`}
            style={{
              width: isMinimized ? 300 : width,
              height: isMinimized ? 60 : height,
              borderRadius,
            }}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between text-white" style={{ backgroundColor: primaryColor }}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{chatbotAvatar}</span>
                <div>
                  <div className="font-semibold">{chatbotName}</div>
                  <div className="text-xs opacity-80">{isTyping ? "Typing..." : "Online"}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto" style={{ height: height - 140 }}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex items-start space-x-2 max-w-[80%]">
                          {message.sender === "bot" && (
                            <span className="text-lg flex-shrink-0 mt-1">{chatbotAvatar}</span>
                          )}
                          <div>
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                message.sender === "user" ? themeClasses.userMessage : themeClasses.botMessage
                              }`}
                              style={{
                                backgroundColor: message.sender === "user" ? secondaryColor : undefined,
                              }}
                            >
                              <p className="text-sm leading-relaxed">{message.text}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 px-2">{formatTime(message.timestamp)}</p>
                          </div>
                          {message.sender === "user" && (
                            <span className="text-lg flex-shrink-0 mt-1">{userAvatar}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{chatbotAvatar}</span>
                          <div className={`px-4 py-2 rounded-2xl ${themeClasses.botMessage}`}>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input */}
                <div className={`p-4 border-t ${themeClasses.border}`}>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className={`flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-opacity-50 ${themeClasses.input}`}
                      style={{ focusRingColor: primaryColor }}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="p-2 rounded-full text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  {showBranding && (
                    <div className="text-center mt-2">
                      <a
                        href="https://smartbotly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                      >
                        Powered by SmartBotly
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full text-white shadow-lg flex items-center justify-center text-2xl transition-all"
            style={{ backgroundColor: primaryColor }}
          >
            {chatbotAvatar}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
