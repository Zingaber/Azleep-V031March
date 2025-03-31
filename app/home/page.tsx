"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SleepGenieAvatar } from "@/components/sleep-genie-avatar"
import { ChatBubble } from "@/components/chat-bubble"
import { ChatInput } from "@/components/chat-input"
import { MoodSelector } from "@/components/mood-selector"
import { SleepStreak } from "@/components/sleep-streak"
import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Moon, Music, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; type?: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [genieState, setGenieState] = useState<"awake" | "sleepy" | "dreaming" | "energetic">("awake")
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "day" | "evening" | "night">("evening")
  const [sleepStreak, setSleepStreak] = useState(5)
  const [showMoodSelector, setShowMoodSelector] = useState(false)

  // Simulate loading and initial message
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setMessages([
        { text: getGreeting(), isUser: false },
        { text: "How are you feeling tonight?", isUser: false },
      ])
      setShowMoodSelector(true)
    }, 1000)

    // Determine time of day
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setTimeOfDay("morning")
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay("day")
    } else if (hour >= 18 && hour < 22) {
      setTimeOfDay("evening")
    } else {
      setTimeOfDay("night")
      setGenieState("sleepy")
    }

    return () => clearTimeout(timer)
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    let greeting = ""

    if (hour >= 5 && hour < 12) {
      greeting = "Good morning! How did you sleep last night?"
    } else if (hour >= 12 && hour < 18) {
      greeting = "Good afternoon! How's your energy level today?"
    } else if (hour >= 18 && hour < 22) {
      greeting = "Good evening! How are you feeling tonight?"
    } else {
      greeting = "It's getting late. Let me help you prepare for sleep."
    }

    return greeting
  }

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true }])

    // Show thinking state
    setMessages((prev) => [...prev, { text: "...", isUser: false, type: "thinking" }])

    // Simulate AI response
    setTimeout(() => {
      // Remove thinking message
      setMessages((prev) => prev.filter((m) => m.type !== "thinking"))

      let response =
        "I understand. Let me help you with that. Would you like to try a guided meditation or a sleep story tonight?"

      if (message.toLowerCase().includes("can't sleep")) {
        response =
          "I'm sorry to hear you're having trouble sleeping. Let's try a breathing exercise: breathe in for 4 counts, hold for 7, and exhale for 8. Would you like me to guide you through it?"
        setGenieState("dreaming")
      } else if (message.toLowerCase().includes("stress") || message.toLowerCase().includes("anxious")) {
        response =
          "I hear that you're feeling stressed. Let's work on calming your mind with a gentle meditation or perhaps a soothing soundscape. What would you prefer?"
        setGenieState("dreaming")
      } else if (message.toLowerCase().includes("tired") || message.toLowerCase().includes("sleepy")) {
        response =
          "You sound tired. Let's get you ready for a restful night's sleep. I recommend the 'Moonlit Forest Journey' sleep cast tonight."
        setGenieState("sleepy")
      } else if (message.toLowerCase().includes("good") || message.toLowerCase().includes("great")) {
        response =
          "I'm glad to hear that! Would you like to maintain this positive energy with a short meditation or prepare for sleep with a calming soundscape?"
        setGenieState("energetic")
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }])

      // Add follow-up message with suggestions
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Here's what I recommend for you tonight:",
            isUser: false,
          },
        ])
      }, 1000)
    }, 1500)
  }

  const handleMoodSelect = (mood: { emoji: string; label: string }) => {
    setMessages((prev) => [...prev, { text: `I'm feeling ${mood.label.toLowerCase()} ${mood.emoji}`, isUser: true }])
    setShowMoodSelector(false)

    // Show thinking state
    setMessages((prev) => [...prev, { text: "...", isUser: false, type: "thinking" }])

    // Simulate AI response based on mood
    setTimeout(() => {
      // Remove thinking message
      setMessages((prev) => prev.filter((m) => m.type !== "thinking"))

      let response = ""

      switch (mood.label) {
        case "Sleepy":
          response =
            "You're feeling sleepy. That's perfect timing! Let me help you prepare for a restful night's sleep."
          setGenieState("sleepy")
          break
        case "Calm":
          response = "I'm glad you're feeling calm. Let's maintain this peaceful state as you prepare for sleep."
          setGenieState("awake")
          break
        case "Sad":
          response =
            "I'm sorry to hear you're feeling sad. Let's focus on some comforting activities to help you feel better and prepare for sleep."
          setGenieState("dreaming")
          break
        case "Anxious":
          response =
            "I understand you're feeling anxious. Let's try some relaxation techniques to help calm your mind before sleep."
          setGenieState("dreaming")
          break
        case "Stressed":
          response =
            "I see you're feeling stressed. Let's work on releasing that tension with some guided relaxation to help you sleep better."
          setGenieState("dreaming")
          break
        default:
          response =
            "Thank you for sharing how you're feeling. Let me suggest some activities to help you prepare for sleep."
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }])

      // Add follow-up message with suggestions
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Here's what I recommend for you tonight:",
            isUser: false,
          },
        ])
      }, 1000)
    }, 1500)
  }

  return (
    <div className="min-h-screen sleep-gradient pb-20 pt-16">
      <Header title="Sleep Genie" />

      <div className="p-6">
        <div className="flex items-center mb-6">
          <SleepGenieAvatar state={genieState} timeOfDay={timeOfDay} size="md" className="mr-3" />
          <div>
            <h2 className="text-lg font-medium">Sleep Genie</h2>
            <p className="text-sm text-muted-foreground">Your AI sleep companion</p>
          </div>
        </div>

        <SleepStreak days={sleepStreak} className="mb-6" />

        <div className="space-y-4 mb-6">
          {isLoading ? (
            <ChatBubble message="" isThinking={true} genieState={genieState} />
          ) : (
            messages.map((message, index) => (
              <ChatBubble
                key={index}
                message={message.text}
                isUser={message.isUser}
                isThinking={message.type === "thinking"}
                genieState={genieState}
                showAvatar={!message.isUser && (index === 0 || messages[index - 1]?.isUser)}
              />
            ))
          )}
        </div>

        {showMoodSelector && <MoodSelector className="mb-6" onSelect={handleMoodSelect} />}

        {messages.length > 0 && messages[messages.length - 1]?.text === "Here's what I recommend for you tonight:" && (
          <div className="space-y-3 mb-6">
            <Link href="/sleep-cast">
              <Card className="sleep-card border-primary/10 p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Moon className="h-8 w-8 text-primary/70" />
                  </div>
                  <div>
                    <h3 className="font-medium">Moonlit Forest Journey</h3>
                    <p className="text-sm text-muted-foreground">Personalized sleep story • 20 min</p>
                  </div>
                </div>

                <Button className="w-full mt-4 rounded-full">Start Sleep Session</Button>
              </Card>
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/sleep-cast" className="block">
                <Card className="sleep-card border-primary/10 p-3 flex flex-col items-center h-full">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <Music className="h-6 w-6 text-primary/70" />
                  </div>
                  <h3 className="text-sm font-medium">Soundscapes</h3>
                  <p className="text-xs text-muted-foreground">Ambient sounds</p>
                </Card>
              </Link>

              <Link href="/journal" className="block">
                <Card className="sleep-card border-primary/10 p-3 flex flex-col items-center h-full">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <BookOpen className="h-6 w-6 text-primary/70" />
                  </div>
                  <h3 className="text-sm font-medium">Journal</h3>
                  <p className="text-xs text-muted-foreground">Reflect & unwind</p>
                </Card>
              </Link>
            </div>
          </div>
        )}

        <ChatInput onSend={handleSendMessage} />
      </div>

      <Navigation />
    </div>
  )
}

