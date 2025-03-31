"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
  isLoading?: boolean
}

export function ChatBubble({ message, isLoading, className, ...props }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-[600px] flex-col gap-2 rounded-lg bg-muted/50 p-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {isLoading && (
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.2s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.4s]" />
          </div>
        )}
        <p className="text-sm text-foreground">{message}</p>
      </div>
    </div>
  )
} 