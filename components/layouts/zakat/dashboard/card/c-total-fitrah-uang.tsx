"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { totalZFBeras } from "@/lib/dash-action"
import { Host } from "@/lib/host"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function CekTotalFitrahUang() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/dashboard/total/twszfu`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return (
        <CardContent>
            <p className="pb-2">Terkumpul Zakat Fitrah (Uang)</p>
            <div><Separator /></div>
            <div className="flex grid-cols-7 gap-3 justify-around">
                <div className="items-center">
                    <Skeleton className="h-8 w-[100px]" />
                    <div>Total</div>
                </div>
                <div className="items-center">
                    <Skeleton className="h-8 w-[100px]" />
                    <div>Wajib Zakat</div>
                </div>
                <div><Separator orientation="vertical" /></div>
                <div className="items-center">
                    <Skeleton className="h-8 w-[100px]" />
                    <div>Selisih</div>
                </div>
            </div>
        </CardContent>
    )
    return (
        <CardContent>
            <p className="pb-2">Terkumpul Zakat Fitrah (Uang)</p>
            <div><Separator /></div>
            <div className="flex grid-cols-7 gap-3 justify-around">
                <div className="items-center">
                    <div className="font-semibold text-2xl">{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format((data[0][0].nominal).toFixed(2)) : 0} kg</div>
                    <div>Total Zakat</div>
                </div>
                <div><Separator orientation="vertical" /></div>
                <div className="items-center">
                    <div className="font-semibold text-2xl">{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(Number((data[0][0].jiwa * data[1][0].nominal).toFixed(2))) : 0} kg</div>
                    <div>Wajib Zakat</div>
                </div>
                <div><Separator orientation="vertical" /></div>
                <div className="items-center">
                    <div className="font-semibold text-2xl">{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(Number((data[0][0].nominal - (data[0][0].jiwa * data[1][0].nominal)).toFixed(2))): 0} kg</div>
                    <div>Selisih</div>
                </div>
            </div>
        </CardContent>
    )
}

export function CTotalFitrahUang() {
    return (
        <Card>
            <CekTotalFitrahUang />
        </Card>
    )
}