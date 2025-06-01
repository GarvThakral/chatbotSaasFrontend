"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, ArrowLeft, Settings, Code, Eye, Maximize2, Minimize2 } from "lucide-react"
import SmartBotlyWidget from "@/components/SmartBotlyWidget"

export default function LiveDemoPage() {
  const [config, setConfig] = useState({
    chatbotName: "SmartBot",
    greeting: "Hi! How can I help you today?",
    primaryColor: "#8B5CF6",
    secondaryColor: "#3B82F6",
    position: "bottom-right" as const,
    theme: "dark" as const,
    chatbotAvatar: "🤖",
    userAvatar: "👤",
    mood: "friendly" as const,
    autoOpen: false,
    showBranding: true,
  })

  const [showWidget, setShowWidget] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "connected" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const testConnection = async () => {
    if (!apiKey) return

    setConnectionStatus("testing")
    setErrorMessage("")

    try {
      const response = await fetch("/api/test-connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      })

      const data = await response.json()

      if (response.ok) {
        setConnectionStatus("connected")
        setIsConnected(true)
      } else {
        setConnectionStatus("error")
        setErrorMessage(data.error || "Failed to connect to OpenAI API")
        setIsConnected(false)
      }
    } catch (error) {
      setConnectionStatus("error")
      setErrorMessage("Network error. Please try again.")
      setIsConnected(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SmartBotly
            </span>
          </Link>
          <Link href="/demo/integrate">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Integration
            </Button>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Live Demo
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Test your chatbot configuration in real-time. Add your OpenAI API key for actual AI responses, or use
                demo mode for testing.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Controls */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl font-bold text-white">Demo Controls</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Show Widget</span>
                      <button
                        onClick={() => setShowWidget(!showWidget)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          showWidget ? "bg-purple-500" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            showWidget ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Fullscreen Mode</span>
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isFullscreen ? "bg-purple-500" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isFullscreen ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Chatbot Name</label>
                      <input
                        type="text"
                        value={config.chatbotName}
                        onChange={(e) => handleConfigChange("chatbotName", e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={config.primaryColor}
                          onChange={(e) => handleConfigChange("primaryColor", e.target.value)}
                          className="w-10 h-10 rounded border border-white/10 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config.primaryColor}
                          onChange={(e) => handleConfigChange("primaryColor", e.target.value)}
                          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                      <select
                        value={config.position}
                        onChange={(e) => handleConfigChange("position", e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                      >
                        <option value="bottom-right" className="bg-gray-800">
                          Bottom Right
                        </option>
                        <option value="bottom-left" className="bg-gray-800">
                          Bottom Left
                        </option>
                        <option value="top-right" className="bg-gray-800">
                          Top Right
                        </option>
                        <option value="top-left" className="bg-gray-800">
                          Top Left
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Avatar</label>
                      <div className="grid grid-cols-4 gap-2">
                        {["🤖", "👨‍💼", "👩‍💼", "🎯", "💬", "⭐", "🚀", "💡"].map((avatar) => (
                          <button
                            key={avatar}
                            onClick={() => handleConfigChange("chatbotAvatar", avatar)}
                            className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                              config.chatbotAvatar === avatar
                                ? "bg-purple-500 scale-110"
                                : "bg-white/5 hover:bg-white/10"
                            }`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-4">
                      <h3 className="text-lg font-semibold text-white mb-4">🔑 API Configuration</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            OpenAI API Key (Optional)
                          </label>
                          <div className="space-y-2">
                            <input
                              type="password"
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              placeholder="sk-..."
                              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                            />
                            <p className="text-xs text-gray-400">
                              Enter your OpenAI API key to get real AI responses. Leave empty for demo responses.
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={testConnection}
                            disabled={!apiKey || connectionStatus === "testing"}
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            {connectionStatus === "testing" ? "Testing..." : "Test Connection"}
                          </Button>

                          {isConnected && (
                            <div className="flex items-center space-x-2 text-green-400 text-sm">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span>Connected</span>
                            </div>
                          )}
                        </div>

                        {errorMessage && (
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <p className="text-red-400 text-sm">{errorMessage}</p>
                          </div>
                        )}

                        {connectionStatus === "connected" && (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                            <p className="text-green-400 text-sm">
                              ✅ API key is valid! Your demo will now use real AI responses.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Code className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">Current Config</h3>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <code className="text-xs text-gray-300 whitespace-pre">
                      {JSON.stringify({ ...config, apiKey: apiKey ? "sk-***" : "demo" }, null, 2)}
                    </code>
                  </div>
                </Card>
              </div>

              {/* Demo Area */}
              <div className="lg:col-span-2">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-purple-400" />
                      <h2 className="text-xl font-bold text-white">Live Preview</h2>
                      {apiKey && isConnected && (
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                          Real AI Enabled
                        </span>
                      )}
                      {!apiKey && (
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">Demo Mode</span>
                      )}
                    </div>
                    <Button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Mock Website */}
                  <div
                    className={`bg-white rounded-lg relative overflow-hidden transition-all duration-300 ${
                      isFullscreen ? "h-[80vh]" : "h-96"
                    }`}
                  >
                    {/* Website Header */}
                    <div className="bg-gray-100 p-4 border-b">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                        <div className="ml-4 bg-white rounded px-3 py-1 text-sm text-gray-600">
                          https://your-website.com
                        </div>
                      </div>
                    </div>

                    {/* Website Content */}
                    <div className="p-8 space-y-6">
                      <div className="space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-100 rounded w-1/2" />
                        <div className="h-4 bg-gray-100 rounded w-2/3" />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="h-32 bg-gray-100 rounded" />
                          <div className="h-3 bg-gray-100 rounded" />
                          <div className="h-3 bg-gray-100 rounded w-4/5" />
                        </div>
                        <div className="space-y-3">
                          <div className="h-32 bg-gray-100 rounded" />
                          <div className="h-3 bg-gray-100 rounded" />
                          <div className="h-3 bg-gray-100 rounded w-4/5" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded" />
                        <div className="h-3 bg-gray-100 rounded w-4/5" />
                        <div className="h-3 bg-gray-100 rounded w-3/5" />
                      </div>
                    </div>

                    {/* Chatbot Widget */}
                    {showWidget && (
                      <SmartBotlyWidget
                        apiKey={apiKey || "demo-key"}
                        chatbotName={config.chatbotName}
                        greeting={config.greeting}
                        primaryColor={config.primaryColor}
                        secondaryColor={config.secondaryColor}
                        position={config.position}
                        theme={config.theme}
                        chatbotAvatar={config.chatbotAvatar}
                        userAvatar={config.userAvatar}
                        mood={config.mood}
                        autoOpen={config.autoOpen}
                        showBranding={config.showBranding}
                        zIndex={1000}
                        realApiKey={apiKey}
                        isDemo={true}
                      />
                    )}
                  </div>
                </Card>

                {/* Instructions */}
                <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border-white/10 p-6 mt-6">
                  <h3 className="text-lg font-bold text-white mb-3">💡 Demo Instructions</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Add your OpenAI API key above to get real AI responses</li>
                    <li>• Without an API key, the chatbot will use demo responses</li>
                    <li>• Adjust the controls on the left to see real-time changes</li>
                    <li>• Click the chatbot widget to test the conversation flow</li>
                    <li>• Try different positions and colors to match your brand</li>
                    <li>• Use fullscreen mode to see how it looks on larger screens</li>
                  </ul>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
