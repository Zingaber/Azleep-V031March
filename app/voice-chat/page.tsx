"use client"

import { useState, useRef, useEffect } from "react"
import { ChatBubble } from "@/components/chat-bubble"
import { ChatInput } from "@/components/chat-input"
import { VoiceButton } from "@/components/voice-button"
import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Moon, BookOpen, Music } from "lucide-react"

export default function VoiceChatPage() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; type?: string }[]>([
    { text: "Hi there! I'm your Sleep Genie. How can I help you tonight?", isUser: false },
    {
      text: "Would you like to talk about your day, get some sleep coaching, or try a guided meditation?",
      isUser: false,
    },
  ])
  const [genieState, setGenieState] = useState<"awake" | "sleepy" | "dreaming" | "energetic">("awake")

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

          if (message.toLowerCase().includes("can't sleep")) {
            response =
              "I'm sorry to hear you're having trouble sleeping. Let's try a breathing exercise: breathe in for 4 counts, hold for 7, and exhale for 8. Would you like me to guide you through it?"
            setGenieState("dreaming")
          } else if (message.toLowerCase().includes("stress") || message.toLowerCase().includes("anxious")) {
            response =
              "I hear that you're feeling stressed. Let's work on calming your mind with a gentle meditation or perhaps a soothing soundscape. What would you prefer?"
            setGenieState("dreaming")
          } else if (message.toLowerCase().includes("meditation")) {
            response =
              "Great choice! I have several meditations that can help you relax before sleep. Would you prefer a body scan meditation, a breathing exercise, or a visualization?"
            setGenieState("dreaming")
          } else if (message.toLowerCase().includes("tired") || message.toLowerCase().includes("exhausted")) {
            response =
              "You sound tired. Let's focus on helping you get some quality rest tonight. Would you like me to guide you through a sleep preparation routine?"
            setGenieState("sleepy")
          } else if (message.toLowerCase().includes("coaching") || message.toLowerCase().includes("advice")) {
            response =
              "I'd be happy to provide some sleep coaching! Based on your patterns, I recommend establishing a consistent bedtime routine. Would you like some specific tips?"
            setGenieState("energetic")
          }

          return [...newMessages, { text: response, isUser: false }]
        })
      }, 1500)
    }, 500)
  }

  const handleVoiceStart = () => {
    // In a real app, this would start voice recording
    setMessages((prev) => [...prev, { text: "Listening...", isUser: true }])
  }

  const handleVoiceStop = () => {
    // In a real app, this would stop voice recording and process the audio
    setMessages((prev) => {
      const newMessages = [...prev]
      // Replace "Listening..." with a simulated transcription
      if (newMessages[newMessages.length - 1].text === "Listening...") {
        newMessages.pop()
        return [...newMessages, { text: "I'm having trouble sleeping tonight", isUser: true }]
      }
      return newMessages
    })

    // Simulate AI thinking
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "...", isUser: false, type: "thinking" }])

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => {
          const newMessages = [...prev]
          newMessages.pop() // Remove thinking message
          return [
            ...newMessages,
            {
              text: "I'm sorry to hear you're having trouble sleeping. Let's try a breathing exercise: breathe in for 4 counts, hold for 7, and exhale for 8. Would you like me to guide you through it?",
              isUser: false,
            },
          ]
        })
        setGenieState("dreaming")
      }, 1500)
    }, 500)
  }

  const conversationOptions = [
    {
      label: "Sleep Coaching",
      description: "Get personalized sleep advice",
      icon: <Moon className="h-4 w-4 text-primary" />,
    },
    {
      label: "Vent/Talk",
      description: "Share what's on your mind",
      icon: <BookOpen className="h-4 w-4 text-primary" />,
    },
    {
      label: "Guided Meditation",
      description: "Relax with a voice-guided session",
      icon: <Music className="h-4 w-4 text-primary" />,
    },
  ]

  return (
    <div className="min-h-screen sleep-gradient pb-20 pt-16">
      <Header title="Voice Chat" showBackButton backUrl="/home" />

      <div className="p-6 flex flex-col h-[calc(100vh-9rem)]">
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                message={message.text}
                isUser={message.isUser}
                isThinking={message.type === "thinking"}
                genieState={genieState}
                showAvatar={!message.isUser && (index === 0 || messages[index - 1]?.isUser)}
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
                className="flex-1 min-w-[120px] h-auto py-2 justify-start"
                onClick={() => handleSendMessage(`I'd like ${option.label}`)}
              >
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    {option.icon}
                    <span className="ml-2">{option.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <VoiceButton onStart={handleVoiceStart} onStop={handleVoiceStop} size="lg" className="mx-auto" />
          </div>

          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>

      <Navigation />
    </div>
  )
}

