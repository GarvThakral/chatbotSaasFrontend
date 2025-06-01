import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { NextRequest } from "next/server"

// Mock function to simulate document retrieval
function retrieveRelevantDocuments(query: string, chatbotId: string) {
  // In production, this would use vector search on embeddings
  const documents = [
    {
      content: "Our business hours are Monday-Friday, 9 AM to 6 PM EST. We're closed on weekends and major holidays.",
      source: "company-info.pdf",
    },
    {
      content: "To schedule an appointment, you can call us at (555) 123-4567 or use our online booking system.",
      source: "services.pdf",
    },
    {
      content:
        "We offer a free tier with 100 queries per month, a Growth plan at $49/month with 10,000 queries, and custom Enterprise pricing.",
      source: "pricing.pdf",
    },
    {
      content:
        "SmartBotly supports PDF, TXT, DOC, and DOCX files up to 10MB each. Our system automatically extracts text and creates embeddings.",
      source: "documentation.pdf",
    },
  ]

  // Simple keyword matching for demo
  const keywords = query.toLowerCase().split(" ")
  const relevantDocs = documents.filter((doc) =>
    keywords.some(
      (keyword) => doc.content.toLowerCase().includes(keyword) || doc.source.toLowerCase().includes(keyword),
    ),
  )

  return relevantDocs.length > 0 ? relevantDocs : documents.slice(0, 2)
}

// Demo responses for when no API key is provided
function getDemoResponse(query: string): string {
  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
    return "Hello! I'm SmartBot, your AI assistant. I'm here to help you with any questions about our services. How can I assist you today?"
  } else if (lowerQuery.includes("hours") || lowerQuery.includes("time")) {
    return "Our business hours are Monday-Friday, 9 AM to 6 PM EST. We're closed on weekends and major holidays. Is there anything specific you'd like to know about our services?"
  } else if (lowerQuery.includes("price") || lowerQuery.includes("cost") || lowerQuery.includes("plan")) {
    return "We offer flexible pricing plans: Free tier (100 queries/month), Growth plan ($49/month for 10,000 queries), and custom Enterprise pricing. Which plan would work best for your needs?"
  } else if (lowerQuery.includes("appointment") || lowerQuery.includes("schedule")) {
    return "I'd be happy to help you schedule an appointment! You can call us at (555) 123-4567 or use our online booking system. What type of service are you interested in?"
  } else if (lowerQuery.includes("support") || lowerQuery.includes("help")) {
    return "I'm here to help! You can reach our support team via email at support@smartbotly.com, call us at (555) 123-4567, or use our live chat. What specific issue can I assist you with?"
  } else {
    return "Thank you for your question! I'm a demo version of SmartBot. In the full version, I would be trained on your specific business documents to provide accurate, contextual responses. Is there anything else you'd like to know about SmartBotly?"
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, chatbotId, apiKey: userApiKey } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages are required", { status: 400 })
    }

    // Get the latest user message
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== "user") {
      return new Response("Invalid message format", { status: 400 })
    }

    // If no API key provided, return demo response
    if (!userApiKey || userApiKey === "demo-key") {
      const demoResponse = getDemoResponse(lastMessage.content)

      // Return a simple text response for demo mode
      return new Response(demoResponse, {
        headers: {
          "Content-Type": "text/plain",
        },
      })
    }

    // Use real API key for actual AI responses
    try {
      // Retrieve relevant documents (RAG)
      const relevantDocs = retrieveRelevantDocuments(lastMessage.content, chatbotId || "demo")

      // Build context from documents
      const context = relevantDocs.map((doc) => `Source: ${doc.source}\nContent: ${doc.content}`).join("\n\n")

      // Create system prompt with context
      const systemPrompt = `You are SmartBot, a helpful customer service assistant for SmartBotly, an AI-powered chatbot service. Use the following context to answer questions accurately and helpfully.

Context:
${context}

Instructions:
- Be friendly and professional
- Answer based on the provided context when relevant
- If asked about SmartBotly features, pricing, or services, use the context information
- If asked about appointments, guide users to book through the provided methods
- If you can't answer based on the context, politely say you don't have that specific information
- Keep responses concise but helpful
- Always maintain a helpful and supportive tone`

      // Initialize OpenAI with user's API key
      const model = openai("gpt-3.5-turbo", { apiKey: userApiKey })

      // Generate response using AI SDK
      const result = streamText({
        model,
        system: systemPrompt,
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: 0.7,
        maxTokens: 500,
      })

      return result.toDataStreamResponse()
    } catch (apiError: any) {
      console.error("OpenAI API error:", apiError)

      // Handle specific API errors
      if (apiError.message?.includes("401")) {
        return new Response("Invalid API key provided", { status: 401 })
      } else if (apiError.message?.includes("429")) {
        return new Response("Rate limit exceeded. Please try again later.", { status: 429 })
      } else if (apiError.message?.includes("insufficient_quota")) {
        return new Response("Insufficient quota. Please check your OpenAI billing.", { status: 402 })
      } else {
        return new Response("AI service temporarily unavailable", { status: 503 })
      }
    }
  } catch (error) {
    console.error("Chat error:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
