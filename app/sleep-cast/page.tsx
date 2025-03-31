"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SleepCard } from "@/components/sleep-card"
import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Play, Pause, Cloud, Waves, Wind, Music, Moon, Flame } from "lucide-react"

export default function SleepCastPage() {
  const [activeSound, setActiveSound] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const toggleSound = (soundId: string) => {
    if (activeSound === soundId) {
      setActiveSound(null)
    } else {
      setActiveSound(soundId)
    }
  }

  const toggleTag = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null)
    } else {
      setActiveTag(tag)
    }
  }

  const tags = ["All", "Calm", "Focus", "Deep Sleep", "Nature", "Ambient"]

  const soundscapes = [
    { id: "rain", name: "Gentle Rain", icon: Cloud, duration: "∞", color: "bg-primary/20", tags: ["Calm", "Nature"] },
    {
      id: "ocean",
      name: "Ocean Waves",
      icon: Waves,
      duration: "∞",
      color: "bg-secondary/20",
      tags: ["Calm", "Nature"],
    },
    { id: "wind", name: "Forest Wind", icon: Wind, duration: "∞", color: "bg-primary/20", tags: ["Calm", "Nature"] },
    {
      id: "piano",
      name: "Soft Piano",
      icon: Music,
      duration: "45 min",
      color: "bg-secondary/20",
      tags: ["Focus", "Ambient"],
    },
    {
      id: "night",
      name: "Night Sounds",
      icon: Moon,
      duration: "∞",
      color: "bg-primary/20",
      tags: ["Deep Sleep", "Nature"],
    },
    {
      id: "fire",
      name: "Crackling Fire",
      icon: Flame,
      duration: "∞",
      color: "bg-secondary/20",
      tags: ["Calm", "Ambient"],
    },
  ]

  const sleepCasts = [
    {
      title: "Moonlit Forest Journey",
      description: "A peaceful walk through a magical forest under moonlight",
      duration: "20 min",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Deep Sleep", "Nature"],
      isNew: true,
    },
    {
      title: "Ocean Meditation",
      description: "Guided relaxation by the gentle waves of the ocean",
      duration: "15 min",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Calm", "Focus"],
      isNew: false,
    },
    {
      title: "Starry Night",
      description: "A journey through the cosmos to help you drift off",
      duration: "25 min",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Deep Sleep", "Ambient"],
      isNew: false,
    },
    {
      title: "Rainy Day Comfort",
      description: "The soothing sounds of rain on a cozy afternoon",
      duration: "30 min",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Calm", "Nature"],
      isNew: true,
    },
  ]

  const filteredSoundscapes =
    activeTag && activeTag !== "All" ? soundscapes.filter((sound) => sound.tags.includes(activeTag)) : soundscapes

  const filteredSleepCasts =
    activeTag && activeTag !== "All" ? sleepCasts.filter((cast) => cast.tags.includes(activeTag)) : sleepCasts

  return (
    <div className="min-h-screen sleep-gradient pb-20 pt-16">
      <Header title="Sleep Cast Library" showBackButton backUrl="/home" />

      <div className="p-6">
        <div className="mb-4 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={activeTag === tag ? "default" : "outline"}
                size="sm"
                className="rounded-full whitespace-nowrap"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Sleep Casts</h2>

          <div className="grid grid-cols-2 gap-4">
            {filteredSleepCasts.map((cast, index) => (
              <SleepCard
                key={index}
                title={cast.title}
                description={cast.description}
                duration={cast.duration}
                image={cast.image}
                tags={cast.tags}
                isNew={cast.isNew}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Natural Sounds</h2>

          <div className="grid grid-cols-2 gap-4">
            {filteredSoundscapes.map((sound) => (
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
                  aria-label={activeSound === sound.id ? `Pause ${sound.name}` : `Play ${sound.name}`}
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

      <Navigation />
    </div>
  )
}

