"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Moon, Sun, Cloud, Stars } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type GenieState = "awake" | "sleepy" | "dreaming" | "energetic"
type TimeOfDay = "morning" | "day" | "evening" | "night"

interface SleepGenieAvatarProps {
  state?: GenieState
  timeOfDay?: TimeOfDay
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  pulseEffect?: boolean
  showBackground?: boolean
  level?: number
  showLevelBadge?: boolean
}

export function SleepGenieAvatar({
  state = "awake",
  timeOfDay = "evening",
  size = "md",
  className,
  pulseEffect = false,
  showBackground = true,
  level,
  showLevelBadge = false,
}: SleepGenieAvatarProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Trigger animation when state changes
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 1000)
    return () => clearTimeout(timer)
  }, [state])

  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  }

  const innerSizeClasses = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
    xl: "h-28 w-28",
  }

  const iconSizeClasses = {
    sm: "h-5 w-5",
    md: "h-7 w-7",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  }

  const getStateIcon = () => {
    switch (state) {
      case "awake":
        return <Moon className={cn("text-primary", iconSizeClasses[size])} />
      case "sleepy":
        return <Stars className={cn("text-primary", iconSizeClasses[size])} />
      case "dreaming":
        return <Cloud className={cn("text-primary", iconSizeClasses[size])} />
      case "energetic":
        return <Sun className={cn("text-primary", iconSizeClasses[size])} />
    }
  }

  const getTimeOfDayColor = () => {
    switch (timeOfDay) {
      case "morning":
        return "from-blue-400/30 to-purple-400/30"
      case "day":
        return "from-blue-500/30 to-indigo-400/30"
      case "evening":
        return "from-indigo-500/30 to-purple-500/30"
      case "night":
        return "from-purple-600/30 to-indigo-800/30"
    }
  }

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {showBackground && (
        <div className={cn("absolute inset-0 rounded-full bg-gradient-to-br opacity-50", getTimeOfDayColor())} />
      )}

      <div
        className={cn(
          "rounded-full flex items-center justify-center transition-all",
          pulseEffect ? "breathing-circle" : "",
          isAnimating ? "scale-110" : "",
          sizeClasses[size],
          showBackground ? "bg-primary/10" : "",
        )}
      >
        <div
          className={cn(
            "rounded-full flex items-center justify-center",
            innerSizeClasses[size],
            showBackground ? "bg-primary/20" : "",
          )}
        >
          {getStateIcon()}
        </div>
      </div>

      {/* Level badge */}
      {showLevelBadge && level !== undefined && (
        <Badge className="absolute -bottom-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs font-bold">
          {level}
        </Badge>
      )}

      {/* Animated particles around the avatar for certain states */}
      {(state === "dreaming" || state === "energetic") && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-1/4 h-1 w-1 bg-primary/60 rounded-full animate-float"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="absolute top-1/3 right-0 h-1.5 w-1.5 bg-primary/60 rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 h-1 w-1 bg-primary/60 rounded-full animate-float"
            style={{ animationDelay: "0.8s" }}
          />
          <div
            className="absolute bottom-0 left-1/3 h-1.5 w-1.5 bg-primary/60 rounded-full animate-float"
            style={{ animationDelay: "1.1s" }}
          />
          <div
            className="absolute top-1/4 left-0 h-1 w-1 bg-primary/60 rounded-full animate-float"
            style={{ animationDelay: "1.4s" }}
          />
        </div>
      )}
    </div>
  )
}

