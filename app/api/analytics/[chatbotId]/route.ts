import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock analytics data
const analytics: any = {}

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided")
  }

  const token = authHeader.substring(7)
  return jwt.verify(token, JWT_SECRET) as any
}

export async function GET(request: NextRequest, { params }: { params: { chatbotId: string } }) {
  try {
    const decoded = verifyToken(request)
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "7d"

    // Generate mock analytics data
    const mockAnalytics = {
      chatbotId: params.chatbotId,
      timeframe,
      totalQueries: Math.floor(Math.random() * 1000) + 100,
      avgResponseTime: Math.floor(Math.random() * 2000) + 500, // ms
      satisfactionScore: (Math.random() * 2 + 3).toFixed(1), // 3-5 rating
      queryTrends: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        queries: Math.floor(Math.random() * 50) + 10,
      })).reverse(),
      topQuestions: [
        { question: "What are your business hours?", count: 45 },
        { question: "How do I schedule an appointment?", count: 32 },
        { question: "What services do you offer?", count: 28 },
        { question: "What is your refund policy?", count: 19 },
        { question: "How can I contact support?", count: 15 },
      ],
      responseTimeDistribution: {
        "< 1s": 65,
        "1-2s": 25,
        "2-5s": 8,
        "> 5s": 2,
      },
      userSatisfaction: {
        excellent: 45,
        good: 35,
        average: 15,
        poor: 3,
        terrible: 2,
      },
    }

    return NextResponse.json({ analytics: mockAnalytics })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
