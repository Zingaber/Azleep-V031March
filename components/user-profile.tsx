"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Settings, LogOut, Award, User } from "lucide-react"

interface UserProfileProps {
  name: string
  initials: string
  streakDays: number
  avatarUrl?: string
}

export function UserProfile({ name, initials, streakDays, avatarUrl }: UserProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2">
          <div className="relative">
            <Avatar className="h-10 w-10 border-2 border-primary/30">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="bg-accent text-foreground">{initials}</AvatarFallback>
            </Avatar>
            {streakDays > 0 && (
              <Badge className="absolute -bottom-1 -right-1 h-5 px-1.5 bg-neon-yellow text-black text-xs font-bold">
                {streakDays}🔥
              </Badge>
            )}
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{name}</span>
            <span className="text-xs text-muted-foreground">{streakDays} day streak</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Award className="mr-2 h-4 w-4" />
          <span>Achievements</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

