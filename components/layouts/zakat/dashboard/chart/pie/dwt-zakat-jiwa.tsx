"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  satu: {
    label: "RT.01",
    color: "var(--chart-1)",
  },
  dua: {
    label: "RT.02",
    color: "var(--chart-2)",
  },
  tiga: {
    label: "RT.03",
    color: "var(--chart-3)",
  },
  empat: {
    label: "RT.04",
    color: "var(--chart-4)",
  },
  lima: {
    label: "RT.05",
    color: "var(--chart-5)",
  },
  enam: {
    label: "RT.06",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig

export function PDWTZakatJiwa({
  rt01,
  rt02,
  rt03,
  rt04,
  rt05,
  rt06
} : {
  rt01: number
  rt02: number
  rt03: number
  rt04: number
  rt05: number
  rt06: number
}) {
  const chartData = [
    { rt: "satu", visitors: Number(rt01), fill: "var(--color-satu)" },
    { rt: "dua", visitors: Number(rt02), fill: "var(--color-dua)" },
    { rt: "tiga", visitors: Number(rt03), fill: "var(--color-tiga)" },
    { rt: "empat", visitors: Number(rt04), fill: "var(--color-empat)" },
    { rt: "lima", visitors: Number(rt05), fill: "var(--color-lima)" },
    { rt: "enam", visitors: Number(rt06), fill: "var(--color-enam)" },
  ]
  const totalJiwa = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[180px] mb-10"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="rt"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalJiwa.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Jiwa
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
  )
}
