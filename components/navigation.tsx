"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Moon, Music, BookOpen, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, path: "/home", label: "Home" },
    { icon: Moon, path: "/voice-chat", label: "Chat" },
    { icon: Music, path: "/sleep-cast", label: "Sounds" },
    { icon: BookOpen, path: "/journal", label: "Journal" },
    { icon: Trophy, path: "/challenges", label: "Goals" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50">
      <nav className="flex justify-around items-center p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

