"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { totalZFBeras } from "@/lib/dash-action"
import { Host } from "@/lib/host"
import { useState } from "react"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function CekTotalTargetBeras() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/dashboard/timbangan-target-penyaluran`, fetcher)
    console.log(data)
    if (error) {console.error(error)}
    if (isLoading) return (
        <CardContent className="flex grid-cols-7 gap-1 justify-around">
            <div className="items-center">
                <Skeleton className="h-8 w-[100px]" />
                <div>Total Timbangan</div>
            </div>
            <div><Separator orientation="vertical" /></div>
            <div className="items-center">
                <Skeleton className="h-8 w-[100px]" />
                <div>Target Penyaluran</div>
            </div>
        </CardContent>
    )
    return (
        <CardContent className="flex grid-cols-7 gap-3 justify-around">
            <div className="items-center">
                <div className="font-semibold text-2xl">{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format((data[0][0].nominal).toFixed(2)) : 0} kg</div>
                <div>Total Timbangan</div>
            </div>
            <div><Separator orientation="vertical" /></div>
            <div className="items-center">
                <div className="font-semibold text-2xl">{data[1][0] != undefined ? new Intl.NumberFormat("id-ID").format((data[1][0].amount ).toFixed(2)): 0} kg</div>
                <div>Target Penyaluran</div>
            </div>
        </CardContent>
    )
}

export function CTotalTargetBeras() {
    return (
        <Card>
            <CekTotalTargetBeras />
        </Card>
    )
}