"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GenieChatBubble } from "@/components/genie-chat-bubble"
import { GenieInput } from "@/components/genie-input"
import { SleepGenieAvatar } from "@/components/sleep-genie-avatar"
import { PointsDisplay } from "@/components/points-display"
import { ArrowLeft, Moon, BookOpen, Music, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CompanionPage() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; type?: string; pointsReward?: number }[]>([
    { text: "Hi there! I'm your Sleep Genie. How can I help you tonight?", isUser: false },
    {
      text: "Would you like to talk about your day, get some sleep coaching, or try a guided meditation? Each interaction earns you points!",
      isUser: false,
    },
  ])
  const [genieState, setGenieState] = useState<"awake" | "sleepy" | "dreaming" | "energetic">("awake")
  const [points, setPoints] = useState(750)
  const [level, setLevel] = useState(2)
  const [showPointsAnimation, setShowPointsAnimation] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { text: message, isUser: true }])

    // Simulate AI thinking
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "...", isUser: false, type: "thinking" }])

      // Simulate AI response after a delay
      setTimeout(() => {
        setMessages((prev) => {
          const newMessages = [...prev]
          // Replace the thinking message with the actual response
          newMessages.pop()

          let response =
            "I understand. Let's work on improving your sleep tonight. Would you like to try a breathing exercise or perhaps a guided meditation to help you relax?"
          let pointsToAward = 10 // Base points for interaction

          if (message.toLowerCase().includes("can't sleep")) {
            response =
              "I'm sorry to hear you're having trouble sleeping. Let's try a breathing exercise: breathe in for 4 counts, hold for 7, and exhale for 8. Would you like me to guide you through it?"
            setGenieState("dreaming")
            pointsToAward = 15
          } else if (message.toLowerCase().includes("stress") || message.toLowerCase().includes("anxious")) {
            response =
              "I hear that you're feeling stressed. Let's work on calming your mind with a gentle meditation or perhaps a soothing soundscape. What would you prefer?"
            setGenieState("dreaming")
            pointsToAward = 15
          } else if (message.toLowerCase().includes("meditation")) {
            response =
              "Great choice! I have several meditations that can help you relax before sleep. Would you prefer a body scan meditation, a breathing exercise, or a visualization? Complete any meditation to earn bonus points!"
            setGenieState("dreaming")
            pointsToAward = 20
          } else if (message.toLowerCase().includes("tired") || message.toLowerCase().includes("exhausted")) {
            response =
              "You sound tired. Let's focus on helping you get some quality rest tonight. Would you like me to guide you through a sleep preparation routine? You'll earn points for following along!"
            setGenieState("sleepy")
            pointsToAward = 15
          } else if (message.toLowerCase().includes("coaching") || message.toLowerCase().includes("advice")) {
            response =
              "I'd be happy to provide some sleep coaching! Based on your patterns, I recommend establishing a consistent bedtime routine. Would you like some specific tips? You'll earn achievement points for implementing them!"
            setGenieState("energetic")
            pointsToAward = 25
          }

          // Award points
          setPoints((prev) => prev + pointsToAward)
          setShowPointsAnimation(true)
          setTimeout(() => setShowPointsAnimation(false), 3000)

          return [
            ...newMessages,
            {
              text: response,
              isUser: false,
              pointsReward: pointsToAward,
            },
          ]
        })
      }, 1500)
    }, 500)
  }

  const conversationOptions = [
    {
      label: "Sleep Coaching",
      description: "Get personalized sleep advice",
      icon: <Moon className="h-4 w-4 text-primary" />,
      points: 25,
    },
    {
      label: "Vent/Talk",
      description: "Share what's on your mind",
      icon: <BookOpen className="h-4 w-4 text-primary" />,
      points: 15,
    },
    {
      label: "Guided Meditation",
      description: "Relax with a voice-guided session",
      icon: <Music className="h-4 w-4 text-primary" />,
      points: 20,
    },
  ]

  return (
    <div className="min-h-screen sleep-gradient pb-6">
      <div className="p-6 flex flex-col h-[100vh]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center">
              <SleepGenieAvatar state={genieState} size="sm" className="mr-2" level={level} showLevelBadge />
              <h1 className="text-2xl font-bold">Sleep Genie</h1>
            </div>
          </div>

          <PointsDisplay points={points} level={level} size="sm" showAnimation={showPointsAnimation} />
        </div>

        <div className="flex-1 overflow-y-auto mb-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <GenieChatBubble
                key={index}
                message={message.text}
                isUser={message.isUser}
                isThinking={message.type === "thinking"}
                genieState={genieState}
                genieLevel={level}
                showAvatar={!message.isUser && (index === 0 || messages[index - 1]?.isUser)}
                pointsReward={message.pointsReward}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {conversationOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(`I'd like ${option.label}`)}
                className="flex-1 min-w-[120px] h-auto py-2 justify-start"
              >
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    {option.icon}
                    <span className="ml-2">{option.label}</span>
                  </div>
                  <Badge className="mt-1 flex items-center gap-1 bg-primary/20 text-primary text-xs">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span>+{option.points}</span>
                  </Badge>
                </div>
              </Button>
            ))}
          </div>

          <GenieInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}

