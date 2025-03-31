"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  return (
    <div className="min-h-screen sleep-gradient flex flex-col p-6">
      <div className="mb-8">
        <Progress value={(step / totalSteps) * 100} className="h-1" />
      </div>

      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mb-6">What's your sleep goal?</h1>

          <div className="space-y-4 mb-auto">
            {[
              { label: "Fall asleep faster", description: "Reduce the time it takes to fall asleep" },
              { label: "Sleep through the night", description: "Minimize nighttime awakenings" },
              { label: "Wake up refreshed", description: "Improve sleep quality and morning energy" },
              { label: "Reduce stress", description: "Calm your mind before bedtime" },
              { label: "Establish a routine", description: "Create consistent sleep habits" },
            ].map((goal, index) => (
              <button
                key={index}
                className="w-full p-4 rounded-xl border border-border bg-accent/50 hover:bg-accent text-left transition-colors"
                aria-label={`Select goal: ${goal.label}`}
              >
                <h3 className="font-medium mb-1">{goal.label}</h3>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </button>
            ))}
          </div>

          <Button onClick={nextStep} className="mt-6 rounded-full" size="lg">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mb-6">When do you typically go to bed?</h1>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-xs">
              <div className="bg-accent/50 rounded-xl p-6 mb-8">
                <div className="text-center text-5xl font-bold mb-4">10:30</div>
                <div className="flex justify-between">
                  <button className="text-muted-foreground hover:text-foreground">PM</button>
                  <button className="text-primary">AM</button>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground mb-8">Tap to adjust your typical bedtime</div>
            </div>
          </div>

          <Button onClick={nextStep} className="mt-6 rounded-full" size="lg">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold mb-6">How would you describe your sleep?</h1>

          <div className="space-y-4 mb-auto">
            {[
              { label: "I have trouble falling asleep", description: "It takes me more than 30 minutes" },
              { label: "I wake up during the night", description: "And have trouble going back to sleep" },
              { label: "I wake up too early", description: "And can't get back to sleep" },
              { label: "I feel tired after sleeping", description: "Even after a full night's rest" },
              { label: "My mind races at night", description: "I can't quiet my thoughts" },
            ].map((issue, index) => (
              <button
                key={index}
                className="w-full p-4 rounded-xl border border-border bg-accent/50 hover:bg-accent text-left transition-colors"
                aria-label={`Select issue: ${issue.label}`}
              >
                <h3 className="font-medium mb-1">{issue.label}</h3>
                <p className="text-sm text-muted-foreground">{issue.description}</p>
              </button>
            ))}
          </div>

          <Link href="/home" className="w-full">
            <Button className="w-full mt-6 rounded-full" size="lg">
              Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

