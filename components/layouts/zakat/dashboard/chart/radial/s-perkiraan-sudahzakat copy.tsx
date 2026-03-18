"use client"


import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
import { RSZakatKK } from "./s-zakat-kk"
import { PDWTZakatJiwa } from "../pie/dwt-zakat-jiwa"

export function RCSPerkiraanSudahZakat({
  sudah_zakat,
  belum_zakat,
  rt01,
  rt02,
  rt03,
  rt04,
  rt05,
  rt06
} : {
  sudah_zakat: number
  belum_zakat: number
  rt01: number
  rt02: number
  rt03: number
  rt04: number
  rt05: number
  rt06: number
}) {
  return (
    <Card className="grid grid-cols-2 gap-1 w-[420px] h-[220px]">
        <div className="grid-rows-2 gap-1 pr-0 mr-0 w-full">
            <CardHeader className="items-center pb-0 pr-0 w-full">
                <CardTitle>Warga yang Sudah Zakat</CardTitle>
                <CardDescription>Perkiraan Sementara</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center max-w-[200px]">
                <RSZakatKK sudah_zakat={sudah_zakat} belum_zakat={belum_zakat} />
            </CardContent>
        </div>
        <div className="max-w-[180px] max-h-[180px] pl-2">
            <PDWTZakatJiwa rt01={rt01} rt02={rt02} rt03={rt03} rt04={rt04} rt05={rt05} rt06={rt06} />
        </div>
    </Card>
  )
}
