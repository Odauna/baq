"use client"

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useContext } from "react"
import { SessionContext } from "@/lib/session/provider"
import { getInitials } from "@/lib/adds"

export function NavUser() {
    const { isMobile } = useSidebar()
    const user = useContext(SessionContext)
    // const userLoggedIn = JSON.parse(JSON.parse(JSON.stringify(user)))
    // const initial = getInitials(userLoggedIn.nama)
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size="lg" 
                            className="data-[state-open]:bg-sidebar-accent data-[state-open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {/* <AvatarImage src={userLoggedIn.avatar} alt={userLoggedIn.nama} />
                                <AvatarFallback className="rounded-lg">{initial}</AvatarFallback> */}
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                {/* <span className="truncate font-semibold">{userLoggedIn.nama}</span>
                                <span className="truncate text-xs">{userLoggedIn.level}</span> */}
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    {/* <AvatarImage src={userLoggedIn.avatar} alt={userLoggedIn.nama} />
                                    <AvatarFallback className="rounded-lg">{initial}</AvatarFallback> */}
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    {/* <div className="truncate font-semibold">{userLoggedIn.nama}</div>
                                    <div className="truncate text-sm">{userLoggedIn.level}</div> */}
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut />
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}