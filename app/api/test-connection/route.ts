import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Test the API key with a simple request
    const model = openai("gpt-3.5-turbo", { apiKey })

    const { text } = await generateText({
      model,
      prompt: "Say 'Hello' if you can read this.",
      maxTokens: 10,
    })

    if (text) {
      return NextResponse.json({
        success: true,
        message: "API key is valid",
        model: "gpt-3.5-turbo",
      })
    } else {
      return NextResponse.json({ error: "Invalid response from API" }, { status: 400 })
    }
  } catch (error: any) {
    console.error("API key test error:", error)

    if (error.message?.includes("401")) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    } else if (error.message?.includes("429")) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    } else if (error.message?.includes("insufficient_quota")) {
      return NextResponse.json({ error: "Insufficient quota. Please check your OpenAI billing." }, { status: 402 })
    } else {
      return NextResponse.json({ error: "Failed to validate API key" }, { status: 500 })
    }
  }
}
