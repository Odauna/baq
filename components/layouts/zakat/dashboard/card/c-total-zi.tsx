"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Host } from "@/lib/host"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function CekTotalZI() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/dashboard/total`, fetcher)
    console.log(data)
    if (error) {console.error(error)}
    if (isLoading) return (
        <CardContent className="flex grid-cols-7 gap-1 justify-around">
            <div className="items-center">
                <Skeleton className="h-8 w-[100px]" />
                <div>Total Zakat Mal</div>
            </div>
            <div><Separator orientation="vertical" /></div>
            <div className="items-center">
                <Skeleton className="h-8 w-[100px]" />
                <div>Total Infak</div>
            </div>
        </CardContent>
    )
    return (
        <CardContent className="flex grid-cols-7 gap-3 justify-around">
            <div className="items-center">
                <div className="font-semibold text-2xl">Rp{data[0] != undefined ? new Intl.NumberFormat("id-ID").format(data[0].amount_zm) : 0}</div>
                <div>Total Zakat Mal</div>
            </div>
            <div><Separator orientation="vertical" /></div>
            <div className="items-center">
                <div className="font-semibold text-2xl">Rp{data[0] != undefined ? new Intl.NumberFormat("id-ID").format(data[0].amount_i) : 0}</div>
                <div>Total Infak</div>
            </div>
        </CardContent>
    )
}

export function CTotalZI() {
    return (
        <Card className="">
            <CekTotalZI />
        </Card>
    )
}