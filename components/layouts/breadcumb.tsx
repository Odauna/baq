"use client"

import { useSelectedLayoutSegment } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import React, { useState } from "react";

export function BreadcrumbSidenav() {
    
    // const [sublink, setSubLink] = useState('')
    // let segment = useSelectedLayoutSegment()
    // if (segment === 'dashboard') {setSubLink("Dashboard")}
    // if (segment === 'pengumpulan') {setSubLink("Pengumpulan")} 
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/zakat">
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage></BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}