"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { activateUserAction } from "@/lib/zakat/user"
import { LoaderCircle, ShieldCheck, ShieldX } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"

export function UserAktivasi({
    u_id,
    u_name,
    u_aktif
} : {
    u_id: string
    u_name: string
    u_aktif: 'Ya'|'Tidak'
}) {
    const [isProceed, setIsProceed] = useState(false)
    const [isProceed0, setIsProceed0] = useState(false)
    const [isProceed1, setIsProceed1] = useState(false)
    const bindActivateUserAction = activateUserAction.bind(null, u_id)
    const {executeAsync, result} = useAction(bindActivateUserAction)
    useEffect(() => {
        if (result.data?.type == "success") {
            toast.success(result.data.message)
        }
        if (result.data?.type == "error") {
            toast.error(result.data.message)
        }
        if (result.data?.type == "warning") {
            toast.warning(result.data.message)
        }
    }, [result.data])

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Aktivasi User <b>{u_name}</b></DialogTitle>
                <DialogDescription>Aktifkan atau non-aktifkan user</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center">
                {u_aktif == "Ya" ? (
                    <ShieldCheck size={100} color="green" />
                ) : (
                    <ShieldX size={100} color="red" />
                )}
            </div>
            <Button disabled={isProceed} className="bg-green-500 hover:bg-green-400"
                onClick={() => {
                    try {
                        setIsProceed(true)
                        setIsProceed0(true)
                        executeAsync({ status: "Aktif" })
                    } catch (error) {
                        console.error(error)
                    } finally {
                        setIsProceed(false)
                        setIsProceed0(false)
                    }
            }}>
                <ShieldCheck />
                Aktifkan {isProceed0 && <LoaderCircle className="animate-spin" />}
            </Button>
            <Button disabled={isProceed} variant="destructive"
                onClick={() => {
                    try {
                        setIsProceed(true)
                        setIsProceed1(true)
                        executeAsync({ status: "NonAktif" })
                    } catch (error) {
                        console.error(error)
                    } finally {
                        setIsProceed(false)
                        setIsProceed1(false)
                    }
            }}>
                <ShieldX />
                Non-aktifkan {isProceed1 && <LoaderCircle className="animate-spin" />}
            </Button>
        </DialogContent>
    )
}