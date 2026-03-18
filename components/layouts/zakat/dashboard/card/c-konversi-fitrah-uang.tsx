"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Host } from "@/lib/host"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function CekKonversiFitrahUang() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/dashboard/total/kzfu`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return (
        <CardContent className="flex grid-cols-7 gap-3 justify-around">
            <div className="items-center">
                <Skeleton className="h-8 w-[100px]" />
                <div>Jumlah Fitrah (Uang)</div>
            </div>
            <div className="items-center">
                <Skeleton className="h-8 w-[100px]" />
                <div>Perkiraan Konversi</div>
            </div>
        </CardContent>
    )
    return (
        <CardContent className="flex grid-cols-7 gap-3 justify-around">
            <div className="items-center">
                <div className="font-semibold text-2xl">Rp{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format((data[0][0].nominal)) : 0}</div>
                <div>Jumlah Fitrah (Uang)</div>
            </div>
            <div><Separator orientation="vertical" /></div>
            <div className="items-center">
                <div className="font-semibold text-2xl">{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(Number((data[0][0].nominal / data[2][0].nominal * data[1][0].nominal).toFixed(3))) : 0} kg</div>
                <div>Perkiraan Rp{new Intl.NumberFormat("id-ID").format(Number(data[2][0].nominal))} = {data[1][0].nominal} kg</div>
            </div>
        </CardContent>
    )
}

export function CKonversiFitrahUang() {
    return (
        <Card className="">
            <CekKonversiFitrahUang />
        </Card>
    )
}