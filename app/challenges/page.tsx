"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChallengeCard } from "@/components/challenge-card"
import { ChatBubble } from "@/components/chat-bubble"
import { SleepGenieAvatar } from "@/components/sleep-genie-avatar"
import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Trophy, Calendar, Clock, CheckCircle } from "lucide-react"

export default function ChallengesPage() {
  const currentDate = new Date()
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]
  const currentDay = currentDate.getDay()
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const challenges = [
    {
      title: "Digital Detox",
      description: "No screens 1 hour before bedtime",
      progress: 60,
      daysLeft: 3,
      reward: "New sleep story unlock",
    },
    {
      title: "Consistent Bedtime",
      description: "Go to bed at the same time each night",
      progress: 40,
      daysLeft: 5,
      reward: "Sleep insights report",
    },
    {
      title: "Morning Routine",
      description: "Start your day with intention",
      progress: 20,
      daysLeft: 7,
      reward: "Premium soundscape",
    },
  ]

  const toggleTaskCompletion = (taskIndex: number) => {
    if (completedTasks.includes(taskIndex)) {
      setCompletedTasks((prev) => prev.filter((i) => i !== taskIndex))
    } else {
      setCompletedTasks((prev) => [...prev, taskIndex])
    }
  }

  return (
    <div className="min-h-screen sleep-gradient pb-20 pt-16">
      <Header title="Sleep Challenges" showBackButton backUrl="/home" />

      <div className="p-6">
        <div className="flex items-center mb-6">
          <SleepGenieAvatar state="energetic" size="md" className="mr-3" />
          <div>
            <h2 className="text-lg font-medium">Sleep Genie Coach</h2>
            <p className="text-sm text-muted-foreground">I'll help you build better sleep habits</p>
          </div>
        </div>

        <div className="mb-6">
          <ChatBubble
            message="You're making great progress on your sleep journey! You've completed 5 days of your 7-Day Sleep Reset Challenge. Keep it up!"
            showAvatar={true}
            genieState="energetic"
          />
        </div>

        <div className="mb-8">
          <Card className="sleep-card border-primary/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">7-Day Sleep Reset</h2>
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Establish a consistent sleep routine and improve your sleep quality in just one week.
            </p>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">Day {currentDay + 1}/7</span>
              </div>
              <Progress value={((currentDay + 1) / 7) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    index === currentDay
                      ? "text-primary"
                      : index < currentDay
                        ? "text-muted-foreground"
                        : "text-muted-foreground/50"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${
                      index === currentDay ? "bg-primary/20" : index < currentDay ? "bg-accent" : "bg-accent/50"
                    }`}
                  >
                    {index < currentDay ? <CheckCircle className="h-4 w-4" /> : <span>{day}</span>}
                  </div>
                  <span className="text-xs">{index + 1}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mb-6">
          <ChatBubble
            message="Here are your tasks for today. Complete them to continue your streak!"
            showAvatar={true}
            genieState="energetic"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Today's tasks</h2>

          <div className="space-y-4">
            <Card
              className="sleep-card border-primary/10 p-4 flex items-center space-x-4"
              onClick={() => toggleTaskCompletion(0)}
            >
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Set a consistent bedtime</h3>
                <p className="text-xs text-muted-foreground">Go to bed at 10:30 PM tonight</p>
              </div>
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  completedTasks.includes(0) ? "bg-primary" : "border-2 border-muted"
                }`}
              >
                {completedTasks.includes(0) && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
              </div>
            </Card>

            <Card
              className="sleep-card border-primary/10 p-4 flex items-center space-x-4"
              onClick={() => toggleTaskCompletion(1)}
            >
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Complete evening journal</h3>
                <p className="text-xs text-muted-foreground">Reflect on your day before sleep</p>
              </div>
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  completedTasks.includes(1) ? "bg-primary" : "border-2 border-muted"
                }`}
              >
                {completedTasks.includes(1) && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-6">
          <ChatBubble
            message="You're also working on these challenges. Keep up the good work!"
            showAvatar={true}
            genieState="energetic"
          />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Active Challenges</h2>

          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <ChallengeCard
                key={index}
                title={challenge.title}
                description={challenge.description}
                progress={challenge.progress}
                daysLeft={challenge.daysLeft}
                reward={challenge.reward}
              />
            ))}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  )
}

