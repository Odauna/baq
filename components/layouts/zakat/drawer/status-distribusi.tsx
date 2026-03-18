"use client"

import { Button } from "@/components/ui/button"
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { fetchSWDbyId } from "@/lib/data"
import { changeStatusDistribusi } from "@/lib/zakat/distribusi"
import { ClipboardCheck, ClipboardX } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

export function StatusDistribusi({
    d_id,
    d_status
} : {
    d_id: string
    d_status: "Sudah" | "Belum"
}) {

    const boundChangeStatusDistribusi = changeStatusDistribusi.bind(null, d_id)
    const {executeAsync, result} = useAction(boundChangeStatusDistribusi)
    useEffect(() => {
        if (result.data?.type == "success") {
            toast.success(result.data.message)
        }
        if (result.data?.type == "error") {
            toast.error(result.data.message)
        }
    }, [result.data])

    return (
        <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>Konfirmasi Distribusi Zakat</DrawerTitle>
                    <DrawerDescription>Apakah pembagian zakat sudah diterima oleh yang bersangkutan?</DrawerDescription>
                </DrawerHeader>
                <div className="flex items-center justify-center">
                    {d_status === "Sudah" && <ClipboardCheck size={100} color="green" />}
                    {(d_status === "Belum" || d_status === undefined) && <ClipboardX size={100} color="red" />}
                </div>
                <DrawerFooter>
                    <Button className="bg-green-500 hover:bg-green-400"
                    onClick={() => {
                        executeAsync({
                            diterima: "Sudah"
                        })
                    }}
                    >
                        <ClipboardCheck />
                        Sudah
                    </Button>
                    <Button variant="destructive"
                    onClick={() => {
                        executeAsync({
                            diterima: "Belum"
                        })
                    }}
                    >
                        <ClipboardX />
                        Belum
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Tutup</Button>
                    </DrawerClose>
                </DrawerFooter>
            </div>
        </DrawerContent>
    )
} 
// }