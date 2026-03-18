"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { totalZFBeras } from "@/lib/dash-action"
import { Host } from "@/lib/host"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function CekTotalFitrahBeras() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/dashboard/total/twszfb`, fetcher)
    if (error) {console.error(error)}
    // let total = 0
    // let jiwa = 0
    // let nominal = 0
    // if (data[0][0] != undefined) {
    //     total = data[0][0].nominal
    //     jiwa = data[0][0].jiwa
    // }
    // if (data[1][0] != undefined) {
    //     nominal = data[1][0].nominal
    // }
    // let 
    if (isLoading) return (
        <CardContent className="flex grid-cols-7 gap-3 justify-around">
            <div className="items-center">
                <Skeleton className="h-8 w-[100px]" />
                <div>Jumlah Fitrah (Beras)</div>
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
        </CardContent>
    )
    return (
        <CardContent className="flex grid-cols-7 gap-3 justify-around">
            <div className="items-center">
                <div className="font-semibold text-2xl">{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format((data[0][0].nominal).toFixed(2)) : 0} kg</div>
                <div>Jumlah Fitrah (Beras)</div>
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
        </CardContent>
    )
}

export function CTotalFitrahBeras() {
    return (
        <Card className="">
            <CekTotalFitrahBeras />
        </Card>
    )
}