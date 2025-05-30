import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

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

    // Mock subscription data
    const subscription = {
      userId: decoded.userId,
      plan: "growth",
      status: "active",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usage: {
        queriesThisMonth: 2450,
        queryLimit: 10000,
        chatbotsCreated: 3,
        chatbotLimit: 5,
      },
      features: ["Advanced customization", "Priority support", "Analytics dashboard", "Custom integrations"],
    }

    return NextResponse.json({ subscription })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    const { plan } = await request.json()

    if (!["free", "growth", "enterprise"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // In production, create Stripe checkout session
    const checkoutUrl = `https://checkout.stripe.com/pay/cs_test_${Date.now()}`

    return NextResponse.json({
      message: "Checkout session created",
      checkoutUrl,
    })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
