"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { totalZFBeras } from "@/lib/dash-action"
import { useState } from "react"
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

export function CTotalZI({
    total_fitrah_beras,
    total_fitrah_uang,
    total_mal,
    total_infak
} : {
    total_fitrah_beras: number,
    total_fitrah_uang: number,
    total_mal: number,
    total_infak: number
}) {
    return (
        <Card>
            <CardContent className="flex grid-cols-7 gap-1 justify-around">
                <div className="items-center justify-items-center">
                    <div className="font-semibold text-2xl">{total_fitrah_beras}Kg</div>
                    <div>Total Zakat Fitrah (Beras)</div>
                </div>
                <div>
                    <Separator orientation="vertical" />
                </div>
                <div className="items-center">
                    <div className="font-semibold text-2xl">Rp{total_fitrah_uang}</div>
                    <div>Total Zakat Fitrah (Uang)</div>
                </div>
                <div><Separator orientation="vertical" /></div>
                <div className="items-center">
                    <div className="font-semibold text-2xl">Rp{total_mal}</div>
                    <div>Total Zakat Mal</div>
                </div>
                <div><Separator orientation="vertical" /></div>
                <div className="items-center">
                    <div className="font-semibold text-2xl">Rp{total_infak}</div>
                    <div>Total Infak</div>
                </div>
            </CardContent>
        </Card>
    )
}