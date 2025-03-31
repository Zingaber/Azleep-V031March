"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, Cloud, Waves, Wind, Music, Plus, ArrowLeft, Moon, Flame } from "lucide-react"

export default function SoundscapesPage() {
  const [activeSound, setActiveSound] = useState<string | null>(null)

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      setActiveSound(null)
    } else {
      setActiveSound(soundId)
    }
  }

  const soundscapes = [
    { id: "rain", name: "Gentle Rain", icon: Cloud, duration: "∞", color: "bg-primary/20" },
    { id: "ocean", name: "Ocean Waves", icon: Waves, duration: "∞", color: "bg-secondary/20" },
    { id: "wind", name: "Forest Wind", icon: Wind, duration: "∞", color: "bg-primary/20" },
    { id: "piano", name: "Soft Piano", icon: Music, duration: "45 min", color: "bg-secondary/20" },
    { id: "night", name: "Night Sounds", icon: Moon, duration: "∞", color: "bg-primary/20" },
    { id: "fire", name: "Crackling Fire", icon: Flame, duration: "∞", color: "bg-secondary/20" },
  ]

  const mixes = [
    { id: "sleep-mix", name: "Deep Sleep Mix", description: "Rain + white noise" },
    { id: "focus-mix", name: "Focus Mix", description: "Forest sounds + piano" },
    { id: "relax-mix", name: "Evening Calm", description: "Ocean waves + soft piano" },
  ]

  return (
    <div className="min-h-screen sleep-gradient pb-6">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Soundscapes</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Natural Sounds</h2>

          <div className="grid grid-cols-2 gap-4">
            {soundscapes.map((sound) => (
              <Card
                key={sound.id}
                className={`sleep-card border-primary/10 p-4 flex flex-col items-center ${
                  activeSound === sound.id ? "border-primary border-2" : ""
                }`}
              >
                <div
                  className={`h-16 w-16 rounded-full ${sound.color} flex items-center justify-center mb-3 ${
                    activeSound === sound.id ? "breathing-circle" : ""
                  }`}
                >
                  <sound.icon className="h-8 w-8 text-primary/80" />
                </div>

                <h3 className="font-medium text-center mb-1">{sound.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{sound.duration}</p>

                <button
                  className={`h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center ${
                    activeSound === sound.id ? "glow-effect" : ""
                  }`}
                  onClick={() => toggleSound(sound.id)}
                >
                  {activeSound === sound.id ? (
                    <Pause className="h-5 w-5 text-primary" />
                  ) : (
                    <Play className="h-5 w-5 text-primary ml-0.5" />
                  )}
                </button>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Your Mixes</h2>

          <div className="space-y-4">
            {mixes.map((mix) => (
              <Card key={mix.id} className="sleep-card border-primary/10 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{mix.name}</h3>
                    <p className="text-xs text-muted-foreground">{mix.description}</p>
                  </div>
                </div>

                <button className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="h-5 w-5 text-primary ml-0.5" />
                </button>
              </Card>
            ))}

            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" /> Create Custom Mix
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Sleep Timer</h2>

          <Card className="sleep-card border-primary/10 p-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                15 min
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                30 min
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                45 min
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                1 hour
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                2 hours
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Custom
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

