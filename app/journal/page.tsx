"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChatInput } from "@/components/chat-input"
import { ChatBubble } from "@/components/chat-bubble"
import { MoodSelector } from "@/components/mood-selector"
import { SleepGenieAvatar } from "@/components/sleep-genie-avatar"
import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Edit, Calendar, Star } from "lucide-react"

export default function JournalPage() {
  const [journalEntry, setJournalEntry] = useState("")
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; type?: string }[]>([
    { text: "Welcome to your evening journal. How are you feeling tonight?", isUser: false },
    { text: "I'm here to help you reflect on your day and prepare for restful sleep.", isUser: false },
  ])
  const [journalStreak, setJournalStreak] = useState(3)
  const [stars, setStars] = useState(0)

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true }])

    // Show thinking state
    setMessages((prev) => [...prev, { text: "...", isUser: false, type: "thinking" }])

    // Simulate AI response
    setTimeout(() => {
      // Remove thinking message
      setMessages((prev) => prev.filter((m) => m.type !== "thinking"))

      let response = "Thank you for sharing. Would you like to add this to your journal entry?"

      if (message.toLowerCase().includes("tired") || message.toLowerCase().includes("exhausted")) {
        response =
          "I understand you're feeling tired. Journaling about what drained your energy today might help you identify patterns. Would you like me to add this to your journal?"
      } else if (message.toLowerCase().includes("stress") || message.toLowerCase().includes("anxious")) {
        response =
          "I hear that you're feeling stressed. Writing about your concerns can help release some of that tension. Would you like me to add this to your journal?"
      } else if (message.toLowerCase().includes("happy") || message.toLowerCase().includes("good")) {
        response =
          "I'm glad you're feeling positive! Capturing these good moments helps reinforce them. Would you like me to add this to your journal?"
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }])

      // Add to journal entry
      if (journalEntry) {
        setJournalEntry((prev) => prev + "\n\n" + message)
      } else {
        setJournalEntry(message)
      }
    }, 1500)
  }

  const handleSaveJournal = () => {
    // In a real app, this would save the journal entry to a database
    setStars(stars + 1)
    setJournalStreak(journalStreak + 1)

    // Add confirmation message
    setMessages((prev) => [
      ...prev,
      {
        text:
          "Journal entry saved! You've earned a star and extended your journal streak to " +
          (journalStreak + 1) +
          " days!",
        isUser: false,
      },
    ])

    // Clear journal entry
    setJournalEntry("")
  }

  return (
    <div className="min-h-screen sleep-gradient pb-20 pt-16">
      <Header title="Evening Journal" showBackButton backUrl="/home" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <SleepGenieAvatar state="awake" size="md" className="mr-3" />
            <div>
              <h2 className="text-lg font-medium">Sleep Genie Journal</h2>
              <p className="text-sm text-muted-foreground">I'll help you reflect and unwind</p>
            </div>
          </div>

          <Card className="sleep-card border-primary/10 p-2 flex items-center">
            <Calendar className="h-4 w-4 text-primary mr-2" />
            <div className="text-xs">
              <span className="text-muted-foreground">Journal streak: </span>
              <span className="font-medium">{journalStreak} days</span>
            </div>
          </Card>
        </div>

        <div className="space-y-4 mb-6">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              message={message.text}
              isUser={message.isUser}
              isThinking={message.type === "thinking"}
              showAvatar={!message.isUser && (index === 0 || messages[index - 1]?.isUser)}
            />
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">How are you feeling tonight?</h2>
          <MoodSelector className="mb-6" />

          <Card className="sleep-card border-primary/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Journal your thoughts</h3>
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < stars ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <textarea
              className="w-full bg-transparent border-none resize-none focus:outline-none min-h-[150px] text-sm"
              placeholder="What's on your mind tonight? How was your day?"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              aria-label="Journal entry"
            />

            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-muted-foreground">
                {journalEntry.length > 0 ? journalEntry.length : 0} characters
              </div>

              {journalEntry.length > 50 && (
                <Button size="sm" className="rounded-full" onClick={handleSaveJournal}>
                  Save Entry
                </Button>
              )}
            </div>
          </Card>
        </div>

        <ChatInput onSend={handleSendMessage} placeholder="Tell me about your day..." />

        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Journal Prompts</h2>

          <div className="space-y-3">
            <Card className="sleep-card border-primary/10 p-4">
              <h3 className="font-medium mb-2">Gratitude Practice</h3>
              <p className="text-sm text-muted-foreground mb-3">What are three things you're grateful for today?</p>
              <Button
                className="w-full rounded-full text-sm"
                onClick={() => handleSendMessage("Three things I'm grateful for today:")}
              >
                Use This Prompt
              </Button>
            </Card>

            <Card className="sleep-card border-primary/10 p-4">
              <h3 className="font-medium mb-2">Evening Reflection</h3>
              <p className="text-sm text-muted-foreground mb-3">What's one thing that's on your mind before sleep?</p>
              <Button
                className="w-full rounded-full text-sm"
                onClick={() => handleSendMessage("What's one thing that's on my mind before sleep:")}
              >
                Use This Prompt
              </Button>
            </Card>

            <Card className="sleep-card border-primary/10 p-4">
              <h3 className="font-medium mb-2">Tomorrow's Intention</h3>
              <p className="text-sm text-muted-foreground mb-3">What are you looking forward to tomorrow?</p>
              <Button
                className="w-full rounded-full text-sm"
                onClick={() => handleSendMessage("Tomorrow, I'm looking forward to:")}
              >
                Use This Prompt
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

