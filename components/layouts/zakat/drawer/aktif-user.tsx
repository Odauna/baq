"use client"

import { Button } from "@/components/ui/button"
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { fetchUserById } from "@/lib/data"
import { activateAction } from "@/lib/user"
import { ShieldCheck, ShieldX } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

export function AktifUser({
    id,
    proses,
    uname
} : {
    id: string
    proses: string
    uname: string
}) {
    const [idu] = React.useState(id)
    // const [stateproses] = React.useState(proses)
    const [isLoading, setIsLoading] = useState(false)
    console.log(`id user: ${id}`)
    const [sau, setSAU] = React.useState(proses)
    async function fetchData() {
        setIsLoading(true)
        try {
            const sa = await fetchUserById(idu)
            if (sa) {
                setSAU(sa.aktif)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    // useEffect(() => {
    //     fetchData()
    // }, [idu])
    // useEffect(() => {
        // setIDW(id)
        // const fetchData = async () => {
            //     if (proses == true) {
                //         const sa = await fetchUserById(id)
                //         if (sa) {
            //             setSAU(sa.aktif)
            //         }
            //     }
            // }
            // fetchData()
            // }, [idw])
            // console.log(idw)
            // console.log(sau)
    const boundActivateAction = activateAction.bind(null, id)
    const {executeAsync, result} = useAction(boundActivateAction)
    useEffect(() => {
        if (result.data?.type == "success") {
            toast.success(result.data.message)
            fetchData()
        }
        if (result.data?.type == "error") {
            toast.error(result.data.message)
        }
    }, [result.data])
    // }
    return (
        <>
        {/* {isLoading ? ("Loading...") : ( */}
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Aktivasi User <b>{uname}</b></DrawerTitle>
                        <DrawerDescription>Aktifkan atau Non-aktifkan user</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex items-center justify-center">
                        {sau == "Ya" ? (
                            <ShieldCheck size={100} color="green" />
                        ) : (
                            <ShieldX size={100} color="red" />
                        )}
                    </div>
                    <DrawerFooter>
                        <Button className="bg-green-500 hover:bg-green-400"
                        onClick={() => {
                            executeAsync({ status: "Aktif" })
                        }}
                        >
                            <ShieldCheck />
                            Aktifkan
                        </Button>
                        <Button variant="destructive"
                        onClick={() => {
                            executeAsync({ status: "NonAktif" })
                        }}
                        >
                            <ShieldX />
                            Non-aktifkan
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Tutup</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        {/* )} */}
        </>
    )
}