"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { QuoteDisplay } from "@/components/quote-display"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen gradient-bg stars-bg flex flex-col items-center justify-center p-6">
      <div className="animate-float mb-8">
        <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
          <div className="h-14 w-14 rounded-full bg-primary/30 flex items-center justify-center">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-lg font-bold">A</span>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome back</h1>
      <p className="text-muted-foreground mb-6">Sign in to continue your sleep journey</p>

      <Card className="w-full max-w-md p-6 bg-background/80 backdrop-blur-lg">
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full"
            />
          </div>

          <div className="text-right">
            <Button variant="link" className="p-0 h-auto text-sm">
              Forgot password?
            </Button>
          </div>

          <Link href="/home" className="block w-full">
            <Button className="w-full">Sign in</Button>
          </Link>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Card>

      <div className="w-full max-w-md mt-8">
        <QuoteDisplay />
      </div>
    </div>
  )
}

