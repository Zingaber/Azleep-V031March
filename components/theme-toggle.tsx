"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sparkles } from "lucide-react"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"professional" | "teen">("professional")

  const toggleTheme = () => {
    setTheme(theme === "professional" ? "teen" : "professional")
    // In a real app, this would update global theme state
    document.documentElement.classList.toggle("teen-mode")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className={className}>
      {theme === "professional" ? <Sparkles className="h-5 w-5 text-neon-yellow" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

