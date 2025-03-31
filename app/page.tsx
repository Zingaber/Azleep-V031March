import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SleepGenieAvatar } from "@/components/sleep-genie-avatar"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen sleep-gradient stars-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="animate-float mb-8">
        <SleepGenieAvatar size="xl" state="awake" pulseEffect={true} />
      </div>

      <h1 className="text-4xl font-bold mb-3 text-foreground">Azleep</h1>
      <p className="text-xl mb-8 text-muted-foreground">Your AI sleep companion</p>

      <div className="max-w-md space-y-6 mb-12">
        <div className="flex items-start space-x-4">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-primary">✨</span>
          </div>
          <div className="text-left">
            <h3 className="font-medium mb-1">AI Sleep Genie</h3>
            <p className="text-sm text-muted-foreground">Your personal sleep coach and companion</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-primary">🌙</span>
          </div>
          <div className="text-left">
            <h3 className="font-medium mb-1">Personalized sleep casts</h3>
            <p className="text-sm text-muted-foreground">AI-generated stories to help you drift off</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-primary">📊</span>
          </div>
          <div className="text-left">
            <h3 className="font-medium mb-1">Sleep insights</h3>
            <p className="text-sm text-muted-foreground">Track your progress and improve your sleep</p>
          </div>
        </div>
      </div>

      <Link href="/onboarding" className="w-full max-w-xs">
        <Button className="w-full rounded-full" size="lg">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}

