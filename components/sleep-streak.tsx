import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Moon } from "lucide-react"

interface SleepStreakProps {
  days: number
  className?: string
}

export function SleepStreak({ days, className }: SleepStreakProps) {
  // Generate the last 7 days with completion status
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const dayIndex = 6 - i
    const isCompleted = dayIndex < days % 7
    return { day: ["S", "M", "T", "W", "T", "F", "S"][dayIndex], isCompleted }
  }).reverse()

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Moon className="h-4 w-4 text-primary mr-2" />
          <span className="text-sm font-medium">Sleep Streak</span>
        </div>
        <Badge variant="sleep" className="ml-2">
          {days} days
        </Badge>
      </div>

      <div className="flex justify-between">
        {weekDays.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                day.isCompleted ? "bg-primary/30 text-primary" : "bg-muted text-muted-foreground",
              )}
            >
              {day.day}
            </div>
            <div className={cn("w-1 h-1 rounded-full", day.isCompleted ? "bg-primary" : "bg-muted")} />
          </div>
        ))}
      </div>
    </div>
  )
}

