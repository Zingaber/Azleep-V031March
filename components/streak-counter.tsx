"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"

interface StreakCounterProps {
  days: number
  className?: string
  showAnimation?: boolean
  size?: "sm" | "md" | "lg"
}

export function StreakCounter({ days, className, showAnimation = false, size = "md" }: StreakCounterProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (showAnimation) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [days, showAnimation])

  const sizeClasses = {
    sm: "text-xs py-0.5 px-2",
    md: "text-sm py-1 px-3",
    lg: "text-base py-1.5 px-4",
  }

  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <Badge
      className={cn(
        "bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-500 hover:to-red-600 transition-all flex items-center gap-1.5 font-medium",
        isAnimating && "animate-pulse",
        sizeClasses[size],
        className,
      )}
    >
      <Flame className={cn("text-white", iconSizeClasses[size])} />
      <span className={cn(isAnimating && "scale-110 transition-transform")}>
        {days} Day{days !== 1 ? "s" : ""} Streak
      </span>
    </Badge>
  )
}

