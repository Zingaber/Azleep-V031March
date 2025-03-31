"use client"

import { useState } from "react"
import { Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceButtonProps {
  onStart?: () => void
  onStop?: () => void
  className?: string
  size?: "sm" | "md" | "lg"
}

export function VoiceButton({ onStart, onStop, className, size = "md" }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false)

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
      onStop?.()
    } else {
      setIsListening(true)
      onStart?.()
    }
  }

  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20",
  }

  return (
    <button
      onClick={toggleListening}
      className={cn(
        "rounded-full bg-primary/10 flex items-center justify-center transition-all",
        isListening ? "voice-animation" : "",
        sizeClasses[size],
        className,
      )}
      aria-label={isListening ? "Stop listening" : "Start listening"}
    >
      <div
        className={cn(
          "rounded-full bg-primary/20 flex items-center justify-center",
          isListening ? "scale-90" : "scale-80",
          size === "sm" ? "h-10 w-10" : size === "md" ? "h-14 w-14" : "h-18 w-18",
        )}
      >
        {isListening ? <Mic className="text-primary h-6 w-6" /> : <MicOff className="text-muted-foreground h-6 w-6" />}
      </div>
    </button>
  )
}

