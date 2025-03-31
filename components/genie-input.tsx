"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Mic, MicOff, Send } from "lucide-react"

interface GenieInputProps {
  className?: string
  onSend?: (message: string) => void
  placeholder?: string
}

export function GenieInput({ className, onSend, placeholder = "Ask Sleep Genie..." }: GenieInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [message, setMessage] = useState("")

  const toggleListening = () => {
    setIsListening(!isListening)
    // In a real app, this would start/stop voice recording
  }

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message)
      setMessage("")
    }
  }

  return (
    <div className={cn("flex items-end gap-2", className)}>
      <button
        onClick={toggleListening}
        className={cn(
          "rounded-full flex items-center justify-center transition-all",
          isListening ? "glow-effect" : "",
          "h-12 w-12 bg-primary/20",
        )}
      >
        <div
          className={cn(
            "rounded-full flex items-center justify-center",
            isListening ? "breathing-circle" : "",
            "h-10 w-10 bg-primary/30",
          )}
        >
          {isListening ? (
            <Mic className="text-primary h-5 w-5" />
          ) : (
            <MicOff className="text-muted-foreground h-5 w-5" />
          )}
        </div>
      </button>

      <div className="flex-1 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full bg-muted px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend()
            }
          }}
        />

        <Button
          size="icon"
          variant="ghost"
          onClick={handleSend}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
          disabled={!message.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

