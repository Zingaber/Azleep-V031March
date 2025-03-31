"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ChallengeCardProps {
  title: string
  description: string
  progress: number
  daysLeft: number
  reward: string
  className?: string
  onClick?: () => void
}

export function ChallengeCard({
  title,
  description,
  progress,
  daysLeft,
  reward,
  className,
  onClick,
}: ChallengeCardProps) {
  return (
    <div
      className={cn(
        "sleep-card border border-primary/10 rounded-lg p-4 cursor-pointer transition-all hover:border-primary/30",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{title}</h3>
        <Badge variant="sleep">{daysLeft}d left</Badge>
      </div>

      <p className="text-xs text-muted-foreground mb-3">{description}</p>

      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="text-xs flex items-center">
        <span className="text-muted-foreground">Reward:</span>
        <span className="ml-1 text-primary">{reward}</span>
      </div>
    </div>
  )
}

