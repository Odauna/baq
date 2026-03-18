"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { Banknote, Weight } from "lucide-react"

// const chartData = [{ sudah: 42, belum: 15 }]
const chartConfig = {
    sudah: {
        label: "Sudah Zakat",
        color: "var(--chart-2)"
    },
    belum: {
        label: "Belum Zakat",
        color: "var(--chart-1)"
    },
    mustahik: {
        label: "Mustahik",
        color: "var(--chart-3)"
    }
} satisfies ChartConfig

export function RCSZakatRT01({
    jkk,
    janggota,
    jtanggungan,
    jmustahik,
    j_belum_zakat,
    j_jiwa_fitrah_beras,
    jfitrah_beras,
    j_jiwa_fitrah_uang,
    jfitrah_uang,
    j_jiwa_mal,
    jmal,
    jinfak
} : {
    jkk: number
    janggota: number
    jtanggungan: number
    jmustahik: number
    j_belum_zakat: number
    j_jiwa_fitrah_beras: number
    jfitrah_beras: number
    j_jiwa_fitrah_uang: number
    jfitrah_uang: number
    j_jiwa_mal: number
    jmal: number
    jinfak: number
}) {
    const chartData = [{ sudah: jtanggungan, belum: j_belum_zakat, mustahik: jmustahik }]
    const jumlahSudahZakat = chartData[0].sudah
    // const jumlahBelumZakat = chartData[0].belum


    return (
        <Card className="flex flex-col max-h-[250px] w-[450px] gap-1 m-2 py-3">
            <CardHeader className="items-center pb-0">
                <CardTitle>Zakat RT.01</CardTitle>
                <CardDescription>Ada <b>{jkk}</b> KK yang terdaftar dengan jumlah <b>{janggota}</b>({jtanggungan}) jiwa.</CardDescription>
            </CardHeader>
            {/* <div> */}
            <Separator />
                <CardContent className="flex flex-1 items-start pb-0">
                    <div className="gap-1">
                        <div className="pb-0">
                            <div>Infak</div>
                            <div className="flex gap-1 font-semibold text-xl items-center"><Banknote />Rp{jinfak}</div>
                        </div>
                        <ChartContainer config={chartConfig} className="aspect-square w-full max-w-[200px] h-[200px]" >
                            <RadialBarChart data={chartData} startAngle={180} endAngle={0} innerRadius={70} outerRadius={150} >
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
                                <RadialBar dataKey="mustahik" stackId="a" cornerRadius={10} fill="var(--color-mustahik)" className="stroke-transparent stroke-2" />
                                <RadialBar dataKey="sudah" stackId="b" cornerRadius={10} fill="var(--color-sudah)" className="stroke-transparent stroke-2" />
                                <RadialBar dataKey="belum" stackId="b" cornerRadius={10} fill="var(--color-belum)" className="stroke-transparent stroke-2" />
                            </RadialBarChart>
                        </ChartContainer>
                    </div>
                    <div className="grid-rows-3 pl-1 w-full">
                        <div className="pb-1">
                            <div className="">Fitrah (Beras) dari {j_jiwa_fitrah_beras} jiwa</div>
                            <div className="flex gap-1 font-semibold text-xl items-center"><Weight />{jfitrah_beras}Kg</div>
                        </div>
                        <Separator />
                        <div className="pb-1">
                            <div>Fitrah (Uang) dari {j_jiwa_fitrah_uang} jiwa</div>
                            <div className="flex gap-1 font-semibold text-xl items-center"><Banknote />Rp{jfitrah_uang}</div>
                        </div>
                        <Separator />
                        <div>
                            <div>Mal dari {j_jiwa_mal} jiwa</div>
                            <div className="flex gap-1 font-semibold text-xl items-center"><Banknote />Rp{jmal}</div>
                        </div>
                    </div>
                </CardContent>
            {/* </div> */}
        </Card>
    )
}