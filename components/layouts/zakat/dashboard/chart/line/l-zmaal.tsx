"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "January", desktop: 186000, mobile: 80000 },
    { month: "February", desktop: 305000, mobile: 200000 },
    { month: "March", desktop: 2700000, mobile: 120000 },
    { month: "April", desktop: 7300000, mobile: 190000 },
    { month: "May", desktop: 2000000, mobile: 130000 },
    { month: "June", desktop: 1400000, mobile: 140000 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function LCZakatMal() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Statik Total Zakat Mal</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <LineChart accessibilityLayer data={chartData} margin={{ top: 20, left: 12, right: 12, }} >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={{ fill: "var(--color-desktop)", }} activeDot={{ r: 6, }} >
                            <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
