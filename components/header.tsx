"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useAccessibility } from "@/components/accessibility-provider"
import { Moon, Sun, Type, Settings, ArrowLeft } from "lucide-react"

interface HeaderProps {
  title?: string
  showBackButton?: boolean
  backUrl?: string
}

export function Header({ title, showBackButton = false, backUrl = "/" }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const { largeText, toggleLargeText } = useAccessibility()
  const [showSettings, setShowSettings] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {showBackButton && (
            <Link href={backUrl}>
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          {title && <h1 className="text-xl font-bold">{title}</h1>}
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)} aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {showSettings && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm">Dark Mode</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">Large Text</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLargeText}
              aria-label={largeText ? "Disable large text" : "Enable large text"}
            >
              <Type className={`h-5 w-5 ${largeText ? "text-primary" : ""}`} />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

