"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"

interface QuoteDisplayProps {
  className?: string
}

// This would typically come from an API or database
const sleepQuotes = [
  {
    text: "Sleep is the golden chain that ties health and our bodies together.",
    author: "Thomas Dekker",
  },
  {
    text: "Sleep is that golden chain that binds health and our bodies together.",
    author: "Thomas Dekker",
  },
  {
    text: "The night is more alive and more richly colored than the day.",
    author: "Vincent Van Gogh",
  },
  {
    text: "Sleep is the best meditation.",
    author: "Dalai Lama",
  },
  {
    text: "A good laugh and a long sleep are the best cures in the doctor's book.",
    author: "Irish Proverb",
  },
  {
    text: "Even a soul submerged in sleep is hard at work and helps make something of the world.",
    author: "Heraclitus",
  },
  {
    text: "Sleep marks passing time, giving us distance from the things that have hurt us.",
    author: "Haruki Murakami",
  },
  {
    text: "There is a time for many words, and there is also a time for sleep.",
    author: "Homer",
  },
  {
    text: "Each night, when I go to sleep, I die. And the next morning, when I wake up, I am reborn.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The breeze at dawn has secrets to tell you. Don't go back to sleep.",
    author: "Rumi",
  },
  {
    text: "Sleep is the interest we have to pay on the capital which is called in at death.",
    author: "Arthur Schopenhauer",
  },
  {
    text: "Sleeping is no mean art: for its sake one must stay awake all day.",
    author: "Friedrich Nietzsche",
  },
]

export function QuoteDisplay({ className }: QuoteDisplayProps) {
  const [quote, setQuote] = useState(sleepQuotes[0])

  // Get a random quote when component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sleepQuotes.length)
    setQuote(sleepQuotes[randomIndex])
  }, [])

  return (
    <Card className={cn("gradient-card border-primary/10 p-4 relative overflow-hidden", className)}>
      <div className="absolute -right-4 -bottom-4 opacity-5">
        <Quote className="h-24 w-24" />
      </div>
      <div className="relative">
        <p className="text-sm italic mb-2 leading-relaxed">"{quote.text}"</p>
        <p className="text-xs text-muted-foreground text-right">— {quote.author}</p>
      </div>
    </Card>
  )
}

