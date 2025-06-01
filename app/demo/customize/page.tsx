"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, ArrowLeft, Palette, Settings, Save, Eye } from "lucide-react"

export default function CustomizePage() {
  const [config, setConfig] = useState({
    chatbotName: "SmartBot",
    greeting: "Hi! How can I help you today?",
    primaryColor: "#8B5CF6",
    secondaryColor: "#3B82F6",
    position: "bottom-right",
    theme: "dark",
    chatbotAvatar: "🤖",
    userAvatar: "👤",
    mood: "friendly",
    language: "en",
    showBranding: true,
    autoOpen: false,
    soundEnabled: true,
  })

  const [previewOpen, setPreviewOpen] = useState(false)

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const positions = [
    { value: "bottom-right", label: "Bottom Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "top-right", label: "Top Right" },
    { value: "top-left", label: "Top Left" },
  ]

  const themes = [
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
    { value: "auto", label: "Auto" },
  ]

  const moods = [
    { value: "friendly", label: "Friendly" },
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "formal", label: "Formal" },
  ]

  const avatarOptions = ["🤖", "👨‍💼", "👩‍💼", "🎯", "💬", "⭐", "🚀", "💡"]

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
          <Link href="/demo">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Demo
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
                Customize Your Chatbot
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Personalize your chatbot's appearance, behavior, and responses to match your brand perfectly.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Configuration Panel */}
              <div className="space-y-6">
                {/* Basic Settings */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Settings className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl font-bold text-white">Basic Settings</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Chatbot Name</label>
                      <input
                        type="text"
                        value={config.chatbotName}
                        onChange={(e) => handleConfigChange("chatbotName", e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Greeting Message</label>
                      <textarea
                        value={config.greeting}
                        onChange={(e) => handleConfigChange("greeting", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                        <select
                          value={config.position}
                          onChange={(e) => handleConfigChange("position", e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        >
                          {positions.map((pos) => (
                            <option key={pos.value} value={pos.value} className="bg-gray-800">
                              {pos.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Mood</label>
                        <select
                          value={config.mood}
                          onChange={(e) => handleConfigChange("mood", e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        >
                          {moods.map((mood) => (
                            <option key={mood.value} value={mood.value} className="bg-gray-800">
                              {mood.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Appearance */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Palette className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl font-bold text-white">Appearance</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={config.primaryColor}
                            onChange={(e) => handleConfigChange("primaryColor", e.target.value)}
                            className="w-12 h-12 rounded-lg border border-white/10 bg-transparent cursor-pointer"
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
                        <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={config.secondaryColor}
                            onChange={(e) => handleConfigChange("secondaryColor", e.target.value)}
                            className="w-12 h-12 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.secondaryColor}
                            onChange={(e) => handleConfigChange("secondaryColor", e.target.value)}
                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                      <div className="grid grid-cols-3 gap-2">
                        {themes.map((theme) => (
                          <button
                            key={theme.value}
                            onClick={() => handleConfigChange("theme", theme.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              config.theme === theme.value
                                ? "bg-purple-500 text-white"
                                : "bg-white/5 text-gray-300 hover:bg-white/10"
                            }`}
                          >
                            {theme.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Chatbot Avatar</label>
                        <div className="grid grid-cols-4 gap-2">
                          {avatarOptions.map((avatar) => (
                            <button
                              key={avatar}
                              onClick={() => handleConfigChange("chatbotAvatar", avatar)}
                              className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all ${
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

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">User Avatar</label>
                        <div className="grid grid-cols-4 gap-2">
                          {["👤", "👨", "👩", "🧑"].map((avatar) => (
                            <button
                              key={avatar}
                              onClick={() => handleConfigChange("userAvatar", avatar)}
                              className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all ${
                                config.userAvatar === avatar
                                  ? "bg-purple-500 scale-110"
                                  : "bg-white/5 hover:bg-white/10"
                              }`}
                            >
                              {avatar}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Advanced Options */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Advanced Options</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-300">Show SmartBotly Branding</label>
                        <p className="text-xs text-gray-400">Display "Powered by SmartBotly" in the chat</p>
                      </div>
                      <button
                        onClick={() => handleConfigChange("showBranding", !config.showBranding)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          config.showBranding ? "bg-purple-500" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            config.showBranding ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-300">Auto Open Chat</label>
                        <p className="text-xs text-gray-400">Automatically open chat when page loads</p>
                      </div>
                      <button
                        onClick={() => handleConfigChange("autoOpen", !config.autoOpen)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          config.autoOpen ? "bg-purple-500" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            config.autoOpen ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-300">Sound Notifications</label>
                        <p className="text-xs text-gray-400">Play sound when receiving messages</p>
                      </div>
                      <button
                        onClick={() => handleConfigChange("soundEnabled", !config.soundEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          config.soundEnabled ? "bg-purple-500" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            config.soundEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </Card>

                {/* Save Button */}
                <div className="flex space-x-4">
                  <Button
                    onClick={() => setPreviewOpen(!previewOpen)}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {previewOpen ? "Hide Preview" : "Show Preview"}
                  </Button>
                  <Link href="/demo/integrate" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      <Save className="w-4 h-4 mr-2" />
                      Save & Get Code
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Preview Panel */}
              <div className="lg:sticky lg:top-8">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Live Preview</h2>

                  {/* Mock Website */}
                  <div className="bg-white rounded-lg p-6 relative h-96 overflow-hidden">
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-100 rounded w-1/2" />
                      <div className="h-4 bg-gray-100 rounded w-2/3" />
                      <div className="space-y-2 mt-8">
                        <div className="h-3 bg-gray-100 rounded" />
                        <div className="h-3 bg-gray-100 rounded w-4/5" />
                        <div className="h-3 bg-gray-100 rounded w-3/5" />
                      </div>
                    </div>

                    {/* Chatbot Widget */}
                    <div
                      className={`absolute ${
                        config.position === "bottom-right"
                          ? "bottom-4 right-4"
                          : config.position === "bottom-left"
                            ? "bottom-4 left-4"
                            : config.position === "top-right"
                              ? "top-4 right-4"
                              : "top-4 left-4"
                      }`}
                    >
                      {previewOpen ? (
                        <div className="w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden">
                          <div
                            className="p-4 text-white flex items-center justify-between"
                            style={{ backgroundColor: config.primaryColor }}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{config.chatbotAvatar}</span>
                              <div>
                                <div className="font-semibold">{config.chatbotName}</div>
                                <div className="text-xs opacity-80">Online</div>
                              </div>
                            </div>
                            <button onClick={() => setPreviewOpen(false)} className="text-white/80 hover:text-white">
                              ×
                            </button>
                          </div>
                          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
                            <div className="bg-white rounded-lg p-3 shadow-sm mb-3">
                              <div className="flex items-start space-x-2">
                                <span className="text-lg">{config.chatbotAvatar}</span>
                                <div className="text-sm text-gray-800">{config.greeting}</div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border-t">
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                                disabled
                              />
                              <button
                                className="px-4 py-2 text-white rounded-lg text-sm"
                                style={{ backgroundColor: config.primaryColor }}
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setPreviewOpen(true)}
                          className="w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform"
                          style={{ backgroundColor: config.primaryColor }}
                        >
                          {config.chatbotAvatar}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Configuration Summary */}
                  <div className="mt-6 p-4 bg-white/5 rounded-lg">
                    <h3 className="text-sm font-semibold text-white mb-2">Configuration Summary</h3>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>Name: {config.chatbotName}</div>
                      <div>Position: {positions.find((p) => p.value === config.position)?.label}</div>
                      <div>Theme: {themes.find((t) => t.value === config.theme)?.label}</div>
                      <div>Mood: {moods.find((m) => m.value === config.mood)?.label}</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
