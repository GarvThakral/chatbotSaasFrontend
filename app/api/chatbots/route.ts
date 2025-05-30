import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const chatbots: any[] = []

// Helper function to verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided")
  }

  const token = authHeader.substring(7)
  return jwt.verify(token, JWT_SECRET) as any
}

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    const userChatbots = chatbots.filter((bot) => bot.userId === decoded.userId)

    return NextResponse.json({
      chatbots: userChatbots,
    })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    const { name, description, website, customization } = await request.json()

    // Validate input
    if (!name) {
      return NextResponse.json({ error: "Chatbot name is required" }, { status: 400 })
    }

    // Create chatbot
    const chatbot = {
      id: Date.now().toString(),
      userId: decoded.userId,
      name,
      description,
      website,
      customization: {
        primaryColor: customization?.primaryColor || "#8B5CF6",
        position: customization?.position || "bottom-right",
        greeting: customization?.greeting || "Hi! How can I help you today?",
        ...customization,
      },
      status: "training",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      documents: [],
      analytics: {
        totalQueries: 0,
        avgResponseTime: 0,
        satisfactionScore: 0,
        topQuestions: [],
      },
    }

    chatbots.push(chatbot)

    return NextResponse.json(
      {
        message: "Chatbot created successfully",
        chatbot,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create chatbot error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
