"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { EyeIcon, EyeOffIcon, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordCriterion {
  id: string
  label: string
  check: (password: string) => boolean
  suggestion: string
}

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState(0)
  const [strengthLabel, setStrengthLabel] = useState("")
  const [strengthColor, setStrengthColor] = useState("bg-gray-200")

  const criteria: PasswordCriterion[] = [
    {
      id: "length",
      label: "At least 8 characters",
      check: (password) => password.length >= 8,
      suggestion: "Use at least 8 characters",
    },
    {
      id: "uppercase",
      label: "Contains uppercase letters",
      check: (password) => /[A-Z]/.test(password),
      suggestion: "Add uppercase letters (A-Z)",
    },
    {
      id: "lowercase",
      label: "Contains lowercase letters",
      check: (password) => /[a-z]/.test(password),
      suggestion: "Add lowercase letters (a-z)",
    },
    {
      id: "numbers",
      label: "Contains numbers",
      check: (password) => /\d/.test(password),
      suggestion: "Add numbers (0-9)",
    },
    {
      id: "special",
      label: "Contains special characters",
      check: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      suggestion: "Add special characters (!@#$%^&*)",
    },
  ]

  useEffect(() => {
    if (!password) {
      setStrength(0)
      setStrengthLabel("")
      setStrengthColor("bg-gray-200")
      return
    }

    // Calculate how many criteria are met
    const metCriteria = criteria.filter((criterion) => criterion.check(password)).length

    // Calculate strength as a percentage
    const strengthPercentage = (metCriteria / criteria.length) * 100
    setStrength(strengthPercentage)

    // Set strength label and color
    if (strengthPercentage === 0) {
      setStrengthLabel("")
      setStrengthColor("bg-gray-200")
    } else if (strengthPercentage < 40) {
      setStrengthLabel("Weak")
      setStrengthColor("bg-red-500")
    } else if (strengthPercentage < 80) {
      setStrengthLabel("Moderate")
      setStrengthColor("bg-yellow-500")
    } else {
      setStrengthLabel("Strong")
      setStrengthColor("bg-green-500")
    }
  }, [password])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
        </Button>
      </div>

      {password && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Strength</span>
              {strengthLabel && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    strengthLabel === "Weak" && "text-red-500",
                    strengthLabel === "Moderate" && "text-yellow-500",
                    strengthLabel === "Strong" && "text-green-500",
                  )}
                >
                  {strengthLabel}
                </span>
              )}
            </div>
            <Progress value={strength} className={cn("h-2", strengthColor)} />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Password requirements:</h3>
            <ul className="space-y-2">
              {criteria.map((criterion) => {
                const isMet = criterion.check(password)
                return (
                  <li key={criterion.id} className="flex items-start gap-2 text-sm">
                    {isMet ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                    <span className={isMet ? "text-gray-700" : "text-gray-500"}>
                      {isMet ? criterion.label : criterion.suggestion}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
