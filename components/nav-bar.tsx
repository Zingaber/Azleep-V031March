import Link from "next/link"
import { Home, Moon, BarChart2, Music, BookOpen, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavBarProps {
  currentPath: string
}

export function NavBar({ currentPath }: NavBarProps) {
  const navItems = [
    { icon: Home, path: "/home", label: "Home" },
    { icon: Moon, path: "/sleepcast", label: "Sleep" },
    { icon: Music, path: "/soundscapes", label: "Sounds" },
    { icon: BookOpen, path: "/journal", label: "Journal" },
    { icon: BarChart2, path: "/challenges", label: "Progress" },
    { icon: Users, path: "/social", label: "Social" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50">
      <nav className="flex justify-around items-center p-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path
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

