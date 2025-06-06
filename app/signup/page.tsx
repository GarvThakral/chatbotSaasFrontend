"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Bot,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  ArrowLeft,
  Phone,
  Shield,
  Check,
  AlertCircle,
  Timer,
} from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"

interface FormData {
  name: string
  email: string
  company: string
  password: string
  confirmPassword: string
  phone: string
  agreeToTerms: boolean
}

type SignupStep = "details" | "phone" | "otp" | "complete"

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<SignupStep>("details")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [canResend, setCanResend] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
  })

  // Timer for OTP expiration
  useEffect(() => {
    if (currentStep === "otp" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentStep === "otp") {
      setCanResend(true)
    }
  }, [timeLeft, currentStep])

  const validateStep = (step: SignupStep): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case "details":
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
        if (!formData.password) newErrors.password = "Password is required"
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords don't match"
        }
        if (!formData.agreeToTerms) newErrors.terms = "You must agree to the terms"
        break

      case "phone":
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
        else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) {
          newErrors.phone = "Invalid phone number format"
        }
        break

      case "otp":
        const otpCode = otp.join("")
        if (otpCode.length !== 6) newErrors.otp = "Please enter the complete 6-digit code"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (!validateStep(currentStep)) return

    setIsLoading(true)
    try {
      switch (currentStep) {
        case "details":
          // Check if email already exists
          await checkEmailExists()
          setCurrentStep("phone")
          break

        case "phone":
          await sendOTP()
          setCurrentStep("otp")
          setTimeLeft(300) // 5 minutes
          setCanResend(false)
          break

        case "otp":
          await verifyOTP()
          await createAccount()
          setCurrentStep("complete")
          break
      }
    } catch (error: any) {
      setErrors({ general: error.message || "An error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  const checkEmailExists = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}user/check-email`, {
        email: formData.email,
      })
      if (response.status == 200) {
        throw new Error("Email already exists")
      }
    } catch (error) {
      console.log("Checking email:", formData.email)
    }
  }

  const sendOTP = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}user/sendOtp`, {
        phoneNumber: formData.phone,
      },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
      console.log("OTP sent to:", formData.phone)
    } catch (error) {
      console.log("Sending OTP to:", formData.phone)
    }
  }

  const verifyOTP = async () => {
    const otpCode = otp.join("")
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}user/verifyOtp`, {
        phoneNumber: formData.phone,
        otp: otpCode,
      },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
      if (response.status != 200) {
        throw new Error("Invalid OTP code")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createAccount = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ROUTE}user/signup`,
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          password: formData.password,
          phone: formData.phone,
          phoneVerified: true,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );


      if (response.status === 200) {
      } else {
        throw new Error("Signup failed")
      }
    } catch (error) {
      console.log("Creating account for:", formData.email)
    }
  }

  const resendOTP = async () => {
    if (!canResend) return

    setIsLoading(true)
    try {
      await sendOTP()
      setTimeLeft(300)
      setCanResend(false)
    } catch (error) {
      setErrors({ general: "Failed to resend OTP" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const stepConfig = {
    details: { title: "Create your account", subtitle: "Start building AI chatbots in minutes" },
    phone: { title: "Verify your phone", subtitle: "We'll send you a verification code" },
    otp: { title: "Enter verification code", subtitle: `Code sent to ${formData.phone}` },
    complete: { title: "Welcome to SmartBotly!", subtitle: "Your account has been created successfully" },
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
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
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 group">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                SmartBotly
              </span>
            </Link>
          </div>

          {/* Progress Indicator */}
          {currentStep !== "complete" && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {["details", "phone", "otp"].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        currentStep === step
                          ? "bg-purple-500 text-white"
                          : ["details", "phone", "otp"].indexOf(currentStep) > index
                            ? "bg-green-500 text-white"
                            : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {["details", "phone", "otp"].indexOf(currentStep) > index ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < 2 && (
                      <div
                        className={`w-12 h-0.5 mx-2 transition-all ${
                          ["details", "phone", "otp"].indexOf(currentStep) > index ? "bg-green-500" : "bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {stepConfig[currentStep].title}
              </h1>
              <p className="text-gray-400">{stepConfig[currentStep].subtitle}</p>
            </div>

            {errors.general && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-200">{errors.general}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Step 1: Basic Details */}
              {currentStep === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                            errors.name ? "border-red-500" : "border-white/10"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                            errors.email ? "border-red-500" : "border-white/10"
                          }`}
                          placeholder="Enter your email"
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                            errors.password ? "border-red-500" : "border-white/10"
                          }`}
                          placeholder="Create a password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                            errors.confirmPassword ? "border-red-500" : "border-white/10"
                          }`}
                          placeholder="Confirm your password"
                        />
                      </div>
                      {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-1 text-purple-500 bg-white/5 border-white/10 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.terms && <p className="text-red-400 text-sm">{errors.terms}</p>}
                </motion.div>
              )}

              {/* Step 2: Phone Number */}
              {currentStep === "phone" && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-gray-400">
                      We'll send a verification code to your phone number to ensure account security.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 ${
                          errors.phone ? "border-red-500" : "border-white/10"
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                    <p className="text-gray-500 text-sm mt-1">Include country code (e.g., +1 for US, +44 for UK)</p>
                  </div>
                </motion.div>
              )}

              {/* Step 3: OTP Verification */}
              {currentStep === "otp" && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-gray-400">Enter the 6-digit code we sent to your phone number.</p>
                    {timeLeft > 0 && (
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <Timer className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 text-sm">Code expires in {formatTime(timeLeft)}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
                      Verification Code
                    </label>
                    <div className="flex justify-center space-x-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className={`w-12 h-12 text-center text-xl font-bold bg-white/5 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors.otp ? "border-red-500" : "border-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    {errors.otp && <p className="text-red-400 text-sm mt-2 text-center">{errors.otp}</p>}
                  </div>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
                    <Button
                      onClick={resendOTP}
                      disabled={!canResend || isLoading}
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300 disabled:opacity-50"
                    >
                      {isLoading ? "Sending..." : "Resend Code"}
                    </Button>
                    <p className="text-gray-500 text-xs mt-2">
                      For demo purposes, use code: <span className="font-mono text-purple-400">123456</span>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Complete */}
              {currentStep === "complete" && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Account Created Successfully!</h3>
                    <p className="text-gray-400">
                      Welcome to SmartBotly, {formData.name}! Your account is ready to use.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button
                      onClick={() => router.push("/login")}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      Continue to Login
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep !== "complete" && (
              <div className="flex justify-between mt-8">
                <Button
                  onClick={() => {
                    const steps: SignupStep[] = ["details", "phone", "otp"]
                    const currentIndex = steps.indexOf(currentStep)
                    if (currentIndex > 0) {
                      setCurrentStep(steps[currentIndex - 1])
                    }
                  }}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                  disabled={currentStep === "details"}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 text-lg group"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>
                        {currentStep === "details" && "Checking..."}
                        {currentStep === "phone" && "Sending code..."}
                        {currentStep === "otp" && "Verifying..."}
                      </span>
                    </div>
                  ) : (
                    <>
                      {currentStep === "details" && "Continue"}
                      {currentStep === "phone" && "Send Code"}
                      {currentStep === "otp" && "Verify & Create Account"}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {currentStep === "details" && (
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
