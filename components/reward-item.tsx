"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Lock, Sparkles } from "lucide-react"

interface RewardItemProps {
  title: string
  description: string
  image?: string
  cost: number
  isUnlocked: boolean
  className?: string
  onClick?: () => void
  isNew?: boolean
}

export function RewardItem({
  title,
  description,
  image,
  cost,
  isUnlocked,
  className,
  onClick,
  isNew = false,
}: RewardItemProps) {
  return (
    <Card
      className={cn(
        "sleep-card border border-primary/10 rounded-lg overflow-hidden cursor-pointer transition-all hover:border-primary/30",
        !isUnlocked && "opacity-80",
        className,
      )}
      onClick={onClick}
    >
      <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: image ? `url(${image})` : "none" }}>
        {isNew && (
          <Badge variant="default" className="absolute top-2 right-2">
            New
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <div className="flex flex-col items-center">
              <Lock className="h-8 w-8 text-muted-foreground mb-2" />
              <Badge className="flex items-center gap-1 bg-primary/20 text-primary">
                <Sparkles className="h-3 w-3" />
                <span>{cost}</span>
              </Badge>
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium">{title}</h3>
          {isUnlocked ? (
            <Badge variant="outline" className="border-green-500 text-green-500 text-xs py-0 px-1.5">
              Unlocked
            </Badge>
          ) : (
            <Badge className="flex items-center gap-1 bg-primary/20 text-primary text-xs py-0 px-1.5">
              <Sparkles className="h-2.5 w-2.5" />
              <span>{cost}</span>
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>

        {isUnlocked ? (
          <Button className="w-full rounded-full text-xs" size="sm">
            Use
          </Button>
        ) : (
          <Button className="w-full rounded-full text-xs" size="sm" variant="outline">
            Unlock
          </Button>
        )}
      </div>
    </Card>
  )
}

