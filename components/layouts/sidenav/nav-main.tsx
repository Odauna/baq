"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"


export function NavMain({
    items
} : {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isCollapsible?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {

    const pathname = usePathname()
    const segment = useSelectedLayoutSegment()

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    item.isCollapsible === false ? (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.url === pathname}>
                                <Link href={item.url}>
                                {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ) : (
                    <Collapsible key={item.title} asChild defaultOpen={item.url === segment} className="group/collapsible">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild isActive={subItem.url === pathname}>
                                                <Link href={subItem.url} >
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                    )
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
