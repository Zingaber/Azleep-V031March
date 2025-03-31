"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface AchievementBadgeProps {
  icon: React.ReactNode
  label: string
  unlocked: boolean
  points?: number
  className?: string
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  new?: boolean
}

export function AchievementBadge({
  icon,
  label,
  unlocked,
  points,
  className,
  size = "md",
  onClick,
  new: isNew = false,
}: AchievementBadgeProps) {
  const sizeClasses = {
    sm: {
      container: "h-12 w-12",
      inner: "h-10 w-10",
      icon: "text-xl",
      label: "text-[10px]",
      points: "text-[8px] px-1 py-0.5",
    },
    md: {
      container: "h-16 w-16",
      inner: "h-14 w-14",
      icon: "text-2xl",
      label: "text-xs",
      points: "text-[10px] px-1.5 py-0.5",
    },
    lg: {
      container: "h-20 w-20",
      inner: "h-18 w-18",
      icon: "text-3xl",
      label: "text-sm",
      points: "text-xs px-2 py-1",
    },
  }

  return (
    <div className={cn("flex flex-col items-center", onClick && "cursor-pointer", className)} onClick={onClick}>
      <div className="relative">
        <div
          className={cn(
            "rounded-full flex items-center justify-center mb-2 relative",
            unlocked ? "bg-gradient-to-br from-neon-purple to-neon-blue" : "bg-accent/50",
            sizeClasses[size].container,
          )}
        >
          <div
            className={cn(
              "rounded-full flex items-center justify-center",
              unlocked ? "bg-background/90" : "bg-background/50",
              sizeClasses[size].inner,
            )}
          >
            <div className={cn(sizeClasses[size].icon, unlocked ? "text-foreground" : "text-muted-foreground/50")}>
              {icon}
            </div>
          </div>

          {/* New indicator */}
          {isNew && unlocked && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">NEW</span>
            </div>
          )}

          {/* Points indicator */}
          {points && unlocked && (
            <Badge
              className={cn(
                "absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground",
                sizeClasses[size].points,
              )}
            >
              +{points}
            </Badge>
          )}
        </div>
      </div>
      <span
        className={cn(
          "text-center max-w-[80px]",
          sizeClasses[size].label,
          unlocked ? "text-foreground" : "text-muted-foreground/70",
        )}
      >
        {label}
      </span>
    </div>
  )
}

