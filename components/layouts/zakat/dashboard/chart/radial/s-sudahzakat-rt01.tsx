// @ts-nocheck
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

const chartData = [{ month: "Ramadhan", sudah: 1260, belum: 570 }]
const chartConfig = {
    sudah: {
        label: "Sudah Zakat",
        color: "hsl(var(--chart-1))"
    },
    belum: {
        label: "Belum Zakat",
        color: "hsl(var(--chart-2))"
    }
}

export function RCSRT01() {
    const totalPersons = chartData[0].sudah + chartData[0].belum

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>RT.01 - Yang Sudah Zakat</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[250px]">
                    <RadialBarChart data={chartData} startAngle={180} endAngle={0} innerRadius={80} outerRadius={130}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label content={({viewBox}) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-foreground text-2xl font-bold">{totalPersons.toLocaleString()}</tspan>
                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground">Jiwa</tspan>
                                        </text>
                                    )
                                }
                            }} />
                        </PolarRadiusAxis>
                        <RadialBar dataKey="desktop" stackId="a" cornerRadius={5} fill="var(--color-desktop)" className="stroke-transparent stroke-2" />
                        <RadialBar dataKey="mobile" stackId="b" cornerRadius={5} fill="var(--color-mobile)" className="stroke-transparent stroke-2" />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}