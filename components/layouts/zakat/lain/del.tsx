"use client"

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { deleteLainAction } from "@/lib/zakat/lain"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { toast } from "sonner"

export function AlertDeleteLain({
    lid,
    keterangan,
    nominal
} : {
    lid: string
    keterangan: string
    nominal: number
}) {
    const {execute, result} = useAction(deleteLainAction)
    async function onDel(id: string) {
        await execute({id: id})
    }
    useEffect(() => {
        if (result.data?.type == "success") {
            toast.success(result.data.message)
        }
        if (result.data?.type == "error") {
            toast.error(result.data.message)
        }
    }, [result.data])
    
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin ingin menghapusnya?</AlertDialogTitle>
                <div className="grid-rows-3">
                    <div>
                        <p className="font-semibold">Keterangan</p>
                        <p>{keterangan}</p>
                    </div>
                    <Separator className="my-2" />
                    <div>
                        <p className="font-semibold">Nominal</p>
                        <p>{nominal}</p>
                    </div>
                </div>
                <Separator />
                <AlertDialogDescription className="text-red-500">Jika Anda menekan tombol <b>Hapus</b>, maka data tersebut akan terhapus secara <b>permanen</b>!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDel(lid)}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>

    )
}