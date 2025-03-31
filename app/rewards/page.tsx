"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GenieChatBubble } from "@/components/genie-chat-bubble"
import { SleepGenieAvatar } from "@/components/sleep-genie-avatar"
import { PointsDisplay } from "@/components/points-display"
import { RewardItem } from "@/components/reward-item"
import { ArrowLeft, Gift, Sparkles } from "lucide-react"

export default function RewardsPage() {
  const [points, setPoints] = useState(750)
  const [level, setLevel] = useState(2)

  const rewardCategories = [
    {
      title: "Genie Customization",
      items: [
        {
          title: "Cosmic Genie",
          description: "Space-themed genie appearance",
          image: "/placeholder.svg?height=200&width=400",
          cost: 500,
          isUnlocked: true,
          isNew: false,
        },
        {
          title: "Forest Spirit",
          description: "Nature-themed genie appearance",
          image: "/placeholder.svg?height=200&width=400",
          cost: 750,
          isUnlocked: false,
          isNew: true,
        },
      ],
    },
    {
      title: "Sleep Content",
      items: [
        {
          title: "Ocean Depths",
          description: "Premium underwater soundscape",
          image: "/placeholder.svg?height=200&width=400",
          cost: 300,
          isUnlocked: true,
          isNew: false,
        },
        {
          title: "Lucid Dreams",
          description: "Advanced sleep story collection",
          image: "/placeholder.svg?height=200&width=400",
          cost: 1000,
          isUnlocked: false,
          isNew: true,
        },
      ],
    },
    {
      title: "App Themes",
      items: [
        {
          title: "Aurora Theme",
          description: "Northern lights inspired colors",
          image: "/placeholder.svg?height=200&width=400",
          cost: 400,
          isUnlocked: false,
          isNew: false,
        },
        {
          title: "Midnight Galaxy",
          description: "Deep space theme with stars",
          image: "/placeholder.svg?height=200&width=400",
          cost: 600,
          isUnlocked: false,
          isNew: false,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen sleep-gradient pb-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Rewards Shop</h1>
          </div>

          <PointsDisplay points={points} level={level} size="sm" />
        </div>

        <div className="flex items-center mb-6">
          <SleepGenieAvatar state="energetic" size="md" className="mr-3" level={level} showLevelBadge />
          <div>
            <h2 className="text-lg font-medium">Sleep Rewards</h2>
            <p className="text-sm text-muted-foreground">Unlock items with your points</p>
          </div>
        </div>

        <div className="mb-6">
          <GenieChatBubble
            message="You've earned 750 sleep points! You can redeem them for special rewards. The Forest Spirit genie appearance is now available!"
            showAvatar={true}
            genieState="energetic"
            genieLevel={level}
          />
        </div>

        <div className="mb-8">
          <Card className="sleep-card border-primary/10 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Gift className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-lg font-medium">Your Points</h2>
              </div>
              <Badge className="flex items-center gap-1 bg-primary/20 text-primary">
                <Sparkles className="h-3 w-3" />
                <span>{points}</span>
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Earn points by completing sleep challenges, logging your sleep, and using the app consistently.
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-primary/10 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Daily Check-in</p>
                <div className="flex items-center justify-center mt-1">
                  <Sparkles className="h-3 w-3 text-primary mr-1" />
                  <span className="text-sm font-medium">+25</span>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Sleep Log</p>
                <div className="flex items-center justify-center mt-1">
                  <Sparkles className="h-3 w-3 text-primary mr-1" />
                  <span className="text-sm font-medium">+50</span>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">7-Day Streak</p>
                <div className="flex items-center justify-center mt-1">
                  <Sparkles className="h-3 w-3 text-primary mr-1" />
                  <span className="text-sm font-medium">+500</span>
                </div>
              </div>
            </div>

            <Button className="w-full rounded-full">View All Ways to Earn</Button>
          </Card>
        </div>

        {rewardCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">{category.title}</h2>
              <Button variant="link" className="text-xs p-0 h-auto">
                View all
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {category.items.map((item, itemIndex) => (
                <RewardItem
                  key={itemIndex}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  cost={item.cost}
                  isUnlocked={item.isUnlocked}
                  isNew={item.isNew}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

