import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const documents: any[] = []

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
    const chatbotDocuments = documents.filter(
      (doc) => doc.chatbotId === params.chatbotId && doc.userId === decoded.userId,
    )

    return NextResponse.json({
      documents: chatbotDocuments.map((doc) => ({
        id: doc.id,
        filename: doc.filename,
        type: doc.type,
        size: doc.size,
        status: doc.status,
        uploadedAt: doc.uploadedAt,
        processedAt: doc.processedAt,
      })),
    })
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
