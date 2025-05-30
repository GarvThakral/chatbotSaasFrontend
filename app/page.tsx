"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Bot,
  FileText,
  Code,
  Headphones,
  Check,
  Star,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
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
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                SmartBotly
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Pricing", "Docs"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Login
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">AI-Powered • Real-time Support</span>
              </motion.div>

              <div className="space-y-6">
                <motion.h1
                  className="text-6xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    Your AI Assistant,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Trained on Your Business
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 max-w-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Transform your customer support with AI chatbots that understand your business inside and out. Upload
                  your docs, embed anywhere, and watch your support scale.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg group"
                >
                  Try Demo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Get Started Free
                </Button>
              </motion.div>
            </motion.div>

            {/* Floating Demo Widget */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Mock Website Background */}
                <motion.div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-96"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4">
                    <div className="h-4 bg-white/20 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                    <div className="h-4 bg-white/10 rounded w-2/3" />
                    <div className="space-y-2 mt-8">
                      <div className="h-3 bg-white/10 rounded" />
                      <div className="h-3 bg-white/10 rounded w-4/5" />
                      <div className="h-3 bg-white/10 rounded w-3/5" />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Chatbot Widget */}
                <motion.div
                  className="absolute bottom-6 right-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-4 shadow-2xl"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-80 bg-white/10 backdrop-blur-xl rounded-xl p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">SmartBot</div>
                        <div className="text-xs text-white/70">Online</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white/20 rounded-lg p-2 text-sm text-white">Hi! How can I help you today?</div>
                      <motion.div
                        className="bg-purple-500/50 rounded-lg p-2 text-sm text-white ml-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                      >
                        What are your business hours?
                      </motion.div>
                      <motion.div
                        className="bg-white/20 rounded-lg p-2 text-sm text-white"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2, duration: 0.5 }}
                      >
                        We're open Monday-Friday, 9 AM to 6 PM EST. Would you like to schedule an appointment?
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything you need to scale support
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From document training to seamless integration, SmartBotly provides all the tools to create intelligent
              customer experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                icon: Bot,
                title: "Custom AI Chatbots",
                description:
                  "AI-powered chatbots trained specifically on your business data, understanding context and providing accurate responses.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: FileText,
                title: "Upload Your Docs",
                description:
                  "Simply upload your PDFs, docs, and FAQs. Our AI processes and learns from your content automatically.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Code,
                title: "Easy Website Integration",
                description:
                  "One line of code to embed your chatbot anywhere. Works with any website, CMS, or platform.",
                gradient: "from-green-500 to-teal-500",
              },
              {
                icon: Headphones,
                title: "Real-time Support",
                description:
                  "24/7 automated support that handles queries, books appointments, and escalates when needed.",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 h-full hover:bg-white/10 transition-all duration-300">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              See it in action
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Watch how SmartBotly transforms customer interactions with intelligent, context-aware responses.
            </p>
          </motion.div>

          <motion.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <div className="bg-black/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="text-sm text-gray-400">your-website.com</div>
                </div>
                <div className="h-64 bg-white/5 rounded-xl flex items-center justify-center">
                  <motion.div
                    className="text-6xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    🤖
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for trying out SmartBotly",
                features: ["100 queries/month", "1 chatbot", "Basic customization", "Email support"],
                popular: false,
              },
              {
                name: "Growth",
                price: "$49",
                description: "For growing businesses",
                features: [
                  "10,000 queries/month",
                  "5 chatbots",
                  "Advanced customization",
                  "Priority support",
                  "Analytics dashboard",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Unlimited queries",
                  "Unlimited chatbots",
                  "White-label solution",
                  "Dedicated support",
                  "Custom integrations",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                <Card
                  className={`p-8 h-full ${plan.popular ? "bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/50" : "bg-white/5 border-white/10"} backdrop-blur-sm hover:bg-white/10 transition-all duration-300`}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-white mb-2">
                      {plan.price}
                      {plan.price !== "Custom" && <span className="text-lg text-gray-400">/month</span>}
                    </div>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" : "bg-white/10 hover:bg-white/20 border border-white/20"}`}
                    size="lg"
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Loved by businesses worldwide
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO, TechFlow",
                content:
                  "SmartBotly reduced our support tickets by 70% in the first month. The AI understands our product better than some of our team members!",
                rating: 5,
              },
              {
                name: "Marcus Rodriguez",
                role: "Customer Success, GrowthLab",
                content:
                  "The setup was incredibly easy. We had our chatbot running in under 10 minutes, and it's been handling complex queries flawlessly.",
                rating: 5,
              },
              {
                name: "Emily Watson",
                role: "Founder, DesignStudio",
                content:
                  "Our customers love the instant responses. SmartBotly has transformed how we handle customer support and appointment booking.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-full hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-12 backdrop-blur-sm border border-white/10"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Start Building Your AI Chatbot Today
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using SmartBotly to provide exceptional customer support. Get started in
              minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  SmartBotly
                </span>
              </div>
              <p className="text-gray-400">
                AI-powered chatbots that understand your business and delight your customers.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Github, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className="w-5 h-5 text-gray-400" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Documentation", "API"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Press"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>hello@smartbotly.com</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartBotly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
