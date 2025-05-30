import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import type { NextRequest } from "next/server"

// Mock function to simulate document retrieval
function retrieveRelevantDocuments(query: string, chatbotId: string) {
  // In production, this would use vector search on embeddings
  return [
    {
      content: "Our business hours are Monday-Friday, 9 AM to 6 PM EST. We're closed on weekends and major holidays.",
      source: "company-info.pdf",
    },
    {
      content: "To schedule an appointment, you can call us at (555) 123-4567 or use our online booking system.",
      source: "services.pdf",
    },
  ]
}

export async function POST(request: NextRequest) {
  try {
    const { messages, chatbotId } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages are required", { status: 400 })
    }

    // Get the latest user message
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== "user") {
      return new Response("Invalid message format", { status: 400 })
    }

    // Retrieve relevant documents (RAG)
    const relevantDocs = retrieveRelevantDocuments(lastMessage.content, chatbotId)

    // Build context from documents
    const context = relevantDocs.map((doc) => `Source: ${doc.source}\nContent: ${doc.content}`).join("\n\n")

    // Create system prompt with context
    const systemPrompt = `You are a helpful customer service assistant for this business. Use the following context to answer questions accurately and helpfully. If you don't know something based on the provided context, say so politely.

Context:
${context}

Instructions:
- Be friendly and professional
- Answer based on the provided context
- If asked about appointments, guide users to book through the provided methods
- If you can't answer based on the context, politely say you don't have that information
- Keep responses concise but helpful`

    // Initialize OpenAI (you would use your actual API key)
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY || "demo-key",
    })

    // Generate response
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: 0.7,
      maxTokens: 500,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat error:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
