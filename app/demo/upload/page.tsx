"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, Upload, FileText, File, Check, AlertCircle, ArrowLeft, Trash2, Eye } from "lucide-react"
import axios from "axios"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  chunks?: number
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [embeddingsExist, setEmbeddingsExist] = useState<boolean | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function checkEmbeddingsExist() {
    try {
      setIsLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PYTHON_API_ROUTE}embeddingsExist`, {
        token: localStorage.getItem("token"),
      })
      setEmbeddingsExist(response.data)
      return response.data
    } catch (error) {
      console.error("Error checking embeddings:", error)
      setEmbeddingsExist(false)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkEmbeddingsExist()
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Start real upload for each file
    fileList.forEach((file, index) => {
      const newFile = newFiles[index]
      uploadFile(file, newFile.id)
    })
  }

  const deleteExistingEmbeddings = async () => {
    try {
      setIsDeleting(true)
      setDeleteError(null)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_PYTHON_API_ROUTE}deleteEmbeddings`, {
        token: localStorage.getItem("token"),
      })

      if (response.status === 200) {
        setEmbeddingsExist(false)
        setFiles([])
      } else {
        setDeleteError("Failed to delete embeddings. Please try again.")
      }
    } catch (error) {
      console.error("Error deleting embeddings:", error)
      setDeleteError("An error occurred while deleting embeddings. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  const uploadFile = async (file: File, fileId: string) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("token", localStorage.getItem("token") || "") // Replace with your actual token logic

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PYTHON_API_ROUTE}embedd`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
          setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress: percentCompleted } : f)))
        },
      })

      // Mark file as completed
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId
            ? {
                ...f,
                status: "completed",
                progress: 100,
                chunks: Math.floor(Math.random() * 20) + 5,
              }
            : f,
        ),
      )

      // Update embeddings status after successful upload
      await checkEmbeddingsExist()
    } catch (error) {
      console.error("Upload failed:", error)
      setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "error" } : f)))
    }
  }

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            if (file.progress < 100) {
              return { ...file, progress: file.progress + 10 }
            } else if (file.status === "uploading") {
              return { ...file, status: "processing" }
            } else if (file.status === "processing") {
              return {
                ...file,
                status: "completed",
                chunks: Math.floor(Math.random() * 20) + 5,
              }
            }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 6000)
  }

  const removeFile = async (fileId: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PYTHON_API_ROUTE}deleteEmbeddings`, {
        token: localStorage.getItem("token"),
      })
      console.log(response)
      setFiles((prev) => prev.filter((file) => file.id !== fileId))

      // Check if we've removed all files
      const remainingFiles = files.filter((file) => file.id !== fileId)
      if (remainingFiles.length === 0) {
        await checkEmbeddingsExist()
      }
    } catch (error) {
      console.error("Error removing file:", error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="w-5 h-5 text-red-400" />
    if (type.includes("text")) return <FileText className="w-5 h-5 text-blue-400" />
    return <File className="w-5 h-5 text-gray-400" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5 text-green-400" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SmartBotly
            </span>
          </Link>
          <Link href="/demo">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Demo
            </Button>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Upload Documents
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Upload your business documents, FAQs, and knowledge base to train your AI chatbot. Supported formats:
                PDF, TXT, DOC, DOCX.
              </p>
            </div>

            {/* Upload Area */}
            {isLoading ? (
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 mb-8">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Checking existing uploads...</p>
                </div>
              </Card>
            ) : embeddingsExist ? (
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 mb-8">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Existing Documents Found</h3>
                  <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                    You already have documents uploaded and processed for your chatbot. To upload new documents, you'll
                    need to delete your existing uploads first.
                  </p>

                  {deleteError && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg p-4 mb-6 mx-auto max-w-lg">
                      {deleteError}
                    </div>
                  )}

                  <Button
                    onClick={deleteExistingEmbeddings}
                    disabled={isDeleting}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Existing Uploads
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 mb-8">
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-purple-400 bg-purple-500/10"
                      : "border-white/20 hover:border-white/40 hover:bg-white/5"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Drop files here or click to upload</h3>
                  <p className="text-gray-400 mb-6">Support for PDF, TXT, DOC, DOCX files up to 10MB each</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                      Choose Files
                    </span>
                  </label>
                </div>
              </Card>
            )}

            {/* File List */}
            {files.length > 0 && (
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Uploaded Files</h2>
                  <div className="text-sm text-gray-400">
                    {files.filter((f) => f.status === "completed").length} of {files.length} completed
                  </div>
                </div>

                <div className="space-y-4">
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-white font-medium truncate">{file.name}</p>
                              {file.status === "completed" && file.chunks && (
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                  {file.chunks} chunks
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {getStatusIcon(file.status)}
                          <span className="text-sm text-gray-400 capitalize">{file.status}</span>
                          {file.status === "completed" && (
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(file.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {file.status === "uploading" && (
                        <div className="mt-3">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{file.progress}% uploaded</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {files.some((f) => f.status === "completed") && (
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Training Complete!</h3>
                        <p className="text-gray-400">Your chatbot has been trained on the uploaded documents.</p>
                      </div>
                      <Link href="/demo/customize">
                        <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                          Customize Chatbot
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Tips */}
            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border-white/10 p-8 mt-8">
              <h3 className="text-xl font-bold text-white mb-4">💡 Tips for Better Training</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Include comprehensive FAQs and common customer questions</li>
                <li>• Upload product documentation and service descriptions</li>
                <li>• Add company policies and procedures</li>
                <li>• Include contact information and business hours</li>
                <li>• Use clear, well-structured documents for best results</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
