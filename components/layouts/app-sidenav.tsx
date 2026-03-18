"use client"

import React from "react"
import { AudioWaveformIcon, BookOpen, Bot, Cable, ChartBar, Coins, Command, Frame, GalleryVerticalEnd, Map, PieChart, Printer, Settings2, SquareTerminal, Truck, Users } from "lucide-react"
import { NavMain } from "./sidenav/nav-main"
import { NavUser } from "./sidenav/nav-user"
import { NavHeader } from "./sidenav/nav-header"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader,SidebarRail } from "../ui/sidebar"


const data = {
    user: {
        name: "shadcn",
        email: "me@example.com",
        avatar: "/avatars/shadcn.jpg"
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/zakat",
            icon: ChartBar,
            isCollapsible: false
        },
        {
            title: "Pengumpulan Zakat & Infak",
            url: "pengumpulan",
            icon: BookOpen,
            isCollapsible: true,
            items: [
                {
                    title: "RT.01",
                    url: "/zakat/pengumpulan/01"
                },
                {
                    title: "RT.02",
                    url: "/zakat/pengumpulan/02"
                },
                {
                    title: "RT.03",
                    url: "/zakat/pengumpulan/03"
                },
                {
                    title: "RT.04",
                    url: "/zakat/pengumpulan/04"
                },
                {
                    title: "RT.05",
                    url: "/zakat/pengumpulan/05"
                },
                {
                    title: "RT.06",
                    url: "/zakat/pengumpulan/06"
                },
                {
                    title: "Timbangan Beras",
                    url: "/zakat/pengumpulan/timbangan"
                }
            ]
        },
        {
            title: "Distribusi Zakat & Infak",
            url: "distribusi",
            icon: Truck,
            isCollapsible: true,
            items: [
                {
                    title: "Dusun",
                    url: "/zakat/distribusi/dusun"
                },
                {
                    title: "Luar Dusun",
                    url: "/zakat/distribusi/luar-dusun"
                }
                ,
                {
                    title: "Amal Usaha",
                    url: "/zakat/distribusi/amal-usaha"
                },
                {
                    title: "Pengajuan Proposal",
                    url: "/zakat/distribusi/proposal"
                },
                {
                    title: "Aktivis Masjid",
                    url: "/zakat/distribusi/aktivis-masjid"
                },
                {
                    title: "Amil",
                    url: "/zakat/distribusi/amil"
                },
                {
                    title: "Pengeluaran Infak",
                    url: "/zakat/distribusi/pengeluaran-infak",
                    // icon: Coins,
                    // isCollapsible: false
                },
            ]
        },
        // {
        //     title: "Pengeluaran Infak",
        //     url: "/zakat/pengeluaran-infak",
        //     icon: Coins,
        //     isCollapsible: false
        // },
        // {
        //     title: "Rekomendasi Zakat Fitrah",
        //     url: "/zakat/rekomendasi-fitrah",
        //     icon: Cable,
        //     isCollapsible: false
        // },
        // {
        //     title: "Pembagian Beras per ∑ Anggota KK",
        //     url: "/zakat/pengelompokan-pembagian-zakat-fitrah",
        //     icon: Cable,
        //     isCollapsible: false
        // },
        {
            title: "Penyesuaian Zakat Fitrah",
            url: "penyesuaian-zakat-fitrah",
            icon: Cable,
            isCollapsible: true,
            items: [
                {
                    title: "Rekomendasi",
                    url: "/zakat/penyesuaian-zakat-fitrah/rekomendasi"
                },
                {
                    title: "Pembagian / Kelompok KK",
                    url: "/zakat/penyesuaian-zakat-fitrah/pembagian"
                },
            ]
        },
        {
            title: "Warga",
            url: "warga",
            icon: SquareTerminal,
            isCollapsible: true,
            items: [
                {
                    title: "RT.01",
                    url: "/zakat/warga/01"
                },
                {
                    title: "RT.02",
                    url: "/zakat/warga/02"
                },
                {
                    title: "RT.03",
                    url: "/zakat/warga/03"
                },
                {
                    title: "RT.04",
                    url: "/zakat/warga/04"
                },
                {
                    title: "RT.05",
                    url: "/zakat/warga/05"
                },
                {
                    title: "RT.06",
                    url: "/zakat/warga/06"
                }
            ]
        },
        {
            title: "Users",
            url: "/zakat/users",
            icon: Users,
            isCollapsible: false
        },
        {
            title: "Laporan",
            url: "/zakat/laporan",
            icon: Printer,
            isCollapsible: false
        },
    ]
}

export function AppSidenav({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavHeader />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                {/* <NavUser user={data.user} /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}