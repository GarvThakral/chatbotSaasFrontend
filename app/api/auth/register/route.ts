import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Mock database - in production, use a real database
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, company } = await request.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      name,
      company,
      password: hashedPassword,
      plan: "free",
      createdAt: new Date().toISOString(),
      chatbots: [],
      usage: {
        queriesThisMonth: 0,
        totalQueries: 0,
        chatbotsCreated: 0,
      },
    }

    users.push(user)

    // Remove password from response
    const { password: _, ...userResponse } = user

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
