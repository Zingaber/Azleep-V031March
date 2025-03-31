"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SleepCardProps {
  title: string
  description: string
  duration: string
  image: string
  tags?: string[]
  isNew?: boolean
  className?: string
  onClick?: () => void
}

export function SleepCard({
  title,
  description,
  duration,
  image,
  tags = [],
  isNew = false,
  className,
  onClick,
}: SleepCardProps) {
  return (
    <div
      className={cn(
        "sleep-card border border-primary/10 rounded-lg overflow-hidden cursor-pointer transition-all hover:border-primary/30",
        className,
      )}
      onClick={onClick}
    >
      <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url(${image})` }}>
        {isNew && (
          <Badge variant="default" className="absolute top-2 right-2">
            New
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-2 left-3">
          <Badge variant="sleep">{duration}</Badge>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>

        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs py-0 px-1.5">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

