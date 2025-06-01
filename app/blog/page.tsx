"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react"
import { useState } from "react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "AI", "Customer Support", "Product Updates", "Tutorials", "Industry Insights"]

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Customer Support: Trends to Watch in 2024",
      excerpt:
        "Explore the latest developments in AI technology and how they're reshaping customer service experiences across industries.",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "AI",
      image: "/placeholder.svg?height=400&width=600",
      featured: true,
    },
    {
      id: 2,
      title: "How to Train Your Chatbot: Best Practices for Document Upload",
      excerpt:
        "Learn the most effective strategies for preparing and uploading documents to create intelligent, context-aware chatbots.",
      author: "Marcus Rodriguez",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "Tutorials",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
    },
    {
      id: 3,
      title: "SmartBotly 2.0: Introducing Advanced Analytics and Custom Integrations",
      excerpt:
        "Discover the powerful new features in our latest release, including detailed analytics dashboards and seamless third-party integrations.",
      author: "Emily Watson",
      date: "2024-01-10",
      readTime: "5 min read",
      category: "Product Updates",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
    },
    {
      id: 4,
      title: "ROI of AI Chatbots: A Comprehensive Analysis",
      excerpt:
        "Dive deep into the financial benefits of implementing AI chatbots, with real case studies and measurable outcomes.",
      author: "David Kim",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "Industry Insights",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
    },
    {
      id: 5,
      title: "Building Empathetic AI: The Human Touch in Automated Support",
      excerpt:
        "Explore how to create chatbots that not only understand queries but also respond with empathy and emotional intelligence.",
      author: "Sarah Chen",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "AI",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
    },
    {
      id: 6,
      title: "Customer Support Metrics That Matter: Beyond Response Time",
      excerpt:
        "Learn about the key performance indicators that truly measure the success of your customer support operations.",
      author: "Emily Watson",
      date: "2024-01-03",
      readTime: "6 min read",
      category: "Customer Support",
      image: "/placeholder.svg?height=400&width=600",
      featured: false,
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

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
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
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
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                SmartBotly Blog
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Insights, tutorials, and industry trends from the world of AI-powered customer support. Stay ahead with
                the latest developments in conversational AI.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All" && !searchQuery && (
          <section className="pb-16 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="relative h-64 lg:h-auto bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <div className="text-6xl">📰</div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center space-x-2 mb-4">
                        <Tag className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 text-sm font-medium">{featuredPost.category}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">Featured</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4 leading-tight">{featuredPost.title}</h2>
                      <p className="text-gray-400 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{featuredPost.author}</span>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 group">
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            {regularPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden h-full hover:bg-white/10 transition-all duration-300 group">
                      <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <div className="text-4xl">📝</div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Tag className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 text-sm font-medium">{post.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{post.author}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <Button
                            variant="ghost"
                            className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 group"
                          >
                            Read Article
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-12 backdrop-blur-sm border border-white/10 text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Stay updated with our latest insights
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Get the latest articles, tutorials, and industry insights delivered straight to your inbox. No spam,
                just valuable content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">&copy; 2024 SmartBotly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
