"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, MessageCircle, Users, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface AnalyticsData {
  totalMessages: number
  totalUsers: number
  avgResponseTime: number
  satisfactionRate: number
  dailyStats: Array<{
    date: string
    messages: number
    users: number
  }>
  topQuestions: Array<{
    question: string
    count: number
  }>
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true)
      // Mock data for demo
      setAnalyticsData({
        totalMessages: 12847,
        totalUsers: 2341,
        avgResponseTime: 0.8,
        satisfactionRate: 94.2,
        dailyStats: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          messages: Math.floor(Math.random() * 500) + 100,
          users: Math.floor(Math.random() * 100) + 20,
        })),
        topQuestions: [
          { question: "What are your business hours?", count: 234 },
          { question: "How can I contact support?", count: 189 },
          { question: "What are your pricing plans?", count: 156 },
          { question: "How do I reset my password?", count: 134 },
          { question: "Do you offer refunds?", count: 98 },
        ],
      })
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SmartBotly
            </span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Analytics
                </h1>
                <p className="text-gray-400">Track your chatbot's performance and user engagement</p>
              </div>
              <div className="flex space-x-2">
                {(["7d", "30d", "90d"] as const).map((range) => (
                  <Button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    className={timeRange === range ? "bg-purple-500" : "border-white/20 text-white hover:bg-white/10"}
                  >
                    {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          {analyticsData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Messages</p>
                        <p className="text-2xl font-bold text-white">{analyticsData.totalMessages.toLocaleString()}</p>
                        <p className="text-green-400 text-sm">+12% from last period</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Unique Users</p>
                        <p className="text-2xl font-bold text-white">{analyticsData.totalUsers.toLocaleString()}</p>
                        <p className="text-green-400 text-sm">+8% from last period</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Avg Response Time</p>
                        <p className="text-2xl font-bold text-white">{analyticsData.avgResponseTime}s</p>
                        <p className="text-green-400 text-sm">-0.2s from last period</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Satisfaction Rate</p>
                        <p className="text-2xl font-bold text-white">{analyticsData.satisfactionRate}%</p>
                        <p className="text-green-400 text-sm">+2.1% from last period</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Charts and Data */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Daily Activity</h3>
                    <div className="h-64 flex items-end space-x-1">
                      {analyticsData.dailyStats.slice(-14).map((stat, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                            style={{ height: `${(stat.messages / 500) * 100}%`, minHeight: "4px" }}
                          />
                          <p className="text-xs text-gray-400 mt-2 transform -rotate-45">
                            {new Date(stat.date).getDate()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Top Questions</h3>
                    <div className="space-y-4">
                      {analyticsData.topQuestions.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <p className="text-gray-300 flex-1 truncate">{item.question}</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                style={{ width: `${(item.count / analyticsData.topQuestions[0].count) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400 w-8">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
