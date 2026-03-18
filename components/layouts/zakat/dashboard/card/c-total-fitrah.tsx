// @ts-nocheck
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Host } from "@/lib/host"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function CekTotalFitrah() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/dashboard/total/kzfu`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return (
        <CardContent className="flex grid-cols-7 gap-3 justify-around">
            <div className="items-center">
                <Skeleton className="h-8 w-[100px]" />
                <div>Total Zakat Fitrah</div>
            </div>
        </CardContent>
    )
    return (
        <CardContent className="flex grid-cols-7 gap-3 justify-around">
            <div className="items-center">
                <div className="font-semibold text-2xl">{data[3][0] != undefined ? new Intl.NumberFormat("id-ID").format(Number((data[3][0].nominal + data[0][0].nominal / data[2][0].nominal * data[1][0].nominal).toFixed(2))): 0} kg</div>
                <div>Total Zakat Fitrah</div>
            </div>
        </CardContent>
    )
}

export function CTotalFitrah() {
    return (
        <Card className="">
            <CekTotalFitrah />
        </Card>
    )
}