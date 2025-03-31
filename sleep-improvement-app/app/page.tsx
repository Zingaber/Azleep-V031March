"use client"

import Image from "next/legacy/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChatBubble } from "@/components/ui/chat-bubble"
import { useState } from "react"

export default function HomePage() {
  const [messages, setMessages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [genieState, setGenieState] = useState<"idle" | "listening" | "speaking">("idle")
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("morning")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Azleep Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-xl font-bold">Azleep</h1>
        </div>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost">Profile</Button>
          <Button variant="ghost">Settings</Button>
        </nav>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto p-4">
        <section className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Sleep Genie</h2>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/genie.png"
                  alt="Sleep Genie"
                  layout="fill"
                  className="object-cover rounded-full"
                />
                <div
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${
                    genieState === "idle"
                      ? "bg-gray-400"
                      : genieState === "listening"
                      ? "bg-green-400"
                      : "bg-blue-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <ChatBubble
                  message={
                    isLoading
                      ? "Thinking..."
                      : messages[messages.length - 1] ||
                        `Good ${timeOfDay}! How can I help you sleep better today?`
                  }
                  isLoading={isLoading}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="default"
                onClick={() => setGenieState("listening")}
                disabled={isLoading}
              >
                Ask Sleep Genie
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Sleep Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Sleep Score</span>
                  <span className="font-semibold">85/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hours Slept</span>
                  <span className="font-semibold">7.5h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sleep Quality</span>
                  <span className="font-semibold">Good</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Today's Goals</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Image
                    src="/check.png"
                    alt="Completed"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>Maintain consistent sleep schedule</span>
                </li>
                <li className="flex items-center">
                  <Image
                    src="/pending.png"
                    alt="Pending"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>Complete evening routine</span>
                </li>
                <li className="flex items-center">
                  <Image
                    src="/pending.png"
                    alt="Pending"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>Practice relaxation exercise</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
