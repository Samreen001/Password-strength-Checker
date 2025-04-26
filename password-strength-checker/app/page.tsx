import { PasswordStrengthChecker } from "@/components/password-strength-checker"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Password Strength Checker</h1>
          <p className="mt-2 text-gray-600">Check how strong your password is with our secure tool</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <PasswordStrengthChecker />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your password is never stored or transmitted. All checks are performed locally in your browser.</p>
        </div>
      </div>
    </main>
  )
}
