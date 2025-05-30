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

export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request)
    const formData = await request.formData()

    const file = formData.get("file") as File
    const chatbotId = formData.get("chatbotId") as string
    const documentType = (formData.get("type") as string) || "general"

    if (!file || !chatbotId) {
      return NextResponse.json({ error: "File and chatbot ID are required" }, { status: 400 })
    }

    // Simulate file processing
    const fileContent = await file.text()

    // Create document record
    const document = {
      id: Date.now().toString(),
      userId: decoded.userId,
      chatbotId,
      filename: file.name,
      type: documentType,
      size: file.size,
      content: fileContent,
      status: "processing",
      uploadedAt: new Date().toISOString(),
      processedAt: null,
      chunks: [],
      embeddings: [],
    }

    documents.push(document)

    // Simulate processing delay
    setTimeout(() => {
      const docIndex = documents.findIndex((d) => d.id === document.id)
      if (docIndex !== -1) {
        documents[docIndex].status = "processed"
        documents[docIndex].processedAt = new Date().toISOString()
        // Simulate chunking and embedding generation
        documents[docIndex].chunks = [
          { id: "1", text: fileContent.substring(0, 500), embedding: [] },
          { id: "2", text: fileContent.substring(500, 1000), embedding: [] },
        ]
      }
    }, 3000)

    return NextResponse.json(
      {
        message: "Document uploaded successfully",
        document: {
          id: document.id,
          filename: document.filename,
          type: document.type,
          size: document.size,
          status: document.status,
          uploadedAt: document.uploadedAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Document upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
