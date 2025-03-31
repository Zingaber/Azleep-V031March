"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface MoodOption {
  emoji: string
  label: string
}

interface MoodSelectorProps {
  className?: string
  onSelect?: (mood: MoodOption) => void
}

export function MoodSelector({ className, onSelect }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const moods: MoodOption[] = [
    { emoji: "😴", label: "Sleepy" },
    { emoji: "😊", label: "Calm" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "😤", label: "Stressed" },
  ]

  const handleSelect = (mood: MoodOption) => {
    setSelectedMood(mood.emoji)
    onSelect?.(mood)
  }

  return (
    <div className={cn("flex justify-between", className)}>
      {moods.map((mood) => (
        <button
          key={mood.emoji}
          onClick={() => handleSelect(mood)}
          className="flex flex-col items-center"
          aria-label={`Select mood: ${mood.label}`}
        >
          <div
            className={cn(
              "text-2xl mb-1 p-2 rounded-full transition-all",
              selectedMood === mood.emoji ? "bg-primary/30 scale-110" : "bg-muted hover:bg-muted/80",
            )}
          >
            {mood.emoji}
          </div>
          <span className="text-xs text-muted-foreground">{mood.label}</span>
        </button>
      ))}
    </div>
  )
}

