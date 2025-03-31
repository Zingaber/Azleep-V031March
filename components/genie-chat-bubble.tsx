import { cn } from "@/lib/utils"
import { SleepGenieAvatar } from "@/components/sleep-genie-avatar"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

interface GenieChatBubbleProps {
  message: string
  isUser?: boolean
  isThinking?: boolean
  className?: string
  showAvatar?: boolean
  genieState?: "awake" | "sleepy" | "dreaming" | "energetic"
  genieLevel?: 1 | 2 | 3 | 4 | 5
  pointsReward?: number
}

export function GenieChatBubble({
  message,
  isUser = false,
  isThinking = false,
  className,
  showAvatar = true,
  genieState = "awake",
  genieLevel = 1,
  pointsReward,
}: GenieChatBubbleProps) {
  if (isThinking) {
    return (
      <div className="flex items-end space-x-2">
        {showAvatar && (
          <SleepGenieAvatar state={genieState} level={genieLevel} size="sm" pulseEffect={true} showLevelBadge />
        )}
        <div className="max-w-[80%] p-3 rounded-2xl bg-accent rounded-bl-none">
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse delay-75"></div>
            <div className="h-2 w-2 bg-primary/60 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    )
  }

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className={cn("max-w-[80%] p-3 rounded-2xl bg-primary/20 rounded-tr-none", className)}>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-end space-x-2">
      {showAvatar && <SleepGenieAvatar state={genieState} level={genieLevel} size="sm" showLevelBadge />}
      <div className={cn("max-w-[80%] p-3 rounded-2xl bg-accent rounded-bl-none relative", className)}>
        <p className="text-sm">{message}</p>

        {pointsReward && (
          <Badge className="absolute -top-2 -right-2 flex items-center gap-1 bg-primary text-primary-foreground animate-bounce">
            <Sparkles className="h-3 w-3" />
            <span>+{pointsReward}</span>
          </Badge>
        )}
      </div>
    </div>
  )
}

