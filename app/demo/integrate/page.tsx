"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, ArrowLeft, Copy, Check, Code, Download, ExternalLink, Play } from "lucide-react"

export default function IntegratePage() {
  const [copied, setCopied] = useState("")
  const [selectedTab, setSelectedTab] = useState("embed")

  const apiKey = "sk_demo_1234567890abcdef1234567890abcdef"

  const embedCode = `<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.smartbotly.com/widget.js';
    script.setAttribute('data-api-key', '${apiKey}');
    script.setAttribute('data-chatbot-name', 'SmartBot');
    script.setAttribute('data-primary-color', '#8B5CF6');
    script.setAttribute('data-position', 'bottom-right');
    script.setAttribute('data-greeting', 'Hi! How can I help you today?');
    script.setAttribute('data-avatar', '🤖');
    script.setAttribute('data-theme', 'dark');
    document.head.appendChild(script);
  })();
</script>`

  const reactCode = `import { SmartBotlyWidget } from '@smartbotly/react';

function App() {
  return (
    <div>
      {/* Your app content */}
      
      <SmartBotlyWidget
        apiKey="${apiKey}"
        chatbotName="SmartBot"
        primaryColor="#8B5CF6"
        position="bottom-right"
        greeting="Hi! How can I help you today?"
        avatar="🤖"
        theme="dark"
        mood="friendly"
        autoOpen={false}
        showBranding={true}
      />
    </div>
  );
}`

  const vueCode = `<template>
  <div>
    <!-- Your app content -->
    
    <SmartBotlyWidget
      :api-key="'${apiKey}'"
      chatbot-name="SmartBot"
      primary-color="#8B5CF6"
      position="bottom-right"
      greeting="Hi! How can I help you today?"
      avatar="🤖"
      theme="dark"
      mood="friendly"
      :auto-open="false"
      :show-branding="true"
    />
  </div>
</template>

<script>
import { SmartBotlyWidget } from '@smartbotly/vue';

export default {
  components: {
    SmartBotlyWidget
  }
}
</script>`

  const wordpressCode = `// Add this to your theme's functions.php file
function add_smartbotly_widget() {
    ?>
    <script>
      (function() {
        const script = document.createElement('script');
        script.src = 'https://cdn.smartbotly.com/widget.js';
        script.setAttribute('data-api-key', '${apiKey}');
        script.setAttribute('data-chatbot-name', 'SmartBot');
        script.setAttribute('data-primary-color', '#8B5CF6');
        script.setAttribute('data-position', 'bottom-right');
        script.setAttribute('data-greeting', 'Hi! How can I help you today?');
        script.setAttribute('data-avatar', '🤖');
        script.setAttribute('data-theme', 'dark');
        document.head.appendChild(script);
      })();
    </script>
    <?php
}
add_action('wp_footer', 'add_smartbotly_widget');`

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(""), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const tabs = [
    { id: "embed", label: "HTML/JavaScript", icon: Code },
    { id: "react", label: "React", icon: Code },
    { id: "vue", label: "Vue.js", icon: Code },
    { id: "wordpress", label: "WordPress", icon: Code },
  ]

  const getCodeForTab = (tab: string) => {
    switch (tab) {
      case "react":
        return reactCode
      case "vue":
        return vueCode
      case "wordpress":
        return wordpressCode
      default:
        return embedCode
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
          <Link href="/demo">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Demo
            </Button>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Integration Code
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Copy and paste the code below to add your SmartBotly chatbot to any website. Choose your preferred
                integration method.
              </p>
            </div>

            {/* Integration Tabs */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 mb-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTab === tab.id
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    onClick={() => copyToClipboard(getCodeForTab(selectedTab), selectedTab)}
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    {copied === selectedTab ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <pre className="bg-gray-900 rounded-lg p-6 overflow-x-auto text-sm">
                  <code className="text-gray-300">{getCodeForTab(selectedTab)}</code>
                </pre>
              </div>
            </Card>

            {/* Installation Instructions */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">📋 Installation Steps</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      1
                    </div>
                    <div>
                      <p className="text-white font-medium">Copy the code</p>
                      <p className="text-gray-400 text-sm">
                        Select your preferred integration method and copy the code.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      2
                    </div>
                    <div>
                      <p className="text-white font-medium">Paste in your website</p>
                      <p className="text-gray-400 text-sm">
                        Add the code to your HTML, React component, or theme files.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                      3
                    </div>
                    <div>
                      <p className="text-white font-medium">Test and deploy</p>
                      <p className="text-gray-400 text-sm">Test the chatbot on your site and deploy when ready.</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4">⚙️ Configuration Options</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">data-api-key</span>
                    <span className="text-white">Your unique API key</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">data-chatbot-name</span>
                    <span className="text-white">Display name</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">data-primary-color</span>
                    <span className="text-white">Main theme color</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">data-position</span>
                    <span className="text-white">Widget position</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">data-greeting</span>
                    <span className="text-white">Welcome message</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">data-avatar</span>
                    <span className="text-white">Chatbot avatar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">data-theme</span>
                    <span className="text-white">Light/dark mode</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Live Demo */}
            <Card className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm border-white/10 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">🚀 Test Your Integration</h3>
                  <p className="text-gray-300">
                    See how your chatbot will look and behave on a real website before deploying.
                  </p>
                </div>
                <Link href="/demo/live-demo">
                  <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                    <Play className="w-4 h-4 mr-2" />
                    Launch Demo
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Resources */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Documentation</h3>
                <p className="text-gray-400 mb-4">Complete integration guide and API reference.</p>
                <Link href="/docs">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View Docs
                  </Button>
                </Link>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">NPM Package</h3>
                <p className="text-gray-400 mb-4">Install via npm for React, Vue, and other frameworks.</p>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  npm install
                </Button>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Support</h3>
                <p className="text-gray-400 mb-4">Get help with integration and customization.</p>
                <Link href="/support">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Contact Support
                  </Button>
                </Link>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
