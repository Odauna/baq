"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import React from "react"
import { Label, Pie, PieChart } from "recharts"

const chartData = [
    { rt: "satu", sudahBerzakat: 275, fill: "var(--color-satu)" },
    { rt: "dua", sudahBerzakat: 200, fill: "var(--color-dua)" },
    { rt: "tiga", sudahBerzakat: 287, fill: "var(--color-tiga)" },
    { rt: "empat", sudahBerzakat: 173, fill: "var(--color-empat)" },
    { rt: "lima", sudahBerzakat: 190, fill: "var(--color-lima)" },
    { rt: "enam", sudahBerzakat: 173, fill: "var(--color-enam)" },
]

const chartConfig = {
    sudahBerzakat: {
        label: "Yang Sudah Berzakat"
    },
    satu: {
        label: "RT.01",
        color: "hsl(var(--chart-1))"
    },
    dua: {
        label: "RT.02",
        color: "hsl(var(--chart-2))"
    },
    tiga: {
        label: "RT.03",
        color: "hsl(var(--chart-3))"
    },
    empat: {
        label: "RT.04",
        color: "hsl(var(--chart-4))"
    },
    lima: {
        label: "RT.05",
        color: "hsl(var(--chart-5))"
    },
    enam: {
        label: "RT.06",
        color: "hsl(var(--chart-6))"
    }
} satisfies ChartConfig

export function PCDTSudahBerzakat() {
    const totalYangSudahBerzakat = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.sudahBerzakat, 0)
    }, [])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Total yang Sudah Berzakat</CardTitle>
                <CardDescription>Ramadhan</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
                            <Label content={({viewBox}) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">{totalYangSudahBerzakat.toLocaleString()}</tspan>
                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">Jiwa</tspan>
                                        </text>
                                    )
                                }
                            }}></Label>
                        </Pie> 
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}