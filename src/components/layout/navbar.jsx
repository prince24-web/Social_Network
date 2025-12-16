"use client"

import Link from "next/link"
import { Search, Bell, LogOut, User, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export function Navbar({ user, profile }) {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Mobile Menu Trigger (Visible on small screens) */}
        <div className="md:hidden">
            <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
            </Button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter mr-auto md:mr-0">
          <span className="text-primary text-2xl">&lt;/&gt;</span>
          <span className="hidden md:inline-block">D-Hive</span>
        </div>

        {/* Search Bar (Hidden on very small screens, expanded on others) */}
        <div className="flex-1 max-w-sm hidden md:flex items-center">
            <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-muted pl-8 rounded-full h-9 focus-visible:ring-1"
                />
            </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </Button>
            
            <ModeToggle />

            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full overflow-hidden border border-muted ring-offset-background hover:ring-2 hover:ring-ring">
                            <img 
                                src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.username || "User"}`} 
                                alt={profile?.username}
                                className="h-full w-full object-cover"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{profile?.display_name || profile?.username}</p>
                                <p className="text-xs leading-none text-muted-foreground">@{profile?.username}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/u/${profile?.username}`} className="cursor-pointer flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href="/onboarding">
                    <Button size="sm">Sign In</Button>
                </Link>
            )}
        </div>
      </div>
    </nav>
  )
}
