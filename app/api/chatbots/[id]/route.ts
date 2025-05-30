import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const chatbots: any[] = []

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided")
  }

  const token = authHeader.substring(7)
  return jwt.verify(token, JWT_SECRET) as any
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decoded = verifyToken(request)
    const chatbot = chatbots.find((bot) => bot.id === params.id && bot.userId === decoded.userId)

    if (!chatbot) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 })
    }

    return NextResponse.json({ chatbot })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decoded = verifyToken(request)
    const updates = await request.json()

    const chatbotIndex = chatbots.findIndex((bot) => bot.id === params.id && bot.userId === decoded.userId)

    if (chatbotIndex === -1) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 })
    }

    // Update chatbot
    chatbots[chatbotIndex] = {
      ...chatbots[chatbotIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Chatbot updated successfully",
      chatbot: chatbots[chatbotIndex],
    })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decoded = verifyToken(request)
    const chatbotIndex = chatbots.findIndex((bot) => bot.id === params.id && bot.userId === decoded.userId)

    if (chatbotIndex === -1) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 })
    }

    chatbots.splice(chatbotIndex, 1)

    return NextResponse.json({
      message: "Chatbot deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
