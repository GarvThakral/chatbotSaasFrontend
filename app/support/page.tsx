"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Bot,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  Book,
  Video,
  Users,
} from "lucide-react"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    category: "general",
    message: "",
  })

  const faqs = [
    {
      id: "1",
      question: "How do I get started with SmartBotly?",
      answer:
        "Getting started is easy! Sign up for an account, get your API key from the demo dashboard, upload your documents to train the chatbot, customize its appearance, and then integrate it into your website with just one line of code.",
    },
    {
      id: "2",
      question: "What file formats are supported for document upload?",
      answer:
        "We support PDF, TXT, DOC, and DOCX files up to 10MB each. Our system automatically extracts text, chunks it into manageable pieces, and creates embeddings for intelligent responses.",
    },
    {
      id: "3",
      question: "How much does SmartBotly cost?",
      answer:
        "We offer a free tier with 100 queries per month, a Growth plan at $49/month with 10,000 queries, and custom Enterprise pricing. All plans include document upload, customization, and integration support.",
    },
    {
      id: "4",
      question: "Can I customize the chatbot's appearance?",
      answer:
        "You can customize colors, themes, avatars, position, greeting messages, and much more. Our customization panel offers real-time preview so you can see changes instantly.",
    },
    {
      id: "5",
      question: "How do I integrate the chatbot into my website?",
      answer:
        "Integration is simple - just add one script tag to your HTML, or use our React/Vue components. We provide code snippets for HTML/JavaScript, React, Vue.js, WordPress, and other platforms.",
    },
    {
      id: "6",
      question: "Is there an API for custom integrations?",
      answer:
        "Yes! We provide a comprehensive REST API for chat interactions, document management, analytics, and more. Check our API documentation for detailed endpoints and examples.",
    },
    {
      id: "7",
      question: "How accurate are the chatbot responses?",
      answer:
        "Our AI is trained on your specific documents and uses advanced language models to provide accurate, contextual responses. The accuracy improves as you upload more relevant content and train the system.",
    },
    {
      id: "8",
      question: "Can I use SmartBotly on multiple websites?",
      answer:
        "Yes! You can create multiple chatbots and deploy them across different websites. Each chatbot can be trained on different documents and customized independently.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle ticket submission
    alert("Support ticket submitted successfully! We'll get back to you within 24 hours.")
    setTicketForm({
      name: "",
      email: "",
      subject: "",
      priority: "medium",
      category: "general",
      message: "",
    })
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
          <div className="flex items-center space-x-4">
            <Link href="/docs" className="text-gray-300 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/demo" className="text-gray-300 hover:text-white transition-colors">
              Demo
            </Link>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Support Center
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Get help with SmartBotly. Find answers to common questions, browse our documentation, or contact our
                support team.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Book className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Documentation</h3>
                  <p className="text-gray-400 text-sm mb-4">Complete guides and API reference</p>
                  <Link href="/docs">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full">
                      View Docs
                    </Button>
                  </Link>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Video Tutorials</h3>
                  <p className="text-gray-400 text-sm mb-4">Step-by-step video guides</p>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full">
                    Watch Videos
                  </Button>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Community</h3>
                  <p className="text-gray-400 text-sm mb-4">Join our developer community</p>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full">
                    Join Discord
                  </Button>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Live Chat</h3>
                  <p className="text-gray-400 text-sm mb-4">Chat with our support team</p>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 w-full">
                    Start Chat
                  </Button>
                </Card>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* FAQ Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>

                {/* Search */}
                <div className="relative mb-8">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  />
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <Card key={faq.id} className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                      >
                        <h3 className="text-white font-semibold pr-4">{faq.question}</h3>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Contact Support</h2>

                {/* Contact Info */}
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">Email Support</p>
                        <p className="text-gray-400 text-sm">support@smartbotly.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">Phone Support</p>
                        <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">Business Hours</p>
                        <p className="text-gray-400 text-sm">Monday - Friday, 9 AM - 6 PM EST</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Support Ticket Form */}
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Submit a Support Ticket</h3>
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          required
                          value={ticketForm.name}
                          onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                      <input
                        type="text"
                        required
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                        <select
                          value={ticketForm.priority}
                          onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        >
                          <option value="low" className="bg-gray-800">
                            Low
                          </option>
                          <option value="medium" className="bg-gray-800">
                            Medium
                          </option>
                          <option value="high" className="bg-gray-800">
                            High
                          </option>
                          <option value="urgent" className="bg-gray-800">
                            Urgent
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                        <select
                          value={ticketForm.category}
                          onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        >
                          <option value="general" className="bg-gray-800">
                            General
                          </option>
                          <option value="technical" className="bg-gray-800">
                            Technical
                          </option>
                          <option value="billing" className="bg-gray-800">
                            Billing
                          </option>
                          <option value="integration" className="bg-gray-800">
                            Integration
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <textarea
                        required
                        rows={6}
                        value={ticketForm.message}
                        onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
                        placeholder="Describe your issue or question in detail..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Ticket
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
