"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Banknote, Weight } from "lucide-react"
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
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/dashboard/zi-rt?rt=03&rtl=04`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return (
        <>
        <CardHeader className="items-center pb-0">
            <CardTitle>
                <Skeleton className="h-6 w-[200px]" />
            </CardTitle>
            <CardDescription>
                <Skeleton className="h-4 w-[400px]" />
            </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-1 items-start pb-0">
            <div className="gap-1">
                <div className="pb-0">
                    <Skeleton className="h-4 w-[200px] my-1" />
                    <Skeleton className="h-6 w-[200px]" />
                </div>
                <Skeleton className="mt-2 h-[100px] w-[200px]" />
            </div>
            <div className="grid-rows-3 pl-1 w-full">
                <div className="pb-1">
                    <Skeleton className="my-1 h-4 w-[200px]" />
                    <Skeleton className="h-6 w-[200px]" />
                </div>
                <Separator />
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
    const chartData = [{ sudah: data[0][0] != undefined ? data[0][0].amount_tanggungan : 0, belum: data[2][0] != undefined ? data[2][0].amount_belum_zakat : 0, mustahik: data[1][0] != undefined ? data[1][0].amount_m : 0 }]
    const jumlahSudahZakat = chartData[0].sudah
    // const jumlahBelumZakat = chartData[0].belum
    return (
        <>
        <CardHeader className="items-center pb-0">
            <CardTitle>Meja 04 (RT.03 & RT.04)</CardTitle>
            <CardDescription>Ada <b>{data[0][0] != undefined ? data[0][0].amount_kk : 0}</b> KK yang terdaftar dengan jumlah <b>{data[0][0] != undefined ? data[0][0].amount_anggota : 0}</b>({data[0][0] != undefined ? data[0][0].amount_tanggungan : 0}) jiwa.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-1 items-start pb-0 justify-around">
            <div className="gap-1">
                <div className="pb-0">
                    <div>Infak</div>
                    <div className="flex gap-1 font-semibold text-xl items-center"><Banknote />Rp{data[6][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[6][0].amount_i) : '0'}</div>
                </div>
                <ChartContainer config={chartConfig} className="aspect-square w-full max-w-[200px] h-[200px]" >
                    <RadialBarChart data={chartData} startAngle={180} endAngle={0} innerRadius={70} outerRadius={150} >
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                    <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) - 16}
                                        className="fill-foreground text-2xl font-bold"
                                    >
                                        {jumlahSudahZakat.toLocaleString()}
                                    </tspan>
                                    <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) + 4}
                                        className="fill-muted-foreground text-sm"
                                    >
                                        Jiwa
                                    </tspan>
                                    </text>
                                )
                            }
                            }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar dataKey="mustahik" stackId="a" cornerRadius={10} fill="var(--color-mustahik)" className="stroke-transparent stroke-2" />
                        <RadialBar dataKey="sudah" stackId="b" cornerRadius={10} fill="var(--color-sudah)" className="stroke-transparent stroke-2" />
                        <RadialBar dataKey="belum" stackId="b" cornerRadius={10} fill="var(--color-belum)" className="stroke-transparent stroke-2" />
                    </RadialBarChart>
                </ChartContainer>
            </div>
            <div className="flex grid-cols-3 gap-2">
                <div className="grid-rows-3 pl-1">
                    <div className="pb-2">
                        <div className="">Zakat Fitrah (Beras) dari {data[3][0] != undefined ? data[3][0].amount_tanggungan_zfb : 0} jiwa</div>
                        {/* <Separator /> */}
                        <div className="flex grid-cols-3 gap-1 justify-around">
                            <div>
                                <div className="flex gap-1 font-semibold text-xl items-center"><Weight />{data[3][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[3][0].amount_zfb) : 0} kg</div>
                                <p>Jumlah</p>
                            </div>
                            <div>
                                <Separator orientation="vertical" />
                            </div>
                            <div>
                                <div className="flex gap-1 font-semibold text-xl items-center">{data[3][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[3][0].amount_zfb) : 0} kg</div>
                                <p>Wajib</p>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="pb-1">
                        <div>Zakat Fitrah (Uang) dari {data[4][0] != undefined ? data[4][0].amount_tanggungan_zfu : 0} jiwa</div>
                        <div className="flex gap-1 font-semibold text-xl items-center"><Banknote />Rp{data[4][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[4][0].amount_zfu) : 0}</div>
                    </div>
                </div>
                <div><Separator orientation="vertical" /></div>
                <div className="grid-rows-3 pl-1">
                    <div className="pb-2">
                        <div className="">Belum Zakat Fitrah</div>
                        <div className="flex grid-cols-3 gap-1 justify-around">
                            <div>
                                <div className="flex gap-1 font-semibold text-xl items-center">{data[2][0] != undefined ? data[2][0].amount_belum_zakat : 0}</div>
                                <p>Keluarga</p>
                            </div>
                            <div><Separator orientation="vertical" /></div>
                            <div>
                                <div className="flex gap-1 font-semibold text-xl items-center">{data[7][0] != undefined ? data[7][0].amount_jiwa_belum_zakat : 0}</div>
                                <p>Jiwa</p>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div>Zakat Mal dari {data[5][0] != undefined ? data[5][0].amount_kk: 0} KK</div>
                        <div className="flex gap-1 font-semibold text-xl items-center"><Banknote />Rp{data[5][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[5][0].amount_zm) : 0}</div>
                    </div>
                </div>
            </div>
        </CardContent>
        </>
    )
}

export function RCSZIMeja4() {
    return (
        <Card className="flex flex-col max-h-[250px] w-[680px] gap-1 pt-3">
            <Meja />
        </Card>
    )
}