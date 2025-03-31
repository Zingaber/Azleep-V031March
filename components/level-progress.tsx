"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

interface LevelProgressProps {
  level: number
  currentPoints: number
  pointsToNextLevel: number
  className?: string
  showAnimation?: boolean
}

export function LevelProgress({
  level,
  currentPoints,
  pointsToNextLevel,
  className,
  showAnimation = false,
}: LevelProgressProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (showAnimation) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [level, currentPoints, showAnimation])

  const progressPercentage = Math.min(100, (currentPoints / pointsToNextLevel) * 100)

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border z-40 p-4 pb-safe",
        className,
      )}
    >
      <div className="space-y-2 max-w-md mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Badge className="bg-secondary/20 text-secondary mr-2">Level {level}</Badge>
            {isAnimating && <span className="text-xs text-primary animate-pulse">+1 Level Up!</span>}
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="text-primary font-medium">{currentPoints}</span>
            <span> / {pointsToNextLevel}</span>
          </div>
        </div>

        <Progress value={progressPercentage} className={cn("h-2", isAnimating && "animate-pulse")} />

        <div className="flex justify-between text-xs">
          <div className="flex items-center">
            <Sparkles className="h-3 w-3 text-primary mr-1" />
            <span>{Math.round(pointsToNextLevel - currentPoints)} points to next level</span>
          </div>

          <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-primary/30 text-primary">
            Level {level + 1} Rewards
          </Badge>
        </div>
      </div>
    </div>
  )
}

