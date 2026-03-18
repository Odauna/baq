"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Banknote, Weight } from "lucide-react"

const chartData = [{ sudah: 43, belum: 15 }]
const chartConfig = {
    sudah: {
        label: "Sudah Zakat",
        color: "var(--chart-1)"
    },
    belum: {
        label: "Belum Zakat",
        color: "var(--chart-2)"
    }
} satisfies ChartConfig

export function RCSZakatRT04() {
    const jumlahSudahZakat = chartData[0].sudah


    return (
        <Card className="flex flex-col max-h-[250px] w-[450px] gap-1 m-2 py-3">
            <CardHeader className="items-center pb-0">
                <CardTitle>Zakat RT.04</CardTitle>
                <CardDescription>Ada <b>50</b> KK yang terdaftar dengan jumlah <b>100</b> jiwa.</CardDescription>
            </CardHeader>
            {/* <div> */}
            <Separator />
                <CardContent className="flex flex-1 items-start pb-0">
                    <div className="gap-1">
                        <div className="pb-0">
                            <div>Infak</div>
                            <div className="flex gap-1 font-semibold text-xl items-center"><Banknote />Rp2.000.000</div>
                        </div>
                        <ChartContainer config={chartConfig} className="aspect-square w-full max-w-[200px] h-[200px]" >
                            <RadialBarChart data={chartData} startAngle={180} endAngle={0} innerRadius={80} outerRadius={130} >
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
                                <RadialBar dataKey="sudah" stackId="a" cornerRadius={5} fill="var(--color-sudah)" className="stroke-transparent stroke-2" />
                                <RadialBar dataKey="belum" fill="var(--color-belum)" stackId="a" cornerRadius={5} className="stroke-transparent stroke-2" />
                            </RadialBarChart>
                        </ChartContainer>
                    </div>
                    <div className="grid-rows-3 pl-1 w-full">
                        <div className="pb-1">
                            <div className="">Fitrah (Beras) dari 340 jiwa</div>
                            <div className="flex gap-1 font-semibold text-xl items-center"><Weight />200Kg</div>
                        </div>
                        <Separator />
                        <div className="pb-1">
                            <div>Fitrah (Uang) dari 3 jiwa</div>
                            <div className="flex gap-1 font-semibold text-xl items-center"><Banknote />Rp111.000</div>
                        </div>
                        <Separator />
                        <div>
                            <div>Mal dari 4 jiwa</div>
                            <div className="flex gap-1 font-semibold text-xl items-center"><Banknote />Rp2.000.000</div>
                        </div>
                    </div>
                </CardContent>
            {/* </div> */}
        </Card>
    )
}