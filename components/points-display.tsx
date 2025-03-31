"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PointsDisplayProps {
  points: number
  level: number
  className?: string
  showAnimation?: boolean
  size?: "sm" | "md" | "lg"
}

export function PointsDisplay({ points, level, className, showAnimation = false, size = "md" }: PointsDisplayProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (showAnimation) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [points, showAnimation])

  const sizeClasses = {
    sm: "text-xs py-0.5 px-2",
    md: "text-sm py-1 px-3",
    lg: "text-base py-1.5 px-4",
  }

  return (
    <div className={cn("flex items-center", className)}>
      <Badge
        className={cn(
          "bg-primary/20 text-primary hover:bg-primary/30 transition-all flex items-center gap-1.5 font-medium",
          isAnimating && "animate-pulse",
          sizeClasses[size],
        )}
      >
        <Sparkles className={cn("text-primary", size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5")} />
        <span className={cn(isAnimating && "scale-110 transition-transform")}>{points.toLocaleString()}</span>
      </Badge>

      <Badge className={cn("ml-2 bg-secondary/20 text-secondary hover:bg-secondary/30", sizeClasses[size])}>
        Lvl {level}
      </Badge>
    </div>
  )
}

