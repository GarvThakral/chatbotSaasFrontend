"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Minimize2, Maximize2, Bot } from "lucide-react"
import axios from "axios"

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
      input: "bg-gray-800 border-gray-600 text-white placeholder-gray-400",
      userMessage: "bg-blue-500 text-white",
      botMessage: "bg-gray-700 text-white",
    }
  }

  const themeClasses = getThemeClasses()

  const sendMessage = async () => {
    if (realApiKey == "") {
      alert("Enter an api key")
      return
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ROUTE}user/remainingCalls`,
      {
        apiKey: realApiKey,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    )
    if (response.status == 202) {
      alert("Api key not valid")
      return
    }
    const remainingCalls = response.data.response.apiCalls
    if (remainingCalls <= 0) {
      const userMessage = {
        id: Date.now().toString(),
        text: inputValue,
        sender: "user" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: "You are out of demo messages, please purchase a plan to continue",
        sender: "bot" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setInputValue("")
      return
    }
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user" as const,
      timestamp: new Date(),
    }

    // Add your message to the chat
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setIsTyping(true)

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PYTHON_API_ROUTE}ask`, {
        user_id: token,
        question: userMessage.text,
        api_key: realApiKey,
      })

      // Check if the response is good
      if (!(response.status == 200)) {
        throw new Error("Failed to get response")
      }

      const data = response.data
      const botResponse = data.result

      // Add the bot's message to the chat
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])

      // Play a sound if you've got that enabled
      if (soundEnabled) {
        // Uncomment this if you wanna add sound
        // playNotificationSound();
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = "I'm having trouble connecting right now. Please try again later."
      const errorBotMessage = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        sender: "bot" as const,
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${themeClasses.background} ${themeClasses.border} border shadow-2xl backdrop-blur-xl overflow-hidden`}
            style={{
              width: isMinimized ? 320 : width,
              height: isMinimized ? 70 : height,
              borderRadius,
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 2rem)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between text-white relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                minHeight: isMinimized ? "70px" : "auto",
              }}
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />

              <div className="flex items-center space-x-3 flex-1 min-w-0 relative z-10">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  {chatbotAvatar === "🤖" ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-lg">{chatbotAvatar}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white truncate text-sm">{chatbotName}</div>
                  <div className="text-xs text-white/80 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    {isTyping ? "Typing..." : "Online"}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 flex-shrink-0 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div
                  className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
                  style={{ height: height - 160 }}
                >
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex items-end space-x-2 max-w-[85%]">
                          {message.sender === "bot" && (
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-1">
                              {chatbotAvatar === "🤖" ? (
                                <Bot className="w-4 h-4 text-white" />
                              ) : (
                                <span className="text-sm">{chatbotAvatar}</span>
                              )}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <div
                              className={`px-4 py-3 rounded-2xl shadow-sm ${
                                message.sender === "user"
                                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md"
                                  : `${themeClasses.botMessage} rounded-bl-md`
                              }`}
                              style={{
                                background:
                                  message.sender === "user"
                                    ? `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`
                                    : undefined,
                              }}
                            >
                              <p className="text-sm leading-relaxed break-words">{message.text}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 px-2">{formatTime(message.timestamp)}</p>
                          </div>
                          {message.sender === "user" && (
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mb-1">
                              <span className="text-sm">{userAvatar}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-end space-x-2">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${themeClasses.botMessage}`}>
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
                <div className={`p-4 border-t ${themeClasses.border} bg-gradient-to-r from-gray-50/5 to-transparent`}>
                  <div className="flex space-x-3 items-end">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${themeClasses.input}`}
                        style={{
                          outlineColor: primaryColor ,
                          resize: "none",
                        }}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="p-3 rounded-2xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      }}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                  {showBranding && (
                    <div className="text-center mt-3">
                      <a
                        href="https://smartbotly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-gray-400 transition-colors flex items-center justify-center space-x-1"
                      >
                        <span>Powered by</span>
                        <span className="font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                          SmartBotly
                        </span>
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
            className="w-16 h-16 rounded-full text-white shadow-2xl flex items-center justify-center text-2xl transition-all relative overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {chatbotAvatar === "🤖" ? (
              <Bot className="w-7 h-7 text-white relative z-10" />
            ) : (
              <span className="relative z-10">{chatbotAvatar}</span>
            )}

            {/* Pulse animation */}
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: primaryColor }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
