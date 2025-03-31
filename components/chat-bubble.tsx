import { cn } from "@/lib/utils"
import { SleepGenieAvatar } from "@/components/sleep-genie-avatar"

interface ChatBubbleProps {
  message: string
  isUser?: boolean
  isThinking?: boolean
  className?: string
  showAvatar?: boolean
  genieState?: "awake" | "sleepy" | "dreaming" | "energetic"
}

export function ChatBubble({
  message,
  isUser = false,
  isThinking = false,
  className,
  showAvatar = true,
  genieState = "awake",
}: ChatBubbleProps) {
  if (isThinking) {
    return (
      <div className="flex items-end space-x-2">
        {showAvatar && <SleepGenieAvatar state={genieState} size="sm" pulseEffect={true} />}
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
      {showAvatar && <SleepGenieAvatar state={genieState} size="sm" />}
      <div className={cn("max-w-[80%] p-3 rounded-2xl bg-accent rounded-bl-none", className)}>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}

