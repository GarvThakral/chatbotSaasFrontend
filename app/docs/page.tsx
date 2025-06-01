"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, Search, Book, Code, Zap, Settings, Copy, Check } from "lucide-react"

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("getting-started")
  const [copied, setCopied] = useState("")

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      items: [
        { id: "quick-start", title: "Quick Start Guide" },
        { id: "installation", title: "Installation" },
        { id: "authentication", title: "Authentication" },
        { id: "first-chatbot", title: "Your First Chatbot" },
      ],
    },
    {
      id: "integration",
      title: "Integration",
      icon: Code,
      items: [
        { id: "html-js", title: "HTML/JavaScript" },
        { id: "react", title: "React" },
        { id: "vue", title: "Vue.js" },
        { id: "wordpress", title: "WordPress" },
        { id: "shopify", title: "Shopify" },
      ],
    },
    {
      id: "customization",
      title: "Customization",
      icon: Settings,
      items: [
        { id: "appearance", title: "Appearance" },
        { id: "behavior", title: "Behavior" },
        { id: "themes", title: "Themes" },
        { id: "avatars", title: "Avatars" },
        { id: "positioning", title: "Positioning" },
      ],
    },
    {
      id: "api",
      title: "API Reference",
      icon: Book,
      items: [
        { id: "endpoints", title: "Endpoints" },
        { id: "authentication-api", title: "Authentication" },
        { id: "chat-api", title: "Chat API" },
        { id: "webhooks", title: "Webhooks" },
        { id: "rate-limits", title: "Rate Limits" },
      ],
    },
  ]

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(""), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "getting-started":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Getting Started</h1>
              <p className="text-xl text-gray-400 mb-8">
                Welcome to SmartBotly! This guide will help you get your AI chatbot up and running in minutes.
              </p>
            </div>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4" id="quick-start">
                Quick Start Guide
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Sign Up & Get API Key</h3>
                    <p className="text-gray-400 mb-3">
                      Create your account and get your unique API key from the demo dashboard.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4">
                      <code className="text-green-400">API Key: sk_demo_1234567890abcdef...</code>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Documents</h3>
                    <p className="text-gray-400 mb-3">
                      Train your chatbot by uploading your business documents, FAQs, and knowledge base.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Supported formats: PDF, TXT, DOC, DOCX</li>
                      <li>• Maximum file size: 10MB</li>
                      <li>• Automatic text extraction and chunking</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Customize & Deploy</h3>
                    <p className="text-gray-400 mb-3">
                      Customize your chatbot's appearance and behavior, then deploy with one line of code.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 relative">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `<script src="https://cdn.smartbotly.com/widget.js" data-api-key="your-api-key"></script>`,
                            "quick-deploy",
                          )
                        }
                        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                      >
                        {copied === "quick-deploy" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <code className="text-blue-400 text-sm">
                        {`<script src="https://cdn.smartbotly.com/widget.js" 
        data-api-key="your-api-key">
</script>`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4" id="installation">
                Installation
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">CDN (Recommended)</h3>
                  <p className="text-gray-400 mb-3">The fastest way to get started. No build process required.</p>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<script src="https://cdn.smartbotly.com/widget.js" data-api-key="YOUR_API_KEY"></script>`,
                          "cdn-install",
                        )
                      }
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                    >
                      {copied === "cdn-install" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <code className="text-blue-400 text-sm">
                      {`<script src="https://cdn.smartbotly.com/widget.js" 
        data-api-key="YOUR_API_KEY">
</script>`}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">NPM Package</h3>
                  <p className="text-gray-400 mb-3">For React, Vue, and other modern frameworks.</p>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <button
                      onClick={() => copyToClipboard(`npm install @smartbotly/widget`, "npm-install")}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                    >
                      {copied === "npm-install" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <code className="text-green-400">npm install @smartbotly/widget</code>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )

      case "integration":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Integration Guide</h1>
              <p className="text-xl text-gray-400 mb-8">
                Learn how to integrate SmartBotly into your website or application.
              </p>
            </div>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4" id="html-js">
                HTML/JavaScript Integration
              </h2>
              <p className="text-gray-400 mb-6">
                The simplest way to add SmartBotly to any website. Just add one script tag to your HTML.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Basic Integration</h3>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.smartbotly.com/widget.js';
    script.setAttribute('data-api-key', 'YOUR_API_KEY');
    script.setAttribute('data-chatbot-name', 'SmartBot');
    script.setAttribute('data-primary-color', '#8B5CF6');
    script.setAttribute('data-position', 'bottom-right');
    document.head.appendChild(script);
  })();
</script>`,
                          "html-basic",
                        )
                      }
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                    >
                      {copied === "html-basic" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <code className="text-blue-400 text-sm whitespace-pre">
                      {`<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.smartbotly.com/widget.js';
    script.setAttribute('data-api-key', 'YOUR_API_KEY');
    script.setAttribute('data-chatbot-name', 'SmartBot');
    script.setAttribute('data-primary-color', '#8B5CF6');
    script.setAttribute('data-position', 'bottom-right');
    document.head.appendChild(script);
  })();
</script>`}
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Configuration Options</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 text-white">Attribute</th>
                          <th className="text-left py-2 text-white">Type</th>
                          <th className="text-left py-2 text-white">Default</th>
                          <th className="text-left py-2 text-white">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-400">
                        <tr className="border-b border-white/5">
                          <td className="py-2 font-mono">data-api-key</td>
                          <td className="py-2">string</td>
                          <td className="py-2">required</td>
                          <td className="py-2">Your unique API key</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 font-mono">data-chatbot-name</td>
                          <td className="py-2">string</td>
                          <td className="py-2">"SmartBot"</td>
                          <td className="py-2">Display name of the chatbot</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 font-mono">data-primary-color</td>
                          <td className="py-2">string</td>
                          <td className="py-2">"#8B5CF6"</td>
                          <td className="py-2">Primary theme color</td>
                        </tr>
                        <tr className="border-b border-white/5">
                          <td className="py-2 font-mono">data-position</td>
                          <td className="py-2">string</td>
                          <td className="py-2">"bottom-right"</td>
                          <td className="py-2">Widget position on screen</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4" id="react">
                React Integration
              </h2>
              <p className="text-gray-400 mb-6">Use our React component for seamless integration with React apps.</p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Installation</h3>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <button
                      onClick={() => copyToClipboard(`npm install @smartbotly/react`, "react-install")}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                    >
                      {copied === "react-install" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <code className="text-green-400">npm install @smartbotly/react</code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Usage</h3>
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `import { SmartBotlyWidget } from '@smartbotly/react';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      
      <SmartBotlyWidget
        apiKey="YOUR_API_KEY"
        chatbotName="SmartBot"
        primaryColor="#8B5CF6"
        position="bottom-right"
        greeting="Hi! How can I help you today?"
        theme="dark"
      />
    </div>
  );
}`,
                          "react-usage",
                        )
                      }
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                    >
                      {copied === "react-usage" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <code className="text-blue-400 text-sm whitespace-pre">
                      {`import { SmartBotlyWidget } from '@smartbotly/react';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      
      <SmartBotlyWidget
        apiKey="YOUR_API_KEY"
        chatbotName="SmartBot"
        primaryColor="#8B5CF6"
        position="bottom-right"
        greeting="Hi! How can I help you today?"
        theme="dark"
      />
    </div>
  );
}`}
                    </code>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )

      case "api":
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">API Reference</h1>
              <p className="text-xl text-gray-400 mb-8">Complete reference for the SmartBotly REST API and webhooks.</p>
            </div>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4" id="endpoints">
                API Endpoints
              </h2>
              <p className="text-gray-400 mb-6">Base URL: https://api.smartbotly.com/v1</p>

              <div className="space-y-6">
                <div className="border border-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">POST</span>
                    <code className="text-blue-400">/chat</code>
                  </div>
                  <p className="text-gray-400 mb-3">Send a message to your chatbot and get a response.</p>
                  <div className="bg-gray-900 rounded p-3">
                    <code className="text-sm text-gray-300">
                      {`{
  "messages": [
    {"role": "user", "content": "Hello!"}
  ],
  "chatbotId": "your-chatbot-id"
}`}
                    </code>
                  </div>
                </div>

                <div className="border border-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                    <code className="text-blue-400">/chatbots</code>
                  </div>
                  <p className="text-gray-400 mb-3">List all your chatbots.</p>
                </div>

                <div className="border border-white/10 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">POST</span>
                    <code className="text-blue-400">/documents/upload</code>
                  </div>
                  <p className="text-gray-400 mb-3">Upload documents to train your chatbot.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4" id="authentication-api">
                Authentication
              </h2>
              <p className="text-gray-400 mb-6">
                All API requests require authentication using your API key in the Authorization header.
              </p>

              <div className="bg-gray-900 rounded-lg p-4 relative">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.smartbotly.com/v1/chatbots`,
                      "auth-example",
                    )
                  }
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                >
                  {copied === "auth-example" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <code className="text-green-400 text-sm whitespace-pre">
                  {`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.smartbotly.com/v1/chatbots`}
                </code>
              </div>
            </Card>
          </div>
        )

      default:
        return <div>Select a section to view documentation</div>
    }
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
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SmartBotly
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/demo" className="text-gray-300 hover:text-white transition-colors">
              Demo
            </Link>
            <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
              Support
            </Link>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-white/10 min-h-screen p-6">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
                {activeSection === section.id && (
                  <div className="ml-8 mt-2 space-y-1">
                    {section.items.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
