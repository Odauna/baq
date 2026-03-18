"use client"


import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export function LCExample() {
    return (
        <Card>
        <CardHeader>
            <CardTitle>Line Chart - Label</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                top: 20,
                left: 12,
                right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                    fill: "var(--color-desktop)",
                }}
                activeDot={{
                    r: 6,
                }}
                >
                    <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Line>
                <Line
                dataKey="mobile"
                type="natural"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={{
                    fill: "var(--color-mobile)",
                }}
                activeDot={{
                    r: 6,
                }}
                >
                    <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Line>
            </LineChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
            </div>
        </CardFooter>
        </Card>
    )
}
