"use client"

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { logout } from "@/lib/auth/login"
import { useContext } from "react"
import { SessionContext } from "@/lib/session/provider"
import { getInitials } from "@/lib/adds"

export function NavUser() {
    const { isMobile } = useSidebar()
    const user = useContext(SessionContext)
    const userLoggedIn = JSON.parse(JSON.parse(JSON.stringify(user)))
    console.log(userLoggedIn)
    const inisial = getInitials(userLoggedIn.nama)

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                    <Avatar className="h-8 w-8 rounded-lg">
                        {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                        <AvatarFallback className="rounded-lg">{inisial}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{userLoggedIn.nama}</span>
                        <span className="truncate text-xs">{userLoggedIn.level}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                        {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                        <AvatarFallback className="rounded-lg">{inisial}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{userLoggedIn.nama}</span>
                        <span className="truncate text-xs">{userLoggedIn.level}</span>
                        </div>
                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
                    <LogOut />
                    Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
