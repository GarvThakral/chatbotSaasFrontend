"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Key, Code, Settings, CreditCard, BarChart3, FileText, Copy, Check, RefreshCw, Edit3, Save, X, Eye, EyeOff, Zap, Shield, Globe, Bot } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import axios from "axios"

interface UserData {
  id: string
  email: string
  name: string
  company?: string
  phone?: string
  plan: "free" | "growth" | "enterprise"
  apiKey: string
  apiCalls: number
  maxApiCalls: number
  createdAt: string
  lastLogin: string
}

interface PlanFeatures {
  name: string
  price: string
  calls: string
  chatbots: string
  features: string[]
  color: string
}

const planData: Record<string, PlanFeatures> = {
  free: {
    name: "Free",
    price: "$0",
    calls: "100",
    chatbots: "1",
    features: ["Basic customization", "Email support", "Community access"],
    color: "from-gray-500 to-gray-600"
  },
  growth: {
    name: "Growth",
    price: "$29",
    calls: "10,000",
    chatbots: "5",
    features: ["Advanced customization", "Priority support", "Analytics dashboard", "API access"],
    color: "from-blue-500 to-purple-600"
  },
  enterprise: {
    name: "Enterprise",
    price: "$99",
    calls: "Unlimited",
    chatbots: "Unlimited",
    features: ["White-label solution", "24/7 phone support", "Custom integrations", "Dedicated account manager"],
    color: "from-purple-500 to-pink-600"
  }
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<Partial<UserData>>({})
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const [showApiKey, setShowApiKey] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setIsLoading(true)
      // Replace with your actual API endpoint
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ROUTE}/user/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setUserData(response.data)
    } catch (error) {
      console.error("Error fetching user data:", error)
      // Mock data for demo
      setUserData({
        id: "user_123",
        email: "john@example.com",
        name: "John Doe",
        company: "Acme Corp",
        phone: "+1 (555) 123-4567",
        plan: "growth",
        apiKey: "sb_live_1234567890abcdef",
        apiCalls: 2847,
        maxApiCalls: 10000,
        createdAt: "2024-01-15",
        lastLogin: "2024-01-20"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      // Replace with your actual API endpoint
      await axios.put("/api/user/profile", editedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setUserData(prev => prev ? { ...prev, ...editedData } : null)
      setIsEditing(false)
      setEditedData({})
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleRegenerateApiKey = async () => {
    try {
      setIsRegenerating(true)
      // Replace with your actual API endpoint
      const response = await axios.post("/api/user/regenerate-api-key", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setUserData(prev => prev ? { ...prev, apiKey: response.data.apiKey } : null)
    } catch (error) {
      console.error("Error regenerating API key:", error)
    } finally {
      setIsRegenerating(false)
    }
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates(prev => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }))
      }, 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const getIntegrationCode = (platform: string) => {
    const apiKey = userData?.apiKey || "YOUR_API_KEY"
    
    switch (platform) {
      case "react":
        return `import SmartBotlyWidget from '@smartbotly/react-widget'

function App() {
  return (
    <div>
      {/* Your app content */}
      <SmartBotlyWidget
        apiKey="${apiKey}"
        chatbotName="Your Assistant"
        primaryColor="#8B5CF6"
        position="bottom-right"
      />
    </div>
  )
}`
      case "html":
        return `<!-- Add this script tag to your HTML -->
<script src="https://cdn.smartbotly.com/widget.js"></script>
<script>
  SmartBotly.init({
    apiKey: "${apiKey}",
    chatbotName: "Your Assistant",
    primaryColor: "#8B5CF6",
    position: "bottom-right"
  });
</script>`
      case "wordpress":
        return `<!-- Add this to your WordPress theme's footer.php or use a plugin -->
<script src="https://cdn.smartbotly.com/widget.js"></script>
<script>
  SmartBotly.init({
    apiKey: "${apiKey}",
    chatbotName: "Your Assistant",
    primaryColor: "#8B5CF6",
    position: "bottom-right"
  });
</script>`
      case "shopify":
        return `<!-- Add this to your Shopify theme's theme.liquid file before </body> -->
<script src="https://cdn.smartbotly.com/widget.js"></script>
<script>
  SmartBotly.init({
    apiKey: "${apiKey}",
    chatbotName: "Your Assistant",
    primaryColor: "#8B5CF6",
    position: "bottom-right"
  });
</script>`
      default:
        return ""
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Failed to load user data</p>
          <Button onClick={fetchUserData} className="mt-4">Retry</Button>
        </div>
      </div>
    )
  }

  const currentPlan = planData[userData.plan]
  const usagePercentage = (userData.apiCalls / userData.maxApiCalls) * 100

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
          <div className="flex items-center space-x-4">
            <Link href="/upload">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Upload Documents
              </Button>
            </Link>
            <Button variant="ghost" className="text-white">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400">Welcome back, {userData.name}!</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Current Plan</p>
                    <p className="text-2xl font-bold text-white">{currentPlan.name}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${currentPlan.color} rounded-lg flex items-center justify-center`}>
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">API Calls Used</p>
                    <p className="text-2xl font-bold text-white">{userData.apiCalls.toLocaleString()}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Chatbots</p>
                    <p className="text-2xl font-bold text-white">{currentPlan.chatbots}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Member Since</p>
                    <p className="text-2xl font-bold text-white">
                      {new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/5 backdrop-blur-xl border border-white/10">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">Overview</TabsTrigger>
              <TabsTrigger value="integration" className="data-[state=active]:bg-white/10">Integration</TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-white/10">Profile</TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-white/10">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* API Key Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <Key className="w-5 h-5 mr-2" />
                      API Key
                    </h3>
                    <Button
                      onClick={handleRegenerateApiKey}
                      disabled={isRegenerating}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      {isRegenerating ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <RefreshCw className="w-4 h-4 mr-2" />
                      )}
                      Regenerate
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-800 rounded-lg p-3 font-mono text-sm">
                      {showApiKey ? userData.apiKey : userData.apiKey.replace(/./g, '•')}
                    </div>
                    <Button
                      onClick={() => setShowApiKey(!showApiKey)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(userData.apiKey, 'apiKey')}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                    >
                      {copiedStates.apiKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Keep your API key secure. Don't share it publicly or commit it to version control.
                  </p>
                </Card>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/upload">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                        <FileText className="w-4 h-4 mr-2" />
                        Upload Documents
                      </Button>
                    </Link>
                    <Link href="/customize">
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        <Settings className="w-4 h-4 mr-2" />
                        Customize Chatbot
                      </Button>
                    </Link>
                    <Link href="/analytics">
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Integration Code
                  </h3>
                  
                  <Tabs defaultValue="react" className="space-y-4">
                    <TabsList className="bg-white/5 backdrop-blur-xl border border-white/10">
                      <TabsTrigger value="react" className="data-[state=active]:bg-white/10">React</TabsTrigger>
                      <TabsTrigger value="html" className="data-[state=active]:bg-white/10">HTML/JS</TabsTrigger>
                      <TabsTrigger value="wordpress" className="data-[state=active]:bg-white/10">WordPress</TabsTrigger>
                      <TabsTrigger value="shopify" className="data-[state=active]:bg-white/10">Shopify</TabsTrigger>
                    </TabsList>

                    {['react', 'html', 'wordpress', 'shopify'].map((platform) => (
                      <TabsContent key={platform} value={platform}>
                        <div className="relative">
                          <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
                            <code className="text-gray-300">{getIntegrationCode(platform)}</code>
                          </pre>
                          <Button
                            onClick={() => copyToClipboard(getIntegrationCode(platform), platform)}
                            className="absolute top-2 right-2 bg-white/10 hover:bg-white/20"
                            size="sm"
                          >
                            {copiedStates[platform] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Profile Information
                    </h3>
                    {!isEditing ? (
                      <Button
                        onClick={() => {
                          setIsEditing(true)
                          setEditedData({
                            name: userData.name,
                            email: userData.email,
                            company: userData.company,
                            phone: userData.phone
                          })
                        }}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleSaveProfile}
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(false)
                            setEditedData({})
                          }}
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.name || ''}
                          onChange={(e) => setEditedData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-white bg-gray-800 rounded-lg px-3 py-2">{userData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedData.email || ''}
                          onChange={(e) => setEditedData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-white bg-gray-800 rounded-lg px-3 py-2">{userData.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.company || ''}
                          onChange={(e) => setEditedData(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-white bg-gray-800 rounded-lg px-3 py-2">{userData.company || 'Not specified'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedData.phone || ''}
                          onChange={(e) => setEditedData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-white bg-gray-800 rounded-lg px-3 py-2">{userData.phone || 'Not specified'}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Current Plan
                  </h3>
                  
                  <div className={`bg-gradient-to-r ${currentPlan.color} rounded-lg p-6 text-white mb-6`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold">{currentPlan.name} Plan</h4>
                        <p className="text-white/80">{currentPlan.price}/month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/80">API Calls</p>
                        <p className="text-xl font-bold">{currentPlan.calls}/month</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(planData).map(([key, plan]) => (
                      <Card key={key} className={`bg-white/5 backdrop-blur-xl border-white/10 p-6 ${userData.plan === key ? 'ring-2 ring-purple-500' : ''}`}>
                        <div className="text-center">
                          <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                          <p className="text-3xl font-bold text-white mb-1">{plan.price}</p>
                          <p className="text-gray-400 text-sm mb-4">/month</p>
                          <ul className="space-y-2 text-sm text-gray-300 mb-6">
                            <li>{plan.calls} API calls</li>
                            <li>{plan.chatbots} chatbots</li>
                            {plan.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                          {userData.plan === key ? (
                            <Button disabled className="w-full bg-gray-600">
                              Current Plan
                            </Button>
                          ) : (
                            <Button className={`w-full bg-gradient-to-r ${plan.color}`}>
                              {userData.plan === 'free' ? 'Upgrade' : 'Change Plan'}
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
