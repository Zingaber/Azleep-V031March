"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GenieSuggestionButtonProps {
  label: string
  description?: string
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
}

export function GenieSuggestionButton({ label, description, onClick, className, icon }: GenieSuggestionButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full justify-start text-left h-auto p-3 rounded-xl border-primary/20 hover:bg-primary/10 hover:border-primary/30 transition-all",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        {icon && (
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-medium text-sm">{label}</h3>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
    </Button>
  )
}

