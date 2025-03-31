"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SleepGenieAvatar } from "@/components/sleep-genie-avatar"
import { GenieChatBubble } from "@/components/genie-chat-bubble"
import { PointsDisplay } from "@/components/points-display"
import { Play, Pause, SkipBack, SkipForward, Moon, Volume2, ArrowLeft, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function SleepcastPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [points, setPoints] = useState(750)
  const [level, setLevel] = useState(2)
  const [showPointsAnimation, setShowPointsAnimation] = useState(false)

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)

    // Simulate progress for demo purposes
    if (!isPlaying) {
      // Award points for starting a sleep session
      setPoints((prev) => prev + 25)
      setShowPointsAnimation(true)
      setTimeout(() => setShowPointsAnimation(false), 3000)

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsPlaying(false)

            // Award completion bonus
            setPoints((prev) => prev + 50)
            setShowPointsAnimation(true)
            setTimeout(() => setShowPointsAnimation(false), 3000)

            return 0
          }
          return prev + 0.5
        })
      }, 100)
    }
  }

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
            <h1 className="text-2xl font-bold">Sleep Cast</h1>
          </div>

          <PointsDisplay points={points} level={level} size="sm" showAnimation={showPointsAnimation} />
        </div>

        <div className="mb-6">
          <GenieChatBubble
            message="I've prepared the 'Moonlit Forest Journey' sleep story for you. This personalized story is designed to help you drift off peacefully. Start listening to earn 25 points, with a 50 point bonus for completing the full session!"
            showAvatar={true}
            genieState="dreaming"
            genieLevel={level}
          />
        </div>

        <div className="mb-8">
          <Card className="sleep-card border-primary/10 p-6 flex flex-col items-center">
            <SleepGenieAvatar
              state="dreaming"
              size="lg"
              className="mb-6"
              pulseEffect={isPlaying}
              level={level}
              showLevelBadge
            />

            <div className="flex items-center mb-1">
              <h2 className="text-xl font-medium mr-2">Moonlit Forest Journey</h2>
              <Badge className="flex items-center gap-1 bg-primary/20 text-primary">
                <Sparkles className="h-3 w-3" />
                <span>+75</span>
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Personalized sleep story • 20 min</p>

            <div className="w-full mb-4">
              <Progress value={progress} className="h-1 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{Math.floor((progress / 100) * 20)}:00</span>
                <span>20:00</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6">
              <button className="text-muted-foreground hover:text-foreground">
                <SkipBack className="h-6 w-6" />
              </button>

              <button
                className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center glow-effect"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-primary" />
                ) : (
                  <Play className="h-8 w-8 text-primary ml-1" />
                )}
              </button>

              <button className="text-muted-foreground hover:text-foreground">
                <SkipForward className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 text-xs text-center text-muted-foreground">
              <div className="flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-primary mr-1" />
                <span>Complete to earn 50 bonus points</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-6">
          <GenieChatBubble
            message="You can customize your sleep experience with these options:"
            showAvatar={true}
            genieState="dreaming"
            genieLevel={level}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Customize</h2>

          <div className="space-y-4">
            <Card className="sleep-card border-primary/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Volume2 className="h-5 w-5 text-primary mr-3" />
                  <span>Background volume</span>
                </div>
                <div className="w-1/2">
                  <Progress value={70} className="h-1" />
                </div>
              </div>

              <div className="text-xs text-center text-muted-foreground">
                <div className="flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-primary mr-1" />
                  <span>Customize 5 times to earn achievement</span>
                </div>
              </div>
            </Card>

            <Card className="sleep-card border-primary/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Moon className="h-5 w-5 text-primary mr-3" />
                  <span>Narrator voice</span>
                </div>
                <select className="bg-transparent border-none text-sm text-right focus:outline-none">
                  <option>Calming Female</option>
                  <option>Gentle Male</option>
                  <option>Soothing Neutral</option>
                </select>
              </div>

              <div className="text-xs text-center text-muted-foreground">
                <div className="flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-primary mr-1" />
                  <span>Try all voices to unlock achievement</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-6">
          <GenieChatBubble
            message="Based on your preferences, you might also enjoy these sleep experiences:"
            showAvatar={true}
            genieState="dreaming"
            genieLevel={level}
          />
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Recommended for You</h2>

          <div className="space-y-3">
            <Card className="sleep-card border-primary/10 p-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Moon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium mr-2">Ocean Waves Meditation</h3>
                    <Badge className="flex items-center gap-1 bg-primary/20 text-primary text-xs">
                      <Sparkles className="h-2.5 w-2.5" />
                      <span>+60</span>
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Gentle waves to calm your mind • 15 min</p>
                </div>
              </div>

              <Button className="w-full mt-3 rounded-full text-sm">Try This Instead</Button>
            </Card>

            <Card className="sleep-card border-primary/10 p-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Moon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium mr-2">Deep Sleep Soundscape</h3>
                    <Badge className="flex items-center gap-1 bg-primary/20 text-primary text-xs">
                      <Sparkles className="h-2.5 w-2.5" />
                      <span>+40</span>
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Ambient sounds for deeper sleep • ∞</p>
                </div>
              </div>

              <Button className="w-full mt-3 rounded-full text-sm">Try This Instead</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

