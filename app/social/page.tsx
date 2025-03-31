"use client"

import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Award, Users, Trophy } from "lucide-react"

export default function SocialPage() {
  const friends = [
    { name: "Alex K.", initials: "AK", streak: 12, avatar: "" },
    { name: "Taylor M.", initials: "TM", streak: 8, avatar: "" },
    { name: "Jordan L.", initials: "JL", streak: 5, avatar: "" },
    { name: "Sam P.", initials: "SP", streak: 3, avatar: "" },
  ]

  const posts = [
    {
      id: 1,
      user: { name: "Alex K.", initials: "AK", avatar: "" },
      content: "Just completed my 7-day sleep challenge! 🎉 My sleep quality score improved by 32%!",
      likes: 24,
      comments: 5,
      time: "2h ago",
      achievement: "7-Day Challenge",
    },
    {
      id: 2,
      user: { name: "Taylor M.", initials: "TM", avatar: "" },
      content:
        "Tonight's sleep meditation was exactly what I needed after a stressful day. Anyone else try the new 'Ocean Waves' soundscape?",
      likes: 18,
      comments: 7,
      time: "5h ago",
      achievement: null,
    },
  ]

  return (
    <div className="min-h-screen gradient-bg pb-20">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sleep Community</h1>
          <Button variant="outline" size="icon">
            <Users className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Leaderboard</h2>

          <Card className="gradient-card border-primary/10 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">Weekly Sleep Streak</span>
              <Button variant="link" className="text-xs p-0 h-auto">
                View all
              </Button>
            </div>

            <div className="space-y-3">
              {friends.map((friend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground w-4">{index + 1}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback className="bg-accent text-foreground text-xs">{friend.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-sm font-medium">{friend.name}</span>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground mr-1">{friend.streak} day streak</span>
                        <span className="text-xs text-neon-yellow">🔥</span>
                      </div>
                    </div>
                  </div>
                  {index === 0 && <Trophy className="h-5 w-5 text-neon-yellow" />}
                </div>
              ))}
            </div>

            <Button className="w-full mt-4 text-sm" variant="outline">
              Invite friends
            </Button>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Community Feed</h2>

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="gradient-card border-primary/10 p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback className="bg-accent text-foreground">{post.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">{post.user.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{post.time}</span>
                    </div>
                    {post.achievement && (
                      <div className="flex items-center mt-1">
                        <Award className="h-3 w-3 text-neon-purple mr-1" />
                        <span className="text-xs text-neon-purple">Completed {post.achievement}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm mb-4">{post.content}</p>

                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="text-xs">{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="h-4 w-4 mr-1" />
                    <span className="text-xs">Share</span>
                  </Button>
                </div>
              </Card>
            ))}

            <Button variant="outline" className="w-full">
              View more posts
            </Button>
          </div>
        </div>
      </div>

      <NavBar currentPath="/social" />
    </div>
  )
}

