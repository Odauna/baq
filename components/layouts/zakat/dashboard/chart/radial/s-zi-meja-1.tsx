"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Weight } from "lucide-react"
import useSWR from 'swr'
import { Host } from "@/lib/host"
import { Skeleton } from "@/components/ui/skeleton"

const fetcher = (...args) => fetch(...args).then(res => res.json())

const chartConfig = {
    sudah: {
        label: "Sudah Zakat",
        color: "var(--chart-2)"
    },
    belum: {
        label: "Belum Zakat",
        color: "var(--chart-1)"
    },
    mustahik: {
        label: "Mustahik",
        color: "var(--chart-3)"
    }
} satisfies ChartConfig

function Meja() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/dashboard/perkiraan/timbangan`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return (
        <>
        <CardHeader className="flex items-center py-4">
            <CardTitle>
                <Skeleton className="h-6 w-[200px]" />
            </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-1 items-start pb-0">
            <div className="grid-rows-3 pl-1 w-full">
                <div className="pb-1">
                    <Skeleton className="my-1 h-4 w-[200px]" />
                    <Skeleton className="h-6 w-[200px]" />
                </div>
                <Separator />
                <div>
                    <Skeleton className="my-1 h-4 w-[200px]" />
                    <Skeleton className="h-6 w-[200px]" />
                </div>
            </div>
        </CardContent>
        </>
    )
    return (
        <>
        <CardHeader className="flex items-center py-4">
            <CardTitle>Meja 01 (Timbangan Beras)</CardTitle>
            {/* <CardDescription>Ada <b>{data[0][0] != undefined ? data[0][0].amount_kk : 0}</b> KK yang terdaftar dengan jumlah <b>{data[0][0] != undefined ? data[0][0].amount_anggota : 0}</b>({data[0][0] != undefined ? data[0][0].amount_tanggungan : 0}) jiwa.</CardDescription> */}
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-1 items-start pb-0">
            <div className="grid-rows-3 pl-1 w-full">
                <div className="pb-1">
                    <div>Total Timbangan Beras</div>
                    <div className="flex gap-1 font-semibold text-xl items-center"><Weight />{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[0][0].nominal) : 0} kg</div>
                </div>
                <Separator />
                <div className="pb-1">
                    <div className="">Selisih dengan Meja Lain (Jumlah Fitrah (Beras))</div>
                    <div className="flex gap-1 font-semibold text-xl items-center"><Weight />{data[1][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[0][0].nominal - data[1][0].nominal) : 0} kg</div>
                </div>
            </div>
        </CardContent>
        </>
    )
}

export function RCSZIMeja1() {
    return (
        <Card className="flex flex-col max-h-[250px] w-[250px] gap-1 mt-2 py-3">
            <Meja />
        </Card>
    )
}