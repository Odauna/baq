"use client"

import React from "react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

const chartData = [
    { rt: "satu", fitrah: 186, mobile: 80, fill: "var(--color-satu)" },
    { rt: "dua", fitrah: 305, mobile: 200, fill: "var(--color-dua)" },
    { rt: "tiga", fitrah: 237, mobile: 120, fill: "var(--color-tiga)" },
    { rt: "empat", fitrah: 73, mobile: 190, fill: "var(--color-empat)" },
    { rt: "lima", fitrah: 209, mobile: 130, fill: "var(--color-lima)" },
    { rt: "enam", fitrah: 214, mobile: 140, fill: "var(--color-enam)" },
]

const chartConfig = {
    fitrah: {
        label: "Fitrah",
    },
    satu: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    dua: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    tiga: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    empat: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    lima: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
    enam: {
        label: "Other",
        color: "hsl(var(--chart-6))",
    },
} satisfies ChartConfig

export function BCCustomLabel() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Statistik Zakat Fitrah</CardTitle>
                <CardDescription>Ramadhan</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{right: 16}}>
                        <YAxis
                            dataKey="rt"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                            />
                        <XAxis dataKey="fitrah" type="number" hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Bar dataKey="fitrah" layout="vertical" fill="var(--color-desktop)" radius={4}>
                            <LabelList dataKey="rt" position="insideLeft" offset={8} className="fill-[--color-label]" fontSize={12} />
                            <LabelList dataKey="fitrah" position="right" offset={8} className="fill-foreground" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}