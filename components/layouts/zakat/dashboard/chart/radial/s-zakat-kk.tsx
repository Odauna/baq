"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  sudah: {
    label: "Sudah Zakat",
    color: "var(--chart-6)",
  },
  belum: {
    label: "Belum Zakat",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export function RSZakatKK({
  sudah_zakat,
  belum_zakat
} : {
  sudah_zakat: number
  belum_zakat: number
}) {
  const chartData = [{ sudah: sudah_zakat, belum: belum_zakat }]
  const totalVisitors = chartData[0].sudah + chartData[0].belum

  return (
    //   <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[200px]"
        >
            <RadialBarChart
            data={chartData}
            startAngle={180} endAngle={0}
            innerRadius={80}
            outerRadius={130}
            >
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
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
                            {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                        >
                            Keluarga
                        </tspan>
                        </text>
                    )
                    }
                }}
                />
            </PolarRadiusAxis>
            <RadialBar dataKey="sudah" stackId="a" cornerRadius={5} fill="var(--color-sudah)" className="stroke-transparent stroke-2" />
            <RadialBar
                dataKey="belum"
                fill="var(--color-belum)"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
            />
            </RadialBarChart>
        </ChartContainer>
    //   </CardContent>
  )
}
