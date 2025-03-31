"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GenieCardProps {
  title: string
  description?: string
  badge?: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  className?: string
  children?: React.ReactNode
}

export function GenieCard({ title, description, badge, icon, action, className, children }: GenieCardProps) {
  return (
    <Card className={cn("sleep-card border-primary/10 p-4 overflow-hidden", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {icon && (
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">{icon}</div>
          )}
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{title}</h3>
              {badge && (
                <Badge variant="sleep" className="ml-2">
                  {badge}
                </Badge>
              )}
            </div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
      </div>

      {children}

      {action && (
        <Button className="w-full mt-3 rounded-full" onClick={action.onClick} asChild={!!action.href}>
          {action.href ? <a href={action.href}>{action.label}</a> : action.label}
        </Button>
      )}
    </Card>
  )
}

