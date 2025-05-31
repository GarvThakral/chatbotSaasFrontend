"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, Users, Target, Zap, Heart, Award, ArrowRight, Twitter, Linkedin, Github, Mail } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      bio: "Former AI researcher at Google. Passionate about making AI accessible to businesses of all sizes.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-founder",
      bio: "Ex-Tesla engineer with 10+ years in ML infrastructure. Loves building scalable AI systems.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Emily Watson",
      role: "Head of Product",
      bio: "Former product lead at Stripe. Expert in creating intuitive user experiences for complex technology.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      bio: "Previously at OpenAI. Specializes in natural language processing and conversational AI.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "Every decision we make starts with how it benefits our customers and their success.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We push the boundaries of what's possible with AI to create breakthrough solutions.",
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "We build technology that understands and responds to human needs with care.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest quality in everything we build and every interaction we have.",
    },
  ]

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
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
              Blog
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
                Building the future of customer support
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to make AI-powered customer support accessible to every business, from startups to
                enterprises. Our team combines deep AI expertise with a passion for solving real business problems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center space-x-2 bg-purple-500/20 rounded-full px-4 py-2 mb-6">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-300">Our Mission</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 text-white">Democratizing AI for customer support</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  We believe every business deserves access to intelligent customer support, regardless of size or
                  technical expertise. That's why we've built SmartBotly to be powerful yet simple, requiring no coding
                  skills while delivering enterprise-grade AI capabilities.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Our platform empowers businesses to create chatbots that truly understand their customers, trained on
                  their own data and capable of handling complex queries with human-like intelligence.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">10,000+</div>
                      <div className="text-gray-400">Businesses served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">50M+</div>
                      <div className="text-gray-400">Queries handled</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                      <div className="text-gray-400">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                      <div className="text-gray-400">Customer rating</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our values
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-full text-center hover:bg-white/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Meet our team
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Passionate experts from leading tech companies, united by a vision to transform customer support.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-purple-400 mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-12 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to join us?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion for AI and customer success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg group"
                >
                  View Open Positions
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            {[Twitter, Linkedin, Github, Mail].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Icon className="w-6 h-6 text-gray-400" />
              </motion.a>
            ))}
          </div>
          <p className="text-gray-400">&copy; 2024 SmartBotly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
