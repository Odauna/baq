"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
import { RSZakatKK } from "./s-zakat-kk"
import { PDWTZakatJiwa } from "../pie/dwt-zakat-jiwa"
import useSWR from 'swr'
import { Host } from "@/lib/host"
import { Skeleton } from "@/components/ui/skeleton"

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Perkiraan() {
  const {data, error, isLoading} = useSWR(`${Host}/api/zakat/dashboard/perkiraan`, fetcher)
  if (error) {console.error(error)}
  if (isLoading) return (
    <>
    <div className="grid-rows-2 gap-1 pr-0 mr-0 w-full">
        <CardHeader className="items-center pb-0 pr-0 w-full">
            <Skeleton className="mt-2 h-4 w-[150px]" />
            <Skeleton className="mt-1 h-4 w-[100px]" />
            {/* <CardDescription>Perkiraan Sementara</CardDescription> */}
        </CardHeader>
        <CardContent className="flex flex-1 items-center max-w-[200px]">
          <Skeleton className="mt-3 h-[100px] w-[200px]" />
        </CardContent>
    </div>
    <div className="max-w-[180px] max-h-[180px] pl-2">
      <Skeleton className="h-full w-full" />
        {/* <PDWTZakatJiwa rt01={rt01} rt02={rt02} rt03={rt03} rt04={rt04} rt05={rt05} rt06={rt06} /> */}
    </div>
    </>
  )
  return (
    <>
    <div className="grid-rows-2 gap-1 pr-0 mr-0 w-full">
        <CardHeader className="items-center pb-0 pr-0 w-full">
            <CardTitle>Warga yang Sudah Zakat</CardTitle>
            <CardDescription>Perkiraan Sementara</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center max-w-[200px]">
            <RSZakatKK sudah_zakat={data[0][0] != undefined ? data[0][0].amount_sudah_zakat : 0} belum_zakat={data[1][0] != undefined ? data[1][0].amount_belum_zakat : 0} />
        </CardContent>
    </div>
    <div className="max-w-[180px] max-h-[180px] pl-2">
        <PDWTZakatJiwa 
          rt01={data[2][0] != undefined ? Number(data[2][0].amount_tanggungan) : 0} 
          rt02={data[3][0] != undefined ? Number(data[3][0].amount_tanggungan) : 0} 
          rt03={data[4][0] != undefined ? Number(data[4][0].amount_tanggungan) : 0} 
          rt04={data[5][0] != undefined ? Number(data[5][0].amount_tanggungan) : 0} 
          rt05={data[6][0] != undefined ? Number(data[6][0].amount_tanggungan) : 0} 
          rt06={data[7][0] != undefined ? Number(data[7][0].amount_tanggungan) : 0} 
        />
    </div>
    </>
  )
}

export function RCSPerkiraanSudahZakat() {
  return (
    <Card className="grid grid-cols-2 gap-1 w-[420px] h-[250px] mt-2">
        <Perkiraan />
    </Card>
  )
}
